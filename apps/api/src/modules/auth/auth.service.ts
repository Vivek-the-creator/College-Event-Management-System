import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { prisma } from '../../database/prisma.js';
import { AppError } from '../../shared/errors/app-error.js';
import { AuthRepository } from './auth.repository.js';
import type { LoginInput, RegisterInput } from './auth.validators.js';

const authRepository = new AuthRepository(prisma);
const accessTokenOptions: SignOptions = {
  expiresIn: env.ACCESS_TOKEN_TTL as NonNullable<SignOptions['expiresIn']>
};

export class AuthService {
  async register(input: RegisterInput) {
    const existingUser = await authRepository.findUserByEmail(input.email);
    if (existingUser) {
      throw new AppError(409, 'EMAIL_ALREADY_REGISTERED', 'A user with this email already exists.');
    }

    const role = await authRepository.findRoleBySlug(input.role);
    if (!role) {
      throw new AppError(500, 'DEFAULT_ROLE_MISSING', `Default role '${input.role}' is not seeded.`);
    }

    const passwordHash = await bcrypt.hash(input.password, 12);

    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash,
        userRoles: {
          create: {
            roleId: role.id
          }
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        createdAt: true
      }
    });

    return user;
  }

  async login(input: LoginInput) {
    const user = await authRepository.findUserByEmail(input.email);
    if (!user) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password.');
    }

    const isValidPassword = await bcrypt.compare(input.password, user.passwordHash);
    if (!isValidPassword) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password.');
    }

    const roles = user.userRoles.map((userRole) => userRole.role.slug);
    const permissions = user.userRoles.flatMap((userRole) =>
      userRole.role.rolePermissions.map((rolePermission) => rolePermission.permission.slug)
    );

    const payload = {
      id: user.id,
      email: user.email,
      roles,
      permissions: Array.from(new Set(permissions))
    };

    const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, accessTokenOptions);

    const refreshToken = jwt.sign({ id: user.id, tokenVersion: user.tokenVersion }, env.JWT_REFRESH_SECRET, {
      expiresIn: `${env.REFRESH_TOKEN_TTL_DAYS}d`
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles,
        permissions: payload.permissions
      },
      accessToken,
      refreshToken
    };
  }
}

export const authService = new AuthService();

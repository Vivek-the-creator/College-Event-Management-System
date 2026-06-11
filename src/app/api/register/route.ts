import { NextResponse } from 'next/server';
import { z } from 'zod';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['STUDENT', 'FACULTY', 'ADMIN']).optional(),
  department: z.string().optional(),
  employeeId: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.parse(body);

    const existing = await prisma.user.findUnique({ where: { email: parsed.email } });
    if (existing) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const passwordHash = await hash(parsed.password, 10);

    const user = await prisma.user.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        passwordHash,
        role: parsed.role ?? 'STUDENT',
        emailVerified: true,
      },
      select: { id: true, name: true, email: true, role: true },
    });

    return NextResponse.json({ message: 'Registered successfully', user });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
  }
}

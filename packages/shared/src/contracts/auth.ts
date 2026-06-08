export type AuthenticatedUser = {
  id: string;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
};

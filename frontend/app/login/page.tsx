import { Shell } from '@/components/layout/shell';
import { AuthShell, RoleCards } from '@/components/marketplace/auth-panels';

export default function LoginPage() {
  return <Shell><AuthShell mode="login"><form className="grid gap-4"><RoleCards /><input className="h-11 rounded-md border border-border bg-background px-3" placeholder="Email" /><input className="h-11 rounded-md border border-border bg-background px-3" placeholder="Password" type="password" /><div className="flex items-center justify-between text-sm"><label className="flex gap-2"><input type="checkbox" /> Remember me</label><a className="text-primary" href="#">Forgot password?</a></div><button className="rounded-md bg-primary px-5 py-3 font-semibold text-white">Login</button></form></AuthShell></Shell>;
}

import { StaticPage } from '@/components/marketplace/static-page';

export default function ContactPage() {
  return <StaticPage title="Contact"><form className="grid gap-3 rounded-md border border-border bg-card p-4"><input className="h-11 rounded-md border border-border bg-background px-3" placeholder="Name" /><input className="h-11 rounded-md border border-border bg-background px-3" placeholder="Email" /><textarea className="min-h-32 rounded-md border border-border bg-background p-3" placeholder="Message" /><button className="rounded-md bg-primary px-5 py-3 font-semibold text-white">Send Message</button></form></StaticPage>;
}

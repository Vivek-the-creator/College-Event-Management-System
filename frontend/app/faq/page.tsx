import { StaticPage } from '@/components/marketplace/static-page';

export default function FaqPage() {
  return <StaticPage title="FAQ">{['How do I track an order?', 'How do vendors get approved?', 'Which payment methods are supported?', 'Can I request a return?'].map((question) => <details key={question} className="rounded-md border border-border bg-card p-4"><summary className="cursor-pointer font-semibold">{question}</summary><p className="mt-3">Use the relevant dashboard section after logging in. Admins can configure policies and CMS copy later.</p></details>)}</StaticPage>;
}

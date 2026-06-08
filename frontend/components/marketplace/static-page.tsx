import { Shell } from '@/components/layout/shell';

export function StaticPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Shell>
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <div className="mt-6 grid gap-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{children}</div>
      </div>
    </Shell>
  );
}

import { Shell } from '@/components/layout/shell';

export function OperationalPage({
  title,
  description,
  actions,
  rows
}: {
  title: string;
  description: string;
  actions?: string[];
  rows?: string[];
}) {
  return (
    <Shell>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-semibold">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
          </div>
          <button className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white">{actions?.[0] ?? 'Create'}</button>
        </div>
        {actions?.length ? <div className="mt-5 flex flex-wrap gap-2">{actions.map((action) => <span key={action} className="rounded-md border border-border px-3 py-2 text-sm">{action}</span>)}</div> : null}
        <div className="mt-6 overflow-hidden rounded-md border border-border bg-card">
          {(rows ?? ['No records yet']).map((row) => (
            <div key={row} className="flex items-center justify-between border-b border-border p-4 last:border-b-0">
              <span className="text-sm">{row}</span>
              <div className="flex gap-2"><button className="text-sm font-semibold text-primary">View</button><button className="text-sm font-semibold">Edit</button></div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

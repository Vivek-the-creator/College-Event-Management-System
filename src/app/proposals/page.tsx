'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useSession } from '@/lib/auth-client';
import { Proposal } from '@/types';
import { Plus, FileText, ThumbsUp, ChevronRight, Loader2, X, Calendar, Users, DollarSign, MapPin } from 'lucide-react';

const CATEGORIES = ['Technical', 'Cultural', 'Sports', 'Workshop', 'Seminar', 'Hackathon', 'Community Service'];

const statusConfig: Record<string, { label: string; className: string }> = {
  DRAFT: { label: 'Draft', className: 'bg-slate-500/20 text-slate-400 border-slate-500/20' },
  SUBMITTED: { label: 'Submitted', className: 'bg-blue-500/20 text-blue-400 border-blue-500/20' },
  FACULTY_REVIEW: { label: 'In Review', className: 'bg-amber-500/20 text-amber-400 border-amber-500/20' },
  APPROVED: { label: 'Approved', className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' },
  PUBLISHED: { label: 'Published', className: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/20' },
  COMPLETED: { label: 'Completed', className: 'bg-slate-400/20 text-slate-300 border-slate-400/20' },
};

const categoryColors: Record<string, string> = {
  Technical: 'bg-blue-500/10 text-blue-400',
  Cultural: 'bg-pink-500/10 text-pink-400',
  Sports: 'bg-orange-500/10 text-orange-400',
  Workshop: 'bg-amber-500/10 text-amber-400',
  Seminar: 'bg-violet-500/10 text-violet-400',
  Hackathon: 'bg-cyan-500/10 text-cyan-400',
  'Community Service': 'bg-emerald-500/10 text-emerald-400',
};

const inputCls = 'w-full rounded-xl border border-white/8 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-white/20 focus:bg-white/8';
const labelCls = 'block text-xs font-medium text-slate-400 mb-1.5';

export default function ProposalsPage() {
  const { data: session } = useSession();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', category: 'Technical',
    expectedAudience: '100', budget: '1000',
    startDate: '', endDate: '', venue: '', status: 'SUBMITTED',
  });

  useEffect(() => {
    fetch('/api/events')
      .then((r) => r.json())
      .then((d) => { setProposals(d.proposals || []); setLoading(false); });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, expectedAudience: Number(form.expectedAudience), budget: Number(form.budget) }),
    });
    setSubmitting(false);
    if (!res.ok) { toast.error('Could not create proposal'); return; }
    const { proposal } = await res.json();
    setProposals((p) => [proposal, ...p]);
    setShowForm(false);
    setForm({ title: '', description: '', category: 'Technical', expectedAudience: '100', budget: '1000', startDate: '', endDate: '', venue: '', status: 'SUBMITTED' });
    toast.success('Proposal submitted!');
  }

  return (
    <div className="animate-fade-in p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Event Proposals</h1>
          <p className="mt-1 text-sm text-slate-500">Browse, submit, and track campus event proposals.</p>
        </div>
        {session?.user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            New Proposal
          </button>
        )}
      </div>

      {/* Create form */}
      {showForm && (
        <div className="mb-8 animate-slide-up overflow-hidden rounded-2xl border border-white/8 bg-slate-900/80">
          <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                <Plus className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">New Event Proposal</p>
                <p className="text-xs text-slate-500">Fill in the details below</p>
              </div>
            </div>
            <button onClick={() => setShowForm(false)} className="text-slate-500 hover:text-slate-300">
              <X className="h-4 w-4" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-5 p-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className={labelCls}>Event Title</label>
              <input className={inputCls} placeholder="e.g. AI Hackathon 2026" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="md:col-span-2">
              <label className={labelCls}>Description</label>
              <textarea className={`${inputCls} min-h-[80px] resize-none`} placeholder="Describe your event idea..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            </div>
            <div>
              <label className={labelCls}>Category</label>
              <select className={inputCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Venue</label>
              <input className={inputCls} placeholder="e.g. Innovation Lab, Auditorium" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} required />
            </div>
            <div>
              <label className={labelCls}>Expected Audience</label>
              <input type="number" className={inputCls} placeholder="100" value={form.expectedAudience} onChange={(e) => setForm({ ...form, expectedAudience: e.target.value })} required />
            </div>
            <div>
              <label className={labelCls}>Budget ($)</label>
              <input type="number" className={inputCls} placeholder="1000" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} required />
            </div>
            <div>
              <label className={labelCls}>Start Date</label>
              <input type="date" className={inputCls} value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required />
            </div>
            <div>
              <label className={labelCls}>End Date</label>
              <input type="date" className={inputCls} value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} required />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 pt-2 border-t border-white/5">
              <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-slate-200">
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60">
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : 'Submit Proposal'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Proposals list */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-52 animate-pulse rounded-2xl border border-white/5 bg-slate-900/50" />
          ))}
        </div>
      ) : proposals.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-slate-900/50 py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10">
            <FileText className="h-7 w-7 text-blue-400" />
          </div>
          <p className="font-semibold text-slate-200">No proposals yet</p>
          <p className="mt-1 text-sm text-slate-500">Be the first to submit a campus event idea.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {proposals.map((p) => {
            const status = statusConfig[p.status] ?? statusConfig.DRAFT;
            return (
              <div key={p.id} className="group flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-slate-900/50 transition-all duration-200 hover:border-white/10 hover:bg-slate-900/80 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20">
                <div className="flex-1 p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[p.category] ?? 'bg-slate-500/20 text-slate-400'}`}>
                      {p.category}
                    </span>
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${status.className}`}>
                      {status.label}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-100 line-clamp-1">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-500 line-clamp-2">{p.description}</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" />
                      {p.expectedAudience} attendees
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5" />
                      ${p.budget.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="truncate">{p.venue}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ThumbsUp className="h-3.5 w-3.5" />
                      {p.voteCount} votes
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 px-5 py-3">
                  <span className="text-xs text-slate-600">by {p.authorName}</span>
                  <Link href={`/proposals/${p.id}`} className="flex items-center gap-1 text-xs font-medium text-blue-400 transition-all hover:text-blue-300">
                    View details <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

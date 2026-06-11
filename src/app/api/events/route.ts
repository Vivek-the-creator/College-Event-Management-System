import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

const proposalSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string(),
  expectedAudience: z.number().int().positive(),
  budget: z.number().positive(),
  startDate: z.string(),
  endDate: z.string(),
  venue: z.string().min(3),
  status: z.string().default('DRAFT'),
});

export async function GET() {
  const proposals = await prisma.eventProposal.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { name: true } },
      _count: { select: { votes: true } },
    },
  });

  const formatted = proposals.map((p) => ({
    ...p,
    authorName: p.author.name,
    voteCount: p._count.votes,
    startDate: p.startDate.toISOString(),
    endDate: p.endDate.toISOString(),
    createdAt: p.createdAt.toISOString(),
  }));

  return NextResponse.json({ proposals: formatted });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = proposalSchema.parse(body);

    const proposal = await prisma.eventProposal.create({
      data: {
        title: parsed.title,
        description: parsed.description,
        category: parsed.category,
        expectedAudience: parsed.expectedAudience,
        budget: parsed.budget,
        startDate: new Date(parsed.startDate),
        endDate: new Date(parsed.endDate),
        venue: parsed.venue,
        status: parsed.status as any,
        authorId: session.user.id,
        attachments: [],
      },
      include: {
        author: { select: { name: true } },
        _count: { select: { votes: true } },
      },
    });

    return NextResponse.json({
      proposal: {
        ...proposal,
        authorName: proposal.author.name,
        voteCount: proposal._count.votes,
        startDate: proposal.startDate.toISOString(),
        endDate: proposal.endDate.toISOString(),
        createdAt: proposal.createdAt.toISOString(),
      },
    });
  } catch {
    return NextResponse.json({ message: 'Invalid proposal payload' }, { status: 400 });
  }
}

import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const proposal = await prisma.eventProposal.findUnique({
    where: { id },
    include: {
      author: { select: { name: true } },
      _count: { select: { votes: true } },
      comments: {
        orderBy: { createdAt: 'asc' },
        include: { user: { select: { name: true, role: true } } },
      },
      fundingContributions: {
        orderBy: { contributionDate: 'desc' },
        include: { contributor: { select: { name: true } } },
      },
    },
  });

  if (!proposal) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  const comments = proposal.comments.map((c) => ({
    id: c.id,
    content: c.content,
    proposalId: c.proposalId,
    userId: c.userId,
    authorName: c.user.name,
    authorRole: c.user.role,
    parentId: c.parentId,
    createdAt: c.createdAt.toISOString(),
  }));

  const funding = proposal.fundingContributions.map((f) => ({
    id: f.id,
    amount: f.amount,
    proposalId: f.proposalId,
    contributor: f.contributor.name,
    date: f.contributionDate.toISOString(),
  }));

  return NextResponse.json({
    proposal: {
      ...proposal,
      authorName: proposal.author.name,
      voteCount: proposal._count.votes,
      startDate: proposal.startDate.toISOString(),
      endDate: proposal.endDate.toISOString(),
      createdAt: proposal.createdAt.toISOString(),
      comments: undefined,
      fundingContributions: undefined,
    },
    comments,
    funding,
  });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const proposal = await prisma.eventProposal.findUnique({ where: { id } });
  if (!proposal) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  const isOwner = proposal.authorId === session.user.id;
  const isAdminOrFaculty = session.user.role === 'ADMIN' || session.user.role === 'FACULTY';

  if (!isOwner && !isAdminOrFaculty) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const updated = await prisma.eventProposal.update({
    where: { id },
    data: {
      ...(body.status && { status: body.status }),
      ...(body.title && { title: body.title }),
      ...(body.description && { description: body.description }),
    },
    include: { author: { select: { name: true } }, _count: { select: { votes: true } } },
  });

  return NextResponse.json({
    proposal: {
      ...updated,
      authorName: updated.author.name,
      voteCount: updated._count.votes,
      startDate: updated.startDate.toISOString(),
      endDate: updated.endDate.toISOString(),
      createdAt: updated.createdAt.toISOString(),
    },
  });
}

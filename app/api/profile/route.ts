import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    return NextResponse.json(user);
  } else {
    return NextResponse.json({ error: 'User not found' }, { status: 400 });
  }
}

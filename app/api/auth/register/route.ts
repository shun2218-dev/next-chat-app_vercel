import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const { email, password } = await req.json();
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  } else {    
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword: await hash(password, 12),
      },
    });
    return NextResponse.json(user);
  }
}

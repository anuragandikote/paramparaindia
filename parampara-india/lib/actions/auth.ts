"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

interface SignupInput {
  name: string;
  email: string;
  password: string;
}

export async function signup(data: SignupInput) {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existing) {
    return { success: false, error: "An account with this email already exists." };
  }

  const passwordHash = await bcrypt.hash(data.password, 12);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash,
      role: "ADMIN",
    },
  });

  return { success: true, userId: user.id };
}

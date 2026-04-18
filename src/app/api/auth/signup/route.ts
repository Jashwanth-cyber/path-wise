// app/api/register/route.ts (or wherever your file is)
import { prisma } from "../../../../../lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "../../../../../lib/validations"; 
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

   
    const validatedData = registerSchema.parse(body);
    const { name, email, password } = validatedData;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: name || email.split("@")[0], 
        email,
        password: hashedPassword,
      },
    });

   
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { 
        message: "User created successfully",
        user: userWithoutPassword 
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: "Validation failed", 
          issues: error.issues.map(e => ({ field: e.path[0], message: e.message })) 
        }, 
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
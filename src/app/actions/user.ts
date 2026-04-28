'use server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getUserById(id: string) {
    if (!id) return null;
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: { name: true, image: true, email: true },
        });
        return user;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return null;
    }
}

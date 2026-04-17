import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, ...profileData } = body;

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    const profile = await prisma.profile.upsert({
      where: { userId },
      update: {
        name: profileData.name,
        age: parseInt(profileData.age),
        location: profileData.location,
        educationLevel: profileData.educationLevel,
        stream: profileData.stream,
        secondaryStreams: profileData.secondaryStreams || [],
        academicPerformance: profileData.academicPerformance,
        skills: profileData.skills || [],
        careerGoal: profileData.careerGoal,
        timeCommitment: profileData.timeCommitment,
        resources: profileData.resources || [],
        languagePreference: profileData.languagePreference,
        budgetComfort: profileData.budgetComfort,
      },
      create: {
        userId,
        name: profileData.name,
        age: parseInt(profileData.age),
        location: profileData.location,
        educationLevel: profileData.educationLevel,
        stream: profileData.stream,
        secondaryStreams: profileData.secondaryStreams || [],
        academicPerformance: profileData.academicPerformance,
        skills: profileData.skills || [],
        careerGoal: profileData.careerGoal,
        timeCommitment: profileData.timeCommitment,
        resources: profileData.resources || [],
        languagePreference: profileData.languagePreference,
        budgetComfort: profileData.budgetComfort,
      },
    });

    return NextResponse.json({ success: true, profile });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
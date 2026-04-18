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

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ exists: false }, { status: 400 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    return NextResponse.json({ 
      exists: !!profile,
      profile: profile || null 
    });
  } catch (error: any) {
    console.error('Error checking profile:', error);
    return NextResponse.json({ exists: false }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
      You are an expert career counselor. Based on the following user profile, suggest 9 potential roles or career paths they could pursue. 
      Keep the role titles concise. Provide a short 1-sentence reason for each.
      
      User Profile:
      - Skills: ${data.skills?.join(', ') || 'N/A'}
      - Stream: ${data.stream || 'N/A'}
      - Goal: ${data.careerGoal || 'N/A'}
      - Time commitment: ${data.timeCommitment || 'N/A'}
      - Experience: ${data.academicPerformance || 'N/A'}

      Format your response exactly as a JSON array of objects with keys "title" and "reason", like this:
      [
        { "title": "Role Title", "reason": "Reasoning here only in 10 words" }
      ]
      Do not output any other text besides the JSON.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // extract json if it's wrapped in markdown
    const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const suggestions = JSON.parse(jsonStr);

    return NextResponse.json({ success: true, suggestions });
  } catch (error: any) {
    console.error('Error getting suggestions:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

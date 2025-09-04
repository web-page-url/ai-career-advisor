import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { message, studentProfile, conversationHistory } = await request.json();
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Generate AI-powered chat response using Gemini
    const response = await generateChatResponse(message, studentProfile, conversationHistory);
    
    return NextResponse.json({ 
      success: true, 
      response 
    });
  } catch (error) {
    console.error('Error processing chat request:', error);
    
    // Fallback to predefined responses if AI fails
    const fallbackResponse = generateFallbackChatResponse(await request.json());
    
    return NextResponse.json({
      success: true,
      response: fallbackResponse,
      warning: 'Using offline chat mode'
    });
  }
}

interface StudentProfile {
  education: string;
  skills: string[];
  interests: string[];
  strengths: string[];
  weaknesses: string[];
  careerGoals: string;
  experience: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

async function generateChatResponse(
  message: string,
  studentProfile: StudentProfile | null,
  conversationHistory: ChatMessage[]
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const profileContext = studentProfile ? `
Student Profile Context:
- Education: ${studentProfile.education}
- Skills: ${studentProfile.skills?.join(', ') || 'Not specified'}
- Interests: ${studentProfile.interests?.join(', ') || 'Not specified'}
- Strengths: ${studentProfile.strengths?.join(', ') || 'Not specified'}
- Career Goals: ${studentProfile.careerGoals || 'Not specified'}
- Experience: ${studentProfile.experience || 'Not specified'}
` : '';

  const conversationContext = conversationHistory?.length > 0 ? `
Previous Conversation:
${conversationHistory.slice(-3).map(msg => `${msg.role}: ${msg.content}`).join('\n')}
` : '';

  const prompt = `You are an expert AI Career Advisor helping students and professionals with career guidance. 

${profileContext}

${conversationContext}

Current Question: ${message}

Instructions:
- Provide helpful, personalized career advice based on the student's profile
- Keep responses concise but informative (2-3 sentences max)
- Be encouraging and supportive
- Focus on actionable advice
- If asked about salary, provide realistic ranges for 2025
- If asked about skills, suggest specific, in-demand skills
- If asked about timeline, provide realistic expectations
- Use a friendly, professional tone
- Don't use markdown formatting

Respond directly to their question:`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text().trim();
}

interface ChatRequestData {
  message: string;
  studentProfile?: StudentProfile;
  conversationHistory?: ChatMessage[];
}

function generateFallbackChatResponse(requestData: ChatRequestData): string {
  const { message } = requestData;
  const input = message.toLowerCase();
  
  if (input.includes('salary') || input.includes('pay')) {
    return "Based on current market trends, entry-level positions typically start at $50,000-70,000, with senior roles reaching $120,000+. Your specific salary will depend on location, company size, and your skill level.";
  }
  
  if (input.includes('skill') || input.includes('learn')) {
    return "I'd recommend focusing on in-demand skills like cloud computing, data analysis, and AI/ML. These technologies are growing rapidly and offer great career opportunities.";
  }
  
  if (input.includes('time') || input.includes('long')) {
    return "With consistent effort, you can expect to see significant progress in 6-12 months. Entry-level positions are often achievable within 12-18 months of focused learning and practice.";
  }
  
  if (input.includes('company') || input.includes('where')) {
    return "Consider targeting a mix of established companies and growing startups. Mid-size companies often offer the best learning opportunities and career growth potential.";
  }
  
  return "That's a great question! Based on your profile, I'd recommend focusing on building a strong portfolio, networking with professionals in your target field, and continuously updating your skills. Would you like specific advice on any of these areas?";
}
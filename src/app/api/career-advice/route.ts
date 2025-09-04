import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { StudentProfile, CareerRecommendation } from '../../page';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  let profile: StudentProfile;

  try {
    profile = await request.json();

    if (!profile.education || !profile.skills || !profile.interests || !profile.careerGoals) {
      return NextResponse.json(
        { error: 'Missing required profile fields' },
        { status: 400 }
      );
    }

    // Generate AI-powered recommendations using Gemini
    const recommendations = await generateAICareerRecommendations(profile);

    return NextResponse.json({
      success: true,
      recommendations
    });
  } catch (error) {
    console.error('Error processing career advice request:', error);

    // Check if it's a network error
    const isNetworkError = error instanceof Error &&
      (error.message.includes('fetch') || error.message.includes('network'));

    // Fallback to mock data if AI fails - only if profile was successfully parsed
    if (profile!) {
      const fallbackRecommendations = generateCareerRecommendations(profile);

      return NextResponse.json({
        success: true,
        recommendations: fallbackRecommendations,
        warning: isNetworkError
          ? 'Using offline recommendations due to network issues'
          : 'Using cached recommendations'
      }, { status: 200 });
    }

    // If profile parsing failed, return error
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
}

async function generateAICareerRecommendations(profile: StudentProfile): Promise<CareerRecommendation[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `You are an expert career advisor. Based on the following student profile, generate 5-6 personalized career recommendations.

Student Profile:
- Education: ${profile.education}
- Skills: ${profile.skills.join(', ')}
- Interests: ${profile.interests.join(', ')}
- Strengths: ${profile.strengths.join(', ')}
- Areas for Improvement: ${profile.weaknesses.join(', ')}
- Career Goals: ${profile.careerGoals}
- Experience: ${profile.experience}

Requirements:
- Return ONLY a valid JSON array of career recommendations
- Each recommendation must have this exact structure:
{
  "title": "Job Title",
  "match": 85,
  "description": "Brief description of the role",
  "whySuitable": "Why this career suits the student based on their profile",
  "keySkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "roadmap": [
    {
      "phase": "Phase Name",
      "duration": "3-4 months",
      "tasks": ["task1", "task2", "task3"],
      "skills": ["skill1", "skill2"]
    }
  ],
  "marketInsights": {
    "demand": "High/Medium/Low",
    "salaryRange": "$XX,000 - $XX,000",
    "growth": "XX% (Much faster than average)"
  }
}

- Match percentage should be 70-95% based on profile alignment
- Include 3-4 roadmap phases per career
- Use realistic salary ranges for 2025
- Focus on current market trends and emerging opportunities
- Consider the student's education level and experience

Return only the JSON array, no explanations or markdown.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const aiResponse = response.text();

  try {
    // Clean the response to ensure it's valid JSON
    const cleanedResponse = aiResponse
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const recommendations = JSON.parse(cleanedResponse);

    // Validate the structure
    if (!Array.isArray(recommendations)) {
      throw new Error('Invalid response format');
    }

    // Ensure each recommendation has required fields
    const validatedRecommendations = recommendations.map((rec: any) => ({
      title: rec.title || 'Career Opportunity',
      match: Math.min(Math.max(rec.match || 75, 70), 95),
      description: rec.description || 'Exciting career opportunity',
      whySuitable: rec.whySuitable || 'Great fit based on your profile',
      keySkills: Array.isArray(rec.keySkills) ? rec.keySkills.slice(0, 6) : ['Communication', 'Problem Solving'],
      roadmap: Array.isArray(rec.roadmap) ? rec.roadmap.slice(0, 4) : [
        {
          phase: 'Getting Started',
          duration: '2-3 months',
          tasks: ['Learn fundamentals', 'Build basic projects'],
          skills: ['Foundation Skills']
        }
      ],
      marketInsights: {
        demand: rec.marketInsights?.demand || 'High',
        salaryRange: rec.marketInsights?.salaryRange || '$50,000 - $80,000',
        growth: rec.marketInsights?.growth || '15% (Faster than average)'
      }
    }));

    return validatedRecommendations.slice(0, 4); // Limit to 4 recommendations

  } catch (parseError) {
    console.error('Failed to parse AI response:', parseError);
    console.log('Raw AI response:', aiResponse);
    throw new Error('Invalid AI response format');
  }
}

function generateCareerRecommendations(profile: StudentProfile): CareerRecommendation[] {
  // This is a mock implementation. In a real app, you'd integrate with Gemini AI or another LLM
  const recommendations: CareerRecommendation[] = [];

  // Analyze profile to determine suitable careers
  const hasCodeSkills = profile.skills.some(skill =>
    ['javascript', 'python', 'java', 'react', 'node', 'programming', 'coding'].some(tech =>
      skill.toLowerCase().includes(tech)
    )
  );

  const hasDesignSkills = profile.skills.some(skill =>
    ['design', 'ui', 'ux', 'figma', 'photoshop', 'creative'].some(design =>
      skill.toLowerCase().includes(design)
    )
  );

  const hasBusinessSkills = profile.skills.some(skill =>
    ['management', 'leadership', 'business', 'marketing', 'sales'].some(business =>
      skill.toLowerCase().includes(business)
    )
  );

  if (hasCodeSkills) {
    recommendations.push({
      title: "Full Stack Developer",
      match: 92,
      description: "Build end-to-end web applications using modern technologies like React, Node.js, and databases.",
      whySuitable: "Your programming skills and technical background make you an excellent fit for full-stack development. The field offers great growth opportunities and aligns with current market demands.",
      keySkills: ["JavaScript", "React", "Node.js", "Databases", "Git", "API Development"],
      roadmap: [
        {
          phase: "Foundation Building",
          duration: "3-4 months",
          tasks: [
            "Master JavaScript fundamentals",
            "Learn React and component-based architecture",
            "Understand HTTP and REST APIs",
            "Practice with Git version control"
          ],
          skills: ["JavaScript", "React", "Git", "HTML/CSS"]
        },
        {
          phase: "Backend Development",
          duration: "2-3 months",
          tasks: [
            "Learn Node.js and Express framework",
            "Understand database design (SQL/NoSQL)",
            "Build RESTful APIs",
            "Implement authentication systems"
          ],
          skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "JWT"]
        },
        {
          phase: "Full Stack Projects",
          duration: "3-4 months",
          tasks: [
            "Build 3-5 complete web applications",
            "Deploy applications to cloud platforms",
            "Implement testing strategies",
            "Create a professional portfolio"
          ],
          skills: ["Deployment", "Testing", "Cloud Services", "Portfolio Development"]
        },
        {
          phase: "Job Preparation",
          duration: "1-2 months",
          tasks: [
            "Practice coding interviews",
            "Network with developers",
            "Apply to positions",
            "Prepare for technical interviews"
          ],
          skills: ["Interview Skills", "Networking", "Problem Solving"]
        }
      ],
      marketInsights: {
        demand: "Very High",
        salaryRange: "$65,000 - $120,000",
        growth: "22% (Much faster than average)"
      }
    });

    recommendations.push({
      title: "Software Engineer",
      match: 88,
      description: "Design and develop software solutions for various platforms and industries.",
      whySuitable: "Your technical skills and problem-solving abilities are perfect for software engineering roles.",
      keySkills: ["Programming Languages", "Algorithms", "System Design", "Testing", "Debugging"],
      roadmap: [
        {
          phase: "Core Programming",
          duration: "4-5 months",
          tasks: [
            "Master data structures and algorithms",
            "Learn system design principles",
            "Practice coding challenges",
            "Understand software architecture"
          ],
          skills: ["Data Structures", "Algorithms", "System Design"]
        },
        {
          phase: "Specialization",
          duration: "3-4 months",
          tasks: [
            "Choose a specialization (web, mobile, backend)",
            "Build projects in chosen area",
            "Learn relevant frameworks and tools",
            "Contribute to open source projects"
          ],
          skills: ["Specialized Frameworks", "Open Source", "Project Management"]
        }
      ],
      marketInsights: {
        demand: "High",
        salaryRange: "$70,000 - $140,000",
        growth: "25% (Much faster than average)"
      }
    });
  }

  if (hasDesignSkills) {
    recommendations.push({
      title: "UX/UI Designer",
      match: 85,
      description: "Create intuitive and beautiful user experiences for digital products.",
      whySuitable: "Your creative skills and attention to detail make you ideal for UX/UI design roles.",
      keySkills: ["Figma", "User Research", "Prototyping", "Visual Design", "Usability Testing"],
      roadmap: [
        {
          phase: "Design Fundamentals",
          duration: "2-3 months",
          tasks: [
            "Learn design principles and theory",
            "Master Figma and design tools",
            "Study color theory and typography",
            "Understand user psychology"
          ],
          skills: ["Design Principles", "Figma", "Typography", "Color Theory"]
        },
        {
          phase: "UX Research & Strategy",
          duration: "3-4 months",
          tasks: [
            "Learn user research methods",
            "Practice creating user personas",
            "Design user journey maps",
            "Conduct usability testing"
          ],
          skills: ["User Research", "Personas", "Journey Mapping", "Testing"]
        }
      ],
      marketInsights: {
        demand: "High",
        salaryRange: "$55,000 - $110,000",
        growth: "13% (Faster than average)"
      }
    });
  }

  if (hasBusinessSkills) {
    recommendations.push({
      title: "Product Manager",
      match: 80,
      description: "Lead product development and strategy, bridging business and technical teams.",
      whySuitable: "Your leadership and business acumen make you well-suited for product management roles.",
      keySkills: ["Product Strategy", "Market Research", "Agile Methodologies", "Data Analysis", "Communication"],
      roadmap: [
        {
          phase: "Product Fundamentals",
          duration: "2-3 months",
          tasks: [
            "Learn product management frameworks",
            "Understand market research techniques",
            "Study successful product launches",
            "Practice writing PRDs"
          ],
          skills: ["Product Strategy", "Market Research", "Documentation"]
        }
      ],
      marketInsights: {
        demand: "High",
        salaryRange: "$80,000 - $150,000",
        growth: "19% (Much faster than average)"
      }
    });
  }

  // Default recommendations if no specific skills detected
  if (recommendations.length === 0) {
    recommendations.push({
      title: "Data Analyst",
      match: 75,
      description: "Analyze data to help organizations make informed business decisions.",
      whySuitable: "Your analytical thinking and attention to detail make you a good fit for data analysis roles.",
      keySkills: ["Excel", "SQL", "Python", "Data Visualization", "Statistics"],
      roadmap: [
        {
          phase: "Data Fundamentals",
          duration: "3-4 months",
          tasks: [
            "Learn Excel and Google Sheets advanced features",
            "Master SQL for data querying",
            "Understand basic statistics",
            "Practice data cleaning techniques"
          ],
          skills: ["Excel", "SQL", "Statistics", "Data Cleaning"]
        }
      ],
      marketInsights: {
        demand: "High",
        salaryRange: "$50,000 - $95,000",
        growth: "25% (Much faster than average)"
      }
    });

    recommendations.push({
      title: "Digital Marketing Specialist",
      match: 70,
      description: "Develop and execute digital marketing strategies across various online channels.",
      whySuitable: "Your communication skills and interest in technology make digital marketing a great fit.",
      keySkills: ["SEO", "Social Media", "Content Marketing", "Analytics", "PPC Advertising"],
      roadmap: [
        {
          phase: "Marketing Basics",
          duration: "2-3 months",
          tasks: [
            "Learn digital marketing fundamentals",
            "Understand SEO principles",
            "Practice content creation",
            "Study social media strategies"
          ],
          skills: ["SEO", "Content Creation", "Social Media"]
        }
      ],
      marketInsights: {
        demand: "High",
        salaryRange: "$45,000 - $85,000",
        growth: "10% (Faster than average)"
      }
    });
  }

  // Sort by match percentage
  return recommendations.sort((a, b) => b.match - a.match);
}
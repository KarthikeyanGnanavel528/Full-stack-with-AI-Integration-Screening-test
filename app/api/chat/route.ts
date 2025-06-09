import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "";

if (!GOOGLE_API_KEY) {
  console.error('SERVER ERROR: GOOGLE_API_KEY environment variable is not set. Please add it to your .env.local file.');
}

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json(); 

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    console.log("Received message from client:", message);
        
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text(); 

    console.log("AI response text:", text);

    
    return NextResponse.json({ text }, { status: 200 }); 
  } catch (error: any) {
    
    console.error('Error in API route when calling Gemini AI:', error);

    
    let clientErrorMessage = 'An internal server error occurred.';
    let statusCode = 500;

    if (error.response) {
      
      clientErrorMessage = `AI Service Error: ${error.message || 'Unknown API error'}. Check API key and model access.`;
      statusCode = error.status || 500;
      console.error('Full Google API Error Details:', {
        status: error.status,
        statusText: error.statusText,
        errorDetails: error.errorDetails,
      });
    } else if (error instanceof Error) {
      clientErrorMessage = `Server Error: ${error.message}`;
    }

    return NextResponse.json({ error: clientErrorMessage }, { status: statusCode });
  }
}
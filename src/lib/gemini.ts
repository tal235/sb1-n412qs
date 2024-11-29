import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = ''; // Add your Gemini API key here
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateResponse(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}
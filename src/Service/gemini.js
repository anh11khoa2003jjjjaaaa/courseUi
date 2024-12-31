import axios from 'axios';

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const API_KEY = "AIzaSyDULGqxBIPjMfqGZLD3KU21J5jLi6fHNAo";

export const generateChatResponse = async (message) => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: message }] }]
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data.contents[0].parts[0].text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Error: Unable to process the request.";
  }
};

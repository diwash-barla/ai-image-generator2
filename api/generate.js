import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {

const ai = new GoogleGenAI({
apiKey: process.env.GEMINI_API_KEY
});

const prompt = req.body.prompt;

const response = await ai.models.generateContent({
model: "gemini-3.1-flash-image-preview",
contents: prompt
});

for (const part of response.candidates[0].content.parts){

if(part.inlineData){

return res.json({
image: part.inlineData.data
});

}

}

}

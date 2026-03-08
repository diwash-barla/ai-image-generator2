import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" });
}

try {

const ai = new GoogleGenAI({
apiKey: process.env.GEMINI_API_KEY
});

const prompt = req.body?.prompt || "A futuristic glowing temple";

const response = await ai.models.generateContent({
model: "gemini-3.1-flash-image-preview",
contents: prompt
});

for (const part of response.candidates?.[0]?.content?.parts || []) {

if (part.inlineData) {

return res.json({
image: part.inlineData.data
});

}

}

return res.status(500).json({ error: "No image generated" });

} catch (error) {

return res.status(500).json({ error: error.message });

}

}

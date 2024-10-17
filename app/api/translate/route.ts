import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const { inputText, inputLang, outputLang } = await req.json();

  const prompt = `Translate the following text from ${inputLang} to ${outputLang}:
  ${inputText}`;

  const resp = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama3-8b-8192",
  });

  const outputText = resp.choices[0]?.message?.content || "";

  return NextResponse.json({ outputText });
}

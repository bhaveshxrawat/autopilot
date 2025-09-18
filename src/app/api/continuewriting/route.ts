import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { NextResponse } from "next/server";

const model = google("models/gemini-2.5-flash");

export async function POST(req: Request) {
  const { prompt: input } = await req.json();

  try {
    if (!input || input.trim().length === 0) {
      return NextResponse.json({
        error: "No input text provided",
        status: 400,
      });
    }

    const system = `
You are a writing assistant. 

RULES:
- DO NOT repeat or restate the input text in any way.
- Only continue writing from where the input left off.
- Match the same style, tone, and format (poem → poem, story → story, list → list).
- Write only the continuation, not a summary or paraphrase.
- Keep length between 50–70 words.
`;

    const prompt = `Here is the input text:
<<<
${input}
>>>

Now write the continuation ONLY:`;

    const result = streamText({
      model,
      system,
      prompt,
    });
    return result.toUIMessageStreamResponse();
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Uh Oh! Something didn't work";
    return NextResponse.json({ error: errorMessage, status: 503 });
  }
}

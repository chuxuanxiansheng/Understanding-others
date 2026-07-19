import { NextResponse } from "next/server";
import { questionSets } from "@/lib/questions";
import { createSession, saveAnswers } from "@/lib/db";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { setId, mode, guesserName, answers } = body;

    const set = questionSets[setId];
    if (!set) {
      return NextResponse.json({ error: "?????" }, { status: 404 });
    }

    const shareToken = crypto.randomBytes(12).toString("hex");
    const sessionId = await createSession(`${setId}:${mode}`, guesserName || "??", shareToken);
    await saveAnswers(answers, sessionId);

    return NextResponse.json({ sessionId });
  } catch (error) {
    console.error("??????", error);
    return NextResponse.json({ error: "????" }, { status: 500 });
  }
}

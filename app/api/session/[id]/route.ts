import { NextRequest, NextResponse } from "next/server";
import { questionSets } from "@/lib/questions";
import { getSession, getAnswers } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession(params.id);
    if (!session) {
      return NextResponse.json({ error: "?????" }, { status: 404 });
    }

    const [setId, mode] = session.set_mode.split(":");
    const set = questionSets[setId];
    if (!set) {
      return NextResponse.json({ error: "???????" }, { status: 404 });
    }

    const questions = set.questions.slice(0, set.modes[mode]?.count ?? 10).map((q, i) => ({
      id: q.id,
      index: i + 1,
      text: q.text,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      dimension: q.dimension,
    }));

    const answers = await getAnswers(params.id);

    return NextResponse.json({
      id: session.id,
      guesserName: session.guesser_name,
      setMode: mode,
      answers: answers.map((a: any) => ({
        questionId: a.question_id,
        chosen: a.chosen,
      })),
      questions,
    });
  } catch (error) {
    console.error("??????", error);
    return NextResponse.json({ error: "????" }, { status: 500 });
  }
}

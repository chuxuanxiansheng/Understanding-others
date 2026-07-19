import { NextRequest, NextResponse } from "next/server";
import { questionSets } from "@/lib/questions";
import { getSession, getAnswers, getCorrections } from "@/lib/db";

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

    const questions = set.questions.slice(0, set.modes[mode]?.count ?? 10);
    const answers = await getAnswers(params.id);
    const corrections = await getCorrections(params.id);

    const answerMap = Object.fromEntries(
      answers.map((a: any) => [a.question_id, a.chosen])
    );
    const correctionMap = Object.fromEntries(
      corrections.map((c: any) => [c.question_id, c])
    );

    const optionLabels: Record<string, string> = { A: "A", B: "B", C: "C", D: "D" };
    let correctCount = 0;

    const details = questions.map((q) => {
      const chosen = answerMap[q.id] || "A";
      const correction = correctionMap[q.id];
      const guessed = `${optionLabels[chosen]}. ${q[`option${chosen}` as keyof typeof q]}`;

      let isCorrect = false;
      let actual = "";
      let note = "";

      if (correction) {
        isCorrect = correction.is_correct;
        if (isCorrect) {
          actual = guessed;
        } else if (correction.corrected_to) {
          const ct = correction.corrected_to;
          actual = `${optionLabels[ct]}. ${q[`option${ct}` as keyof typeof q]}`;
        }
        note = correction.note || "";
      }

      if (isCorrect) correctCount++;

      return {
        question: {
          text: q.text,
          optionA: q.optionA,
          optionB: q.optionB,
          optionC: q.optionC,
          optionD: q.optionD,
          dimension: q.dimension,
        },
        guessed,
        actual,
        isCorrect,
        note,
      };
    });

    const dimMap: Record<string, { total: number; correct: number }> = {};
    details.forEach((d) => {
      const dim = d.question.dimension;
      if (!dimMap[dim]) dimMap[dim] = { total: 0, correct: 0 };
      dimMap[dim].total++;
      if (d.isCorrect) dimMap[dim].correct++;
    });

    const dimensionResults = Object.entries(dimMap).map(([dimension, data]) => ({
      dimension,
      total: data.total,
      correct: data.correct,
      accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
    }));

    return NextResponse.json({
      guesserName: session.guesser_name,
      totalQuestions: questions.length,
      correctCount,
      accuracy: questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0,
      dimensionResults,
      details,
    });
  } catch (error) {
    console.error("??????", error);
    return NextResponse.json({ error: "????" }, { status: 500 });
  }
}

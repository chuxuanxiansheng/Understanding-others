"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Question {
  id: string;
  index: number;
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  dimension: string;
}

interface SessionData {
  id: string;
  guesserName: string;
  setMode: string;
  answers: { questionId: string; chosen: string }[];
  questions: Question[];
}

export default function CorrectPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;
  const [data, setData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [corrections, setCorrections] = useState<Record<string, { isCorrect: boolean; correctedTo?: string; note?: string }>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/session/${sessionId}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { setLoading(false); });
  }, [sessionId]);

  if (loading) return <div className="text-center py-20 text-gray-500">加载中...</div>;
  if (!data) return <div className="text-center py-20">会话不存在或已过期</div>;

  const { questions, answers, guesserName } = data;
  const answerMap = Object.fromEntries(answers.map((a) => [a.questionId, a.chosen]));
  const current = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleCorrectness = (isCorrect: boolean) => {
    setCorrections((prev) => ({
      ...prev,
      [current.id]: { ...prev[current.id], isCorrect },
    }));
  };

  const handleActualAnswer = (option: string) => {
    setCorrections((prev) => ({
      ...prev,
      [current.id]: { ...prev[current.id], isCorrect: false, correctedTo: option },
    }));
  };

  const handleNote = (note: string) => {
    setCorrections((prev) => ({
      ...prev,
      [current.id]: { ...prev[current.id], note },
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/session/${sessionId}/correct`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          corrections: Object.entries(corrections).map(([questionId, c]) => ({
            questionId,
            isCorrect: c.isCorrect,
            correctedTo: c.correctedTo,
            note: c.note,
          })),
        }),
      });
      const result = await res.json();
      router.push(`/result/${result.sessionId}`);
    } catch {
      alert("提交失败，请重试");
      setSubmitting(false);
    }
  };

  const allReviewed = questions.every((q) => corrections[q.id] !== undefined);

  return (
    <div className="space-y-6 pt-4">
      <div className="text-center space-y-2 pb-2">
        <h1 className="text-xl font-bold">{guesserName} 猜了你的答案</h1>
        <p className="text-sm text-gray-500">看看她了解你多少，帮忙纠正吧！</p>
      </div>

      {/* Progress */}
      <div className="space-y-1">
        <div className="flex justify-between text-sm text-gray-500">
          <span>逐题校对</span>
          <span>{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="card space-y-5">
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-600 font-medium">
            {current.dimension}
          </span>
        </div>

        <p className="text-lg font-medium">{current.text}</p>

        {/* Guessed answer */}
        <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-200">
          <span className="text-xs font-medium text-yellow-700">{guesserName} 猜的是：</span>
          <span className="ml-2 font-semibold">
            {answerMap[current.id]}. {current[`option${answerMap[current.id]}` as keyof typeof current] as string}
          </span>
        </div>

        {/* Correct / Wrong */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">她猜对了吗？</p>
          <div className="flex gap-3">
            <button
              onClick={() => handleCorrectness(true)}
              className={`flex-1 p-3 rounded-xl border-2 text-center font-medium transition-all ${
                corrections[current.id]?.isCorrect === true
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-200 hover:border-green-300"
              }`}
            >
              ✓ 猜对了
            </button>
            <button
              onClick={() => handleCorrectness(false)}
              className={`flex-1 p-3 rounded-xl border-2 text-center font-medium transition-all ${
                corrections[current.id]?.isCorrect === false
                  ? "border-red-500 bg-red-50 text-red-700"
                  : "border-gray-200 hover:border-red-300"
              }`}
            >
              ✗ 猜错了
            </button>
          </div>
        </div>

        {/* Actual answer (if wrong) */}
        {corrections[current.id]?.isCorrect === false && (
          <div className="space-y-3 animate-fade-in">
            <p className="text-sm font-medium text-gray-600">那你实际的答案是？</p>
            <div className="space-y-2">
              {(["A", "B", "C", "D"] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => handleActualAnswer(key)}
                  className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                    corrections[current.id]?.correctedTo === key
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
                >
                  <span className="font-medium mr-2" style={{ color: "var(--primary)" }}>{key}</span>
                  {current[`option${key}` as keyof typeof current]}
                </button>
              ))}
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-500">补充说明（可选）</label>
              <input
                type="text"
                placeholder="比如：其实我选B是因为..."
                value={corrections[current.id]?.note || ""}
                onChange={(e) => handleNote(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none text-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="btn-secondary disabled:opacity-30"
        >
          ← 上一题
        </button>

        {currentIndex < questions.length - 1 && (
          <button
            onClick={() => setCurrentIndex((i) => i + 1)}
            className="btn-primary"
          >
            下一题 →
          </button>
        )}

        {currentIndex === questions.length - 1 && (
          <button
            onClick={handleSubmit}
            disabled={!allReviewed || submitting}
            className="btn-primary disabled:opacity-50"
          >
            {submitting ? "提交中..." : "完成校对！"}
          </button>
        )}
      </div>
    </div>
  );
}

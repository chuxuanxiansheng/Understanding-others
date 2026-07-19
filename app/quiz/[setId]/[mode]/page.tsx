"use client";

import { useState, useCallback } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { questionSets } from "@/lib/questions";

export default function QuizPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const setId = params.setId as string;
  const mode = params.mode as string;
  const name = searchParams.get("name") || "";

  const set = questionSets[setId];
  if (!set) return <div className="text-center py-20">题目不存在</div>;

  const questions = set.questions.slice(0, set.modes[mode]?.count ?? 10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const current = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;

  const handleSelect = useCallback((option: string) => {
    setAnswers((prev) => ({ ...prev, [current.id]: option }));
    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex((i) => i + 1), 200);
    }
  }, [current?.id, currentIndex, questions.length]);

  const goBack = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          setId,
          mode,
          guesserName: name || "好友",
          answers: Object.entries(answers).map(([questionId, chosen]) => ({
            questionId,
            chosen,
          })),
        }),
      });
      const data = await res.json();
      router.push(`/share/${data.sessionId}`);
    } catch {
      alert("提交失败，请重试");
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>{set.name}</span>
          <span>{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="card min-h-[300px] flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-600 font-medium">
              {current.dimension}
            </span>
            <span className="text-xs text-gray-400">第 {currentIndex + 1} 题</span>
          </div>

          <p className="text-lg font-medium leading-relaxed">{current.text}</p>

          <div className="space-y-3">
            {(["A", "B", "C", "D"] as const).map((key) => (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`option-btn ${answers[current.id] === key ? "selected" : ""}`}
              >
                <span className="font-medium mr-2" style={{ color: "var(--primary)" }}>{key}</span>
                {current[`option${key}` as keyof typeof current]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={goBack}
          disabled={currentIndex === 0}
          className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← 上一题
        </button>

        {currentIndex === questions.length - 1 && (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length || submitting}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "提交中..." : "完成！生成分享链接 →"}
          </button>
        )}
      </div>
    </div>
  );
}

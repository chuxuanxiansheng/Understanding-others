"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface ResultData {
  guesserName: string;
  totalQuestions: number;
  correctCount: number;
  accuracy: number;
  dimensionResults: {
    dimension: string;
    total: number;
    correct: number;
    accuracy: number;
  }[];
  details: {
    question: { text: string; optionA: string; optionB: string; optionC: string; optionD: string; dimension: string };
    guessed: string;
    actual: string;
    isCorrect: boolean;
    note?: string;
  }[];
}

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;
  const [data, setData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/session/${sessionId}/result`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [sessionId]);

  if (loading) return <div className="text-center py-20 text-gray-500">生成报告...</div>;
  if (!data) return <div className="text-center py-20">报告不存在</div>;

  const getAccuracyEmoji = (acc: number) => {
    if (acc >= 80) return "🏆";
    if (acc >= 60) return "👍";
    if (acc >= 40) return "🤔";
    return "💪";
  };

  const getAccuracyText = (acc: number) => {
    if (acc >= 80) return "你真的很懂她！";
    if (acc >= 60) return "你对她有不少了解！";
    if (acc >= 40) return "还在了解的路上~";
    return "看来需要多聊聊！";
  };

  return (
    <div className="space-y-6 pt-4">
      {/* Summary */}
      <div className="text-center space-y-4 pt-4">
        <div className="text-6xl">{getAccuracyEmoji(data.accuracy)}</div>
        <h1 className="text-2xl font-bold">了解程度报告</h1>
        <p className="text-gray-500">
          {data.guesserName} × 她的朋友
        </p>
      </div>

      {/* Score */}
      <div className="card text-center space-y-3">
        <div className="text-5xl font-bold" style={{ color: data.accuracy >= 60 ? "var(--correct)" : "var(--wrong)" }}>
          {data.accuracy}%
        </div>
        <p className="text-lg font-medium">{getAccuracyText(data.accuracy)}</p>
        <p className="text-sm text-gray-500">
          答对 {data.correctCount} / {data.totalQuestions} 题
        </p>
      </div>

      {/* Dimensions */}
      {data.dimensionResults.length > 0 && (
        <div className="card space-y-4">
          <h2 className="text-lg font-semibold">各维度分析</h2>
          <div className="space-y-3">
            {data.dimensionResults.map((dim) => (
              <div key={dim.dimension} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{dim.dimension}</span>
                  <span className="font-medium" style={{ color: dim.accuracy >= 60 ? "var(--correct)" : "var(--wrong)" }}>
                    {dim.accuracy}% ({dim.correct}/{dim.total})
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${dim.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail breakdown */}
      <div className="card space-y-4">
        <h2 className="text-lg font-semibold">逐题回顾</h2>
        <div className="space-y-4">
          {data.details.map((d, i) => {
            const guessedLabel = d.guessed;
            const actualLabel = d.actual;
            return (
              <div key={i} className={`p-4 rounded-xl border-2 ${d.isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                <div className="flex items-start gap-2">
                  <span className="text-lg">{d.isCorrect ? "✅" : "❌"}</span>
                  <div className="space-y-2 flex-1">
                    <p className="font-medium text-sm">{d.question.text}</p>
                    <div className="text-xs space-y-1">
                      <p className="text-yellow-700">
                        <span className="font-medium">她猜：</span>{guessedLabel}
                      </p>
                      <p className={d.isCorrect ? "text-green-700" : "text-red-700"}>
                        <span className="font-medium">实际：</span>{actualLabel}
                      </p>
                      {d.note && (
                        <p className="text-gray-500 italic mt-1">「{d.note}」</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="text-center space-y-3 pb-8">
        <button
          onClick={() => router.push("/")}
          className="btn-primary"
        >
          我也来测试一下 →
        </button>
        <p className="text-xs text-gray-400">
          邀请更多朋友一起来玩吧~
        </p>
      </div>
    </div>
  );
}

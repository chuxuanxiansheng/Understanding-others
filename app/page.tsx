"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questionSets } from "@/lib/questions";

export default function Home() {
  const router = useRouter();
  const [selectedSet, setSelectedSet] = useState("friendship");
  const [selectedMode, setSelectedMode] = useState("medium");
  const [name, setName] = useState("");

  const set = questionSets[selectedSet];
  if (!set) return null;

  const handleStart = () => {
    const params = new URLSearchParams();
    if (name.trim()) params.set("name", name.trim());
    router.push(`/quiz/${selectedSet}/${selectedMode}?${params.toString()}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 pt-8">
        <h1 className="text-4xl font-bold tracking-tight" style={{ color: "var(--primary)" }}>
          理解他人
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          选一套题，猜猜你的好朋友会怎么选。
          然后把链接发给她，看看你有多了解她！
        </p>
      </div>

      {/* Question Set Selection */}
      <div className="card space-y-4">
        <h2 className="text-xl font-semibold">选择题目</h2>
        {Object.entries(questionSets).map(([id, qs]) => (
          <button
            key={id}
            onClick={() => setSelectedSet(id)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
              selectedSet === id
                ? "border-pink-500 bg-pink-50 shadow-md"
                : "border-gray-200 hover:border-pink-300"
            }`}
          >
            <div className="font-semibold text-lg">{qs.name}</div>
            <div className="text-sm text-gray-500 mt-1">{qs.description}</div>
          </button>
        ))}
      </div>

      {/* Mode Selection */}
      <div className="card space-y-4">
        <h2 className="text-xl font-semibold">选择题量</h2>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(set.modes).map(([mode, info]) => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                selectedMode === mode
                  ? "border-pink-500 bg-pink-50 shadow-md"
                  : "border-gray-200 hover:border-pink-300"
              }`}
            >
              <div className="text-2xl mb-1">
                {mode === "easy" ? "🌱" : mode === "medium" ? "🌿" : "🌳"}
              </div>
              <div className="font-medium text-sm">{info.label.split("·")[0].trim()}</div>
              <div className="text-xs text-gray-400 mt-1">{info.count}题</div>
            </button>
          ))}
        </div>
      </div>

      {/* Name Input */}
      <div className="card space-y-3">
        <label className="block text-sm font-medium text-gray-600">
          你的昵称（可选）
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例如：小美"
          className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-all"
          maxLength={20}
        />
      </div>

      {/* Start Button */}
      <div className="text-center pb-8">
        <button onClick={handleStart} className="btn-primary text-lg px-10">
          开始答题
        </button>
        <p className="text-xs text-gray-400 mt-3">
          你将站在她的角度作答，然后分享链接让她来验证
        </p>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function SharePage() {
  const params = useParams();
  const sessionId = params.sessionId as string;
  const [copied, setCopied] = useState(false);
  const [link, setLink] = useState("");

  useEffect(() => {
    setLink(`${window.location.origin}/correct/${sessionId}`);
  }, [sessionId]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("复制失败，请手动复制");
    }
  };

  return (
    <div className="space-y-8 pt-12 text-center">
      <div className="text-5xl">🎉</div>
      <h1 className="text-2xl font-bold">答题完成！</h1>
      <p className="text-gray-600">
        把你的判断发给她，让她来验证你对不对~
      </p>

      <div className="card space-y-4">
        <label className="block text-sm font-medium text-gray-500">
          分享链接
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={link}
            className="flex-1 p-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-sm select-all"
          />
        </div>
        <button onClick={handleCopy} className="btn-primary w-full">
          {copied ? "✓ 已复制！" : "复制链接"}
        </button>
      </div>

      <div className="text-left card space-y-3 bg-pink-50 border-pink-100">
        <h3 className="font-semibold text-pink-700">接下来会发生什么？</h3>
        <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
          <li>把上面的链接发给你的好朋友</li>
          <li>她会看到你选的答案，标记哪些猜对、哪些猜错</li>
          <li>提交后，你会收到一份「了解程度报告」</li>
        </ol>
      </div>
    </div>
  );
}

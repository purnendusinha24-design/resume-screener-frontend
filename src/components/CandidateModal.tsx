import { useEffect, useState } from "react";

import type { Candidate } from "../types/candidate";

type Props = {
  candidate: Candidate;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const SALES_KEYWORDS = [
  "sales",
  "target",
  "revenue",
  "lead",
  "crm",
  "client",
  "business",
  "marketing",
  "phone",
  "email",
];

export default function CandidateModal({
  candidate,
  onClose,
  onPrev,
  onNext,
}: Props) {
  const [showRaw, setShowRaw] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  const reasons =
    typeof candidate.reasons === "string" && candidate.reasons.length
      ? candidate.reasons.split(";").map((r) => r.trim())
      : [];

  const highlightLine = (line: string) => {
    let html = line;
    SALES_KEYWORDS.forEach((word) => {
      const regex = new RegExp(`\\b(${word})\\b`, "gi");
      html = html.replace(
        regex,
        `<mark class="bg-yellow-200 px-1 rounded">$1</mark>`
      );
    });
    return html;
  };

  const resumeLines = candidate.rawText
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl max-h-[90vh] rounded-lg shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b px-6 py-4 flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold">{candidate.filename}</h2>
            <p className="text-sm text-gray-500">Score: {candidate.score}</p>
            <span
              className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded ${
                candidate.verdict === "HIRE"
                  ? "bg-green-100 text-green-700"
                  : candidate.verdict === "MAYBE"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {candidate.verdict}
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* Evaluation */}
          {reasons.length > 0 && (
            <>
              <h4 className="font-semibold mb-3">Evaluation Notes</h4>
              <ul className="space-y-3 mb-6">
                {reasons.map((r, i) => (
                  <li key={i}>
                    <p className="text-sm mb-1">{r}</p>
                    <div className="w-full h-2 bg-gray-200 rounded">
                      <div
                        className="h-2 bg-blue-500 rounded"
                        style={{ width: `${Math.min(100, 60 + i * 10)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Resume */}
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">Resume Content</h4>
            <button
              onClick={() => setShowRaw(!showRaw)}
              className="text-xs text-blue-600 underline"
            >
              {showRaw ? "Hide raw text" : "Show raw text"}
            </button>
          </div>

          {showRaw ? (
            <pre className="bg-gray-100 p-3 rounded text-xs whitespace-pre-wrap max-h-80 overflow-auto">
              {candidate.rawText}
            </pre>
          ) : (
            <div className="bg-gray-100 p-4 rounded text-sm space-y-2 max-h-80 overflow-auto">
              {resumeLines.map((line, i) => (
                <p
                  key={i}
                  className="text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: highlightLine(line) }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

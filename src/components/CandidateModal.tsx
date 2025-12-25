import { useEffect, useState } from "react";

type Candidate = {
  filename: string;
  score: number;
  verdict: string;
  reasons: string;
  rawText: string;
};

type Props = {
  candidate: Candidate;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function CandidateModal({
  candidate,
  onClose,
  onPrev,
  onNext,
}: Props) {

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
const [showRaw, setShowRaw] = useState(false);
  const reasons =
    typeof candidate.reasons === "string"
      ? candidate.reasons.split(";").map((r) => r.trim())
      : [];

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

const highlightLine = (line: string) => {
  let result = line;
  SALES_KEYWORDS.forEach((k) => {
    const regex = new RegExp(`\\b(${k})\\b`, "gi");
    result = result.replace(
      regex,
      `<mark class="bg-yellow-200 px-1 rounded">$1</mark>`
    );
  });
  return result;
};

const resumeLines = candidate.rawText
  .split("\n")
  .map((l) => l.trim())
  .filter((l) => l.length > 0);

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 border-b px-6 py-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold">{candidate.filename}</h2>
              <p className="text-sm text-gray-500">
                Score: {candidate.score}
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-black text-xl"
            >
              ✕
            </button>
          </div>

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

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* Evaluation */}
          <h4 className="font-semibold mb-2">Evaluation Notes</h4>

          <ul className="space-y-2 mb-4">
            {reasons.map((r, i) => (
              <li key={i}>
                <div className="text-sm mb-1">{r}</div>
                <div className="w-full h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-blue-500 rounded"
                    style={{ width: `${Math.min(100, 60 + i * 10)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>

          <hr className="my-4" />

const [showRaw, setShowRaw] = useState(false);

<button
  onClick={() => setShowRaw(!showRaw)}
  className="text-xs text-blue-600 underline mb-2"
>
  {showRaw ? "Hide raw text" : "Show raw text"}
</button>

{showRaw ? (
  <pre className="bg-gray-100 p-3 rounded text-xs whitespace-pre-wrap">
    {candidate.rawText}
  </pre>
) : (
  <div className="bg-gray-100 p-4 rounded text-sm space-y-2">
    {resumeLines.map((line, i) => (
      <p
        key={i}
        dangerouslySetInnerHTML={{ __html: highlightLine(line) }}
      />
    ))}
  </div>
)}

          {/* Resume */}
          <h4 className="font-semibold mb-2">Resume Content</h4>
          <div className="bg-gray-100 p-4 rounded text-sm space-y-2">
  {resumeLines.map((line, i) => (
    <p
      key={i}
      className="text-gray-800 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: highlightLine(line) }}
    />
  ))}
</div>

        </div>
      </div>
    </div>
  );
}

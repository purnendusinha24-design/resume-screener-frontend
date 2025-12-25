import { useEffect, useState } from "react";
import CandidateModal from "./CandidateModal";

type Candidate = {
  id: string;
  filename: string;
  score: number;
  verdict: string;
  reasons: string;
  rawText: string;
};

type Props = {
  batchId: string;
};

export default function CandidateTable({ batchId }: Props) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://resume-screener-backend-m6q4.onrender.com/batch/${batchId}/results`)
      .then((res) => res.json())
      .then((data) => setCandidates(data.rankedResumes));
  }, [batchId]);

  // 🔑 Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (candidates.length === 0) return;

      if (e.key === "ArrowDown") {
        setSelectedIndex((i) =>
          i === null ? 0 : Math.min(i + 1, candidates.length - 1)
        );
      }

      if (e.key === "ArrowUp") {
        setSelectedIndex((i) =>
          i === null ? 0 : Math.max(i - 1, 0)
        );
      }

      if (e.key === "Enter" && selectedIndex !== null) {
        // open modal — already handled by render
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [candidates, selectedIndex]);

  return (
    <>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Rank</th>
            <th className="p-3">Candidate</th>
            <th className="p-3">Score</th>
            <th className="p-3">Verdict</th>
          </tr>
        </thead>

        <tbody>
          {candidates.map((c, i) => (
            <tr
              key={c.id}
              onClick={() => setSelectedIndex(i)}
              className={`cursor-pointer ${
                selectedIndex === i
                  ? "bg-blue-50 ring-2 ring-blue-300"
                  : "hover:bg-gray-50"
              }`}
            >
              <td className="p-3">{i + 1}</td>
              <td className="p-3">{c.filename}</td>
              <td className="p-3">{c.score}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    c.verdict === "HIRE"
                      ? "bg-green-100 text-green-700"
                      : c.verdict === "MAYBE"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {c.verdict}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedIndex !== null && (
        <CandidateModal
          candidate={candidates[selectedIndex]}
          onClose={() => setSelectedIndex(null)}
          onPrev={() =>
            setSelectedIndex((i) => (i! > 0 ? i! - 1 : i))
          }
          onNext={() =>
            setSelectedIndex((i) =>
              i! < candidates.length - 1 ? i! + 1 : i
            )
          }
        />
      )}
    </>
  );
}

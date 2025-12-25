import { useEffect, useState } from "react";

export interface Candidate {
  rank: number;
  filename: string;
  score: number;
  verdict: string;
  reasons: string;
  createdAt: string;
}

export function useCandidates(batchId: string) {
  const [data, setData] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://resume-screener-backend-m6q4.onrender.com/batch/${batchId}/results`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.rankedResumes || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [batchId]);

  return { data, loading };
}

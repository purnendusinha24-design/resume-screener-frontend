import { useEffect, useState } from "react";
import type { Candidate } from "../types/candidate";

export function useCandidates(batchId: string) {
  const [data, setData] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!batchId) return;

    setLoading(true);

    fetch(`https://resume-screener-backend-m6q4.onrender.com/batch/${batchId}/results`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.rankedResumes || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [batchId]);

  return { data, loading };
}

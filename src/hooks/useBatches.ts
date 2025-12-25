import { useEffect, useState } from "react";

export type Batch = {
  id: string;
  role: string;
  createdAt: string;
};

export function useBatches() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://resume-screener-backend-m6q4.onrender.com/batch")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load batches");
        return res.json();
      })
      .then((data) => setBatches(data))
      .catch(() => setError("Failed to fetch batches"))
      .finally(() => setLoading(false));
  }, []);

  return { batches, loading, error };
}

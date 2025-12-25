import { useEffect, useState } from "react";
import CandidateTable from "../components/CandidateTable";
import { useBatches } from "../hooks/useBatches";

type Stats = {
  total: number;
  shortlisted: number;
  rejected: number;
  pending: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);

  const { batches, loading: batchesLoading } = useBatches();

  useEffect(() => {
    fetch("https://resume-screener-backend-m6q4.onrender.com/api/stats")
      .then((res) => res.json())
      .then(setStats)
      .catch(() => setError("Failed to load dashboard stats"));
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-xl font-bold mb-8">AI Resume Screener</h1>
        <nav className="space-y-4 text-sm">
          <p className="text-blue-400">Dashboard</p>
          <p className="text-gray-400">Candidates</p>
          <p className="text-gray-400">Upload Resume</p>
          <p className="text-gray-400">Settings</p>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Resumes" value={stats.total} />
            <StatCard title="Shortlisted" value={stats.shortlisted} />
            <StatCard title="Rejected" value={stats.rejected} />
            <StatCard title="Pending" value={stats.pending} />
          </div>
        )}

        {/* Batch selector */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Select Batch</label>

          {batchesLoading ? (
            <p className="text-gray-500">Loading batches...</p>
          ) : (
            <select
              className="border p-2 rounded w-72"
              value={selectedBatch ?? ""}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              <option value="">Select batch</option>
              {batches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.role} — {new Date(b.createdAt).toLocaleDateString()}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Candidate Table */}
        {selectedBatch ? (
          <CandidateTable batchId={selectedBatch} />
        ) : (
          <p className="text-gray-500">Select a batch to view candidates.</p>
        )}

        {error && <p className="mt-4 text-red-500">{error}</p>}
      </main>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

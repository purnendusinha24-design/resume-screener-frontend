import { useEffect, useState } from "react";

export default function UploadResume() {
  const [file, setFile] = useState<File | null>(null);
  const [batchId, setBatchId] = useState("");
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://resume-screener-backend-m6q4.onrender.com/batch")
      .then(res => res.json())
      .then(setBatches)
      .catch(() => setMessage("Failed to load batches"));
  }, []);

  const handleUpload = async () => {
    if (!file || !batchId) {
      setMessage("Please select a batch and a PDF file");
      return;
    }

    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("batchId", batchId);

    try {
      const res = await fetch(
        "https://resume-screener-backend-m6q4.onrender.com/resume/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      setMessage("✅ Resume uploaded successfully");
      setFile(null);
    } catch {
      setMessage("❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-lg">
      <h2 className="text-2xl font-semibold mb-6">Upload Resume</h2>

      {/* Batch Select */}
      <label className="block mb-2 font-medium">Select Batch</label>
      <select
        className="border p-2 rounded w-full mb-4"
        value={batchId}
        onChange={e => setBatchId(e.target.value)}
      >
        <option value="">Select batch</option>
        {batches.map(b => (
          <option key={b.id} value={b.id}>
            {b.role} — {new Date(b.createdAt).toLocaleDateString()}
          </option>
        ))}
      </select>

      {/* File Upload */}
      <label className="block mb-2 font-medium">Select PDF Resume</label>
      <input
        type="file"
        accept="application/pdf"
        onChange={e => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        disabled={loading}
        onClick={handleUpload}
        className={`w-full py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Uploading..." : "Upload Resume"}
      </button>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

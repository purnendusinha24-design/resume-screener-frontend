import { useState } from "react";

export default function UploadResume() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Upload Resume</h2>

      <div className="bg-white p-6 rounded shadow max-w-md">
        <label className="block mb-4 font-medium">
          Select PDF Resume
        </label>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="mb-4"
        />

        {file && (
          <p className="text-sm text-gray-600 mb-4">
            Selected: <strong>{file.name}</strong>
          </p>
        )}

        <button
          disabled={!file}
          className={`w-full py-2 rounded text-white ${
            file
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Upload Resume
        </button>
      </div>
    </div>
  );
}

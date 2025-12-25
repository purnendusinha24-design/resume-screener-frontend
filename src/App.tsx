import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";

const Placeholder = ({ title }: { title: string }) => (
  <div className="p-8 text-xl">{title} page coming soon</div>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/candidates" element={<Placeholder title="Candidates" />} />
      <Route path="/settings" element={<Placeholder title="Settings" />} />
      <Route path="/upload" element={<UploadResume />} />
    </Routes>
  );
}

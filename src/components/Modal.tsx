import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC key to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Focus trap
  useEffect(() => {
    const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
      "button, a, input, textarea, select"
    );
    focusable?.[0]?.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-lg shadow-lg p-6 relative animate-fadeIn"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          aria-label="Close modal"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}

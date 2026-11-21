"use client";

import { useEffect, useState } from "react";

type ToastProps = {
  type: "success" | "error";
  message: string;
  onClose: () => void;
};

export default function ToastCopy({ type, message, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2700);

    const closeTimer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div className="fixed right-4 top-4 z-[100] w-[calc(100%-2rem)] max-w-sm">
      <div
        className={`flex items-start gap-3 rounded-lg border px-4 py-3 shadow-lg transition-all duration-300 ease-out ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
        } ${
          isSuccess
            ? "border-green-500 bg-green-600 text-white"
            : "border-red-500 bg-red-600 text-white"
        }`}
      >
        <span className="mt-0.5 text-lg font-bold">
          {isSuccess ? "✓" : "✕"}
        </span>

        <p className="flex-1 text-sm font-medium leading-5">{message}</p>

        <button
          type="button"
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="text-lg leading-none opacity-80 transition-opacity hover:opacity-100"
        >
          ×
        </button>
      </div>
    </div>
  );
}

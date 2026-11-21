"use client";

import { useCallback, useState } from "react";

import Toast from "@/components/feedback/Toast";
import { ToastContext } from "./ToastContext";





type Toast = {
  type: "success" | "error";
  message: string;
};

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback(
    (message: string, type: "success" | "error") => {
      setToast({
        message,
        type,
      });
    },
    [],
  );

  const handleClose = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={handleClose}
        />
      )}
    </ToastContext.Provider>
  );
}

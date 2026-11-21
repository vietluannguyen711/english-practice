"use client";

import { createContext } from "react";

type ToastContextType = {
  showToast: (message: string, type: "success" | "error") => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);


"use client";

import type { ReactNode } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

const positions = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "left-1/2 top-full mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
};

export default function Tooltip({
  content,
  children,
  position = "top",
}: TooltipProps) {
  return (
    <div className="group relative inline-flex">
      {children}

      <span
        role="tooltip"
        className={`pointer-events-none absolute z-30 w-max max-w-56 rounded-lg bg-slate-800 px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 ${positions[position]}`}
      >
        {content}
      </span>
    </div>
  );
}

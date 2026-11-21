
"use client";

import { useState } from "react";

export interface TabItem {
  label: string;
  value: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
}

export default function Tabs({ items, defaultValue }: TabsProps) {
  const [activeTab, setActiveTab] = useState(
    defaultValue ?? items[0]?.value
  );

  const activeItem = items.find((item) => item.value === activeTab);

  return (
    <div className="w-full">
      <div
        role="tablist"
        className="flex flex-wrap gap-1 border-b border-slate-200"
      >
        {items.map((item) => {
          const isActive = item.value === activeTab;

          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tab-panel-${item.value}`}
              disabled={item.disabled}
              onClick={() => setActiveTab(item.value)}
              className={`border-b-2 px-4 py-3 text-sm font-medium transition
                ${
                  isActive
                    ? "border-emerald-600 text-emerald-700"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }
                disabled:cursor-not-allowed disabled:opacity-40`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {activeItem && (
        <div
          id={`tab-panel-${activeItem.value}`}
          role="tabpanel"
          className="py-5 text-sm text-slate-700"
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
}

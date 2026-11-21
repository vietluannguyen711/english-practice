"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, MoreHorizontal } from "lucide-react";

export interface DropdownMenuItem {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    danger?: boolean;
}

interface DropdownMenuProps {
    items: DropdownMenuItem[];
    label?: string;
    align?: "left" | "right";
    iconOnly?: boolean;
}

export default function DropdownMenu({
    items,
    label = "Actions",
    align = "left",
    iconOnly = false,
}: DropdownMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <div ref={menuRef} className="relative inline-block">
            <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((previous) => !previous)}
                className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
                {iconOnly ? (
                    <MoreHorizontal size={20} />
                ) : (
                    <>
                        {label}
                        <ChevronDown
                            size={16}
                            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                    </>
                )}
            </button>

            {isOpen && (
                <div
                    role="menu"
                    className={`absolute z-20 mt-2 min-w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg ${
                        align === "right" ? "right-0" : "left-0"
                    }`}
                >
                    {items.map((item, index) => (
                        <button
                            key={`${item.label}-${index}`}
                            type="button"
                            role="menuitem"
                            disabled={item.disabled}
                            onClick={() => {
                                item.onClick();
                                setIsOpen(false);
                            }}
                            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition disabled:cursor-not-allowed disabled:opacity-40 ${
                                item.danger
                                    ? "text-red-600 hover:bg-red-50"
                                    : "text-slate-700 hover:bg-slate-50"
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

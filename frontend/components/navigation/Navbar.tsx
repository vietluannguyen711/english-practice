"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export interface NavbarItem {
    label: string;
    href: string;
}

interface NavbarProps {
    brand?: string;
    items: NavbarItem[];
    activeHref?: string;
    actionLabel?: string;
    actionHref?: string;
}

export default function Navbar({
    brand = "MyApp",
    items,
    activeHref,
    actionLabel,
    actionHref = "#",
}: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="relative w-full rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
                <Link
                    href="/"
                    className="shrink-0 text-xl font-bold text-emerald-700"
                >
                    {brand}
                </Link>

                <div className="hidden items-center gap-6 md:flex">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={
                                activeHref === item.href ? "page" : undefined
                            }
                            className={`text-sm font-medium transition ${
                                activeHref === item.href
                                    ? "text-emerald-700"
                                    : "text-slate-600 hover:text-emerald-600"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {actionLabel && (
                    <Link
                        href={actionHref}
                        className="hidden rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 md:inline-flex"
                    >
                        {actionLabel}
                    </Link>
                )}

                <button
                    type="button"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen((previous) => !previous)}
                    className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {isOpen && (
                <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-xl border border-slate-200 bg-white p-4 shadow-lg md:hidden">
                    <div className="flex flex-col gap-2">
                        {items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`rounded-lg px-3 py-2 text-sm font-medium ${
                                    activeHref === item.href
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "text-slate-600 hover:bg-slate-50"
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {actionLabel && (
                            <Link
                                href={actionHref}
                                onClick={() => setIsOpen(false)}
                                className="mt-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-700"
                            >
                                {actionLabel}
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

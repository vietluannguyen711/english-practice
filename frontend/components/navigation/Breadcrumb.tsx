import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    showHome?: boolean;
}

export default function Breadcrumb({
    items,
    showHome = true,
}: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
                {showHome && (
                    <>
                        <li>
                            <Link
                                href="/"
                                className="flex items-center gap-1 text-slate-500 transition hover:text-emerald-600"
                            >
                                <Home size={16} />
                                <span>Home</span>
                            </Link>
                        </li>

                        {items.length > 0 && (
                            <li aria-hidden="true">
                                <ChevronRight
                                    size={15}
                                    className="text-slate-400"
                                />
                            </li>
                        )}
                    </>
                )}

                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li
                            key={`${item.label}-${index}`}
                            className="flex items-center gap-2"
                        >
                            {isLast || !item.href ? (
                                <span
                                    aria-current={isLast ? "page" : undefined}
                                    className={
                                        isLast
                                            ? "font-medium text-slate-800"
                                            : "text-slate-500"
                                    }
                                >
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="text-slate-500 transition hover:text-emerald-600"
                                >
                                    {item.label}
                                </Link>
                            )}

                            {!isLast && (
                                <ChevronRight
                                    size={15}
                                    className="text-slate-400"
                                />
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

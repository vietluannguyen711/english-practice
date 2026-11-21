import type { ReactNode } from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon?: ReactNode;
    trend?: {
        value: string;
        direction: "up" | "down";
    };
}

export default function StatCard({
    title,
    value,
    description,
    icon,
    trend,
}: StatCardProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-slate-800">
                        {value}
                    </p>
                </div>

                {icon && (
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        {icon}
                    </div>
                )}
            </div>

            {(description || trend) && (
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                    {trend && (
                        <span
                            className={`font-semibold ${
                                trend.direction === "up"
                                    ? "text-emerald-600"
                                    : "text-red-600"
                            }`}
                        >
                            {trend.direction === "up" ? "↑" : "↓"} {trend.value}
                        </span>
                    )}

                    {description && (
                        <span className="text-slate-400">{description}</span>
                    )}
                </div>
            )}
        </div>
    );
}

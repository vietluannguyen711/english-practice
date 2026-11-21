import type { ReactNode } from "react";

interface CardProps {
    title?: string;
    description?: string;
    action?: ReactNode;
    children: ReactNode;
    padding?: "sm" | "md" | "lg";
}

const paddings = {
    sm: "p-4",
    md: "p-5",
    lg: "p-6",
};

export default function Card({
    title,
    description,
    action,
    children,
    padding = "md",
}: CardProps) {
    return (
        <section
            className={`rounded-xl border border-slate-200 bg-white shadow-sm ${paddings[padding]}`}
        >
            {(title || description || action) && (
                <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                    <div>
                        {title && (
                            <h2 className="text-lg font-semibold text-slate-800">
                                {title}
                            </h2>
                        )}

                        {description && (
                            <p className="mt-1 text-sm text-slate-500">
                                {description}
                            </p>
                        )}
                    </div>

                    {action}
                </div>
            )}

            {children}
        </section>
    );
}

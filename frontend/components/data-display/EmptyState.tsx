import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: ReactNode;
    action?: ReactNode;
}

export default function EmptyState({
    title,
    description,
    icon,
    action,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                {icon ?? <Inbox size={28} />}
            </div>

            <h3 className="text-base font-semibold text-slate-800">{title}</h3>

            {description && (
                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    {description}
                </p>
            )}

            {action && <div className="mt-5">{action}</div>}
        </div>
    );
}

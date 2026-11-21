import type { ReactNode } from "react";
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

interface AlertProps {
    title?: string;
    message: string;
    type?: "success" | "error" | "warning" | "info";
    onClose?: () => void;
    action?: ReactNode;
}

const styles = {
    success: {
        icon: CheckCircle,
        container: "border-emerald-200 bg-emerald-50",
        color: "text-emerald-700",
    },
    error: {
        icon: AlertCircle,
        container: "border-red-200 bg-red-50",
        color: "text-red-700",
    },
    warning: {
        icon: AlertTriangle,
        container: "border-amber-200 bg-amber-50",
        color: "text-amber-700",
    },
    info: {
        icon: Info,
        container: "border-sky-200 bg-sky-50",
        color: "text-sky-700",
    },
};

export default function Alert({
    title,
    message,
    type = "info",
    onClose,
    action,
}: AlertProps) {
    const config = styles[type];
    const Icon = config.icon;

    return (
        <div
            role={type === "error" ? "alert" : "status"}
            className={`flex gap-3 rounded-xl border p-4 ${config.container}`}
        >
            <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${config.color}`} />

            <div className="min-w-0 flex-1">
                {title && (
                    <h3 className={`text-sm font-semibold ${config.color}`}>
                        {title}
                    </h3>
                )}

                <p className={`text-sm ${title ? "mt-1" : ""} ${config.color}`}>
                    {message}
                </p>

                {action && <div className="mt-3">{action}</div>}
            </div>

            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close alert"
                    className={`shrink-0 rounded-md p-1 hover:bg-black/5 ${config.color}`}
                >
                    <X size={17} />
                </button>
            )}
        </div>
    );
}

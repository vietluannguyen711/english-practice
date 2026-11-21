"use client";

import { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from "lucide-react";

interface ToastProps {
    message: string;
    type?: "success" | "error" | "warning" | "info";
    duration?: number;
    onClose: () => void;
}

const styles = {
    success: {
        icon: CheckCircle,
        color: "text-emerald-600",
        background: "bg-emerald-50",
    },
    error: {
        icon: AlertCircle,
        color: "text-red-600",
        background: "bg-red-50",
    },
    warning: {
        icon: AlertTriangle,
        color: "text-amber-600",
        background: "bg-amber-50",
    },
    info: {
        icon: Info,
        color: "text-sky-600",
        background: "bg-sky-50",
    },
};

export default function Toast({
    message,
    type = "success",
    duration = 3000,
    onClose,
}: ToastProps) {
    const config = styles[type];
    const Icon = config.icon;

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const showTimer = setTimeout(() => setIsVisible(true), 10);

        const hideTimer = setTimeout(() => setIsVisible(false), duration - 300);

        const closeTimer = setTimeout(onClose, duration);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
            clearTimeout(closeTimer);
        };
    }, [duration, onClose]);

    return (
        <div className="fixed right-4 top-4 z-[100] w-[calc(100%-2rem)] max-w-sm">
            <div
                role={type === "error" ? "alert" : "status"}
                className={`flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-lg transition-all duration-300 ease-out ${
                    isVisible
                        ? "translate-x-0 opacity-100"
                        : "translate-x-8 opacity-0"
                }`}
            >
                <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${config.background} ${config.color}`}
                >
                    <Icon size={20} />
                </div>

                <p className="flex-1 text-sm font-medium text-slate-700">
                    {message}
                </p>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close notification"
                    className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}

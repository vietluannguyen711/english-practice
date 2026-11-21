interface ProgressBarProps {
    value: number;
    size?: "sm" | "md" | "lg";
    variant?: "success" | "warning" | "info";
    showLabel?: boolean;
    label?: string;
}

const sizes = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
};

const variants = {
    success: "bg-emerald-600",
    warning: "bg-amber-500",
    info: "bg-sky-500",
};

export default function ProgressBar({
    value,
    size = "md",
    variant = "success",
    showLabel = true,
    label,
}: ProgressBarProps) {
    const progress = Math.min(100, Math.max(0, value));

    return (
        <div className="w-full space-y-2">
            {(showLabel || label) && (
                <div className="flex items-center justify-between gap-3">
                    {label && (
                        <span className="text-sm font-medium text-slate-700">
                            {label}
                        </span>
                    )}

                    {showLabel && (
                        <span className="text-sm font-semibold text-slate-700">
                            {progress}%
                        </span>
                    )}
                </div>
            )}

            <div
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                className={`w-full overflow-hidden rounded-full bg-slate-100 ${sizes[size]}`}
            >
                <div
                    className={`h-full rounded-full transition-all duration-300 ${variants[variant]}`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}

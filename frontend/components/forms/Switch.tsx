import type { InputHTMLAttributes } from "react";

interface SwitchProps extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "id" | "type"
> {
    id: string;
    label: string;
    description?: string;
}

export default function Switch({
    id,
    label,
    description,
    disabled,
    className = "",
    ...props
}: SwitchProps) {
    return (
        <label
            htmlFor={id}
            className={`flex items-center justify-between gap-4 ${
                disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            } ${className}`}
        >
            <div className="min-w-0">
                <p className="text-sm font-medium text-slate-700">{label}</p>

                {description && (
                    <p className="mt-1 text-xs text-slate-500">{description}</p>
                )}
            </div>

            <span className="relative inline-flex shrink-0">
                <input
                    {...props}
                    id={id}
                    type="checkbox"
                    role="switch"
                    disabled={disabled}
                    className="peer sr-only"
                />

                <span
                    className="
          h-6 w-11 rounded-full bg-slate-300
          transition-colors
          peer-checked:bg-emerald-600
          peer-focus-visible:ring-2
          peer-focus-visible:ring-emerald-500
          peer-focus-visible:ring-offset-2
          peer-disabled:cursor-not-allowed
        "
                />

                <span
                    className="
          pointer-events-none absolute left-0.5 top-0.5
          h-5 w-5 rounded-full bg-white shadow-sm
          transition-transform
          peer-checked:translate-x-5
        "
                />
            </span>
        </label>
    );
}

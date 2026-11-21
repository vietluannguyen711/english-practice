import type { InputHTMLAttributes } from "react";

interface CheckboxProps extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "id" | "type"
> {
    id: string;
    label: string;
    helperText?: string;
    error?: string;
}

export default function Checkbox({
    id,
    label,
    helperText,
    error,
    className = "",
    disabled,
    ...props
}: CheckboxProps) {
    return (
        <div className="space-y-1.5">
            <label
                htmlFor={id}
                className={`flex items-start gap-3 ${
                    disabled
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer"
                }`}
            >
                <input
                    id={id}
                    type="checkbox"
                    disabled={disabled}
                    aria-invalid={!!error}
                    aria-describedby={
                        error
                            ? `${id}-error`
                            : helperText
                              ? `${id}-helper`
                              : undefined
                    }
                    className={`
            mt-0.5 h-4 w-4 shrink-0 cursor-pointer
            rounded border-slate-300 accent-emerald-600
            focus:ring-2 focus:ring-emerald-100
            disabled:cursor-not-allowed
            ${className}
          `}
                    {...props}
                />

                <span className="text-sm font-medium text-slate-700">
                    {label}
                </span>
            </label>

            {error ? (
                <p id={`${id}-error`} className="pl-7 text-xs text-red-600">
                    {error}
                </p>
            ) : helperText ? (
                <p id={`${id}-helper`} className="pl-7 text-xs text-slate-500">
                    {helperText}
                </p>
            ) : null}
        </div>
    );
}

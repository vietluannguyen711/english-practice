import type { InputHTMLAttributes } from "react";

interface DatePickerProps extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "id" | "type"
> {
    id: string;
    label?: string;
    helperText?: string;
    error?: string;
}

export default function DatePicker({
    id,
    label,
    helperText,
    error,
    className = "",
    ...props
}: DatePickerProps) {
    return (
        <div className="w-full space-y-1.5">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-slate-700"
                >
                    {label}
                    {props.required && (
                        <span className="ml-1 text-red-500">*</span>
                    )}
                </label>
            )}

            <input
                {...props}
                id={id}
                type="date"
                aria-invalid={!!error}
                aria-describedby={
                    error
                        ? `${id}-error`
                        : helperText
                          ? `${id}-helper`
                          : undefined
                }
                className={`
          h-10 w-full rounded-lg border bg-white px-3
          text-sm text-slate-800 outline-none transition-all
          disabled:cursor-not-allowed disabled:bg-slate-100
          disabled:text-slate-400
          ${
              error
                  ? "border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          }
          ${className}
        `}
            />

            {error ? (
                <p id={`${id}-error`} className="text-xs text-red-600">
                    {error}
                </p>
            ) : helperText ? (
                <p id={`${id}-helper`} className="text-xs text-slate-500">
                    {helperText}
                </p>
            ) : null}
        </div>
    );
}

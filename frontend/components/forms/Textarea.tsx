import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    id: string;
    label?: string;
    helperText?: string;
    error?: string;
}

export default function Textarea({
    id,
    label,
    helperText,
    error,
    className = "",
    ...props
}: TextareaProps) {
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

            <textarea
                id={id}
                aria-invalid={!!error}
                aria-describedby={
                    error
                        ? `${id}-error`
                        : helperText
                          ? `${id}-helper`
                          : undefined
                }
                className={`
          min-h-24 w-full resize-y rounded-lg border
          bg-white px-3 py-2.5 text-sm text-slate-800
          outline-none transition-all
          placeholder:text-slate-400
          disabled:cursor-not-allowed disabled:bg-slate-100
          disabled:text-slate-400
          ${
              error
                  ? "border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          }
          ${className}
        `}
                {...props}
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

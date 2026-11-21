import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps extends Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "id"
> {
    id: string;
    label?: string;
    placeholder?: string;
    helperText?: string;
    error?: string;
    options: SelectOption[];
}

export default function Select({
    id,
    label,
    placeholder = "Select an option",
    helperText,
    error,
    options,
    className = "",
    ...props
}: SelectProps) {
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

            <div className="relative">
                <select
                    id={id}
                    aria-invalid={!!error}
                    aria-describedby={
                        error
                            ? `${id}-error`
                            : helperText
                              ? `${id}-helper`
                              : undefined
                    }
                    defaultValue=""
                    className={`
    h-10 w-full appearance-none rounded-lg border
    bg-white pl-3 pr-10 text-sm text-slate-800
    outline-none transition-all
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
                >
                    <option value="" disabled className="text-slate-400">
                        {placeholder}
                    </option>

                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            className="text-slate-800"
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

                <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
            </div>

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

import type { InputHTMLAttributes } from "react";

interface RadioOption {
    label: string;
    value: string;
    disabled?: boolean;
}

interface RadioGroupProps {
    id: string;
    name: string;
    label?: string;
    options: RadioOption[];
    helperText?: string;
    error?: string;
    direction?: "horizontal" | "vertical";
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
}

export default function RadioGroup({
    id,
    name,
    label,
    options,
    helperText,
    error,
    direction = "vertical",
    value,
    defaultValue,
    disabled,
    onChange,
}: RadioGroupProps) {
    return (
        <fieldset
            disabled={disabled}
            className="w-full space-y-3"
            aria-describedby={
                error ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
        >
            {label && (
                <legend className="text-sm font-medium text-slate-700">
                    {label}
                </legend>
            )}

            <div
                className={
                    direction === "horizontal"
                        ? "flex flex-wrap gap-x-6 gap-y-3"
                        : "flex flex-col gap-3"
                }
            >
                {options.map((option) => (
                    <label
                        key={option.value}
                        className={`flex items-center gap-2.5 ${
                            disabled || option.disabled
                                ? "cursor-not-allowed opacity-50"
                                : "cursor-pointer"
                        }`}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={
                                value !== undefined
                                    ? value === option.value
                                    : undefined
                            }
                            defaultChecked={
                                value === undefined
                                    ? defaultValue === option.value
                                    : undefined
                            }
                            disabled={option.disabled}
                            onChange={onChange}
                            className="h-4 w-4 shrink-0 cursor-pointer accent-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed"
                        />

                        <span className="text-sm text-slate-700">
                            {option.label}
                        </span>
                    </label>
                ))}
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
        </fieldset>
    );
}

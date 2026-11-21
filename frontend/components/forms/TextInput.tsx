import { Eye, EyeOff, LucideIcon } from "lucide-react";
import Link from "next/link";
import type {
    Dispatch,
    InputHTMLAttributes,
    SetStateAction
} from "react";

interface TextInputProps extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "id"
> {
    id: string;
    label?: string;
    helperText?: string;
    error?: string;
    icon?: LucideIcon;
    setShowPassword?: Dispatch<SetStateAction<boolean>>;
    setShowConfirmPassword?: Dispatch<SetStateAction<boolean>>;
    showPassword?: boolean;
    showConfirmPassword?: boolean;
    isSignUp?: boolean;
}

export default function TextInput({
    id,
    label,
    helperText,
    error,
    icon: Icon,
    setShowPassword,
    setShowConfirmPassword,
    showPassword,
    showConfirmPassword,
    isSignUp,
    className = "",
    ...props
}: TextInputProps) {
    return (
        <div className="w-full space-y-1.5">
            {label && (
                <div className="flex justify-between">
                    <label
                        htmlFor={id}
                        className="block text-sm font-medium text-slate-700"
                    >
                        {label}
                        {props.required && (
                            <span className="ml-1 text-red-500">*</span>
                        )}
                    </label>
                    {id === "password" && !isSignUp && (
                        <Link
                            href="/forgot-password"
                            className="text-xs font-medium text-emerald-700 hover:text-emerald-800"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>
            )}

            <div className="relative">
                {Icon && (
                    <Icon
                        size={18}
                        className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
                    />
                )}
                <input
                    id={id}
                    aria-invalid={!!error}
                    aria-describedby={
                        error
                            ? `${id}-error`
                            : helperText
                              ? `${id}-helper`
                              : undefined
                    }
                    className={`h-10 w-full rounded-lg border bg-white px-10 text-sm text-slate-800 transition-all outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 ${error ? "border-red-500 focus:ring-2 focus:ring-red-100" : "border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"} ${className} `}
                    {...props}
                />

                {id == "password" && (
                    <>
                        <button
                            type="button"
                            onClick={() => setShowPassword?.((value) => !value)}
                            aria-label={
                                showPassword ? "Hide password" : "Show password"
                            }
                            className="absolute top-1/2 right-3.5 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </>
                )}

                {id == "confirmPassword" && (
                    <>
                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword?.((value) => !value)
                            }
                            aria-label={
                                showConfirmPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                            className="absolute top-1/2 right-3.5 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </>
                )}
            </div>
            {error ? (
                <p id={`${id}-error`} className="text-xs text-red-600">
                    {error}
                </p>
            ) : helperText ? (
                <p id={`${id}-helper`} className="text-xs text-slate-500">
                    {isSignUp && helperText}
                </p>
            ) : null}
        </div>
    );
}

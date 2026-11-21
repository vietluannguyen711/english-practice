import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
    primary:
        "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500",
    secondary:
        "bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:ring-slate-400",
    outline:
        "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-emerald-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
};

const sizes: Record<ButtonSize, string> = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-5 text-base",
};

export default function Button({
    variant = "primary",
    size = "md",
    loading = false,
    leftIcon,
    rightIcon,
    disabled,
    children,
    className = "",
    type = "button",
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            type={type}
            disabled={disabled || loading}
            className={`
        inline-flex items-center justify-center gap-2
        rounded-lg font-medium transition-colors
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-50
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
        >
            {loading ? (
                <Loader2 size={16} className="animate-spin" />
            ) : (
                leftIcon
            )}

            {children}

            {!loading && rightIcon}
        </button>
    );
}

interface SkeletonProps {
    variant?: "text" | "circular" | "rectangular";
    width?: string;
    height?: string;
    className?: string;
}

export default function Skeleton({
    variant = "rectangular",
    width,
    height,
    className = "",
}: SkeletonProps) {
    const shapes = {
        text: "h-4 rounded",
        circular: "rounded-full",
        rectangular: "rounded-xl",
    };

    return (
        <div
            aria-hidden="true"
            className={`animate-pulse bg-slate-200 ${shapes[variant]} ${className}`}
            style={{ width, height }}
        />
    );
}

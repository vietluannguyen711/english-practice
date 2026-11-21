interface AvatarProps {
    name: string;
    src?: string;
    size?: "sm" | "md" | "lg";
    status?: "online" | "offline";
}

const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
};

export default function Avatar({
    name,
    src,
    size = "md",
    status,
}: AvatarProps) {
    const initials = name
        .trim()
        .split(/\s+/)
        .slice(-2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();

    return (
        <div className="relative inline-flex shrink-0">
            {src ? (
                <img
                    src={src}
                    alt={name}
                    className={`${sizes[size]} rounded-full object-cover`}
                />
            ) : (
                <div
                    aria-label={name}
                    className={`${sizes[size]} flex items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700`}
                >
                    {initials}
                </div>
            )}

            {status && (
                <span
                    aria-label={status}
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                        status === "online" ? "bg-emerald-500" : "bg-slate-400"
                    }`}
                />
            )}
        </div>
    );
}

export default function Feature({
    icon,
    value,
}: {
    icon: React.ReactNode;
    value: string | number;
}) {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-2.5 py-1.5 text-xs text-slate-600">
            {icon}
            {value}
        </span>
    );
}

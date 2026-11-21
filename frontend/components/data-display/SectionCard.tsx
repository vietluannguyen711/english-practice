export default function SectionCard({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section
            className={`min-w-0 rounded-2xl border border-slate-200 bg-white p-5 ${className}`}
        >
            {children}
        </section>
    );
}

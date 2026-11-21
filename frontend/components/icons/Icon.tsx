type IconName =
    | "grid"
    | "home"
    | "search"
    | "bell"
    | "chevron"
    | "plus"
    | "check"
    | "close"
    | "menu"
    | "settings"
    | "user"
    | "file"
    | "calendar"
    | "chart"
    | "message"
    | "more"
    | "arrow"
    | "download"
    | "upload"
    | "lock"
    | "mail"
    | "eye"
    | "eyeOff"
    | "filter"
    | "edit"
    | "trash"
    | "external"
    | "help"
    | "clock"
    | "star"
    | "heart"
    | "cart"
    | "card"
    | "shield"
    | "globe"
    | "logout"
    | "hamburger"
    | "equipment"
    | "maintenance"
    | "repair"
    | "warranty";
export function Icon({
    name,
    size = 18,
    className,
}: {
    name: IconName;
    size?: number;
    className?: string;
}) {
    const common = {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
    };
    const paths: Record<IconName, React.ReactNode> = {
        grid: (
            <>
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </>
        ),
        home: (
            <>
                <path d="m3 10 9-7 9 7" />
                <path d="M5 9v12h14V9M9 21v-7h6v7" />
            </>
        ),
        search: (
            <>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
            </>
        ),
        bell: (
            <>
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                <path d="M10 21h4" />
            </>
        ),
        chevron: <path d="m9 18 6-6-6-6" />,
        plus: <path d="M12 5v14M5 12h14" />,
        check: <path d="m5 12 4 4L19 6" />,
        close: <path d="m18 6-12 12M6 6l12 12" />,
        menu: <path d="M4 6h16M4 12h16M4 18h16" />,
        settings: (
            <>
                <circle cx="12" cy="12" r="3" />
                <path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.6-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.6 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2Z" />
            </>
        ),
        user: (
            <>
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21a8 8 0 0 1 16 0" />
            </>
        ),
        file: (
            <>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6M8 13h8M8 17h8" />
            </>
        ),
        calendar: (
            <>
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path d="M8 2v4M16 2v4M3 10h18" />
            </>
        ),
        chart: (
            <>
                <path d="M3 3v18h18" />
                <path d="m7 14 4-4 3 3 6-7" />
            </>
        ),
        message: (
            <>
                <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3H13a8.5 8.5 0 0 1 8 8z" />
            </>
        ),
        more: (
            <>
                <circle cx="5" cy="12" r="1" />
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
            </>
        ),
        arrow: (
            <>
                <path d="M5 12h14M13 6l6 6-6 6" />
            </>
        ),
        download: (
            <>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </>
        ),
        upload: (
            <>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </>
        ),
        lock: (
            <>
                <rect x="4" y="10" width="16" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </>
        ),
        mail: (
            <>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
            </>
        ),
        eye: (
            <>
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
            </>
        ),
        eyeOff: (
            <>
                <path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a15 15 0 0 1-3 3.8M6.2 6.2C3.5 8 2 12 2 12s3.5 7 10 7a10 10 0 0 0 4-.8" />
            </>
        ),
        filter: (
            <>
                <path d="M4 5h16M7 12h10m-7 7h4" />
            </>
        ),
        edit: (
            <>
                <path d="m16 4 4 4L8 20H4v-4z" />
                <path d="m14 6 4 4" />
            </>
        ),
        trash: (
            <>
                <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6" />
            </>
        ),
        external: (
            <>
                <path d="M14 3h7v7M10 14 21 3" />
                <path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" />
            </>
        ),
        help: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M9.5 9a2.5 2.5 0 1 1 4.3 1.8c-1 .9-1.8 1.2-1.8 2.7M12 17h.01" />
            </>
        ),
        clock: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
            </>
        ),
        star: (
            <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z" />
        ),
        heart: (
            <path d="M20.8 8.8c0 5.5-8.8 11-8.8 11s-8.8-5.5-8.8-11A4.8 4.8 0 0 1 12 6.5a4.8 4.8 0 0 1 8.8 2.3Z" />
        ),
        cart: (
            <>
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
                <path d="M2 3h2l2.5 12h12L21 7H5" />
            </>
        ),
        card: (
            <>
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20M6 15h4" />
            </>
        ),
        shield: (
            <>
                <path d="M12 3 4 6v5c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z" />
                <path d="m9 12 2 2 4-4" />
            </>
        ),
        globe: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </>
        ),
        logout: (
            <>
                <path d="M10 17l5-5-5-5M15 12H3" />
                <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
            </>
        ),
        hamburger: (
            <>
                <path d="M4 6h16M4 12h16M4 18h16" />
            </>
        ),
        equipment: (
            <>
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M8 8h8v8H8z" />
            </>
        ),
        maintenance: (
            <>
                <path d="M8 2v4M16 2v4M3 10h18" />
                <rect x="3" y="4" width="18" height="17" rx="2" />
            </>
        ),
        repair: (
            <>
                <path d="M14.5 6.5a5 5 0 0 0-6.9 6.9L3 18l3 3 4.6-4.6a5 5 0 0 0 6.9-6.9L14 13l-3-3z" />
            </>
        ),
        warranty: (
            <>
                <path d="M12 3 3 7v5c0 5 3.8 8 9 9 5.2-1 9-4 9-9V7z" />
                <path d="m9 12 2 2 4-4" />
            </>
        ),
    };
    return <svg {...common}>{paths[name]}</svg>;
}

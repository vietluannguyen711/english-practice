import { Search, Menu, UserCircle } from "lucide-react";

interface HeaderProps {
  title?: string;
  breadcrumb?: React.ReactNode;
  onMenuClick?: () => void;
}

export default function Header({
  title,
  breadcrumb,
  onMenuClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700 lg:hidden"
        >
          <Menu size={21} />
        </button>

        {title && (
          <h1 className="truncate text-lg font-bold text-slate-800">{title}</h1>
        )}
        {breadcrumb && breadcrumb}
      </div>

      {/* Right */}
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        {/* Search */}
        <div className="relative w-36 sm:w-56 md:w-72">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            placeholder="Search components..."
            aria-label="Search components"
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* Profile */}
        <button
          type="button"
          aria-label="User profile"
          className="hidden rounded-xl p-2 text-slate-500 transition-colors hover:bg-amber-50 hover:text-amber-600 sm:block"
        >
          <UserCircle size={23} />
        </button>
      </div>
    </header>
  );
}

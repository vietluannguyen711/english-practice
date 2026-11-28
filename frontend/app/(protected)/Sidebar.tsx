"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  LayoutDashboard,
  Layout,
  Navigation,
  Table2,
  FormInput,
  MessageSquare,
  Layers,
  X,
  Home,
  LogIn,
  TableConfig,
  TablePropertiesIcon,
} from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
  className?: string;
}

const componentItems = [
  { label: "Layout", icon: Layout },
  { label: "Navigation", icon: Navigation },
  { label: "Data Display", icon: Table2 },
  { label: "Forms", icon: FormInput },
  { label: "Feedback", icon: MessageSquare },
];

export default function Sidebar({ onClose, className = "" }: SidebarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    if (!mounted) return false;

    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const linkClass = (href: string) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
      isActive(href)
        ? "bg-emerald-50 font-semibold text-emerald-700"
        : "font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
    }`;

  return (
    <aside className={`flex h-full w-64 flex-col border-r border-slate-200 bg-white ${className}`}>
      {/* Brand */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-600/20">
            <Layers size={21} />
          </div>

          <div>
            <p className="text-sm font-bold tracking-tight text-slate-900">Personal UI</p>
            <p className="text-xs text-slate-500">Component Library</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-7 overflow-y-auto px-3 py-6">
        <div>
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            General
          </p>

          <Link
            href="/"
            onClick={onClose}
            aria-current={isActive("/") ? "page" : undefined}
            className={linkClass("/")}
          >
            <LayoutDashboard size={19} />
            Overview
          </Link>
        </div>

        <div>
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Components
          </p>

          <div className="space-y-1">
            {componentItems.map((item) => {
              const Icon = item.icon;
              const href = `/components/${item.label.toLowerCase().replace(" ", "-")}`;

              return (
                <Link
                  key={item.label}
                  href={href}
                  onClick={onClose}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={linkClass(href)}
                >
                  <Icon size={19} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Collection
          </p>

          <div className="space-y-1">
            <Link
              href="/dashboard"
              onClick={onClose}
              aria-current={isActive("/dashboard") ? "page" : undefined}
              className={linkClass("/dashboard")}
            >
              <LayoutDashboard size={19} />
              Dashboard
            </Link>

            <Link
              href="/dashboardv1"
              onClick={onClose}
              aria-current={isActive("/dashboardv1") ? "page" : undefined}
              className={linkClass("/dashboardv1")}
            >
              <LayoutDashboard size={19} />
              DashboardV1
            </Link>

            <Link
              href="/properties"
              onClick={onClose}
              aria-current={isActive("/properties") ? "page" : undefined}
              className={linkClass("/properties")}
            >
              <TablePropertiesIcon size={19} />
              Properties
            </Link>
            <Link
              href="/home-management"
              onClick={onClose}
              aria-current={isActive("/home-management") ? "page" : undefined}
              className={linkClass("/home-management")}
            >
              <Home size={19} />
              Home Management
            </Link>

            <Link
              href="/login"
              onClick={onClose}
              aria-current={isActive("/login") ? "page" : undefined}
              className={linkClass("/login")}
            >
              <LogIn size={19} />
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-slate-100 bg-white px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <p className="text-xs font-medium text-slate-500">Personal UI Library</p>
        </div>

        <p className="mt-1 pl-4 text-xs text-slate-400">Version 1.0</p>
      </div>
    </aside>
  );
}

"use client";

import { getCurrentUser } from "@/app/actions/userAction";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserDropdownMenu from "../data-display/UserDropdownMenu";
import { logout } from "@/app/actions/authAction";
type UserProfile = {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
};
export default function Header() {
  const [user, setUser] = useState<UserProfile>();
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated" | "error">(
    "loading",
  );
  useEffect(() => {
    async function fetchCurrentUser() {
      const result = await getCurrentUser();
      if (result.success) {
        setUser(result.data);
        setStatus("authenticated");
      } else if (result.status === 401) {
        setUser(undefined);
        setStatus("unauthenticated");
      } else {
        setStatus("error");
      }
    }
    fetchCurrentUser();
  }, []);

  const displayName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "User";

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-700/20">
              <BookOpen size={23} />
            </span>
            <span>
              <span className="block text-base font-bold tracking-tight text-slate-900">
                English Practice
              </span>
              <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Learn every day
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 transition hover:text-emerald-700"
            >
              Tính năng
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 transition hover:text-emerald-700"
            >
              Cách học
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-slate-600 transition hover:text-emerald-700"
            >
              Về chúng tôi
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {status === "authenticated" && user ? (
              <UserDropdownMenu
                fullName={displayName}
                email={user.email}
                avatarUrl={user.avatar}
                onSignOut={logout}
              />
            ) : status === "unauthenticated" ? (
              <>
                <Link
                  href="/auth"
                  className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:inline-flex"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/auth"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-700/20 transition hover:bg-emerald-700"
                >
                  Bắt đầu học
                  <ArrowRight size={16} />
                </Link>
              </>
            ) : status === "error" ? (
              <span className="text-sm text-slate-500">Không thể tải thông tin tài khoản</span>
            ) : null}
          </div>
        </div>
      </header>
    </>
  );
}

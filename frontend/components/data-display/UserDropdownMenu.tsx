import { useState } from "react";
import {
  ArrowLeftRight,
  Smile,
  User,
  Book,
  Star,
  Code,
  Building2,
  Globe,
  Heart,
  Settings,
  Users,
  FlaskConical,
  Palette,
  Accessibility,
  Upload,
  LogOut,
} from "lucide-react";

interface UserDropdownMenuProps {
  fullName: string;
  username: string;
  avatarUrl?: string | null;
  onSignOut?: () => void;
}

const menuItems = [
  { label: "Profile", icon: User },
  { label: "Repositories", icon: Book },
  { label: "Stars", icon: Star },
  { label: "Gists", icon: Code },
  { label: "Organizations", icon: Building2 },
  { label: "Enterprises", icon: Globe },
  { label: "Sponsors", icon: Heart },
];

const settingsItems = [
  { label: "Settings", icon: Settings },
  { label: "Copilot settings", icon: Users },
  { label: "Feature preview", icon: FlaskConical },
  { label: "Appearance", icon: Palette },
  { label: "Accessibility", icon: Accessibility },
  { label: "Try Enterprise", icon: Upload },
];

// Generate initials from full name
function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "?";

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function UserDropdownMenu({
  fullName,
  username,
  avatarUrl,
  onSignOut,
}: UserDropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const showAvatar = avatarUrl && !imageError;
  const initials = getInitials(fullName);

  return (
    <div className="relative">
      {/* Avatar trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Open user menu"
        className="flex h-9 w-9 items-center justify-center
          overflow-hidden rounded-full border border-slate-200
          bg-emerald-50 transition hover:border-emerald-500"
      >
        {showAvatar ? (
          <img
            src={avatarUrl}
            alt={fullName}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-sm font-semibold text-emerald-700">{initials}</span>
        )}
      </button>

      {open && (
        <>
          {/* Click outside */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* Dropdown menu */}
          <div
            className="absolute right-0 top-11 z-50 w-72
            overflow-hidden rounded-xl border border-slate-200
            bg-white p-2 text-sm text-slate-700 shadow-lg"
          >
            {/* User information */}
            <div className="flex items-center gap-3 px-2 py-2">
              <div
                className="flex h-9 w-9 shrink-0
                items-center justify-center overflow-hidden
                rounded-full border border-slate-200 bg-emerald-50"
              >
                {showAvatar ? (
                  <img
                    src={avatarUrl}
                    alt={fullName}
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-semibold text-emerald-700">{initials}</span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-slate-800">{fullName}</p>
                <p className="truncate text-xs text-slate-500">@{username}</p>
              </div>

              <button
                type="button"
                className="rounded-lg border border-slate-200
                  p-2 text-slate-500 transition
                  hover:bg-emerald-50 hover:text-emerald-700"
                title="Switch account"
              >
                <ArrowLeftRight size={16} />
              </button>
            </div>

            {/* Status */}
            <button
              type="button"
              className="flex w-full items-center gap-2
                rounded-lg px-2 py-2 text-left
                text-slate-600 transition
                hover:bg-emerald-50 hover:text-emerald-700"
            >
              <Smile size={16} />
              <span>Set status</span>
            </button>

            <hr className="my-2 border-slate-100" />

            {/* Main menu */}
            {menuItems.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                className="flex w-full items-center gap-3
                  rounded-lg px-2 py-2 text-left
                  transition hover:bg-emerald-50
                  hover:text-emerald-700"
              >
                <Icon size={17} className="text-slate-500" />
                <span>{label}</span>
              </button>
            ))}

            <hr className="my-2 border-slate-100" />

            {/* Settings */}
            {settingsItems.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                className="flex w-full items-center gap-3
                  rounded-lg px-2 py-2 text-left
                  transition hover:bg-emerald-50
                  hover:text-emerald-700"
              >
                <Icon size={17} className="text-slate-500" />

                <span className="flex-1">{label}</span>

                {label === "Try Enterprise" && (
                  <span
                    className="rounded-full border
                    border-slate-200 px-2 py-0.5
                    text-xs text-slate-500"
                  >
                    Free
                  </span>
                )}
              </button>
            ))}

            <hr className="my-2 border-slate-100" />

            {/* Sign out */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onSignOut?.();
              }}
              className="flex w-full items-center gap-3
                rounded-lg px-2 py-2 text-left
                text-slate-600 transition
                hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={17} />
              <span>Sign out</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

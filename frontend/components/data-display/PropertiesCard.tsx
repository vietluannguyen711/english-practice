"use client";
import { Property } from "@/types";
import { MapPin, MoreHorizontal } from "lucide-react";
import { useState } from "react";

export default function PropertyCard({
    property,
    view,
}: {
    property: Property;
    view: "grid" | "list";
}) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <article
            className={`group relative overflow-visible rounded-2xl border border-slate-200 bg-white p-2.5 transition-shadow hover:shadow-md ${
                view === "list" ? "flex gap-4" : ""
            }`}
        >
            {/* Property Image */}
            <div
                className={`relative overflow-hidden rounded-xl bg-slate-100 ${
                    view === "list"
                        ? "h-36 w-48 shrink-0"
                        : "aspect-[4/3] w-full"
                }`}
            >
                <img
                    src={property.image}
                    alt={property.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <span
                    className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                        property.status === "Đang hoạt động"
                            ? "bg-emerald-50 text-emerald-700"
                            : property.status === "Ngừng hoạt động"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-amber-50 text-red-500"
                    }`}
                >
                    {property.status}
                </span>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={`More options for ${property.name}`}
                    className="absolute right-3 top-3 rounded-full bg-white p-2 text-slate-700 shadow-sm transition hover:bg-slate-100"
                >
                    <MoreHorizontal size={18} />
                </button>

                {menuOpen && (
                    <div className="absolute right-3 top-12 z-20 w-36 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                        >
                            View details
                        </button>
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                        >
                            Edit property
                        </button>
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {/* Property Information */}
            <div className="min-w-0 flex-1 pt-3">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="truncate text-sm font-semibold text-slate-900">
                        {property.name}
                    </h3>
                    <span className="shrink-0 text-sm font-bold text-emerald-700">
                        {property.price}
                    </span>
                </div>

                <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin size={15} />
                    <span>{property.location}</span>
                </div>
            </div>
        </article>
    );
}

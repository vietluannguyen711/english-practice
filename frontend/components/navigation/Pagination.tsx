"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 0) return null;

    const getPages = () => {
        const pages: number[] = [];

        for (let page = 1; page <= totalPages; page++) {
            if (
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1
            ) {
                pages.push(page);
            }
        }

        return pages;
    };

    const pages = getPages();

    return (
        <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
                Page{" "}
                <span className="font-medium text-slate-800">
                    {currentPage}
                </span>{" "}
                of{" "}
                <span className="font-medium text-slate-800">{totalPages}</span>
            </p>

            <nav aria-label="Pagination" className="flex items-center gap-1">
                <button
                    type="button"
                    aria-label="Previous page"
                    disabled={currentPage <= 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ChevronLeft size={18} />
                </button>

                {pages.map((page, index) => {
                    const previousPage = pages[index - 1];
                    const showEllipsis =
                        previousPage && page - previousPage > 1;

                    return (
                        <span key={page} className="flex items-center gap-1">
                            {showEllipsis && (
                                <span className="px-1 text-slate-400">...</span>
                            )}

                            <button
                                type="button"
                                aria-label={`Page ${page}`}
                                aria-current={
                                    currentPage === page ? "page" : undefined
                                }
                                onClick={() => onPageChange(page)}
                                className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition ${
                                    currentPage === page
                                        ? "bg-emerald-600 text-white"
                                        : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                                }`}
                            >
                                {page}
                            </button>
                        </span>
                    );
                })}

                <button
                    type="button"
                    aria-label="Next page"
                    disabled={currentPage >= totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ChevronRight size={18} />
                </button>
            </nav>
        </div>
    );
}

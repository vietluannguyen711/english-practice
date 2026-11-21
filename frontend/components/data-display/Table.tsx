import { ReactNode } from "react";

export interface TableColumn<T> {
    key: string;
    header: string;
    render?: (row: T) => ReactNode;
    className?: string;
}

interface TableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    getRowKey: (row: T) => string;
    emptyMessage?: string;
}

export default function Table<T>({
    columns,
    data,
    getRowKey,
    emptyMessage = "No data available.",
}: TableProps<T>) {
    return (
        <div className="w-full overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[600px] border-collapse text-left">
                <thead className="bg-slate-50">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className={`px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 ${column.className ?? ""}`}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 bg-white">
                    {data.length > 0 ? (
                        data.map((row) => (
                            <tr
                                key={getRowKey(row)}
                                className="transition hover:bg-slate-50"
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className={`px-5 py-4 text-sm text-slate-700 ${column.className ?? ""}`}
                                    >
                                        {column.render
                                            ? column.render(row)
                                            : String(
                                                  (
                                                      row as Record<
                                                          string,
                                                          unknown
                                                      >
                                                  )[column.key] ?? "",
                                              )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-5 py-10 text-center text-sm text-slate-400"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

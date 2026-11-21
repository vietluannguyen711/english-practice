"use client";

import { useRef, useState } from "react";
import { Upload, File, X } from "lucide-react";

interface FileUploadProps {
    label?: string;
    helperText?: string;
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    onChange?: (files: File[]) => void;
}

export default function FileUpload({
    label = "Upload files",
    helperText = "PNG, JPG or PDF",
    accept,
    multiple = false,
    disabled = false,
    onChange,
}: FileUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const updateFiles = (newFiles: File[]) => {
        const updated = multiple
            ? [...files, ...newFiles]
            : newFiles.slice(0, 1);

        setFiles(updated);
        onChange?.(updated);
    };

    const removeFile = (index: number) => {
        const updated = files.filter((_, i) => i !== index);
        setFiles(updated);
        onChange?.(updated);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        if (!disabled) {
            updateFiles(Array.from(event.dataTransfer.files));
        }
    };

    const formatSize = (size: number) => {
        return size < 1024 * 1024
            ? `${(size / 1024).toFixed(1)} KB`
            : `${(size / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <div className="w-full space-y-2">
            <label className="text-sm font-medium text-slate-700">
                {label}
            </label>

            <div
                onDragOver={(event) => {
                    event.preventDefault();
                    if (!disabled) setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => !disabled && inputRef.current?.click()}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition
          ${
              isDragging
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-300 bg-white hover:border-emerald-400 hover:bg-emerald-50/30"
          }
          ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
            >
                <Upload className="mb-3 h-8 w-8 text-emerald-600" />

                <p className="text-sm font-medium text-slate-700">
                    Click to upload or drag and drop
                </p>

                <p className="mt-1 text-xs text-slate-400">{helperText}</p>

                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    disabled={disabled}
                    className="hidden"
                    onChange={(event) => {
                        updateFiles(Array.from(event.target.files ?? []));
                        event.target.value = "";
                    }}
                />
            </div>

            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((file, index) => (
                        <div
                            key={`${file.name}-${file.lastModified}-${index}`}
                            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3"
                        >
                            <File className="h-5 w-5 shrink-0 text-emerald-600" />

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-slate-700">
                                    {file.name}
                                </p>
                                <p className="text-xs text-slate-400">
                                    {formatSize(file.size)}
                                </p>
                            </div>

                            <button
                                type="button"
                                disabled={disabled}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    removeFile(index);
                                }}
                                className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-600"
                                aria-label={`Remove ${file.name}`}
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

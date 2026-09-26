"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type ImageUploadProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
};

export function ImageUpload({ label, value, onChange, hint }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError("");

    try {
      const body = new FormData();
      body.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body,
      });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        setError(data.error ?? "Upload failed.");
        return;
      }

      onChange(data.url);
    } catch {
      setError("Network error — try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1 space-y-2">
          <Input
            type="url"
            placeholder="https://res.cloudinary.com/…"
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(event) => handleFile(event.target.files?.[0])}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
            >
              {uploading ? "Uploading…" : "Upload to Cloudinary"}
            </Button>
            {value ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onChange("")}
              >
                Remove
              </Button>
            ) : null}
          </div>
        </div>

        <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-line bg-muted">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center px-2 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
              No image
            </div>
          )}
        </div>
      </div>

      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
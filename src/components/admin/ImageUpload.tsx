"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type MediaKind = "image" | "media";

type MediaUploadProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
  /** image = cover/logo · media = image or video (feature demos) */
  kind?: MediaKind;
  compact?: boolean;
};

function isVideoUrl(url: string) {
  return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(url) || url.includes("/video/upload/");
}

/** Folder-only Cloudinary paths (missing asset id) never resolve. */
function looksIncompleteCloudinaryUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("cloudinary.com")) return false;
    const parts = parsed.pathname.split("/").filter(Boolean);
    const uploadIdx = parts.findIndex((p) => p === "upload");
    if (uploadIdx < 0) return false;
    const after = parts.slice(uploadIdx + 1).filter((p) => !/^v\d+$/.test(p));
    return after.length < 2;
  } catch {
    return false;
  }
}

function detectResourceType(file: File): "image" | "video" | "auto" {
  if (file.type.startsWith("video/")) return "video";
  if (file.type.startsWith("image/")) return "image";
  return "auto";
}

export function MediaUpload({
  label,
  value,
  onChange,
  hint,
  kind = "image",
  compact = false,
}: MediaUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [previewBroken, setPreviewBroken] = useState(false);

  const accept =
    kind === "media"
      ? "image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
      : "image/jpeg,image/png,image/webp,image/gif";

  useEffect(() => {
    setPreviewBroken(false);
    if (value && looksIncompleteCloudinaryUrl(value)) {
      setPreviewBroken(true);
      setError("This Cloudinary URL is incomplete (missing file id). Re-upload the file.");
    } else {
      setError("");
    }
  }, [value]);

  async function uploadDirect(file: File) {
    const resourceType = detectResourceType(file);

    const signRes = await fetch("/api/upload/sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resourceType }),
    });
    const sign = (await signRes.json()) as {
      cloudName?: string;
      apiKey?: string;
      timestamp?: number;
      signature?: string;
      folder?: string;
      resourceType?: string;
      error?: string;
    };

    if (!signRes.ok || !sign.cloudName || !sign.apiKey || !sign.signature) {
      throw new Error(sign.error ?? "Could not sign upload.");
    }

    const endpoint = `https://api.cloudinary.com/v1_1/${sign.cloudName}/${sign.resourceType ?? resourceType}/upload`;
    const body = new FormData();
    body.append("file", file);
    body.append("api_key", sign.apiKey);
    body.append("timestamp", String(sign.timestamp));
    body.append("signature", sign.signature);
    body.append("folder", sign.folder ?? "imtiaztamim-portfolio");

    const url = await new Promise<string>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", endpoint);
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setProgress(Math.round((event.loaded / event.total) * 100));
        }
      };
      xhr.onload = () => {
        try {
          const data = JSON.parse(xhr.responseText) as {
            secure_url?: string;
            public_id?: string;
            error?: { message?: string };
          };
          if (
            xhr.status >= 200 &&
            xhr.status < 300 &&
            data.secure_url &&
            data.public_id &&
            data.public_id !== "imtiaztamim-portfolio"
          ) {
            resolve(data.secure_url);
          } else {
            reject(new Error(data.error?.message ?? "Cloudinary upload failed."));
          }
        } catch {
          reject(new Error("Invalid Cloudinary response."));
        }
      };
      xhr.onerror = () => reject(new Error("Network error during upload."));
      xhr.send(body);
    });

    return url;
  }

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    setError("");
    setPreviewBroken(false);

    try {
      if (kind === "image" && file.type.startsWith("image/") && file.size <= 4 * 1024 * 1024) {
        const body = new FormData();
        body.append("file", file);
        const response = await fetch("/api/upload", { method: "POST", body });
        const data = (await response.json()) as { url?: string; error?: string };
        if (!response.ok || !data.url) {
          throw new Error(data.error ?? "Upload failed.");
        }
        if (looksIncompleteCloudinaryUrl(data.url)) {
          throw new Error("Upload returned an incomplete URL. Try again.");
        }
        onChange(data.url);
      } else {
        const url = await uploadDirect(file);
        onChange(url);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      setProgress(0);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const previewIsVideo = value ? isVideoUrl(value) : false;

  return (
    <div className="space-y-2">
      <Label className={compact ? "text-[10px] font-bold uppercase tracking-wider text-muted-foreground" : undefined}>
        {label}
      </Label>
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1 space-y-2">
          <Input
            type="url"
            placeholder="Upload a file — or paste a full Cloudinary URL"
            className={compact ? "h-9 rounded-lg border-line text-xs font-mono" : undefined}
            value={value}
            onChange={(event) => onChange(event.target.value.trim())}
          />
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={inputRef}
              type="file"
              accept={accept}
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
              {uploading
                ? `Uploading${progress ? ` ${progress}%` : "…"}`
                : kind === "media"
                  ? "Upload image / video"
                  : "Upload to Cloudinary"}
            </Button>
            {value ? (
              <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
                Remove
              </Button>
            ) : null}
          </div>
        </div>

        <div
          className={`shrink-0 overflow-hidden rounded-lg border border-line bg-muted ${
            compact ? "h-16 w-24" : "h-20 w-28"
          }`}
        >
          {value && !previewBroken ? (
            previewIsVideo ? (
              <video
                src={value}
                className="h-full w-full object-cover"
                muted
                playsInline
                onError={() => {
                  setPreviewBroken(true);
                  setError("Media failed to load. Re-upload the file.");
                }}
              />
            ) : (
              <img
                src={value}
                alt=""
                className="h-full w-full object-cover"
                onError={() => {
                  setPreviewBroken(true);
                  setError("Image failed to load. Re-upload the cover.");
                }}
              />
            )
          ) : (
            <div className="flex h-full items-center justify-center px-2 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
              {previewBroken ? "Broken URL" : kind === "media" ? "No media" : "No image"}
            </div>
          )}
        </div>
      </div>

      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

/** Back-compat alias for cover / logo image fields */
export function ImageUpload(props: Omit<MediaUploadProps, "kind">) {
  return <MediaUpload {...props} kind="image" />;
}

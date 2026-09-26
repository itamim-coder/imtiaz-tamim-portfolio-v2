"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/admin/ImageUpload";
import {
  formatExperienceDate,
  toMonthInput,
} from "@/lib/experience-dates";

type ExperienceItem = {
  _id: string;
  role: string;
  company: string;
  location: string;
  websiteUrl?: string;
  logoUrl?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  tags: string[];
  order: number;
  published: boolean;
};

const emptyItem = {
  role: "",
  company: "",
  location: "Remote",
  websiteUrl: "",
  logoUrl: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
  tags: [] as string[],
  order: 0,
  published: true,
};

function displayRange(item: ExperienceItem) {
  const start = formatExperienceDate(item.startDate);
  if (item.current) return `${start} — Present`;
  return item.endDate ? `${start} — ${formatExperienceDate(item.endDate)}` : start;
}

export default function AdminExperiencePage() {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ExperienceItem | null>(null);
  const [form, setForm] = useState(emptyItem);
  const [tagsInput, setTagsInput] = useState("");

  async function loadItems() {
    const response = await fetch("/api/experience?published=false");
    setItems(await response.json());
  }

  useEffect(() => {
    loadItems();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyItem);
    setTagsInput("");
    setOpen(true);
  }

  function openEdit(item: ExperienceItem) {
    setEditing(item);
    setForm({
      role: item.role,
      company: item.company,
      location: item.location ?? "Remote",
      websiteUrl: item.websiteUrl ?? "",
      logoUrl: item.logoUrl ?? "",
      startDate: toMonthInput(item.startDate),
      endDate: item.endDate ? toMonthInput(item.endDate) : "",
      current: item.current,
      description: item.description,
      tags: item.tags,
      order: item.order,
      published: item.published,
    });
    setTagsInput(item.tags.join(", "));
    setOpen(true);
  }

  async function handleSave() {
    const payload = {
      ...form,
      endDate: form.current ? "" : form.endDate,
      tags: tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    await fetch(editing ? `/api/experience/${editing._id}` : "/api/experience", {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setOpen(false);
    loadItems();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this entry?")) return;
    await fetch(`/api/experience/${id}`, { method: "DELETE" });
    loadItems();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Experience</h1>
          <p className="mt-2 text-muted-foreground">
            Job timeline for recruiters — keep product details in Projects.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Add role
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{item.role}</TableCell>
                <TableCell>{item.company}</TableCell>
                <TableCell>{displayRange(item)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEdit(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(item._id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit experience" : "New experience"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={form.role}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, role: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={form.company}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, company: event.target.value }))
                  }
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, location: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="websiteUrl">Company website</Label>
                <Input
                  id="websiteUrl"
                  type="url"
                  placeholder="https://company.com"
                  value={form.websiteUrl}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, websiteUrl: event.target.value }))
                  }
                />
              </div>
            </div>

            <ImageUpload
              label="Company logo"
              hint="Upload to Cloudinary or paste a URL"
              value={form.logoUrl}
              onChange={(logoUrl) => setForm((prev) => ({ ...prev, logoUrl }))}
            />

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start</Label>
                <Input
                  id="startDate"
                  type="month"
                  value={form.startDate}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, startDate: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End</Label>
                <Input
                  id="endDate"
                  type="month"
                  value={form.endDate}
                  disabled={form.current}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, endDate: event.target.value }))
                  }
                />
              </div>
              <div className="flex items-end gap-2 pb-2">
                <Switch
                  checked={form.current}
                  onCheckedChange={(checked) =>
                    setForm((prev) => ({ ...prev, current: checked, endDate: checked ? "" : prev.endDate }))
                  }
                />
                <Label>Current</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, description: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                placeholder="Next.js, Prisma, Expo"
                value={tagsInput}
                onChange={(event) => setTagsInput(event.target.value)}
              />
            </div>
            <Button onClick={handleSave}>{editing ? "Save changes" : "Create entry"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

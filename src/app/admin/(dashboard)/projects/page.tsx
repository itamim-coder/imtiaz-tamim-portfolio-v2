"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProjectFeature = {
  title: string;
  summary?: string;
  details?: string;
  highlights?: string[];
  videoUrl?: string;
  order?: number;
};

type Project = {
  _id: string;
  title: string;
  slug: string;
  company: string;
  type: "web" | "mobile" | "both";
  featured: boolean;
  shortDescription: string;
  longDescription?: string;
  problem?: string;
  outcome?: string;
  role?: string;
  highlight?: string;
  year?: string;
  category?: string;
  statusLabel?: string;
  tags: string[];
  features?: ProjectFeature[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
  order: number;
  published: boolean;
};

const emptyProject: Omit<Project, "_id"> = {
  title: "",
  slug: "",
  company: "",
  type: "web",
  featured: false,
  shortDescription: "",
  longDescription: "",
  problem: "",
  outcome: "",
  role: "",
  highlight: "",
  year: "",
  category: "",
  statusLabel: "Live",
  tags: [],
  features: [],
  liveUrl: "",
  githubUrl: "",
  imageUrl: "",
  videoUrl: "",
  order: 0,
  published: true,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyProject);
  const [tagsInput, setTagsInput] = useState("");
  const [featuresJson, setFeaturesJson] = useState("[]");
  const [loading, setLoading] = useState(true);

  async function loadProjects() {
    setLoading(true);
    const response = await fetch("/api/projects?published=false");
    const data = await response.json();
    setProjects(data);
    setLoading(false);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyProject);
    setTagsInput("");
    setFeaturesJson("[]");
    setOpen(true);
  }

  function openEdit(project: Project) {
    setEditing(project);
    setForm({
      title: project.title,
      slug: project.slug,
      company: project.company,
      type: project.type,
      featured: project.featured,
      shortDescription: project.shortDescription,
      longDescription: project.longDescription ?? "",
      problem: project.problem ?? "",
      outcome: project.outcome ?? "",
      role: project.role ?? "",
      highlight: project.highlight ?? "",
      year: project.year ?? "",
      category: project.category ?? "",
      statusLabel: project.statusLabel ?? "Live",
      tags: project.tags,
      features: project.features ?? [],
      liveUrl: project.liveUrl ?? "",
      githubUrl: project.githubUrl ?? "",
      imageUrl: project.imageUrl ?? "",
      videoUrl: project.videoUrl ?? "",
      order: project.order,
      published: project.published,
    });
    setTagsInput(project.tags.join(", "));
    setFeaturesJson(JSON.stringify(project.features ?? [], null, 2));
    setOpen(true);
  }

  async function handleSave() {
    let features: ProjectFeature[] = [];
    try {
      features = JSON.parse(featuresJson || "[]");
      if (!Array.isArray(features)) throw new Error("Features must be an array");
    } catch {
      alert("Features JSON is invalid. Fix it before saving.");
      return;
    }

    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      tags: tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      features,
    };

    const response = await fetch(
      editing ? `/api/projects/${editing._id}` : "/api/projects",
      {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (response.ok) {
      setOpen(false);
      loadProjects();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    loadProjects();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-2 text-muted-foreground">
            Toggle <strong>Featured</strong> for Selected Work. All published projects appear in Portfolio.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Add project
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-muted-foreground">
                  No projects yet. Add your first one.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.company}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{project.type}</Badge>
                  </TableCell>
                  <TableCell>{project.featured ? "Yes" : "No"}</TableCell>
                  <TableCell>{project.published ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEdit(project)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(project._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit project" : "New project"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      title: event.target.value,
                      slug: prev.slug || slugify(event.target.value),
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, slug: event.target.value }))
                  }
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
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
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={form.type}
                  onValueChange={(value) => {
                    if (value === "web" || value === "mobile" || value === "both") {
                      setForm((prev) => ({ ...prev, type: value }));
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="both">Web + Mobile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short description</Label>
              <Textarea
                id="shortDescription"
                value={form.shortDescription}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    shortDescription: event.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="highlight">Highlight / callout</Label>
              <Textarea
                id="highlight"
                placeholder="One insight line under the description"
                value={form.highlight}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    highlight: event.target.value,
                  }))
                }
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  placeholder="2024 – 2026"
                  value={form.year}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, year: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="B2B Travel · Full-Stack"
                  value={form.category}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      category: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="statusLabel">Status badge</Label>
                <Input
                  id="statusLabel"
                  placeholder="Live"
                  value={form.statusLabel}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      statusLabel: event.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="longDescription">Overview (case study)</Label>
              <Textarea
                id="longDescription"
                className="min-h-28"
                value={form.longDescription}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    longDescription: event.target.value,
                  }))
                }
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Textarea
                  id="role"
                  value={form.role}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, role: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="problem">Problem</Label>
                <Textarea
                  id="problem"
                  value={form.problem}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      problem: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="outcome">Outcome</Label>
                <Textarea
                  id="outcome"
                  value={form.outcome}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      outcome: event.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuresJson">
                Features JSON (title, summary, details, highlights[], videoUrl, order)
              </Label>
              <Textarea
                id="featuresJson"
                className="min-h-48 font-mono text-xs"
                value={featuresJson}
                onChange={(event) => setFeaturesJson(event.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Leave feature <code>videoUrl</code> empty until you have cut-by-cut demos.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated — icons auto-map)</Label>
              <Input
                id="tags"
                value={tagsInput}
                onChange={(event) => setTagsInput(event.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video URL (thumbnail)</Label>
                <Input
                  id="videoUrl"
                  placeholder="https://…/preview.mp4"
                  value={form.videoUrl}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      videoUrl: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Poster / image URL</Label>
                <Input
                  id="imageUrl"
                  value={form.imageUrl}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      imageUrl: event.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="liveUrl">Live URL</Label>
                <Input
                  id="liveUrl"
                  value={form.liveUrl}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, liveUrl: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Sort order</Label>
                <Input
                  id="order"
                  type="number"
                  value={form.order}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      order: Number(event.target.value),
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.featured}
                  onCheckedChange={(checked) =>
                    setForm((prev) => ({ ...prev, featured: checked }))
                  }
                />
                <Label>Featured (Selected Work)</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.published}
                  onCheckedChange={(checked) =>
                    setForm((prev) => ({ ...prev, published: checked }))
                  }
                />
                <Label>Published</Label>
              </div>
            </div>

            <Button onClick={handleSave}>
              {editing ? "Save changes" : "Create project"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

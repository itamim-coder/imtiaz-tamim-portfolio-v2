"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, GripVertical, Code2, ExternalLink, GitBranch, Video, CheckCircle2, AlertCircle } from "lucide-react";
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
import { techIconSlug } from "@/lib/techIcons";
import { SkillIcon } from "@/components/SkillIcon";

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
  const [features, setFeatures] = useState<ProjectFeature[]>([]);
  const [loading, setLoading] = useState(true);

  // Drag and drop tracking
  const [draggedProjectId, setDraggedProjectId] = useState<string | null>(null);

  async function loadProjects() {
    setLoading(true);
    const response = await fetch("/api/projects?published=false");
    const data = (await response.json()) as Project[];
    // Sort array by order value
    const sorted = [...data].sort((a, b) => a.order - b.order);
    setProjects(sorted);
    setLoading(false);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyProject);
    setTagsInput("");
    setFeatures([]);
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
    // Sort features on edit
    const sortedFeats = [...(project.features ?? [])].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0)
    );
    setFeatures(sortedFeats);
    setOpen(true);
  }

  async function handleSave() {
    if (!form.title.trim() || !form.company.trim()) {
      alert("Title and Company are required.");
      return;
    }

    const payload = {
      ...form,
      slug: form.slug.trim() || slugify(form.title),
      company: form.company.trim(),
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
      }
    );

    if (response.ok) {
      setOpen(false);
      loadProjects();
    } else {
      const err = await response.json();
      alert(`Save failed: ${JSON.stringify(err.error || err)}`);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    loadProjects();
  }

  // Feature List Builder helpers
  function handleAddFeature() {
    setFeatures((prev) => [
      ...prev,
      { title: "", summary: "", details: "", highlights: [], videoUrl: "", order: prev.length },
    ]);
  }

  function handleUpdateFeature(index: number, field: keyof ProjectFeature, value: any) {
    setFeatures((prev) =>
      prev.map((feat, idx) => (idx === index ? { ...feat, [field]: value } : feat))
    );
  }

  function handleRemoveFeature(index: number) {
    setFeatures((prev) => prev.filter((_, idx) => idx !== index));
  }

  // Drag and Drop reordering handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedProjectId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setDraggedProjectId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedProjectId || draggedProjectId === targetId) return;

    const dragIdx = projects.findIndex((p) => p._id === draggedProjectId);
    const targetIdx = projects.findIndex((p) => p._id === targetId);

    if (dragIdx === -1 || targetIdx === -1) return;

    const reordered = [...projects];
    const [removed] = reordered.splice(dragIdx, 1);
    reordered.splice(targetIdx, 0, removed);

    // Update orders sequentially
    const updated = reordered.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    setProjects(updated);

    try {
      await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projects: updated.map((p) => ({ _id: p._id, order: p.order })),
        }),
      });
    } catch (err) {
      console.error("Reorder projects failed:", err);
      loadProjects();
    }
  };

  // tags parser for simpleicons logo previewing
  const tagsParsed = tagsInput
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Projects</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage work items showing in homepage showcases. Drag and drop rows via grip handles to sort project cards.
          </p>
        </div>
        <Button onClick={openCreate} className="gap-1.5 rounded-xl shrink-0">
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-white/50 backdrop-blur-sm shadow-[0_1px_3px_rgba(15,110,86,0.02)]">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[45px]"></TableHead>
              <TableHead className="w-[100px]">Thumbnail</TableHead>
              <TableHead>Title & Company</TableHead>
              <TableHead className="w-[85px] text-center">Type</TableHead>
              <TableHead className="max-w-[200px] hidden md:table-cell">Technologies</TableHead>
              <TableHead className="w-[85px] text-center">Featured</TableHead>
              <TableHead className="w-[85px] text-center">Published</TableHead>
              <TableHead className="text-right w-[110px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-sm text-muted-foreground">
                  Loading projects list...
                </TableCell>
              </TableRow>
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-sm text-muted-foreground">
                  No projects matching. Register your first item above!
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow
                  key={project._id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, project._id)}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, project._id)}
                  className={`hover:bg-line/5 transition-all duration-200 ${
                    draggedProjectId === project._id ? "opacity-35 bg-accent/5 scale-[0.99]" : ""
                  } ${project.featured ? "bg-accent/[0.012]" : ""}`}
                >
                  <TableCell className="w-[45px] align-middle cursor-grab active:cursor-grabbing text-muted-foreground/60 hover:text-accent">
                    <GripVertical className="h-4 w-4" />
                  </TableCell>

                  <TableCell className="align-middle pr-0">
                    <div className="relative h-11 w-18 overflow-hidden rounded-lg border border-line bg-muted">
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground/45 bg-line/10">
                          <Code2 className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="align-middle">
                    <div>
                      <div className="font-semibold text-foreground leading-snug">{project.title}</div>
                      <div className="text-xs text-muted-foreground leading-none mt-1">{project.company}</div>
                    </div>
                  </TableCell>

                  <TableCell className="text-center align-middle">
                    <span className="inline-flex rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent capitalize">
                      {project.type}
                    </span>
                  </TableCell>

                  <TableCell className="align-middle hidden md:table-cell max-w-[200px] truncate prag-scroll">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((t) => (
                        <span key={t} className="inline-flex rounded bg-line/15 px-1.5 py-0.5 text-[9px] text-foreground font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell className="text-center align-middle">
                    {project.featured ? (
                      <span className="inline-flex items-center gap-1 rounded bg-teal-500/10 px-2 py-0.5 text-[10px] font-semibold text-teal-600">
                        <CheckCircle2 className="h-3 w-3" />
                        Yes
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground/60">–</span>
                    )}
                  </TableCell>

                  <TableCell className="text-center align-middle font-mono text-xs">
                    {project.published ? (
                      <span className="text-emerald-500 font-semibold">•</span>
                    ) : (
                      <span className="text-muted/65">•</span>
                    )}
                  </TableCell>

                  <TableCell className="text-right align-middle">
                    <div className="flex justify-end gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEdit(project)}
                        className="h-8 w-8 p-0 rounded-lg hover:border-accent hover:text-accent"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(project._id)}
                        className="h-8 w-8 p-0 rounded-lg hover:border-red-500 hover:text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
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
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl rounded-2xl border border-line p-6">
          <DialogHeader className="border-b border-line pb-4 mb-4">
            <DialogTitle className="text-lg font-semibold tracking-tight text-foreground">
              {editing ? `Edit ${form.title || "Project"}` : "Add New Project"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-5 py-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-muted">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Jotixia"
                  className="rounded-xl border-line"
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
              <div className="space-y-1.5">
                <Label htmlFor="slug" className="text-xs font-bold uppercase tracking-wider text-muted">Web Slug</Label>
                <Input
                  id="slug"
                  placeholder="jotixia"
                  className="rounded-xl border-line font-mono"
                  value={form.slug}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, slug: slugify(event.target.value) }))
                  }
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="company" className="text-xs font-bold uppercase tracking-wider text-muted">Company / Project Sponsor</Label>
                <Input
                  id="company"
                  placeholder="e.g. TrustGuid, Freelance, Private"
                  className="rounded-xl border-line"
                  value={form.company}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, company: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted">Stack Type</Label>
                <Select
                  value={form.type}
                  onValueChange={(value) => {
                    if (value === "web" || value === "mobile" || value === "both") {
                      setForm((prev) => ({ ...prev, type: value }));
                    }
                  }}
                >
                  <SelectTrigger className="rounded-xl border-line bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-line">
                    <SelectItem value="web">Web App</SelectItem>
                    <SelectItem value="mobile">Mobile App</SelectItem>
                    <SelectItem value="both">Web + Mobile App</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="shortDescription" className="text-xs font-bold uppercase tracking-wider text-muted">Short Description</Label>
              <Textarea
                id="shortDescription"
                placeholder="A brief overview paragraph showing on hover cards..."
                className="rounded-xl border-line min-h-16"
                value={form.shortDescription}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    shortDescription: event.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="highlight" className="text-xs font-bold uppercase tracking-wider text-muted">Feature Spotlight Highlight / Callout</Label>
              <Textarea
                id="highlight"
                placeholder="An eye-catching insight row shown right under header (e.g. Handled 3M+ active sockets/sec)"
                className="rounded-xl border-line min-h-16"
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
              <div className="space-y-1.5">
                <Label htmlFor="year" className="text-xs font-bold uppercase tracking-wider text-muted">Year / Duration</Label>
                <Input
                  id="year"
                  placeholder="2024 – 2026"
                  className="rounded-xl border-line font-mono"
                  value={form.year}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, year: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="category" className="text-xs font-bold uppercase tracking-wider text-muted">Category Segment</Label>
                <Input
                  id="category"
                  placeholder="e.g. B2B SaaS · EdTech"
                  className="rounded-xl border-line"
                  value={form.category}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      category: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="statusLabel" className="text-xs font-bold uppercase tracking-wider text-muted">Status Badge</Label>
                <Input
                  id="statusLabel"
                  placeholder="Live, Deprecated, Beta"
                  className="rounded-xl border-line"
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

            <div className="space-y-1.5">
              <Label htmlFor="longDescription" className="text-xs font-bold uppercase tracking-wider text-muted">Detailed Case Study Overview</Label>
              <Textarea
                id="longDescription"
                placeholder="Write full detailed paragraphs about project scope, business requirements, and engineering targets..."
                className="min-h-28 rounded-xl border-line"
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
              <div className="space-y-1.5">
                <Label htmlFor="role" className="text-xs font-bold uppercase tracking-wider text-muted">Role & Duties</Label>
                <Textarea
                  id="role"
                  placeholder="e.g. Solo Developer designing database, deploying on AWS."
                  className="rounded-xl border-line min-h-[90px]"
                  value={form.role}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, role: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="problem" className="text-xs font-bold uppercase tracking-wider text-muted">Problem Statement</Label>
                <Textarea
                  id="problem"
                  placeholder="What was broken or missing before this project was commissioned?"
                  className="rounded-xl border-line min-h-[90px]"
                  value={form.problem}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      problem: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="outcome" className="text-xs font-bold uppercase tracking-wider text-muted">Outcome & Achievements</Label>
                <Textarea
                  id="outcome"
                  placeholder="What are the quantifiable benefits (e.g. loads 40% faster, cut hosting fees in half)?"
                  className="rounded-xl border-line min-h-[90px]"
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

            {/* Interactive Feature List Builder Card wrapper */}
            <div className="space-y-4 border border-line bg-line/5 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted">Project Key Features</Label>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleAddFeature}
                  className="h-8 rounded-lg gap-1.5 hover:border-accent hover:text-accent bg-background"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Feature
                </Button>
              </div>

              {features.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 text-center border border-dashed border-line/60 bg-background rounded-xl">
                  <AlertCircle className="h-5 w-5 text-muted-foreground/60 mb-2" />
                  <p className="text-xs text-muted-foreground">No custom features added yet.</p>
                </div>
              ) : (
                <div className="space-y-3.5 max-h-[420px] overflow-y-auto pr-1">
                  {features.map((feat, idx) => (
                    <div key={idx} className="relative border border-line bg-background rounded-xl p-4.5 space-y-3.5 shadow-sm">
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveFeature(idx)}
                        className="absolute top-2 right-2 h-7 w-7 p-0 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="grid gap-3 grid-cols-3">
                        <div className="col-span-2 space-y-1.5">
                          <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Feature Title</Label>
                          <Input
                            placeholder="e.g. Offline synchronization"
                            className="h-9 rounded-lg border-line text-xs"
                            value={feat.title}
                            onChange={(e) => handleUpdateFeature(idx, "title", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Ordering</Label>
                          <Input
                            type="number"
                            placeholder="0"
                            className="h-9 rounded-lg border-line text-xs font-mono"
                            value={feat.order ?? 0}
                            onChange={(e) => handleUpdateFeature(idx, "order", Number(e.target.value))}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Summary / Subheading</Label>
                        <Input
                          placeholder="A quick one-line summaries hook..."
                          className="h-9 rounded-lg border-line text-xs"
                          value={feat.summary ?? ""}
                          onChange={(e) => handleUpdateFeature(idx, "summary", e.target.value)}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Detailed Realization Docs</Label>
                        <Textarea
                          placeholder="Provide deep details about how you implemented this technology..."
                          className="min-h-16 rounded-lg border-line text-xs"
                          value={feat.details ?? ""}
                          onChange={(e) => handleUpdateFeature(idx, "details", e.target.value)}
                        />
                      </div>

                      <div className="grid gap-3 grid-cols-2">
                        <div className="space-y-1.5">
                          <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Highlights / Tech Stack (comma separated)</Label>
                          <Input
                            placeholder="e.g. SQLite, CRDTs, IndexDB"
                            className="h-9 rounded-lg border-line text-xs"
                            value={(feat.highlights ?? []).join(", ") || ""}
                            onChange={(e) => {
                              const arr = e.target.value.split(",").map(h => h.trim()).filter(Boolean);
                              handleUpdateFeature(idx, "highlights", arr);
                            }}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Demo Video / Media URL</Label>
                          <Input
                            placeholder="https://.../offline-sync.mp4"
                            className="h-9 rounded-lg border-line text-xs font-mono"
                            value={feat.videoUrl ?? ""}
                            onChange={(e) => handleUpdateFeature(idx, "videoUrl", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags" className="text-xs font-bold uppercase tracking-wider text-muted">Technologies & Tags (comma separated)</Label>
              <Input
                id="tags"
                placeholder="React, Next.js, Redux, PostgreSQL"
                className="rounded-xl border-line"
                value={tagsInput}
                onChange={(event) => setTagsInput(event.target.value)}
              />

              {/* Real-time brand logo visualizer */}
              {tagsParsed.length > 0 && (
                <div className="rounded-xl border border-line bg-line/10 p-3 mt-1.5">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-2">Resolved Brand Icons Preview:</Label>
                  <div className="flex flex-wrap gap-2">
                    {tagsParsed.map((tag) => {
                      const iconKey = techIconSlug(tag);
                      return (
                        <span key={tag} className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-background px-2.5 py-1.5 text-xs font-medium text-foreground shadow-sm">
                          <SkillIcon icon={iconKey} name={tag} className="h-3.5 w-3.5" />
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="imageUrl" className="text-xs font-bold uppercase tracking-wider text-muted">Poster / Cover Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="imageUrl"
                    placeholder="https://…/project-thumbnail.png"
                    className="rounded-xl border-line font-mono"
                    value={form.imageUrl}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        imageUrl: event.target.value,
                      }))
                    }
                  />
                  {form.imageUrl && (
                    <div className="h-10 w-16 overflow-hidden rounded-lg border border-line bg-muted shrink-0">
                      <img src={form.imageUrl} alt="" className="h-full w-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="videoUrl" className="text-xs font-bold uppercase tracking-wider text-muted">Background Loop Video (case studies header)</Label>
                <div className="flex gap-2">
                  <Input
                    id="videoUrl"
                    placeholder="https://…/background-video.mp4"
                    className="rounded-xl border-line font-mono"
                    value={form.videoUrl}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        videoUrl: event.target.value,
                      }))
                    }
                  />
                  {form.videoUrl && (
                    <div className="flex h-10 w-10 items-center justify-center text-accent rounded-lg border border-line bg-line/10 shrink-0">
                      <Video className="h-4.5 w-4.5 animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="liveUrl" className="text-xs font-bold uppercase tracking-wider text-muted">Live Deploy URL</Label>
                <div className="relative">
                  <Input
                    id="liveUrl"
                    placeholder="https://yourpage.com"
                    className="rounded-xl border-line pl-8 font-mono text-xs"
                    value={form.liveUrl}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, liveUrl: event.target.value }))
                    }
                  />
                  <ExternalLink className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="order" className="text-xs font-bold uppercase tracking-wider text-muted">Workspace Order Value</Label>
                <Input
                  id="order"
                  type="number"
                  placeholder="0"
                  className="rounded-xl border-line font-mono"
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

            <div className="space-y-1.5">
              <Label htmlFor="githubUrl" className="text-xs font-bold uppercase tracking-wider text-muted">Project Repository (GitHub URL)</Label>
              <div className="relative">
                <Input
                  id="githubUrl"
                  placeholder="https://github.com/itamim-coder/repository"
                  className="rounded-xl border-line pl-8 font-mono text-xs"
                  value={form.githubUrl}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, githubUrl: event.target.value }))
                  }
                />
                <GitBranch className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="flex flex-wrap gap-6 py-2 border-t border-line mt-2">
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.featured}
                  onCheckedChange={(checked) =>
                    setForm((prev) => ({ ...prev, featured: checked }))
                  }
                />
                <Label className="text-xs font-semibold text-foreground">Featured Selected Work spotlight</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.published}
                  onCheckedChange={(checked) =>
                    setForm((prev) => ({ ...prev, published: checked }))
                  }
                />
                <Label className="text-xs font-semibold text-foreground">Publish to public website</Label>
              </div>
            </div>

            <Button onClick={handleSave} className="mt-3 rounded-xl h-11 w-full text-sm font-semibold">
              {editing ? "Save Project Changes" : "Create Project"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

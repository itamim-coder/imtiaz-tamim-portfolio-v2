"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp, GripVertical } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { SkillIcon } from "@/components/SkillIcon";


type SkillItem = {
  _id: string;
  name: string;
  icon: string;
  category: string;
  categoryOrder: number;
  order: number;
  published: boolean;
};

const emptyItem = {
  name: "",
  icon: "",
  category: "",
  categoryOrder: 0,
  order: 0,
  published: true,
};

// Default system category-to-ordering suggestions for user friendliness
const CATEGORY_SUGGESTIONS = [
  { name: "Languages", order: 1 },
  { name: "Frontend", order: 2 },
  { name: "Mobile", order: 3 },
  { name: "Backend", order: 4 },
  { name: "Databases", order: 5 },
  { name: "DevOps / VPS", order: 6 },
  { name: "Realtime / AI", order: 7 },
  { name: "Payments / Tools", order: 8 },
];

export default function AdminSkillsPage() {
  const [items, setItems] = useState<SkillItem[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<SkillItem | null>(null);
  const [form, setForm] = useState(emptyItem);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  
  // Drag and drop state tracking
  const [draggedSkillId, setDraggedSkillId] = useState<string | null>(null);

  // Custom category text triggers (if choosing custom)
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  // Grouped items cache
  const [groupedCategories, setGroupedCategories] = useState<{
    title: string;
    categoryOrder: number;
    skills: SkillItem[];
  }[]>([]);

  function regroupSkills(allSkills: SkillItem[]) {
    const groupsMap = new Map<string, { title: string; categoryOrder: number; skills: SkillItem[] }>();
    for (const item of allSkills) {
      const existing = groupsMap.get(item.category);
      if (existing) {
        existing.skills.push(item);
      } else {
        groupsMap.set(item.category, {
          title: item.category,
          categoryOrder: item.categoryOrder ?? 0,
          skills: [item],
        });
      }
    }
    
    // Sort groups by categoryOrder and skills by order inside each group
    const sortedGroups = Array.from(groupsMap.values())
      .sort((a, b) => a.categoryOrder - b.categoryOrder)
      .map(group => ({
        ...group,
        skills: group.skills.sort((a, b) => a.order - b.order),
      }));

    setGroupedCategories(sortedGroups);
  }

  async function loadItems() {
    const response = await fetch("/api/skills?published=false");
    const data = (await response.json()) as SkillItem[];
    setItems(data);
    regroupSkills(data);
  }

  useEffect(() => {
    loadItems();
  }, []);

  function toggleCategory(catTitle: string) {
    setCollapsedCategories((prev) => ({
      ...prev,
      [catTitle]: !prev[catTitle],
    }));
  }

  // Drag Handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedSkillId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setDraggedSkillId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, targetId: string, category: string) => {
    e.preventDefault();
    if (!draggedSkillId || draggedSkillId === targetId) return;

    const draggedItem = items.find((item) => item._id === draggedSkillId);
    if (!draggedItem || draggedItem.category !== category) return;

    // Filter and sort items belonging to the active category
    const categorySkills = items.filter((item) => item.category === category);
    const sortedCatSkills = [...categorySkills].sort((a, b) => a.order - b.order);

    const dragIdx = sortedCatSkills.findIndex((item) => item._id === draggedSkillId);
    const targetIdx = sortedCatSkills.findIndex((item) => item._id === targetId);

    if (dragIdx === -1 || targetIdx === -1) return;

    const reordered = [...sortedCatSkills];
    const [removed] = reordered.splice(dragIdx, 1);
    reordered.splice(targetIdx, 0, removed);

    // Recalculate sort values
    const updatedSkills = reordered.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    // Optimistically update local parent state
    const newItems = items.map((item) => {
      const match = updatedSkills.find((u) => u._id === item._id);
      return match ? match : item;
    });

    setItems(newItems);
    regroupSkills(newItems);

    try {
      await fetch("/api/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skills: updatedSkills.map((s) => ({ _id: s._id, order: s.order })),
        }),
      });
    } catch (error) {
      console.error("Failed to commit drag-drop order changes", error);
      loadItems();
    }
  };

  function openCreate() {
    setEditing(null);
    setForm(emptyItem);
    setIsCustomCategory(false);
    setOpen(true);
  }

  function openEdit(item: SkillItem) {
    setEditing(item);
    
    const isSuggestion = CATEGORY_SUGGESTIONS.some(
      (s) => s.name.toLowerCase() === item.category.toLowerCase()
    );

    setForm({
      name: item.name,
      icon: item.icon ?? "",
      category: item.category,
      categoryOrder: item.categoryOrder,
      order: item.order,
      published: item.published,
    });
    setIsCustomCategory(!isSuggestion);
    setOpen(true);
  }

  // Auto set categoryOrder if a standard suggestion is picked
  function handleSelectCategory(catName: string) {
    if (catName === "custom") {
      setIsCustomCategory(true);
      setForm((prev) => ({ ...prev, category: "", categoryOrder: 0 }));
    } else {
      setIsCustomCategory(false);
      const sug = CATEGORY_SUGGESTIONS.find((s) => s.name === catName);
      setForm((prev) => ({
        ...prev,
        category: catName,
        categoryOrder: sug ? sug.order : 0,
      }));
    }
  }

  async function handleSave() {
    if (!form.name.trim() || !form.category.trim()) {
      alert("Name and Category are required");
      return;
    }

    const payload = {
      ...form,
      name: form.name.trim(),
      icon: form.icon.trim(),
      category: form.category.trim(),
      categoryOrder: Number(form.categoryOrder) || 0,
      order: Number(form.order) || 0,
    };

    await fetch(editing ? `/api/skills/${editing._id}` : "/api/skills", {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setOpen(false);
    loadItems();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this skill?")) return;
    await fetch(`/api/skills/${id}`, { method: "DELETE" });
    loadItems();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Skills</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage tech stack skills displayed in the homepage &quot;Stack&quot; section. Grouped by category rankings.
          </p>
        </div>
        <Button onClick={openCreate} className="gap-1.5 rounded-xl">
          <Plus className="h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {groupedCategories.length === 0 ? (
        <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-line bg-card text-center">
          <p className="text-sm text-muted-foreground">No skills registered yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedCategories.map((group) => {
            const isCollapsed = collapsedCategories[group.title];
            return (
              <div
                key={group.title}
                className="overflow-hidden rounded-2xl border border-line/60 bg-white/50 backdrop-blur-sm shadow-[0_1px_0_rgba(15,110,86,0.02)]"
              >
                {/* Collapsible Category Header bar */}
                <div
                  onClick={() => toggleCategory(group.title)}
                  className="flex cursor-pointer items-center justify-between bg-line/10 px-6 py-4 transition-colors hover:bg-line/20 select-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center rounded-lg bg-accent/10 px-2 py-0.5 font-mono text-[9px] font-bold text-accent leading-none">
                      Col {group.categoryOrder}
                    </span>
                    <h3 className="font-sans text-sm font-semibold text-foreground tracking-tight">
                      {group.title}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      ({group.skills.length} skills)
                    </span>
                  </div>
                  <div className="text-muted">
                    {isCollapsed ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronUp className="h-4 w-4" />
                    )}
                  </div>
                </div>

                {/* Category Skills Table */}
                {!isCollapsed && (
                  <div className="border-t border-line/30 transition-all">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="w-[40px]"></TableHead>
                          <TableHead className="w-[80px]">Icon</TableHead>
                          <TableHead>Skill Name</TableHead>
                          <TableHead>Icon Resource Slug / Value</TableHead>
                          <TableHead className="w-[80px] text-center">Order</TableHead>
                          <TableHead className="w-[100px] text-center">Status</TableHead>
                          <TableHead className="text-right w-[120px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {group.skills.map((item) => (
                          <TableRow
                            key={item._id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, item._id)}
                            onDragEnd={handleDragEnd}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, item._id, group.title)}
                            className={`hover:bg-line/5 transition-all duration-200 ${
                              draggedSkillId === item._id ? "opacity-30 bg-accent/5 scale-[0.99]" : ""
                            }`}
                          >
                            <TableCell className="w-[40px] align-middle cursor-grab active:cursor-grabbing text-muted-foreground/60 hover:text-accent select-none">
                              <GripVertical className="h-4 w-4" />
                            </TableCell>
                            {/* Live Icon Preview Cell */}
                            <TableCell className="align-middle border-none">
                              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-background text-accent shadow-sm">
                                <SkillIcon icon={item.icon} name={item.name} className="h-4.5 w-4.5" />
                              </span>
                            </TableCell>
                            <TableCell className="font-medium text-foreground">
                              {item.name}
                            </TableCell>

                            <TableCell className="font-mono text-[11px] text-muted-foreground max-w-[200px] truncate">
                              {item.icon || <span className="italic text-muted">generic fallback</span>}
                            </TableCell>
                            <TableCell className="text-center font-mono text-xs">{item.order}</TableCell>
                            <TableCell className="text-center">
                              {item.published ? (
                                <span className="inline-flex rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold text-emerald-600">
                                  Published
                                </span>
                              ) : (
                                <span className="inline-flex rounded-full bg-muted/20 px-2 py-0.5 text-[9px] font-semibold text-muted">
                                  Draft
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1.5">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => openEdit(item)}
                                  className="h-8 w-8 p-0 rounded-lg hover:border-accent hover:text-accent"
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDelete(item._id)}
                                  className="h-8 w-8 p-0 rounded-lg hover:border-red-500 hover:text-red-500"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* dialog for add / editing items */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md rounded-2xl border border-line">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold tracking-tight">
              {editing ? `Edit ${form.name || "Skill"}` : "Add New Skill"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-3">
            {/* Live Preview Indicator in Dialog Header */}
            {form.name && (
              <div className="flex items-center gap-3 rounded-xl border border-line bg-line/10 p-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-background border border-line text-accent shadow-sm shrink-0">
                  <SkillIcon icon={form.icon} name={form.name} className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-foreground leading-tight">{form.name}</h4>
                  <p className="text-[10px] text-muted-foreground font-mono leading-none mt-1 truncate">
                    Type: {form.icon.trim().startsWith("<svg") ? "Custom SVG" : form.icon.trim().startsWith("http") || form.icon.trim().startsWith("/") ? "Image URL" : "Slug/Name"}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted">Skill Name</Label>
              <Input
                id="name"
                placeholder="React, Docker, Node.js"
                className="rounded-xl border-line"
                value={form.name}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, name: event.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category-select" className="text-xs font-bold uppercase tracking-wider text-muted">Category Selection</Label>
              <select
                id="category-select"
                className="flex w-full items-center justify-between rounded-xl border border-line bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-accent"
                value={isCustomCategory ? "custom" : form.category}
                onChange={(event) => handleSelectCategory(event.target.value)}
              >
                <option value="" disabled>-- Select Category Column --</option>
                {CATEGORY_SUGGESTIONS.map((sug) => (
                  <option key={sug.name} value={sug.name}>
                    {sug.name} (Col {sug.order})
                  </option>
                ))}
                <option value="custom">-- Custom Category (Write Name) --</option>
              </select>
            </div>

            {/* If Custom Category is checked, show inline input details */}
            {isCustomCategory && (
              <div className="grid gap-3 grid-cols-3 border border-line/50 rounded-xl p-3 bg-line/5">
                <div className="col-span-2 space-y-1.5">
                  <Label htmlFor="custom-category" className="text-[10px] font-bold uppercase tracking-wider text-muted">Custom Name</Label>
                  <Input
                    id="custom-category"
                    placeholder="e.g. Services"
                    className="h-8 rounded-lg border-line text-xs"
                    value={form.category}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, category: event.target.value }))
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="custom-cat-order" className="text-[10px] font-bold uppercase tracking-wider text-muted">Col Order</Label>
                  <Input
                    id="custom-cat-order"
                    type="number"
                    className="h-8 rounded-lg border-line text-xs font-mono"
                    value={form.categoryOrder}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        categoryOrder: Number(event.target.value),
                      }))
                    }
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="icon" className="text-xs font-bold uppercase tracking-wider text-muted">Icon Input Value</Label>
              <Input
                id="icon"
                placeholder="react, Brain, https://example.com/logo.png, or <svg>..."
                className="rounded-xl border-line font-mono text-xs"
                value={form.icon}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, icon: event.target.value }))
                }
              />
              <div className="space-y-1 mt-1 text-[9px] text-muted-foreground leading-normal">
                <p>Supports 4 formats dynamically:</p>
                <ul className="list-disc pl-3">
                  <li><strong>SimpleIcons:</strong> lowercase slug (e.g. <code>react</code>, <code>nodedotjs</code>)</li>
                  <li><strong>Lucide name:</strong> case-insensitive keyword (e.g. <code>Brain</code>, <code>Settings</code>)</li>
                  <li><strong>URL / Local Path:</strong> begins with http/https/ (e.g. <code>/logos/graphql.png</code>)</li>
                  <li><strong>Raw SVG code:</strong> directly paste code starting with <code>&lt;svg</code></li>
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="order" className="text-xs font-bold uppercase tracking-wider text-muted">Sort Order in Category</Label>
              <Input
                id="order"
                type="number"
                placeholder="1 (first), 2 (second)"
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

            <div className="flex items-center gap-2 py-1.5">
              <Switch
                checked={form.published}
                onCheckedChange={(checked) =>
                  setForm((prev) => ({ ...prev, published: checked }))
                }
              />
              <Label className="text-xs font-semibold text-foreground">Publish to homepage Stack component</Label>
            </div>

            <Button onClick={handleSave} className="mt-2 rounded-xl h-11">
              {editing ? "Save Changes" : "Create Skill"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

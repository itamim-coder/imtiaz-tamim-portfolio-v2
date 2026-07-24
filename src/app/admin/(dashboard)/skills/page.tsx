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
import { Switch } from "@/components/ui/switch";

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

export default function AdminSkillsPage() {
  const [items, setItems] = useState<SkillItem[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<SkillItem | null>(null);
  const [form, setForm] = useState(emptyItem);

  async function loadItems() {
    const response = await fetch("/api/skills?published=false");
    setItems(await response.json());
  }

  useEffect(() => {
    loadItems();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyItem);
    setOpen(true);
  }

  function openEdit(item: SkillItem) {
    setEditing(item);
    setForm({
      name: item.name,
      icon: item.icon ?? "",
      category: item.category,
      categoryOrder: item.categoryOrder,
      order: item.order,
      published: item.published,
    });
    setOpen(true);
  }

  async function handleSave() {
    const payload = {
      ...form,
      icon: form.icon.trim(),
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
          <h1 className="text-3xl font-semibold tracking-tight">Skills</h1>
          <p className="mt-2 text-muted-foreground">
            STACK pills on the homepage — name, Simple Icons slug, category, order.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Add skill
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  <span className="text-muted-foreground">{item.categoryOrder}.</span>{" "}
                  {item.category}
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {item.icon || "—"}
                </TableCell>
                <TableCell>{item.order}</TableCell>
                <TableCell>{item.published ? "Yes" : "No"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEdit(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(item._id)}
                    >
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
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit skill" : "New skill"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="React"
                value={form.name}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, name: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="Frontend"
                value={form.category}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, category: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Icon slug (simpleicons.org)</Label>
              <Input
                id="icon"
                placeholder="react — leave empty for generic icon"
                value={form.icon}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, icon: event.target.value }))
                }
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="categoryOrder">Category order</Label>
                <Input
                  id="categoryOrder"
                  type="number"
                  value={form.categoryOrder}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      categoryOrder: Number(event.target.value),
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Skill order</Label>
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
            <div className="flex items-center gap-2">
              <Switch
                checked={form.published}
                onCheckedChange={(checked) =>
                  setForm((prev) => ({ ...prev, published: checked }))
                }
              />
              <Label>Published</Label>
            </div>
            <Button onClick={handleSave}>
              {editing ? "Save changes" : "Create skill"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

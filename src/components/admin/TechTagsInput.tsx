"use client";

import { useEffect, useMemo, useState } from "react";
import { GripVertical, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SkillIcon } from "@/components/SkillIcon";
import { techIconSlug } from "@/lib/techIcons";

type SkillOption = {
  _id: string;
  name: string;
  icon?: string;
  category: string;
};

type TechTagsInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
};

function normalizeTag(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function tagKey(value: string) {
  return normalizeTag(value).toLowerCase();
}

export function TechTagsInput({ value, onChange }: TechTagsInputProps) {
  const [skills, setSkills] = useState<SkillOption[]>([]);
  const [draft, setDraft] = useState("");
  const [dragFromIndex, setDragFromIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch("/api/skills?published=false");
        if (!response.ok) return;
        const data = (await response.json()) as SkillOption[];
        if (!cancelled) setSkills(Array.isArray(data) ? data : []);
      } catch {
        /* ignore — freehand still works */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedKeys = useMemo(() => new Set(value.map(tagKey)), [value]);

  const groupedSkills = useMemo(() => {
    const map = new Map<string, SkillOption[]>();
    for (const skill of skills) {
      if (selectedKeys.has(tagKey(skill.name))) continue;
      const list = map.get(skill.category) ?? [];
      list.push(skill);
      map.set(skill.category, list);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [skills, selectedKeys]);

  function addTag(raw: string) {
    const tag = normalizeTag(raw);
    if (!tag) return;
    if (selectedKeys.has(tagKey(tag))) return;
    onChange([...value, tag]);
  }

  function removeTag(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function commitDraft() {
    const pieces = draft
      .split(",")
      .map(normalizeTag)
      .filter(Boolean);
    if (pieces.length === 0) return;
    const next = [...value];
    const keys = new Set(next.map(tagKey));
    for (const piece of pieces) {
      if (keys.has(tagKey(piece))) continue;
      next.push(piece);
      keys.add(tagKey(piece));
    }
    onChange(next);
    setDraft("");
  }

  function reorder(from: number, to: number) {
    if (from === to || from < 0 || to < 0 || from >= value.length || to >= value.length) {
      return;
    }
    const next = [...value];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label className="text-xs font-bold uppercase tracking-wider text-muted">
          Technologies &amp; tags
        </Label>
        <p className="text-xs text-muted-foreground">
          Pick from your skill set, drag to reorder, or type freely (comma / Enter to add).
        </p>
      </div>

      {/* Selected tags — drag to reorder */}
      <div
        className="min-h-12 rounded-xl border border-line bg-line/10 p-2.5"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          const skillName = event.dataTransfer.getData("application/x-skill-name");
          if (skillName) addTag(skillName);
          setDragFromIndex(null);
          setDragOverIndex(null);
        }}
      >
        {value.length === 0 ? (
          <p className="px-1 py-2 text-xs text-muted-foreground">
            Drop skills here or add below…
          </p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {value.map((tag, index) => {
              const icon = techIconSlug(tag);
              const skillMatch = skills.find((s) => tagKey(s.name) === tagKey(tag));
              return (
                <li
                  key={`${tag}-${index}`}
                  draggable
                  onDragStart={(event) => {
                    setDragFromIndex(index);
                    event.dataTransfer.effectAllowed = "move";
                    event.dataTransfer.setData("text/plain", tag);
                  }}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDragOverIndex(index);
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const skillName = event.dataTransfer.getData("application/x-skill-name");
                    if (skillName) {
                      addTag(skillName);
                    } else if (dragFromIndex !== null) {
                      reorder(dragFromIndex, index);
                    }
                    setDragFromIndex(null);
                    setDragOverIndex(null);
                  }}
                  onDragEnd={() => {
                    setDragFromIndex(null);
                    setDragOverIndex(null);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-lg border bg-background px-2 py-1.5 text-xs font-medium shadow-sm transition-colors ${
                    dragOverIndex === index
                      ? "border-accent bg-accent/5"
                      : "border-line"
                  }`}
                >
                  <GripVertical className="h-3 w-3 shrink-0 cursor-grab text-muted-foreground" />
                  <SkillIcon
                    icon={skillMatch?.icon || icon}
                    name={tag}
                    className="h-3.5 w-3.5"
                  />
                  <span>{tag}</span>
                  <button
                    type="button"
                    className="ml-0.5 rounded p-0.5 text-muted-foreground hover:bg-line hover:text-foreground"
                    onClick={() => removeTag(index)}
                    aria-label={`Remove ${tag}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Freehand */}
      <div className="flex gap-2">
        <Input
          placeholder="Type a tag — e.g. HotelBeds — then Enter"
          className="rounded-xl border-line"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === ",") {
              event.preventDefault();
              commitDraft();
            } else if (event.key === "Backspace" && !draft && value.length > 0) {
              removeTag(value.length - 1);
            }
          }}
          onBlur={() => {
            if (draft.trim()) commitDraft();
          }}
        />
        <Button
          type="button"
          variant="outline"
          className="shrink-0 rounded-xl"
          onClick={commitDraft}
          disabled={!draft.trim()}
        >
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      {/* Skill set picker */}
      {groupedSkills.length > 0 ? (
        <div className="space-y-2 rounded-xl border border-line bg-background p-3">
          <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Pick from skill set
          </Label>
          <div className="max-h-44 space-y-3 overflow-y-auto pr-1">
            {groupedSkills.map(([category, items]) => (
              <div key={category} className="space-y-1.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                  {category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <button
                      key={skill._id}
                      type="button"
                      draggable
                      onDragStart={(event) => {
                        event.dataTransfer.effectAllowed = "copy";
                        event.dataTransfer.setData(
                          "application/x-skill-name",
                          skill.name,
                        );
                        event.dataTransfer.setData("text/plain", skill.name);
                      }}
                      onClick={() => addTag(skill.name)}
                      className="inline-flex cursor-grab items-center gap-1.5 rounded-lg border border-line bg-line/10 px-2 py-1 text-xs font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-accent/5 active:cursor-grabbing"
                      title={`Add ${skill.name} (or drag onto tags)`}
                    >
                      <SkillIcon
                        icon={skill.icon || techIconSlug(skill.name)}
                        name={skill.name}
                        className="h-3.5 w-3.5"
                      />
                      {skill.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : skills.length === 0 ? (
        <p className="text-xs text-muted-foreground">
          No skills in CMS yet — type tags freely, or add skills under Admin → Skills.
        </p>
      ) : null}
    </div>
  );
}

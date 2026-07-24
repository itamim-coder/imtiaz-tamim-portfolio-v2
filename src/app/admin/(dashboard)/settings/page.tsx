"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Settings = {
  heroLine1: string;
  heroLine2: string;
  heroSubline: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  metaTitle: string;
  metaDescription: string;
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((response) => response.json())
      .then(setSettings);
  }, []);

  async function handleSave(event: React.FormEvent) {
    event.preventDefault();
    if (!settings) return;

    await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }

  if (!settings) {
    return <p className="text-muted-foreground">Loading settings...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Site settings</h1>
        <p className="mt-2 text-muted-foreground">
          Hero copy, contact email, and social links.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Hero</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="heroLine1">Headline line 1</Label>
              <Input
                id="heroLine1"
                value={settings.heroLine1}
                onChange={(event) =>
                  setSettings({ ...settings, heroLine1: event.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroLine2">Headline line 2 (gradient)</Label>
              <Input
                id="heroLine2"
                value={settings.heroLine2}
                onChange={(event) =>
                  setSettings({ ...settings, heroLine2: event.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroSubline">Subline</Label>
              <Input
                id="heroSubline"
                value={settings.heroSubline}
                onChange={(event) =>
                  setSettings({ ...settings, heroSubline: event.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact & social</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={settings.email}
                onChange={(event) =>
                  setSettings({ ...settings, email: event.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub</Label>
              <Input
                id="githubUrl"
                value={settings.githubUrl}
                onChange={(event) =>
                  setSettings({ ...settings, githubUrl: event.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn</Label>
              <Input
                id="linkedinUrl"
                value={settings.linkedinUrl}
                onChange={(event) =>
                  setSettings({ ...settings, linkedinUrl: event.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta title</Label>
              <Input
                id="metaTitle"
                value={settings.metaTitle}
                onChange={(event) =>
                  setSettings({ ...settings, metaTitle: event.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta description</Label>
              <Textarea
                id="metaDescription"
                value={settings.metaDescription}
                onChange={(event) =>
                  setSettings({ ...settings, metaDescription: event.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit">{saved ? "Saved!" : "Save settings"}</Button>
      </form>
    </div>
  );
}

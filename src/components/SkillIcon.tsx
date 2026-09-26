"use client";

import React from "react";
import * as LucideIcons from "lucide-react";

type SkillIconProps = {
  icon: string | null | undefined;
  name?: string;
  className?: string;
};

export function SkillIcon({ icon, name = "Skill", className = "h-5 w-5" }: SkillIconProps) {
  const [isImgError, setIsImgError] = React.useState(false);

  // Reset image error state if the icon source changes
  React.useEffect(() => {
    setIsImgError(false);
  }, [icon]);

  if (!icon || !icon.trim()) {
    return <LucideIcons.Code2 className={className} aria-hidden />;
  }

  const iconStr = icon.trim();

  // 1. Raw XML/SVG markup check
  if (iconStr.startsWith("<svg")) {
    return (
      <span
        className={`${className} flex items-center justify-center shrink-0 [&>svg]:h-full [&>svg]:w-full [&>svg]:fill-current`}
        dangerouslySetInnerHTML={{ __html: iconStr }}
      />
    );
  }

  // 1b. Raw Image element tag check (E.g. copying HTML snippet from Icons8 CDN)
  if (iconStr.startsWith("<img")) {
    const srcMatch = iconStr.match(/src=["']([^"']+)["']/);
    if (srcMatch && srcMatch[1]) {
      return (
        <img
          src={srcMatch[1]}
          alt={name}
          className={`${className} shrink-0 object-contain`}
          loading="lazy"
          decoding="async"
        />
      );
    }
  }

  // 2. Custom Image URL Check (External or relative public path Check)
  if (iconStr.startsWith("http://") || iconStr.startsWith("https://") || iconStr.startsWith("/")) {

    return (
      <img
        src={iconStr}
        alt={name}
        className={`${className} shrink-0 object-contain`}
        loading="lazy"
        decoding="async"
      />
    );
  }

  // 3. Lucide Icon Name Check
  // Matches case-insensitive to any key inside Lucide React
  const matchedKey = Object.keys(LucideIcons).find(
    (key) => key.toLowerCase() === iconStr.toLowerCase()
  ) as keyof typeof LucideIcons | undefined;

  if (matchedKey) {
    const IconComponent = LucideIcons[matchedKey] as React.ComponentType<{ className?: string }>;
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
  }

  // 4. Default: SimpleIcons Slug
  if (isImgError) {
    return <LucideIcons.Code2 className={className} aria-hidden />;
  }

  // Normal SimpleIcons lookup
  return (
    <img
      src={`https://cdn.simpleicons.org/${iconStr}`}
      alt={name}
      className={`${className} shrink-0 object-contain`}
      onError={() => setIsImgError(true)}
      loading="lazy"
      decoding="async"
    />
  );
}
export default SkillIcon;

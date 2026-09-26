import type { ReactNode } from "react";

function inline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}

export function BlogContent({ content }: { content: string }) {
  const blocks = content
    .trim()
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="blog-prose">
      {blocks.map((block, index) => {
        if (block.startsWith("### ")) {
          return (
            <h3 key={index} className="blog-h3">
              {inline(block.slice(4))}
            </h3>
          );
        }
        if (block.startsWith("## ")) {
          return (
            <h2 key={index} className="blog-h2">
              {inline(block.slice(3))}
            </h2>
          );
        }
        if (block.startsWith("- ")) {
          const items = block
            .split("\n")
            .map((line) => line.replace(/^- /, "").trim())
            .filter(Boolean);
          return (
            <ul key={index} className="blog-ul">
              {items.map((item) => (
                <li key={item}>{inline(item)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index} className="blog-p">
            {inline(block)}
          </p>
        );
      })}
    </div>
  );
}
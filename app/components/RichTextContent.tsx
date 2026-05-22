"use client";

import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "span",
  "div",
  "ul",
  "ol",
  "li",
];

const ALLOWED_ATTR = ["style", "data-indent", "class"];

export function stripRichText(html: string) {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();
}

export default function RichTextContent({
  html,
  className = "",
}: {
  html: string;
  className?: string;
}) {
  const sanitized = DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
  });

  if (!sanitized || stripRichText(sanitized).length === 0) {
    return null;
  }

  return (
    <div
      className={`rich-text-content whitespace-pre-wrap leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}

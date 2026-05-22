"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaIndent,
  FaOutdent,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaListUl,
  FaListOl,
} from "react-icons/fa6";
import { FontSize, Indent, LineHeight, PasteStripColors } from "@/lib/tiptap-extensions";
import { adminUi } from "@/lib/admin-ui";

/** Point sizes 8–20; "default" = inherit editor CSS (no inline font-size mark). */
const FONT_SIZE_DEFAULT = "default";
const FONT_SIZE_OPTIONS_PT = Array.from({ length: 13 }, (_, i) => i + 8);

function normalizeFontSizeForSelect(fontSize: string | undefined) {
  if (!fontSize || fontSize === "1rem") return FONT_SIZE_DEFAULT;
  if (fontSize.endsWith("pt")) {
    const pt = parseInt(fontSize, 10);
    if (FONT_SIZE_OPTIONS_PT.includes(pt)) return fontSize;
  }
  return FONT_SIZE_DEFAULT;
}

const LINE_SPACINGS = ["0.5", "0.75", "1", "1.25", "1.5", "1.75", "2"];

const DEFAULT_TEXT_COLOR = "#ffffff";

const PRESET_COLORS = [
  DEFAULT_TEXT_COLOR,
  "#11ff00",
  "#f87171",
  "#fbbf24",
  "#60a5fa",
  "#c084fc",
  "#94a3b8",
];

function ToolbarButton({
  active,
  disabled,
  onClick,
  title,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`rounded px-2 py-1.5 text-sm transition-colors disabled:opacity-40 ${
        active
          ? "bg-neon-green/25 text-neon-green"
          : "text-gray-300 hover:bg-foreground/10 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

export function isRichTextEmpty(html: string) {
  const stripped = html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
  return stripped.length === 0;
}

export default function RichTextEditor({
  label,
  value,
  onChange,
  required,
  minHeight = "8rem",
  contentClassName = "",
}: {
  label: string;
  value: string;
  onChange: (html: string) => void;
  required?: boolean;
  minHeight?: string;
  /** Applied to the editable area so default typography matches the public site. */
  contentClassName?: string;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      Underline,
      TextStyle,
      Color,
      FontSize,
      LineHeight,
      Indent,
      PasteStripColors,
      TextAlign.configure({
        types: ["paragraph", "listItem"],
        alignments: ["left", "center", "right"],
      }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: [
          "rich-text-editor-content focus:outline-none px-3 py-2 text-primary min-h-[inherit]",
          contentClassName,
        ]
          .filter(Boolean)
          .join(" "),
        style: `color: ${DEFAULT_TEXT_COLOR}`,
      },
    },
    onCreate: ({ editor: ed }) => {
      ed.commands.setColor(DEFAULT_TEXT_COLOR);
    },
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const incoming = value || "";
    const current = editor.getHTML();
    if (incoming === current) return;
    if (!incoming && current === "<p></p>") return;
    editor.commands.setContent(incoming, { emitUpdate: false });
  }, [editor, value]);

  if (!editor) return null;

  const currentFontSize = normalizeFontSizeForSelect(
    editor.getAttributes("textStyle").fontSize as string | undefined,
  );
  const currentColor =
    (editor.getAttributes("textStyle").color as string | undefined) ?? DEFAULT_TEXT_COLOR;
  const currentLineHeight =
    (editor.getAttributes("paragraph").lineHeight as string | undefined) ?? "1.5";

  return (
    <div className="block">
      <span className={adminUi.label}>
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </span>

      <div className="mt-1 rounded-md border-b-2 border-b-neon-green bg-transparent overflow-hidden">
        <div className="flex flex-wrap items-center gap-1 border-b border-foreground/10 bg-gray-900/40 px-2 py-1.5">
          <ToolbarButton
            title="Bold"
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <FaBold />
          </ToolbarButton>
          <ToolbarButton
            title="Italic"
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <FaItalic />
          </ToolbarButton>
          <ToolbarButton
            title="Underline"
            active={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <FaUnderline />
          </ToolbarButton>

          <span className="mx-1 h-5 w-px bg-foreground/15" aria-hidden />

          <ToolbarButton
            title="Align left"
            active={editor.isActive({ textAlign: "left" })}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <FaAlignLeft />
          </ToolbarButton>
          <ToolbarButton
            title="Align center"
            active={editor.isActive({ textAlign: "center" })}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <FaAlignCenter />
          </ToolbarButton>
          <ToolbarButton
            title="Align right"
            active={editor.isActive({ textAlign: "right" })}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <FaAlignRight />
          </ToolbarButton>

          <span className="mx-1 h-5 w-px bg-foreground/15" aria-hidden />

          <ToolbarButton
            title="Bullet list"
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <FaListUl />
          </ToolbarButton>
          <ToolbarButton
            title="Numbered list"
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <FaListOl />
          </ToolbarButton>

          <span className="mx-1 h-5 w-px bg-foreground/15" aria-hidden />

          <label className="flex items-center gap-1.5 text-xs text-gray-400">
            Size
            <select
              value={currentFontSize}
              onChange={(e) => {
                const size = e.target.value;
                if (size === FONT_SIZE_DEFAULT) {
                  editor.chain().focus().unsetFontSize().run();
                } else {
                  editor.chain().focus().setFontSize(size).run();
                }
              }}
              className="rounded border border-foreground/15 bg-gray-900 px-1.5 py-1 text-xs text-primary outline-none focus:border-neon-green/50"
            >
              <option value={FONT_SIZE_DEFAULT}>Default</option>
              {FONT_SIZE_OPTIONS_PT.map((pt) => (
                <option key={pt} value={`${pt}pt`}>
                  {pt}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-1.5 text-xs text-gray-400">
            Line spacing
            <select
              value={currentLineHeight}
              onChange={(e) => {
                const spacing = e.target.value;
                if (spacing === "1.5") {
                  editor.chain().focus().unsetLineHeight().run();
                } else {
                  editor.chain().focus().setLineHeight(spacing).run();
                }
              }}
              className="rounded border border-foreground/15 bg-gray-900 px-1.5 py-1 text-xs text-primary outline-none focus:border-neon-green/50"
            >
              {LINE_SPACINGS.map((spacing) => (
                <option key={spacing} value={spacing}>
                  {spacing}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-1.5 text-xs text-gray-400">
            Color
            <input
              type="color"
              value={currentColor.startsWith("#") ? currentColor : DEFAULT_TEXT_COLOR}
              onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
              className="h-7 w-8 cursor-pointer rounded border border-foreground/15 bg-transparent p-0.5"
              title="Font color"
            />
          </label>

          <div className="flex items-center gap-0.5">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                title={`Set color ${color}`}
                onClick={() => editor.chain().focus().setColor(color).run()}
                className="h-4 w-4 rounded-full border border-foreground/20 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          <span className="mx-1 h-5 w-px bg-foreground/15" aria-hidden />

          <ToolbarButton
            title="Increase indent"
            onClick={() => editor.chain().focus().indent().run()}
          >
            <FaIndent />
          </ToolbarButton>
          <ToolbarButton
            title="Decrease indent"
            onClick={() => editor.chain().focus().outdent().run()}
          >
            <FaOutdent />
          </ToolbarButton>
        </div>

        <div style={{ minHeight }} className="rich-text-editor-body">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}

import { Extension } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";
import type { Mark, Node as ProseMirrorNode } from "@tiptap/pm/model";
import { Fragment, Slice } from "@tiptap/pm/model";

const PASTED_COLOR_STYLE_PROPS = /^(-webkit-text-fill-color|color)$/i;

/** Remove inline color styles from pasted HTML (Word, Google Docs, web pages, etc.). */
export function stripPastedTextColors(html: string): string {
  if (!html) return html;

  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    doc.body.querySelectorAll("*").forEach((el) => {
      const style = el.getAttribute("style");
      if (style) {
        const cleaned = style
          .split(";")
          .map((part) => part.trim())
          .filter((part) => {
            if (!part) return false;
            const prop = part.split(":")[0]?.trim() ?? "";
            return !PASTED_COLOR_STYLE_PROPS.test(prop);
          })
          .join("; ");
        if (cleaned) el.setAttribute("style", cleaned);
        else el.removeAttribute("style");
      }
      if (el.hasAttribute("color")) el.removeAttribute("color");
    });
    return doc.body.innerHTML;
  } catch {
    return html.replace(/\s*color\s*:\s*[^;}"']+;?/gi, "");
  }
}

function stripColorMarksFromNode(node: ProseMirrorNode, textStyleMark: Mark["type"]): ProseMirrorNode {
  if (node.isText) {
    const marks = node.marks
      .map((mark) => {
        if (mark.type !== textStyleMark) return mark;
        const { color: _color, ...rest } = mark.attrs as { color?: string | null; fontSize?: string | null };
        const hasOtherStyles = Object.values(rest).some((value) => value != null && value !== "");
        return hasOtherStyles ? mark.type.create(rest) : null;
      })
      .filter((mark): mark is Mark => mark != null);
    return node.mark(marks);
  }

  if (!node.content.size) return node;
  const content = Fragment.from(
    node.content.content.map((child) => stripColorMarksFromNode(child, textStyleMark)),
  );
  return node.copy(content);
}

function stripColorMarksFromSlice(slice: Slice, textStyleMark: Mark["type"] | undefined): Slice {
  if (!textStyleMark) return slice;
  const content = Fragment.from(
    slice.content.content.map((node) => stripColorMarksFromNode(node, textStyleMark)),
  );
  return new Slice(content, slice.openStart, slice.openEnd);
}

export const PasteStripColors = Extension.create({
  name: "pasteStripColors",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          transformPastedHTML: stripPastedTextColors,
          transformPasted: (slice, view) =>
            stripColorMarksFromSlice(slice, view.state.schema.marks.textStyle),
        },
      }),
    ];
  },
});

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
    lineHeight: {
      setLineHeight: (lineHeight: string) => ReturnType;
      unsetLineHeight: () => ReturnType;
    };
    indent: {
      indent: () => ReturnType;
      outdent: () => ReturnType;
    };
  }
}

export const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }) =>
          chain().setMark("textStyle", { fontSize }).run(),
      unsetFontSize:
        () =>
        ({ chain }) =>
          chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run(),
    };
  },
});

export const LineHeight = Extension.create({
  name: "lineHeight",
  addOptions() {
    return {
      types: ["paragraph", "listItem"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (element) => element.style.lineHeight || null,
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) return {};
              return { style: `line-height: ${attributes.lineHeight}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setLineHeight:
        (lineHeight: string) =>
        ({ commands }) => {
          const { types } = this.options;
          return types
            .map((type: string) => commands.updateAttributes(type, { lineHeight }))
            .every(Boolean);
        },
      unsetLineHeight:
        () =>
        ({ commands }) => {
          const { types } = this.options;
          return types
            .map((type: string) => commands.resetAttributes(type, "lineHeight"))
            .every(Boolean);
        },
    };
  },
});

export const Indent = Extension.create({
  name: "indent",
  addOptions() {
    return {
      types: ["paragraph"],
      minLevel: 0,
      maxLevel: 8,
      step: 2,
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: (element) => {
              const value = element.getAttribute("data-indent");
              return value ? parseInt(value, 10) : 0;
            },
            renderHTML: (attributes) => {
              const level = attributes.indent as number;
              if (!level) return {};
              return {
                "data-indent": level,
                style: `margin-left: ${level}em`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      indent:
        () =>
        ({ tr, state, dispatch }) => {
          const { types, maxLevel, step } = this.options;
          let changed = false;

          state.doc.nodesBetween(state.selection.from, state.selection.to, (node, pos) => {
            if (!types.includes(node.type.name)) return;
            const current = (node.attrs.indent as number) ?? 0;
            if (current >= maxLevel) return;
            tr.setNodeMarkup(pos, undefined, { ...node.attrs, indent: current + step });
            changed = true;
          });

          if (changed && dispatch) dispatch(tr);
          return changed;
        },
      outdent:
        () =>
        ({ tr, state, dispatch }) => {
          const { types, minLevel, step } = this.options;
          let changed = false;

          state.doc.nodesBetween(state.selection.from, state.selection.to, (node, pos) => {
            if (!types.includes(node.type.name)) return;
            const current = (node.attrs.indent as number) ?? 0;
            if (current <= minLevel) return;
            tr.setNodeMarkup(pos, undefined, { ...node.attrs, indent: Math.max(minLevel, current - step) });
            changed = true;
          });

          if (changed && dispatch) dispatch(tr);
          return changed;
        },
    };
  },
});

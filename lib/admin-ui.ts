/** Admin UI tokens aligned with the public site (contact form, headings, buttons). */
export const adminUi = {
  page: "min-h-screen bg-main text-foreground",
  brand: "text-xs uppercase tracking-widest text-neon-green font-bold",
  heading: "font-extrabold text-foreground",
  headingAccent: "text-neon-green",
  headingLg: "font-extrabold text-primary md:text-3xl text-2xl",
  label: "text-sm font-medium text-primary",
  body: "text-foreground",
  muted: "text-gray-400",
  mutedSm: "text-sm text-gray-400",
  input:
    "mt-1 w-full rounded-md border-b-2 border-b-neon-green bg-transparent px-3 py-2 text-primary outline-none focus:border-b-neon-green transition-colors duration-200",
  textarea:
    "mt-1 w-full rounded-md border-b-2 border-b-neon-green bg-transparent px-3 py-2 text-primary outline-none focus:border-b-neon-green transition-colors duration-200 resize-y",
  panel: "rounded-lg bg-gray-800/70 border border-foreground/10",
  panelLg: "rounded-2xl bg-gray-800/70 border border-foreground/10",
  table: "rounded-xl border border-foreground/10 overflow-hidden bg-gray-800/50",
  tableHead: "border-b border-foreground/10 bg-gray-800/70 text-left text-gray-400",
  card: "rounded-xl border border-foreground/10 bg-gray-800/70 p-4",
  btnPrimary:
    "rounded-lg bg-neon-green px-4 py-2.5 text-sm font-semibold text-black shadow-[0_0_20px_#11ff00] hover:bg-transparent hover:text-neon-green transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
  btnSecondary:
    "rounded-lg border border-neon-green/40 px-4 py-2 text-sm font-medium text-foreground hover:bg-neon-green/10 transition-colors",
  link: "text-sm text-gray-400 hover:text-neon-green transition-colors",
  linkAccent: "text-sm text-neon-green hover:underline font-medium",
  navInactive: "text-gray-400 hover:text-foreground hover:bg-foreground/5",
  navActive: "bg-neon-green/20 text-neon-green",
} as const;

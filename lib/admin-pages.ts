export type AdminSitePage = {
  label: string;
  path: string;
  editable: boolean;
  adminPath?: string;
  description?: string;
};

export const adminSitePages: AdminSitePage[] = [
  {
    label: "Home",
    path: "/",
    editable: false,
    description: "Static marketing page — edit in the codebase",
  },
  {
    label: "About Us",
    path: "/about-us",
    editable: false,
    description: "Static marketing page — edit in the codebase",
  },
  {
    label: "Portfolio",
    path: "/portfolio",
    editable: true,
    adminPath: "/admin/portfolio",
    description: "Manage portfolio projects in the admin panel",
  },
  /* {
    label: "Portfolio (View)",
    path: "/portfolio/view",
    editable: true,
    adminPath: "/admin/portfolio",
    description: "Same data as Portfolio — kiosk / embed view",
  }, */
  {
    label: "Careers",
    path: "/careers",
    editable: false,
    description: "Static marketing page — edit in the codebase",
  },
  {
    label: "Contact",
    path: "/contact",
    editable: false,
    description: "Static page with Formspree form — edit in the codebase",
  },
];

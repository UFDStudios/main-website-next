"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { adminUi } from "@/lib/admin-ui";

export default function AdminShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const navItems = [
    { href: "/admin", label: "Pages" },
    { href: "/admin/portfolio", label: "Portfolio" },
  ];

  return (
    <div className={adminUi.page}>
      <header className="border-b border-foreground/10 bg-gray-800/70 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className={adminUi.brand}>UFD Admin</p>
            {title && (
              <h1 className={`${adminUi.heading} text-xl md:text-2xl mt-0.5`}>
                <span className={adminUi.headingAccent}>&quot;</span>
                {title}
                <span className={adminUi.headingAccent}>&quot;</span>
              </h1>
            )}
          </div>
          <nav className="flex items-center gap-2 flex-wrap">
            {navItems.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    active ? adminUi.navActive : adminUi.navInactive
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={handleLogout}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${adminUi.navInactive}`}
            >
              Log out
            </button>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}

import Link from "next/link";
import AdminShell from "@/app/admin/components/AdminShell";
import { requireAdminPage } from "@/lib/admin-auth-page";
import { adminSitePages } from "@/lib/admin-pages";
import { adminUi } from "@/lib/admin-ui";

export default async function AdminDashboardPage() {
  await requireAdminPage();

  return (
    <AdminShell title="Site pages">
      <p className={`${adminUi.mutedSm} mb-6 max-w-2xl`}>
        Overview of all public pages. Portfolio content can be edited here; other pages are
        static and live in the codebase.
      </p>

      <div className={adminUi.table}>
        <table className="w-full text-sm">
          <thead>
            <tr className={adminUi.tableHead}>
              <th className="px-4 py-3 font-medium">Page</th>
              <th className="px-4 py-3 font-medium hidden sm:table-cell">Path</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminSitePages.map((page) => (
              <tr key={page.path} className="border-b border-foreground/5 last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground">{page.label}</p>
                  {page.description && (
                    <p className={`text-xs ${adminUi.muted} mt-0.5 max-w-md`}>{page.description}</p>
                  )}
                </td>
                <td className={`px-4 py-3 hidden sm:table-cell text-xs ${adminUi.muted}`}>
                  {page.path}
                </td>
                <td className="px-4 py-3">
                  {page.editable ? (
                    <span className="inline-flex rounded-full bg-neon-green/15 px-2 py-0.5 text-xs text-neon-green font-medium">
                      Editable
                    </span>
                  ) : (
                    <span className={`inline-flex rounded-full bg-foreground/10 px-2 py-0.5 text-xs ${adminUi.muted}`}>
                      Code only
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2 flex-wrap">
                    <Link href={page.path} target="_blank" className={adminUi.link}>
                      View
                    </Link>
                    {page.adminPath && (
                      <Link href={page.adminPath} className={adminUi.linkAccent}>
                        Edit
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

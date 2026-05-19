export const metadata = {
  title: "Admin | UFD Studios",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="text-foreground font-[Arial,Helvetica,sans-serif]">{children}</div>;
}

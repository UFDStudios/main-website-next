"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { adminUi } from "@/lib/admin-ui";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Login failed");
        return;
      }
      const from = searchParams.get("from") || "/admin";
      router.push(from.startsWith("/admin") ? from : "/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${adminUi.page} flex items-center justify-center px-4`}>
      <div
        className={`w-full max-w-md ${adminUi.panelLg} px-8 py-12 shadow-xl min-h-[420px] flex flex-col justify-center`}
      >
        <p className={`text-center ${adminUi.brand}`}>UFD Admin</p>
        <h1 className={`${adminUi.headingLg} mt-3 mb-8 text-center`}>
          <span className={adminUi.headingAccent}>&quot;</span>
          Sign <span className={adminUi.headingAccent}>in</span>
          <span className={adminUi.headingAccent}>&quot;</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}
          <label className="block">
            <span className={adminUi.label}>Username</span>
            <input
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={adminUi.input}
            />
          </label>
          <label className="block">
            <span className={adminUi.label}>Password</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={adminUi.input}
            />
          </label>
          <button type="submit" disabled={loading} className={`w-full ${adminUi.btnPrimary}`}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className={`${adminUi.page} flex items-center justify-center ${adminUi.muted}`}>
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

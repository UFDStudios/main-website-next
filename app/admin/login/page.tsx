"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { adminUi } from "@/lib/admin-ui";

type AuthView = "login" | "change-password";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [view, setView] = useState<AuthView>("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const resetMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const switchView = (next: AuthView) => {
    setView(next);
    resetMessages();
    setPassword("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    resetMessages();

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

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          currentPassword,
          newPassword,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Password change failed");
        return;
      }
      setSuccess("Password updated. Sign in with your new password.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setView("login");
      setPassword("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isLogin = view === "login";

  return (
    <div className={`${adminUi.page} flex items-center justify-center px-4`}>
      <div
        className={`w-full max-w-md ${adminUi.panelLg} px-8 py-12 shadow-xl min-h-[420px] flex flex-col justify-center`}
      >
        <p className={`text-center ${adminUi.brand}`}>UFD Admin</p>
        <h1 className={`${adminUi.headingLg} mt-3 mb-8 text-center`}>
          <span className={adminUi.headingAccent}>&quot;</span>
          {isLogin ? (
            <>
              Sign <span className={adminUi.headingAccent}>in</span>
            </>
          ) : (
            <>
              Change <span className={adminUi.headingAccent}>password</span>
            </>
          )}
          <span className={adminUi.headingAccent}>&quot;</span>
        </h1>

        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                {error}
              </p>
            )}
            {success && (
              <p className="rounded-lg border border-neon-green/30 bg-neon-green/10 px-3 py-2 text-sm text-neon-green">
                {success}
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
            <p className="text-center">
              <button
                type="button"
                onClick={() => switchView("change-password")}
                className={adminUi.link}
              >
                Change password
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleChangePassword} className="space-y-5">
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
              <span className={adminUi.label}>Current password</span>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={adminUi.input}
              />
            </label>
            <label className="block">
              <span className={adminUi.label}>New password</span>
              <input
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={adminUi.input}
              />
            </label>
            <label className="block">
              <span className={adminUi.label}>Confirm new password</span>
              <input
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={adminUi.input}
              />
            </label>
            <button type="submit" disabled={loading} className={`w-full ${adminUi.btnPrimary}`}>
              {loading ? "Updating…" : "Update password"}
            </button>
            <p className="text-center">
              <button type="button" onClick={() => switchView("login")} className={adminUi.link}>
                Back to sign in
              </button>
            </p>
          </form>
        )}
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

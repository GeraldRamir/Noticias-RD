"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setStatus("ok");
      setMessage(data.message || "¡Suscripción exitosa!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "No se pudo suscribir");
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="flex overflow-hidden border border-white/20">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          className={`w-full px-3 py-2 text-sm outline-none ${
            dark ? "bg-white/10 text-white placeholder:text-white/40" : "bg-white text-ink"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-accent px-4 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
        >
          {status === "loading" ? "…" : "Unirme"}
        </button>
      </form>
      {message && (
        <p className={`mt-2 text-xs ${status === "ok" ? "text-emerald-400" : "text-red-300"}`}>
          {message}
        </p>
      )}
    </div>
  );
}

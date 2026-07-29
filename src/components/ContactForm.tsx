"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setStatus("ok");
      setMessage(data.message || "Mensaje enviado");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Nombre"
          className="border border-line px-3 py-2.5 text-sm outline-none focus:border-accent"
        />
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Correo"
          className="border border-line px-3 py-2.5 text-sm outline-none focus:border-accent"
        />
      </div>
      <input
        required
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
        placeholder="Asunto"
        className="w-full border border-line px-3 py-2.5 text-sm outline-none focus:border-accent"
      />
      <textarea
        required
        rows={6}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder="Mensaje"
        className="w-full border border-line px-3 py-2.5 text-sm outline-none focus:border-accent"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-accent-dark disabled:opacity-60"
      >
        {status === "loading" ? "Enviando…" : "Enviar mensaje"}
      </button>
      {message && (
        <p className={`text-sm ${status === "ok" ? "text-emerald-700" : "text-accent"}`}>{message}</p>
      )}
    </form>
  );
}

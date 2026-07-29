"use client";

import { FormEvent, useState } from "react";

export function CommentForm({ articleId }: { articleId: string }) {
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId, authorName, authorEmail, content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al enviar");
      setStatus("ok");
      setMessage(data.message || "Comentario enviado. Pendiente de moderación.");
      setAuthorName("");
      setAuthorEmail("");
      setContent("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 border border-line bg-paper-soft p-5">
      <h3 className="font-display text-xl font-bold">Deja tu comentario</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          required
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Nombre"
          className="border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
        />
        <input
          required
          type="email"
          value={authorEmail}
          onChange={(e) => setAuthorEmail(e.target.value)}
          placeholder="Correo"
          className="border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </div>
      <textarea
        required
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribe tu comentario…"
        className="w-full border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-accent-dark disabled:opacity-60"
      >
        {status === "loading" ? "Enviando…" : "Publicar comentario"}
      </button>
      {message && (
        <p className={`text-sm ${status === "ok" ? "text-emerald-700" : "text-accent"}`}>{message}</p>
      )}
    </form>
  );
}

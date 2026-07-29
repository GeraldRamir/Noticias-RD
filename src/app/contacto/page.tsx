import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { getSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contáctanos — CRÓNICA",
};

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Escríbenos</p>
          <h1 className="font-display mt-2 text-4xl font-bold">Contacto</h1>
          <p className="mt-4 text-muted">
            ¿Tienes una tip, sugerencia o consulta comercial? Envíanos un mensaje.
          </p>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="font-bold uppercase tracking-wide text-xs text-muted">Correo</dt>
              <dd className="mt-1">{settings.contactEmail || "redaccion@cronica.do"}</dd>
            </div>
            <div>
              <dt className="font-bold uppercase tracking-wide text-xs text-muted">Teléfono</dt>
              <dd className="mt-1">{settings.contactPhone || "+1 (809) 555-0100"}</dd>
            </div>
            <div>
              <dt className="font-bold uppercase tracking-wide text-xs text-muted">Dirección</dt>
              <dd className="mt-1">{settings.address || "Santo Domingo, República Dominicana"}</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}

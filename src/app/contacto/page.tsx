import Link from "next/link";
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
            ¿Tienes una tip, sugerencia o consulta comercial? Nuestro equipo de redacción y
            publicidad está listo para ayudarte.
          </p>

          <dl className="mt-8 space-y-5 text-sm">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-muted">Correo</dt>
              <dd className="mt-1">
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-accent">
                  {settings.contactEmail || "redaccion@cronica.do"}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-muted">Teléfono</dt>
              <dd className="mt-1">{settings.contactPhone || "+1 (809) 555-0100"}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-muted">WhatsApp</dt>
              <dd className="mt-1">{settings.whatsapp || "+1 (809) 555-0100"}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-muted">Dirección</dt>
              <dd className="mt-1">{settings.address || "Santo Domingo, República Dominicana"}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-muted">Horario</dt>
              <dd className="mt-1">{settings.hours || "Lunes a viernes, 8:00 a.m. – 6:00 p.m."}</dd>
            </div>
          </dl>

          <div className="mt-10 border border-line bg-paper-soft p-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Departamentos
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <span className="font-semibold">Redacción:</span>{" "}
                <a href="mailto:redaccion@cronica.do" className="text-muted hover:text-accent">
                  redaccion@cronica.do
                </a>
              </li>
              <li>
                <span className="font-semibold">Publicidad:</span>{" "}
                <a href="mailto:publicidad@cronica.do" className="text-muted hover:text-accent">
                  publicidad@cronica.do
                </a>
              </li>
              <li>
                <span className="font-semibold">Soporte técnico:</span>{" "}
                <a href="mailto:soporte@cronica.do" className="text-muted hover:text-accent">
                  soporte@cronica.do
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {settings.facebook && (
              <a
                href={settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-line px-4 py-2 text-xs font-bold uppercase tracking-wide hover:border-accent hover:text-accent"
              >
                Facebook
              </a>
            )}
            {settings.instagram && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-line px-4 py-2 text-xs font-bold uppercase tracking-wide hover:border-accent hover:text-accent"
              >
                Instagram
              </a>
            )}
            {settings.twitter && (
              <a
                href={settings.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-line px-4 py-2 text-xs font-bold uppercase tracking-wide hover:border-accent hover:text-accent"
              >
                X / Twitter
              </a>
            )}
          </div>
        </div>

        <div>
          <ContactForm />
          <p className="mt-4 text-xs text-muted">
            También puedes visitarnos en{" "}
            <Link href="/galeria" className="text-accent hover:underline">
              nuestra galería multimedia
            </Link>{" "}
            o explorar las{" "}
            <Link href="/categorias" className="text-accent hover:underline">
              secciones editoriales
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

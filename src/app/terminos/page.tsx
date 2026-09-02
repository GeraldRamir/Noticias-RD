import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de uso",
  description: "Términos y condiciones — CRÓNICA",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl font-bold">Términos de uso</h1>
      <div className="prose-article mt-8">
        <p>
          Al acceder a CRÓNICA aceptas estos términos. Si no estás de acuerdo, te pedimos no utilizar
          el sitio.
        </p>
        <h2>Contenido editorial</h2>
        <p>
          Los textos, fotografías, videos y audios publicados están protegidos por derechos de autor.
          Queda prohibida su reproducción total o parcial sin autorización expresa de la dirección.
        </p>
        <h2>Comentarios</h2>
        <p>
          Los lectores son responsables del contenido que publican. CRÓNICA se reserva el derecho de
          moderar, editar o eliminar comentarios que inciten al odio, contengan spam o violen la ley.
        </p>
        <h2>Publicidad</h2>
        <p>
          Las piezas marcadas como publicidad son responsabilidad del anunciante. CRÓNICA no garantiza
          productos o servicios de terceros anunciados en el portal.
        </p>
        <h2>Modificaciones</h2>
        <p>
          Podemos actualizar estos términos en cualquier momento. Los cambios entrarán en vigor al
          publicarse en esta página.
        </p>
      </div>
    </div>
  );
}

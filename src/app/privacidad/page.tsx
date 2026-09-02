import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacidad",
  description: "Política de privacidad — CRÓNICA",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl font-bold">Política de privacidad</h1>
      <div className="prose-article mt-8">
        <p>
          CRÓNICA respeta la privacidad de sus lectores. Esta política describe cómo recopilamos,
          usamos y protegemos la información personal conforme a la Ley 172-13 de la República
          Dominicana.
        </p>
        <h2>Datos que recopilamos</h2>
        <p>
          Podemos recopilar correo electrónico al suscribirte al boletín, datos de contacto al
          enviar formularios y cookies anónimas para personalizar recomendaciones y medir audiencia.
        </p>
        <h2>Uso de la información</h2>
        <p>
          Utilizamos los datos para enviar newsletters, responder consultas, mejorar el producto
          editorial y cumplir obligaciones legales. No vendemos datos personales a terceros.
        </p>
        <h2>Cookies</h2>
        <p>
          Usamos cookies funcionales para recordar preferencias de lectura y cookies analíticas para
          entender el tráfico del sitio. Puedes gestionarlas desde la configuración de tu navegador.
        </p>
        <h2>Contacto</h2>
        <p>
          Para ejercer derechos de acceso, rectificación o eliminación, escribe a{" "}
          <a href="mailto:privacidad@cronica.do">privacidad@cronica.do</a>.
        </p>
      </div>
    </div>
  );
}

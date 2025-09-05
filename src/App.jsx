import React, { useMemo, useState, useEffect } from "react";
import "./App.css";

/** === IMPORTA TUS IMÁGENES DESDE src/assets === */
import logoFastnet from "./assets/webp/FASTNET_BLANCO.webp";
import imgEco200 from "./assets/webp/ecofastproto1.webp";
import imgSmart300 from "./assets/webp/smartfast.webp";
import imgPower400 from "./assets/webp/powerfast.webp";
import imgPlay500 from "./assets/webp/playfast.webp";
import adquirir from "./assets/webp/adquiereya.webp";
import sonrisas from "./assets/webp/sonrisaspipo.webp";
import scooter from "./assets/webp/scooterfastnet.webp";
import camaras from "./assets/webp/camarasfast.webp";
import familiafast from "./assets/webp/familiafast.webp";
import leonElegante from "./assets/webp/leonElegante.webp";
import soporte from "./assets/webp/soporte.webp";
import instalacion from "./assets/webp/instalacion.webp";
import tri from "./assets/webp/gemelosfut.webp";
import zapping from "./assets/webp/zapping2.webp"

/** ====== CONFIG (.env) ====== */
const WHATSAPP = import.meta.env.VITE_WHATSAPP || "593994009469";
const MAP_LAT = Number(import.meta.env.VITE_MAP_LAT || -0.25066);
const MAP_LNG = Number(import.meta.env.VITE_MAP_LNG || -79.17138);
const MAP_PLACE = encodeURIComponent(import.meta.env.VITE_MAP_PLACE || "FASTNET Santo Domingo");
const DOMAIN = import.meta.env.VITE_DOMAIN || "fastnet.com.ec";

/** ====== DATOS ====== */
const SOCIALS = [
  { id: "fb", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61580072365004", svg: "M10 20v-6H7v-4h3V7.5C10 4.42 11.79 3 14.5 3c1.04 0 1.94.08 2.2.11v3h-1.51C13.58 6.11 13 6.86 13 8v2h3.5l-.5 4H13v6h-3z" },
  { id: "ig", label: "Instagram", href: "https://www.instagram.com/fastnetcomec?utm_source=ig_web_button_share_sheet&igsh=MTk2eWdkY3ludXp0dg==", svg: "M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm8 3a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10z" },
  { id: "tt", label: "TikTok", href: "https://www.tiktok.com/@fastnetcomec", svg: "M19 6.5a5.5 5.5 0 01-4-1.6V17a5 5 0 11-5-5c.35 0 .69.04 1 .12V9.03a8 8 0 00-1-.07 7 7 0 107 7V8.9a9.5 9.5 0 004 1.1V6.5z" },
];

const SECTORES = [
  "9 de Diciembre", "Simón Bolivar", "El Centro", "El Magisterio",
  "Entrada de la 30 de Junio", "Jorge Mahuad", "Entrada de la Juan Eulogio", "Centenario",
  "Zona Rosa", "Ucom 1", "17 de Diciembre", "Av. Chone", "Av. Quevedo",
  "Coop. Liberación Popular", "20 de Octubre", "Los Rosales",
];

const PLANES = [
  { id: "eco200", titulo: "ECO FAST 200", img: imgEco200, specs: ["Profilaxis Dental", "Plan Básico", "200MB Reales", "Instalacion Gratis", "$20 Incluido Impuestos"] },
  { id: "smart300", titulo: "SMART FAST 300", img: imgSmart300, specs: ["1 Punto de red", "2 Meses de Streaming Gratis", "300MB Reales", "Instalacion Gratis", "$23.30 Incluido Impuestos"] },
  { id: "power400", titulo: "POWER FAST 400", img: imgPower400, specs: ["3 Meses con 25% Descuento", "1 Punto de red", "Streaming Ilimitado - Zapping", "Wifi 6", "400MB Reales", "Instalacion Gratis", "$25.75 Incluido Impuestos"] },
  { id: "play500", titulo: "PLAY FAST 500", img: imgPlay500, specs: ["6 Meses con 25% Descuento", "1 Punto de red", "Streaming Ilimitado para 3 dispositivos - Zapping", "1 Router adicional", "Wifi 6", "500MB Reales", "Instalacion Gratis", "$30.90 Incluido Impuestos"] },
];

/** ====== UTILS ====== */
const waLink = (planId) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Hola FASTNET, estoy interesado en contratar el plan ${planId} que vi en ${DOMAIN}, me ayudas con información ?.`)}`;

const mapsDirLink = (lat, lng) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat}%2C${lng}&travelmode=driving`;

const mapsEmbed = (lat, lng, label) =>
  `https://www.google.com/maps?q=${lat},${lng}(${label})&z=15&output=embed`;

/** ====== COMPONENTES ====== */
/*SPLASH DE PANTALLA INICIAL*/
function Splash() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 3500); // mantengo tu tiempo
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;

  return (
    <div className="splash splash--anim" aria-hidden="true" onAnimationEnd={() => setGone(true)}>
      {/* ↑ sólo añadimos prioridad de carga; NO tocamos clases ni estilos */}
      <img src={familiafast} alt="" className="splash__img" loading="eager" decoding="async" fetchpriority="high" />
    </div>
  );
}

/*HEADER*/
function Header() {
  return (
    <header className="header">
      <div className="containerHeader">
        <div className="item1">
          <img src={logoFastnet} alt="FASTNET" className="brand__logo" loading="eager" decoding="async" />
        </div>
        <div className="item2">
          <span className="brand__claim">
            Elige FASTNET y navega con la velocidad de un león: rápido, fuerte y siempre conectado.
          </span>
        </div>
        <div className="item3">
          <span className="follow-label">Síguenos en:</span>
          <nav className="header__socials">
            {SOCIALS.map((s) => (
              <a key={s.id} className="social" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                <svg viewBox="0 0 24 24" className="social__icon" aria-hidden="true">
                  <path d={s.svg} />
                </svg>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

function PlanCard({ plan, onAcquire }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`card ${flipped ? "card--flipped" : ""}`}
      onClick={() => setFlipped((v) => !v)}
      role="button"
      tabIndex={0}
    >
      <div className="card__inner">
        {/* Frente */}
        <div className="card__face card__front card__front--image">
          {/* ↓ solo lazy/decoding; no cambiamos clases ni estructura */}
          <img
            src={plan.img}
            alt={plan.titulo}
            className="card__img--full"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Reverso */}
        <div className="card__face card__back">
          <div className="card__back-content">
            <h4>{plan.titulo}</h4>
            <ul className="specs">
              {plan.specs.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>

            <button
              className="btn btn--primary"
              onClick={(e) => {
                e.stopPropagation(); // no vuelva a girar al click
                onAcquire(plan);
              }}
            >
              Adquiérelo ya
            </button>

            <p className="tap">Toca para volver</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Modal({ open, plan, onClose }) {
  if (!open || !plan) return null;
  return (
    <>
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal">
        <h3>
          ¿Aplica el plan <strong>{plan.titulo}</strong> en tu zona?
        </h3>
        <p className="muted">Revisa los sectores con cobertura:</p>
        <ul className="sectores">
          {SECTORES.map((s, i) => (
            <li key={i}>• {s}</li>
          ))}
        </ul>

        <div className="modal__actions">
          <button className="btn" onClick={onClose}>Cerrar</button>
          <a className="btn btn--primary" href={waLink(plan.titulo)} target="_blank" rel="noopener noreferrer">
            Continuar en WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}

function MapsSection() {
  const iframeSrc = useMemo(() => mapsEmbed(MAP_LAT, MAP_LNG, MAP_PLACE), []);
  const goLink = useMemo(() => mapsDirLink(MAP_LAT, MAP_LNG), []);
  return (
    <section className="section">
      <h2>VISÍTANOS EN NUESTRO LOCAL</h2>
      <div className="maps">
        <iframe
          title="Ubicación FASTNET"
          src={iframeSrc}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a className="btn btn--primary" href={goLink} target="_blank" rel="noopener noreferrer">
        IR
      </a>
    </section>
  );
}

function FloatingCTA() {
  return (
    <a
      className="floating-cta"
      href={waLink("Consulta")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contrata aquí por WhatsApp"
    >
      {/* CTA fijo: puede ser lazy también (no afecta layout) */}
      <img src={adquirir} alt="CONTRATA AQUÍ" loading="lazy" decoding="async" />
    </a>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__brand">
        <img src={logoFastnet} alt="FASTNET" loading="lazy" decoding="async" />
      </div>
      <p>© {year} FASTNET. Todos los derechos reservados.</p>
      <p className="muted">Theme by FASTNET.ec</p>
    </footer>
  );
}

export default function App() {
  const [modalPlan, setModalPlan] = useState(null);
  return (
    <>
      <Splash />
      <Header />

      <main className="container">
        <section className="section" id="planes">
          <h2>NUESTROS PLANES</h2>
          <br></br>
          <div className="grid">
            {PLANES.map((p) => (
              <PlanCard key={p.id} plan={p} onAcquire={setModalPlan} />
            ))}
          </div>
        </section>
        <br></br>
        <section className="section">
          <h2>PROMOCIONES</h2>
          <div className="promos">
            <img src={sonrisas} alt="Promoción sonrisas" loading="lazy" decoding="async" />
            <img src={scooter} alt="Promoción scooter" loading="lazy" decoding="async" />
            <img src={zapping} alt="Zapping" loading="lazy" decoding="async" />
          </div>
          <br></br>
          <a className="btn btn--primary btn--center" href="#planes">Adquirir ya !</a>
        </section>

        <section className="section">
          <h2>BENEFICIOS</h2>
          <div className="promos">
            <img src={tri} alt="zapping" loading="lazy" decoding="async" />
            <img src={soporte} alt="soporte 24/7" loading="lazy" decoding="async" />
            <img src={instalacion} alt="instalacion inmediata" loading="lazy" decoding="async" />
          </div>
        </section>

        <MapsSection />

        <div className="promos">
          <img src={leonElegante} alt="Leon Elegante" loading="lazy" decoding="async" />
        </div>

        <br></br>
        <h2>HORARIOS DE ATENCIÓN</h2>
        <div className="horarios">
          <p>LUNES A VIERNES</p>
          <p>08:00 am - 17:00 pm</p>
          <p>SABADO</p>
          <p>08:00 am - 13:00 pm</p>
        </div>
      </main>

      <Footer />
      <FloatingCTA />
      <Modal open={!!modalPlan} plan={modalPlan} onClose={() => setModalPlan(null)} />
    </>
  );
}

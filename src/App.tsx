import { motion } from "framer-motion";
import { ChevronDown, Navigation } from "lucide-react";
import { boutique as b } from "./config/boutique";
import Contact, { contactItems } from "./components/Contact";
import Gold from "./components/Gold";
import { useLanguage, type Language } from "./i18n";

const Logo = ({ size = 72 }: { size?: number }) => (
  <div style={{ width: size, height: size }} className="overflow-hidden rounded-full border border-gold/70">
    <img src="/images/logo.jpg" alt="مجوهرات ابو ادم" className="h-full w-full object-cover" />
  </div>
);

function Hero() {
  const { t } = useLanguage();
  return (
    <header className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <motion.div initial={{ scale: 0, y: 16 }} animate={{ scale: 1, y: 0 }} transition={{ duration: 0.5 }} className="pointer-events-none absolute inset-0" aria-hidden
        style={{ background: "radial-gradient(60% 45% at 50% 38%, #D4AF3724, transparent 70%), radial-gradient(circle at 50% 38%, transparent 0 150px, #C5A46D22 151px 152px, transparent 153px 230px, #C5A46D14 231px 232px, transparent 233px)" }} />
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="relative flex flex-col items-center">
        <Logo size={88} />
        <h1 className="mt-8 font-serif text-5xl font-medium tracking-wide sm:text-7xl gold-text">{t.name}</h1>
        <div className="hairline my-6 w-32" />
        <p className="max-w-xs font-serif text-xl italic text-ivory/90 sm:max-w-md sm:text-2xl">{t.tagline}</p>
        {b.mapsUrl && (
          <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer"
            className="mt-10 inline-flex min-h-[52px] items-center gap-2 border border-gold bg-gold px-8 text-sm font-medium tracking-widest text-ink transition hover:bg-transparent hover:text-gold">
            {t.discover}
          </a>
        )}
      </motion.div>
      <a href="#connect" aria-label={t.scrollToContact} className="absolute bottom-6 text-champagne"><ChevronDown className="h-6 w-6 [animation:drift_2.4s_ease-in-out_infinite]" /></a>
    </header>
  );
}

function Location() {
  const { t } = useLanguage();
  const q = b.mapsEmbedQuery || b.address;
  if (!q && !b.mapsUrl && !b.address) return null;
  return (
    <section id="location" aria-labelledby="loc-h" className="mx-auto max-w-3xl px-5 py-20">
      <h2 id="loc-h" className="text-center font-serif text-3xl tracking-[0.2em] gold-text">{t.visit}</h2>
      <div className="hairline mx-auto my-8 w-40" />
      {b.address && <address className="mb-6 text-center not-italic text-ivory/90">{b.address}</address>}
      {q && (
        <iframe title="Boutique location map" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`}
          className="h-72 w-full border border-white/10 [filter:grayscale(1)_invert(.9)_contrast(.9)] sm:h-96" />
      )}
      {b.mapsUrl && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-2 border border-gold bg-gold px-8 text-sm font-medium tracking-widest text-ink hover:bg-transparent hover:text-gold"><Navigation className="h-4 w-4" />{t.getDirections}</a>
          <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center border border-champagne/60 px-8 text-sm tracking-widest text-champagne hover:border-gold hover:text-gold">{t.openMaps}</a>
        </div>
      )}
    </section>
  );
}

function Footer() {
  const { t } = useLanguage();
  const shortcuts = contactItems.filter((i) => i.label !== "Google Maps" && i.label !== "Phone");
  return (
    <footer className="border-t border-white/10 bg-coal px-5 py-14 text-center">
      <div className="mx-auto flex max-w-md flex-col items-center gap-4">
        <Logo size={56} />
        <p className="font-serif text-2xl gold-text">{t.name}</p>
        <p className="font-serif italic text-ash">{t.statement}</p>
        <ul className="flex gap-3">{shortcuts.map(({ label, href, Icon, external }) => (
          <li key={label}><a href={href} aria-label={label} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-champagne transition hover:border-gold hover:text-gold"><Icon className="h-5 w-5" /></a></li>))}</ul>
        {b.phone && <a href={`tel:${b.phone}`} className="text-ash hover:text-gold">{b.phone}</a>}
        <p className="text-sm text-ash">© {new Date().getFullYear()} {t.name}. {t.rights}</p>
      </div>
    </footer>
  );
}

export default function App() {
  const { language, setLanguage } = useLanguage();
  const languages: { code: Language; label: string }[] = [
    { code: "ar", label: "AR" },
    { code: "fr", label: "FR" },
    { code: "en", label: "EN" },
  ];
  return (
    <>
      <nav aria-label="Language" className="fixed right-4 top-4 z-50 flex overflow-hidden rounded-full border border-gold/40 bg-ink/90 p-1 backdrop-blur">
        {languages.map(({ code, label }) => (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            className={`min-w-10 rounded-full px-2 py-1 text-xs font-medium transition ${language === code ? "bg-gold text-ink" : "text-champagne hover:text-gold"}`}
            aria-current={language === code ? "true" : undefined}
          >
            {label}
          </button>
        ))}
      </nav>
      <Hero /><main><Contact /><Gold /><Location /></main><Footer />
    </>
  );
}

import { Instagram, MessageCircle, Phone, MapPin, Globe, Ghost, Music2, type LucideIcon } from "lucide-react";
import { boutique as b } from "../config/boutique";
import { useLanguage } from "../i18n";

type Item = { label: string; sub: string; href: string; Icon: LucideIcon; external?: boolean; primary?: boolean };
const wa = b.whatsapp ? `https://wa.me/${b.whatsapp}?text=${encodeURIComponent(b.whatsappMessage)}` : "";

export const contactItems: Item[] = ([
  { label: "WhatsApp", sub: "Chat with us", href: wa, Icon: MessageCircle, external: true, primary: true },
  { label: "Google Maps", sub: "Get directions", href: b.mapsUrl, Icon: MapPin, external: true, primary: true },
  { label: "Phone", sub: b.phone, href: b.phone ? `tel:${b.phone}` : "", Icon: Phone },
  { label: "Instagram", sub: "Follow our pieces", href: b.instagram, Icon: Instagram, external: true },
  { label: "Snapchat", sub: "Add us", href: b.snapchat, Icon: Ghost, external: true },
  { label: "TikTok", sub: "Watch", href: b.tiktok, Icon: Music2, external: true },
  { label: "Website", sub: "Visit our site", href: b.website, Icon: Globe, external: true },
] as Item[]).filter((i) => i.href);

export default function Contact() {
  const { t } = useLanguage();
  const wa = b.whatsapp ? `https://wa.me/${b.whatsapp}?text=${encodeURIComponent(t.whatsappMessage)}` : "";
  const translatedItems = contactItems.map((item) => {
    let sub = item.sub;
    if (item.label === "WhatsApp") sub = t.whatsappChat;
    if (item.label === "Google Maps") sub = t.directions;
    if (item.label === "Instagram") sub = t.follow;
    if (item.label === "Snapchat") sub = t.addUs;
    if (item.label === "TikTok") sub = t.watch;
    if (item.label === "Website") sub = t.visitSite;
    return { ...item, sub, href: item.label === "WhatsApp" ? wa : item.href };
  });
  return (
    <section id="connect" aria-labelledby="connect-h" className="mx-auto max-w-3xl px-5 py-20">
      <h2 id="connect-h" className="text-center font-serif text-3xl tracking-[0.2em] gold-text">{t.connect}</h2>
      <div className="hairline mx-auto my-8 w-40" />
      <ul className="grid gap-3 sm:grid-cols-2">
        {translatedItems.map(({ label, sub, href, Icon, external, primary }) => (
          <li key={label}>
            <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`group flex min-h-[64px] items-center gap-4 rounded-sm border px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-coal ${primary ? "border-champagne/60 bg-coal" : "border-white/10"}`}>
              <Icon className="h-6 w-6 shrink-0 text-champagne transition-colors group-hover:text-gold" aria-hidden />
              <span className="flex flex-col"><span className="font-medium">{label}</span><span className="text-sm text-ash">{sub}</span></span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

import { useEffect, useState } from "react";

export type Language = "ar" | "fr" | "en";

type Translations = {
  [Key in keyof typeof translations.en]: string;
};

export const translations = {
  en: {
    tagline: "Gold shaped by hand, worn for a lifetime.",
    statement: "Every piece is chosen and finished with care, so it can be handed down.",
    whatsappMessage: "Hello, I found you through your QR code.",
    discover: "DISCOVER OUR BOUTIQUE",
    scrollToContact: "Scroll to contact",
    connect: "CONNECT WITH US",
    whatsappChat: "Chat with us",
    directions: "Get directions",
    follow: "Follow our pieces",
    addUs: "Add us",
    watch: "Watch",
    visitSite: "Visit our site",
    goldMarket: "THE GOLD MARKET",
    unavailable: "Unavailable",
    manual: "Manually updated",
    live: "Live",
    delayed: "Delayed",
    updated: "Updated",
    noUpdate: "No update yet",
    gold: "Gold",
    startingFrom: "starting from:",
    priceUnavailable: "Price not available",
    priceDisclaimer: "Gold prices are indicative and may vary depending on the jeweler, workmanship, and market conditions.",
    visit: "VISIT THE BOUTIQUE",
    getDirections: "GET DIRECTIONS",
    openMaps: "OPEN IN GOOGLE MAPS",
    rights: "All rights reserved.",
    unit: "DZD",
    g:"g",
    name: "ABU ADEM JEWELLERY"
  },
  fr: {
    tagline: "L'or façonné à la main, porté toute une vie.",
    statement: "Chaque pièce est choisie et finie avec soin pour être transmis.",
    whatsappMessage: "Bonjour, j'ai trouvé votre boutique grâce à votre QR code.",
    discover: "DÉCOUVRIR NOTRE BOUTIQUE",
    scrollToContact: "Voir les coordonnées",
    connect: "CONTACTEZ-NOUS",
    whatsappChat: "Discutez avec nous",
    directions: "Obtenir l'itinéraire",
    follow: "Suivez nos créations",
    addUs: "Ajoutez-nous",
    watch: "Voir",
    visitSite: "Visiter notre site",
    goldMarket: "LE MARCHÉ DE L'OR",
    unavailable: "Indisponible",
    manual: "Mis à jour manuellement",
    live: "En direct",
    delayed: "Retardé",
    updated: "Mis à jour",
    noUpdate: "Pas encore de mise à jour",
    gold: "Or",
    startingFrom: "à partir de :",
    priceUnavailable: "Prix indisponible",
    priceDisclaimer: "Les prix de l'or sont indicatifs et peuvent varier selon le bijoutier, le travail artisanal et les conditions du marché.",
    visit: "VISITEZ NOTRE BOUTIQUE",
    getDirections: "OBTENIR L'ITINÉRAIRE",
    openMaps: "OUVRIR DANS GOOGLE MAPS",
    rights: "Tous droits réservés.",
    unit: "DZD",
    g:"g",
    name: "ABU ADEM JEWELLERY"
  },
  ar: {
    tagline: "ذهب مصنوع يدوياً، يُرتدى مدى الحياة.",
    statement: "يتم اختيار كل قطعة وتشطيبها بعناية لتبقى للأجيال.",
    whatsappMessage: "مرحباً، عثرت عليكم عبر رمز QR.",
    discover: "اكتشف متجرنا",
    scrollToContact: "انتقل إلى التواصل",
    connect: "تواصل معنا",
    whatsappChat: "تحدث معنا",
    directions: "الحصول على الاتجاهات",
    follow: "تابعوا قطعنا",
    addUs: "أضفونا",
    watch: "شاهد",
    visitSite: "زيارة الموقع",
    goldMarket: "سوق الذهب",
    unavailable: "غير متوفر",
    manual: "تحديث يدوي",
    live: "مباشر",
    delayed: "متأخر",
    updated: "آخر تحديث",
    noUpdate: "لا يوجد تحديث بعد",
    gold: "ذهب",
    startingFrom: "ابتداءً من:",
    priceUnavailable: "السعر غير متوفر",
    priceDisclaimer: "أسعار الذهب إرشادية وقد تختلف حسب الصائغ والعمل اليدوي وحالة السوق.",
    visit: "زر متجرنا",
    getDirections: "احصل على الاتجاهات",
    openMaps: "افتح في خرائط Google",
    rights: "جميع الحقوق محفوظة.",
    unit: "دج",
    g:"غ",
    name: "مجوهرات ابو ادم"
  },
} as const;

export function getInitialLanguage(): Language {
  const saved = localStorage.getItem("language");
  if (saved === "ar" || saved === "fr" || saved === "en") return saved;
  return "ar";
}

let currentLanguage = getInitialLanguage();
const listeners = new Set<() => void>();

export function setLanguage(language: Language) {
  currentLanguage = language;
  localStorage.setItem("language", language);
  listeners.forEach((listener) => listener());
}

export function useLanguage() {
  const [language, setLanguageState] = useState(currentLanguage);

  useEffect(() => {
    const listener = () => setLanguageState(currentLanguage);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const t: Translations = translations[language];
  return { language, setLanguage, t };
}

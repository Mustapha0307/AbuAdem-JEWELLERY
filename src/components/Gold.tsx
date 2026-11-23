import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { goldDataUrl } from "../config/boutique";

type Row = { perGram: number | null; previousPerGram: number | null };
type Data = { source: "manual" | "api"; sourceLabel?: string; updatedAt: string | null; currency: string; prices: Record<string, Row> };
const KARATS = ["18", "21", "22", "24"];

function status(d: Data | null): { text: string; tone: string } {
  if (!d || !d.updatedAt || KARATS.every((k) => d.prices[k]?.perGram == null)) return { text: "Unavailable", tone: "text-ash" };
  if (d.source === "manual") return { text: "Manually updated", tone: "text-champagne" };
  const age = Date.now() - new Date(d.updatedAt).getTime();
  return age < 15 * 60_000 ? { text: "Live", tone: "text-gold animate-pulse" } : { text: "Delayed", tone: "text-champagne" };
}

export default function Gold() {
  const [data, setData] = useState<Data | null>(null);
  useEffect(() => {
    fetch(goldDataUrl, { cache: "no-cache" }).then((r) => (r.ok ? r.json() : null)).then(setData).catch(() => setData(null));
  }, []);
  const s = status(data);
  const fmt = new Intl.NumberFormat("fr-DZ", { maximumFractionDigits: 0 });
  return (
    <section id="gold" aria-labelledby="gold-h" className="bg-coal px-5 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 id="gold-h" className="text-center font-serif text-3xl tracking-[0.2em] gold-text">THE GOLD MARKET</h2>
        <div className="hairline mx-auto my-8 w-40" />
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className={s.tone}>● {s.text}{data?.sourceLabel && s.text !== "Unavailable" ? ` · ${data.sourceLabel}` : ""}</span>
          <span className="text-ash ">{data?.updatedAt ? `Updated ${new Date(data.updatedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}` : "No update yet"}</span>
        </div>
        <dl className="grid grid-cols-2 gap-3">
          {KARATS.map((k) => {
            const r = data?.prices[k];
            const has = r?.perGram != null;
            const diff = has && r!.previousPerGram != null ? r!.perGram! - r!.previousPerGram! : 0;
            return (
              <div key={k} className="rounded-sm border border-white/10 bg-ink p-5">
                <dt className="font-serif text-2xl text-champagne">{k}K Gold <small className="text-sm text-ash ">starting from:</small></dt>
                <dd className="mt-3">
                  {has ? (<>
                    <span className="text-2xl font-light">{fmt.format(r!.perGram!)}</span>
                    <span className="ml-1 text-sm text-ash">{data!.currency} / g</span>
                    {diff !== 0 && <span className={`mt-1 flex items-center gap-1 text-sm ${diff > 0 ? "text-gold" : "text-ash"}`}>
                      {diff > 0 ? <ArrowUp className="h-4 w-4" aria-label="Up" /> : <ArrowDown className="h-4 w-4" aria-label="Down" />}{fmt.format(Math.abs(diff))}</span>}
                  </>) : <span className="text-ash">Price not available</span>}
                </dd>
              </div>
            );
          })}
        </dl>
        <p className="mt-6 text-center text-sm leading-relaxed text-ash">Gold prices are indicative and may vary depending on the jeweler, workmanship, and market conditions.</p>
      </div>
    </section>
  );
}

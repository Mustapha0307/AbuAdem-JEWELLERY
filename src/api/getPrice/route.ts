export async function GET() {
  const response = await fetch(
    "https://xaus.com/api/v1/spot?currency=EUR&unit=gram",
    { headers: { Accept: "application/json" }, cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error(`Gold price API returned ${response.status}`);
  }

  const data = await response.json();
  const pricePerGram24k = Number(data?.xau?.price);
  console.log(pricePerGram24k);

  if (!Number.isFinite(pricePerGram24k)) {
    throw new Error("Gold price API returned an invalid price");
  }

  const xaus = (k: number) => {
    const defaultPrice = 28000
    const p = (pricePerGram24k * k) / 24;
    const x = p * 284;
    const t = x + 5500;

    return t < defaultPrice ? defaultPrice : t.toFixed(2);
  };

  const at = (karat: number) => ({
    perGram: xaus(karat),
    previousPerGram: null,
  });

  return Response.json({
    source: "api",
    sourceLabel: "XAU market",
    updatedAt: new Date().toISOString(),
    currency: "DZD",
    prices: {
      "18": at(18),
      "21": at(21),
      "22": at(22),
      "24": at(24),
    },
  });
}

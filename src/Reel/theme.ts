// Identidade visual dos grupos (espelha lib/config.js da extensão).
// ⚠️ Os links de grupo seguem sendo fonte única na extensão; aqui só estilo + CTA visual.

export const GROUPS = {
  kate: {
    name: "Promos da Kate",
    cta: "❣️ Entre no grupo Promos da Kate",
    accent: "#E6007E", // rosa magenta
    accentDark: "#B80064",
    badge: "#FFC400", // selo desconto (dourado)
  },
  musculosas: {
    name: "Ofertas Musculosas",
    cta: "💪 Entra no grupo Ofertas Musculosas",
    accent: "#1E1E1E",
    accentDark: "#000000",
    badge: "#00E0A4",
  },
} as const;

export type GroupId = keyof typeof GROUPS;

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

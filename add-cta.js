const sharp = require("sharp");

const W = 900, H = 1600;
const cx = 450;          // centro horizontal do botão
const cyText = 1548;     // baseline do texto (botão centrado ~1530)
const cta = "LINK NA BIO PARA COMPRAR";

const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .cta {
      font-family: Arial, 'Segoe UI', sans-serif;
      font-weight: 800;
      font-size: 44px;
      letter-spacing: 1px;
      fill: #E6007E;
    }
  </style>
  <text x="${cx}" y="${cyText}" text-anchor="middle" class="cta">${cta}</text>
</svg>`;

sharp("template-src.png")
  .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
  .toFile("template-cta.png")
  .then(() => console.log("gerado: template-cta.png"))
  .catch(console.error);

# Como criar Reels das Promos da Kate

O template já está pronto e salvo no projeto. Cada Reel novo = um arquivo de
dados (JSON) + o vídeo do produto. **O design nunca muda**, só os dados.

## Estrutura
- `src/Reel/Reel.tsx` → o design do template (NÃO precisa mexer)
- `src/Reel/theme.ts`  → cores e CTA dos grupos (kate / musculosas)
- `public/`            → vídeos dos produtos (já tratados: 1080x1920, 18s)
- `props/`             → 1 arquivo JSON por produto
- `out/`               → onde os MP4 finais são salvos

## Passo a passo para um Reel novo

### 1. Tratar o vídeo (remux + aparar para ~18s)
Vídeo do ML/Shopee às vezes vem em container quebrado. Comando:
```
npx remotion ffmpeg -ss 0 -i public/SEU-VIDEO.mp4 -t 18 -c copy -movflags +faststart -y public/produto-X-18s.mp4
```

### 2. Criar o arquivo de dados
Copie um JSON de `props/` e edite. Campos:
```json
{
  "group": "kate",                         // "kate" ou "musculosas"
  "productName": "Nome do produto",
  "priceFrom": 99.99,                       // De
  "priceTo": 62.99,                         // Por (o % é calculado sozinho)
  "coupon": "CODIGO",                       // opcional, remova a linha se não tiver
  "videoSrc": "produto-X-18s.mp4",          // nome do arquivo em public/
  "openingEmoji": "💅"
}
```

### 3. Visualizar no Studio
```
npm run dev
```
Abre http://localhost:3000 → composição "Reel". Para ver com os dados de um
produto, cole o conteúdo do JSON no painel "Props" da direita.

### 4. Renderizar o MP4 final
```
npx remotion render Reel out/NOME-DO-PRODUTO.mp4 --props=props/SEU-ARQUIVO.json
```

## Renderizar vários de uma vez (lote)
No PowerShell, dentro da pasta do projeto:
```powershell
Get-ChildItem props\*.json | ForEach-Object {
  npx remotion render Reel "out\$($_.BaseName).mp4" --props="props\$($_.Name)"
}
```
Isso gera um MP4 em `out/` para cada JSON em `props/`.

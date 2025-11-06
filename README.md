# Calendário Estilo GitHub (Vite + Vanilla JS)

Visual anual (multi-anos) tipo GitHub, com upload de CSV e exportação para PNG.

## Requisitos
- Node 18+
- npm

## Rodar localmente
```bash
npm install
npm run dev
```

Abra a URL indicada (por padrão http://localhost:5173).

## CSV esperado
- Cabeçalho: `data_evento,total_eventos`
- Exemplo em `data/sample.csv`

## Exportar PNG
- Após carregar o CSV, clique em **Exportar como PNG** para baixar a imagem do calendário renderizado.

# Site Policápsula

Site institucional multipágina da Policápsula (transporte pneumático e preparação
de amostras para a cadeia do aço), construído com React, TypeScript e Vite, com
pré-render de todas as rotas.

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Quality gates

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run smoke:visual   # depois do build; use VISUAL_PORT para trocar a porta 4187
```

O build pré-renderiza as rotas públicas em `dist/client` e falha se alguma
imagem referenciada não existir. O `vercel.json` publica esse diretório.

## Conteúdo

Todo texto, foto, produto e contato mora em `src/data/site-content.ts`. Os
componentes só leem desse módulo: é a costura para a etapa 2 (painel de edição),
em que a fonte do conteúdo passa a ser o painel e nenhum componente muda.

## Contato técnico

O mesmo contato técnico aparece na home e na rota `/contato/`. Ele roda só no
navegador, não envia dados a um servidor e abre o WhatsApp oficial com nome,
empresa, e-mail, telefone, serviço e contexto opcional. O bloco também reúne os
canais diretos e o mapa do endereço.

## Sistema visual

O refinamento industrial usa IBM Plex Sans e IBM Plex Mono locais, quinas secas,
chanfros, linhas de processo e o laranja térmico da marca. O smoke visual verifica
que nenhuma rota renderiza cantos arredondados e cobre desktop e mobile.

## Indexação

A prévia fica `noindex` (meta robots, `robots.txt` e cabeçalho `X-Robots-Tag`
no `vercel.json`). Para publicar no domínio oficial: remover o cabeçalho do
`vercel.json` e configurar `PUBLIC_INDEXING=true` e `SITE_URL=https://policapsula.com`.

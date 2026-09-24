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
npm run smoke:visual   # depois do build; sobe o servidor local na porta 4187
```

O build pré-renderiza as rotas públicas em `dist/client` e falha se alguma
imagem referenciada não existir. O `vercel.json` publica esse diretório.

## Conteúdo

Todo texto, foto, produto e contato mora em `src/data/site-content.ts`. Os
componentes só leem desse módulo: é a costura para a etapa 2 (painel de edição),
em que a fonte do conteúdo passa a ser o painel e nenhum componente muda.

## Pedido Pronto

O formulário roda só no navegador: monta a mensagem com item, sistema ou
dimensão, quantidade, urgência, nome e empresa e abre o WhatsApp da Policápsula.
Não há servidor nem variável de ambiente.

## Indexação

A prévia fica `noindex` (meta robots, `robots.txt` e cabeçalho `X-Robots-Tag`
no `vercel.json`). Para publicar no domínio oficial: remover o cabeçalho do
`vercel.json` e configurar `PUBLIC_INDEXING=true` e `SITE_URL=https://policapsula.com`.

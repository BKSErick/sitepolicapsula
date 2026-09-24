/**
 * Todo o conteúdo do site mora neste módulo. Componentes só leem daqui.
 *
 * Costura da etapa 2 (painel de edição): quando a Policápsula passar a editar
 * textos, fotos e produtos por um painel, a fonte deste módulo troca (o site
 * lê o conteúdo publicado na requisição, direto do painel)
 * e nenhum componente precisa mudar.
 *
 * Gate de prova: tudo aqui vem do site institucional da própria Policápsula.
 * Sem certificação, sem número de anos (o "8 anos" do site é de 2021 e não foi
 * reconfirmado), sem resultado numérico e sem superlativo. Os nomes de clientes
 * entram porque a empresa os publica como principais clientes.
 */

export type RouteKind =
  | 'home'
  | 'company'
  | 'solutions'
  | 'solution'
  | 'products'
  | 'contact'
  | 'legal';

export interface PageMeta {
  title: string;
  description: string;
}

export interface PublicRoute {
  path: string;
  kind: RouteKind;
  label: string;
  eyebrow: string;
  heading: string;
  introduction: string;
  meta: PageMeta;
  solutionSlug?: string;
}

export interface MediaAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export type SolutionIcon = 'compass' | 'wind' | 'pill' | 'arrows' | 'flask' | 'wrench';

export type ProductIcon =
  | 'wind'
  | 'hand'
  | 'pill'
  | 'arrows'
  | 'shield'
  | 'disc'
  | 'magnet'
  | 'pen'
  | 'cog'
  | 'circle';

/** As seis etapas do caminho da amostra, da produção ao laboratório. */
export type PathStepKey = 'corrida' | 'capsula' | 'tubo' | 'estacao' | 'bancada' | 'laboratorio';

export interface PathStep {
  key: PathStepKey;
  label: string;
  text: string;
}

export const samplePath: PathStep[] = [
  { key: 'corrida', label: 'Corrida', text: 'A amostra é retirada na área de produção.' },
  { key: 'capsula', label: 'Cápsula', text: 'Segue protegida, no tamanho e no peso do sistema.' },
  { key: 'tubo', label: 'Tubo', text: 'O sistema pneumático leva a cápsula até o destino.' },
  { key: 'estacao', label: 'Estação', text: 'Chega amortecida, com intertravamento mecânico.' },
  { key: 'bancada', label: 'Bancada', text: 'É preparada com a mão do operador protegida.' },
  { key: 'laboratorio', label: 'Laboratório', text: 'Segue para a análise.' },
];

export interface Solution {
  slug: string;
  number: string;
  shortName: string;
  eyebrow: string;
  heading: string;
  introduction: string;
  context: string;
  icon: SolutionIcon;
  /** Etapas do caminho da amostra em que esta frente atua. */
  pathSteps: PathStepKey[];
  services: string[];
  image: MediaAsset;
  cta: string;
  meta: PageMeta;
}

export interface Product {
  slug: string;
  number: string;
  name: string;
  /** Nome curto para chip de pedido e filtro. */
  short: string;
  summary: string;
  solutionSlug: string;
  icon: ProductIcon;
  image?: MediaAsset;
}

export interface Client {
  name: string;
  slug: string;
}

export const company = {
  name: 'Policápsula',
  signature: 'Engenharia do ciclo da amostra',
  tagline: 'Soluções inovadoras para indústria',
  email: 'contato@policapsula.com',
  phone: { label: '(31) 4141-4278', href: 'tel:+553141414278' },
  whatsapp: { label: '(31) 98788-7665', number: '5531987887665' },
  hours: 'Segunda a sexta, das 08h30 às 17h30',
  description: [
    'A Policápsula é uma empresa de engenharia, consultoria, desenvolvimento e manutenção de máquinas e equipamentos. Resolve problemas de processo com produtos e serviços próprios, com atenção à segurança e à qualidade de pessoas, máquinas e equipamentos.',
    'O destaque está nos sistemas de transporte pneumático e na preparação de amostras para análise nos laboratórios da cadeia produtiva do aço: do tubo que leva a amostra à bancada onde ela é preparada.',
    'É parceira de grandes grupos siderúrgicos do Brasil, guiada pela segurança e pela qualidade em tudo que faz.',
  ],
  mission:
    'Desenvolver produtos e serviços inovadores que se tornem soluções, de acordo com a necessidade de cada cliente.',
  vision:
    'Ser referência nacional no desenvolvimento de produtos e serviços para sistemas de envio e preparação de amostras na cadeia produtiva do aço.',
  values: ['Segurança', 'Qualidade', 'Foco do cliente', 'Inovação'],
} as const;

export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${company.whatsapp.number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Na ordem em que a própria Policápsula apresenta os principais clientes. */
export const clients: Client[] = [
  { name: 'ArcelorMittal', slug: 'arcelormittal' },
  { name: 'Vallourec', slug: 'vallourec' },
  { name: 'Usiminas', slug: 'usiminas' },
  { name: 'Villares Metals', slug: 'villares-metals' },
  { name: 'Aperam', slug: 'aperam' },
  { name: 'FLSmidth', slug: 'flsmidth' },
  { name: 'Gerdau', slug: 'gerdau' },
  { name: 'Ternium', slug: 'ternium' },
];

export const media = {
  hero: {
    src: '/media/hero-aciaria.jpg',
    alt: 'Vazamento de metal líquido na aciaria, com operador ao fundo',
    width: 600,
    height: 452,
  },
  corrida: {
    src: '/media/aciaria-corrida.jpg',
    alt: 'Panela vazando aço líquido em meio ao vapor da aciaria',
    width: 1600,
    height: 458,
  },
  faiscas: {
    src: '/media/aciaria-faiscas.jpg',
    alt: 'Operador com roupa de proteção diante das faíscas do forno',
    width: 1600,
    height: 452,
  },
  vazamento: {
    src: '/media/aciaria-vazamento.jpg',
    alt: 'Operador acompanha o vazamento de metal líquido de uma panela',
    width: 1600,
    height: 452,
  },
  capsulasEstacoes: {
    src: '/media/capsulas-estacoes.jpg',
    alt: 'Cápsulas de transporte de amostras e estações de envio e recebimento instaladas',
    width: 1024,
    height: 373,
    caption: 'Cápsulas, estações de envio e recebimento e pontos do sistema instalado',
  },
  capsulasProjeto: {
    src: '/media/capsulas-projeto.jpg',
    alt: 'Cápsulas de transporte de amostras, acondicionamento e desenho técnico do projeto',
    width: 1024,
    height: 373,
    caption: 'Cápsulas, acondicionamento de cápsula e tampa e desenho técnico',
  },
  dispositivo: {
    src: '/media/dispositivo-lixadeira.jpg',
    alt: 'Dispositivo Policápsula acoplado a uma lixadeira de preparação de amostras',
    width: 740,
    height: 740,
    caption: 'Dispositivo Policápsula para lixadeiras',
  },
  thumbSistema: {
    src: '/media/produtos/sistema-transporte.jpg',
    alt: 'Tubos e estação de um sistema de transporte pneumático de amostras',
    width: 480,
    height: 360,
  },
  thumbCapsula: {
    src: '/media/produtos/capsula.jpg',
    alt: 'Cápsula de transporte de amostras aberta, com a tampa ao lado',
    width: 480,
    height: 360,
  },
  thumbEstacao: {
    src: '/media/produtos/estacao.jpg',
    alt: 'Estação de envio e recebimento com cápsula posicionada',
    width: 480,
    height: 360,
  },
  thumbDispositivo: {
    src: '/media/produtos/dispositivo-lixadeira.jpg',
    alt: 'Braço do Dispositivo Policápsula montado sobre a lixadeira',
    width: 480,
    height: 360,
  },
  thumbAcondicionamento: {
    src: '/media/produtos/acondicionamento.jpg',
    alt: 'Acondicionamento de cápsula pneumática e de tampas',
    width: 480,
    height: 360,
  },
} satisfies Record<string, MediaAsset>;

export const solutions: Solution[] = [
  {
    slug: 'consultoria',
    number: '01',
    shortName: 'Consultoria em processos',
    eyebrow: 'TRANSPORTE E PREPARAÇÃO DE AMOSTRAS',
    heading: 'Consultoria para o caminho inteiro da amostra.',
    introduction:
      'Consultoria em processos de transporte e preparação de amostras: do estudo de viabilidade à adequação de cápsulas e aos padrões de operação e manutenção.',
    context:
      'A consultoria olha o processo de transporte e de preparação de amostras como um todo. Cobre o estudo de viabilidade e o projeto de sistemas, a adequação de cápsulas para sistemas já em operação, com nacionalização e melhorias, e a elaboração de padrões de operação e manutenção, com auditorias.',
    icon: 'compass',
    pathSteps: ['corrida', 'capsula', 'tubo', 'estacao', 'bancada', 'laboratorio'],
    services: [
      'Consultoria em processos de transporte e preparação de amostras',
      'Estudo de viabilidade e projeto',
      'Adequação e nacionalização de cápsulas',
      'Padrões de operação e manutenção',
      'Análise e definição de indicadores',
      'Auditorias',
    ],
    image: media.capsulasProjeto,
    cta: 'Montar pedido de consultoria',
    meta: {
      title: 'Consultoria em Transporte e Preparação de Amostras | Policápsula',
      description:
        'Consultoria em processos de transporte e preparação de amostras: viabilidade, projeto, adequação de cápsulas, padrões de operação e auditorias.',
    },
  },
  {
    slug: 'transporte-pneumatico',
    number: '02',
    shortName: 'Transporte pneumático',
    eyebrow: 'SISTEMAS DE ENVIO DE AMOSTRAS',
    heading: 'O sistema que leva a amostra da produção ao laboratório.',
    introduction:
      'Engenharia, fabricação, instalação e manutenção de sistemas de transporte pneumático de amostras, do estudo de viabilidade ao sistema em operação.',
    context:
      'O trabalho começa no estudo de viabilidade e no projeto e segue pela fabricação, pela instalação e pela manutenção eletromecânica em diferentes tipos de sistema de transporte pneumático, inclusive nos que já estão em operação.',
    icon: 'wind',
    pathSteps: ['tubo'],
    services: [
      'Estudo de viabilidade e projeto',
      'Fabricação e instalação do sistema',
      'Manutenção eletromecânica em diferentes tipos de sistema',
      'Manutenção corretiva e preventiva de cápsulas',
    ],
    image: media.capsulasEstacoes,
    cta: 'Montar pedido de transporte pneumático',
    meta: {
      title: 'Sistemas de Transporte Pneumático de Amostras | Policápsula',
      description:
        'Engenharia, fabricação, instalação e manutenção de sistemas de transporte pneumático de amostras para laboratórios da cadeia produtiva do aço.',
    },
  },
  {
    slug: 'capsulas',
    number: '03',
    shortName: 'Cápsulas',
    eyebrow: 'CÁPSULAS (TORPEDOS) INDUSTRIAIS',
    heading: 'Cápsula fabricada para o seu sistema, com o projeto revisado.',
    introduction:
      'Cápsulas para transporte de amostras fabricadas conforme a dimensão e o peso de cada sistema, sempre olhando para o que pode melhorar no projeto existente.',
    context:
      'A consultoria de adequação cobre engenharia, fabricação, nacionalização com melhorias e manutenção de cápsulas para sistemas de transporte pneumático que já estão em operação, com cápsulas de diferentes matérias-primas.',
    icon: 'pill',
    pathSteps: ['capsula'],
    services: [
      'Engenharia e adequação ao sistema existente',
      'Nacionalização com melhorias no projeto',
      'Fabricação conforme dimensão e peso',
      'Manutenção corretiva e preventiva',
    ],
    image: media.capsulasProjeto,
    cta: 'Montar pedido de cápsulas',
    meta: {
      title: 'Cápsulas Industriais para Transporte de Amostras | Policápsula',
      description:
        'Cápsulas (torpedos) fabricadas conforme a dimensão e o peso de cada sistema, com nacionalização, melhoria do projeto existente e manutenção.',
    },
  },
  {
    slug: 'estacoes-e-amortecedores',
    number: '04',
    shortName: 'Estações e amortecedores',
    eyebrow: 'ENVIO E RECEBIMENTO',
    heading: 'Chegada controlada. Sistema protegido.',
    introduction:
      'Estações de envio e recebimento com intertravamento mecânico e amortecedores reguláveis que absorvem o impacto da cápsula na chegada.',
    context:
      'Engenharia, fabricação e manutenção das estações usadas nos sistemas de transporte pneumático de cápsulas, e dos amortecedores reguláveis com batentes que recebem a cápsula na chegada à estação de envio e recebimento.',
    icon: 'arrows',
    pathSteps: ['estacao'],
    services: [
      'Engenharia e fabricação de estações',
      'Intertravamento mecânico',
      'Amortecedores reguláveis com batentes',
      'Instalação e manutenção',
    ],
    image: media.capsulasEstacoes,
    cta: 'Montar pedido de estação ou amortecedor',
    meta: {
      title: 'Estações de Envio e Recebimento e Amortecedores | Policápsula',
      description:
        'Estações de envio e recebimento de cápsulas com intertravamento mecânico e amortecedores reguláveis com batentes para o impacto da chegada.',
    },
  },
  {
    slug: 'preparacao-de-amostras',
    number: '05',
    shortName: 'Preparação de amostras',
    eyebrow: 'BANCADA DE LABORATÓRIO',
    heading: 'Preparação de amostra sem risco para a mão de quem prepara.',
    introduction:
      'Dispositivos, suportes, lixadeira, placa magnética e acessórios para preparar amostras com mais segurança para o operador.',
    context:
      'Cada item responde a uma tarefa da bancada: lixar a amostra sem expor os dedos, segurar a peça com proteção térmica, fixar o corpo de prova na retífica, separar o ferro metálico da escória, preparar o fio máquina para análise. O desenvolvimento segue as amostras e a necessidade de cada cliente.',
    icon: 'flask',
    pathSteps: ['bancada'],
    services: [
      'Desenvolvimento conforme a amostra do cliente',
      'Equipamentos que atendem à NR10 e à NR12',
      'Suporte para apoio do corpo de prova',
      'Manutenção de moldes e troca de abrasivos',
    ],
    image: media.dispositivo,
    cta: 'Montar pedido para a bancada',
    meta: {
      title: 'Dispositivos para Preparação de Amostras | Policápsula',
      description:
        'Dispositivo para lixadeiras, suportes, lixadeira NR10 e NR12, placa magnética, separador magnético, mandril e molde para preparação de amostras.',
    },
  },
  {
    slug: 'engenharia-de-manutencao',
    number: '06',
    shortName: 'Engenharia de manutenção',
    eyebrow: 'MÁQUINAS, NR10 E NR12',
    heading: 'Máquina adequada à norma. Manutenção guiada por indicador.',
    introduction:
      'Inspeção, manutenção preventiva e corretiva, adequação à NR10 e à NR12 e gestão da manutenção baseada em confiabilidade.',
    context:
      'Alterações eletromecânicas para otimizar máquinas e equipamentos, como inversor de frequência, dispositivos de segurança e mudanças de acionamento. Na gestão, análise e definição de indicadores, padrões operacionais e de manutenção, auditorias e estoque de sobressalentes just in time baseado em MCC, a Manutenção Centrada em Confiabilidade.',
    icon: 'wrench',
    pathSteps: ['corrida', 'tubo', 'estacao', 'bancada'],
    services: [
      'Inspeção e manutenção preventiva e corretiva',
      'Adequação de máquinas à NR10 e à NR12',
      'Inversor de frequência e dispositivos de segurança',
      'Indicadores e padrões de operação e manutenção',
      'Estoque de sobressalentes baseado em MCC',
      'Auditorias',
    ],
    image: media.corrida,
    cta: 'Montar pedido de engenharia de manutenção',
    meta: {
      title: 'Engenharia de Manutenção e Adequação NR10 e NR12 | Policápsula',
      description:
        'Inspeção, manutenção preventiva e corretiva, adequação de máquinas à NR10 e à NR12, indicadores, padrões e estoque de sobressalentes por MCC.',
    },
  },
];

/** Os dez produtos, na ordem do catálogo publicado pela Policápsula. */
export const products: Product[] = [
  {
    slug: 'sistema-transporte-pneumatico',
    number: '01',
    name: 'Sistema de Transporte Pneumático Policápsula',
    short: 'Sistema pneumático',
    summary: 'Projeto, fabricação e instalação do sistema que envia a amostra por tubo até o laboratório.',
    solutionSlug: 'transporte-pneumatico',
    icon: 'wind',
    image: media.thumbSistema,
  },
  {
    slug: 'dispositivo-lixadeira',
    number: '02',
    name: 'Dispositivo Policápsula para lixadeiras',
    short: 'Dispositivo para lixadeira',
    summary:
      'Braço adaptável a vários modelos de lixadeira (politriz). O operador elimina o risco de lixar os dedos na preparação da amostra.',
    solutionSlug: 'preparacao-de-amostras',
    icon: 'hand',
    image: media.thumbDispositivo,
  },
  {
    slug: 'capsulas-torpedos',
    number: '03',
    name: 'Cápsulas (torpedos) industriais',
    short: 'Cápsulas (torpedos)',
    summary:
      'Fabricadas conforme as características dimensionais e o peso do sistema do cliente, com melhorias no projeto existente.',
    solutionSlug: 'capsulas',
    icon: 'pill',
    image: media.thumbCapsula,
  },
  {
    slug: 'estacoes-envio-recebimento',
    number: '04',
    name: 'Estações de envio e recebimento',
    short: 'Estações',
    summary: 'Com intertravamento mecânico e sistema de amortecimento para a chegada da cápsula.',
    solutionSlug: 'estacoes-e-amortecedores',
    icon: 'arrows',
    image: media.thumbEstacao,
  },
  {
    slug: 'suportes-lixar-amostras',
    number: '05',
    name: 'Suportes para lixar amostras',
    short: 'Suportes para lixar',
    summary:
      'Proteção térmica para as mãos e contra lixamento acidental dos dedos. Modelos magnético retangular, magnético cilíndrico e ajustável.',
    solutionSlug: 'preparacao-de-amostras',
    icon: 'shield',
  },
  {
    slug: 'lixadeira-policapsula',
    number: '06',
    name: 'Lixadeira Policápsula',
    short: 'Lixadeira',
    summary: 'Lixadeira para preparação de amostras que atende às normas de segurança NR10 e NR12.',
    solutionSlug: 'preparacao-de-amostras',
    icon: 'disc',
  },
  {
    slug: 'placa-magnetica',
    number: '07',
    name: 'Placa magnética (eletroímã)',
    short: 'Placa magnética',
    summary:
      'Para retífica pendular, tornearia e oficinas, com suporte para apoio do corpo de prova conforme a necessidade do cliente.',
    solutionSlug: 'preparacao-de-amostras',
    icon: 'magnet',
  },
  {
    slug: 'separador-magnetico',
    number: '08',
    name: 'Separador magnético de laboratório',
    short: 'Separador magnético',
    summary: 'Caneta magnética que separa o ferro metálico da escória.',
    solutionSlug: 'preparacao-de-amostras',
    icon: 'pen',
  },
  {
    slug: 'mandril-fio-maquina',
    number: '09',
    name: 'Mandril para análise de fio máquina',
    short: 'Mandril',
    summary: 'Mandril conforme as bitolas de cada cliente e disco nivelador para preparar o fio máquina para análise.',
    solutionSlug: 'preparacao-de-amostras',
    icon: 'cog',
  },
  {
    slug: 'molde-abrasivos',
    number: '10',
    name: 'Molde usinado para abrasivos',
    short: 'Molde para abrasivos',
    summary:
      'Moldes de alumínio para abrasivos tipo anel em retíficas pendulares, com mais segurança operacional na preparação de amostras.',
    solutionSlug: 'preparacao-de-amostras',
    icon: 'circle',
  },
];

export function productsFor(solutionSlug: string): Product[] {
  return products.filter((product) => product.solutionSlug === solutionSlug);
}

export const home = {
  heroLines: ['Da corrida', 'ao laboratório.'],
  heroFacts: ['Cadeia do aço', '06 frentes técnicas', '10 produtos próprios', 'NR10 · NR12'],
} as const;

export interface RequestOption {
  value: string;
  label: string;
  short: string;
  group: 'Produtos' | 'Serviços';
}

/** Itens do Pedido Pronto: os dez produtos e as seis frentes como serviço. */
export const requestCatalog: RequestOption[] = [
  ...products.map((product) => ({
    value: product.slug,
    label: product.name,
    short: product.short,
    group: 'Produtos' as const,
  })),
  ...solutions.map((solution) => ({
    value: solution.slug,
    label: `Serviço: ${solution.shortName.toLowerCase()}`,
    short: solution.shortName,
    group: 'Serviços' as const,
  })),
];

export const urgencyOptions = [
  'Parada ou risco à operação',
  'Nesta semana',
  'Neste mês',
  'Planejamento ou orçamento',
] as const;

export function findRequestOption(value?: string | null): RequestOption | undefined {
  return requestCatalog.find((option) => option.value === value);
}

export const navigation = [
  { label: 'Soluções', href: '/solucoes/' },
  { label: 'Produtos', href: '/produtos/' },
  { label: 'Empresa', href: '/empresa/' },
  { label: 'Contato', href: '/contato/' },
];

const coreRoutes: PublicRoute[] = [
  {
    path: '/',
    kind: 'home',
    label: 'Início',
    eyebrow: 'TRANSPORTE PNEUMÁTICO E PREPARAÇÃO DE AMOSTRAS',
    heading: 'Da corrida ao laboratório.',
    introduction:
      'Engenharia, fabricação, instalação e manutenção de sistemas de transporte pneumático, cápsulas e dispositivos de preparação de amostras para a cadeia produtiva do aço.',
    meta: {
      title: 'Policápsula | Transporte Pneumático e Preparação de Amostras',
      description:
        'Sistemas de transporte pneumático, cápsulas, estações e dispositivos de preparação de amostras para laboratórios da cadeia produtiva do aço.',
    },
  },
  {
    path: '/empresa/',
    kind: 'company',
    label: 'Empresa',
    eyebrow: 'POLICÁPSULA · ENGENHARIA DO CICLO DA AMOSTRA',
    heading: 'Especialistas no caminho da amostra dentro da cadeia do aço.',
    introduction:
      'Engenharia, consultoria, desenvolvimento e manutenção de máquinas e equipamentos, com produtos próprios para transporte e preparação de amostras.',
    meta: {
      title: 'Empresa | Policápsula Engenharia do Ciclo da Amostra',
      description:
        'Conheça a Policápsula: engenharia, consultoria, desenvolvimento e manutenção para transporte pneumático e preparação de amostras na cadeia do aço.',
    },
  },
  {
    path: '/solucoes/',
    kind: 'solutions',
    label: 'Soluções',
    eyebrow: 'SEIS FRENTES · UM CAMINHO DA AMOSTRA',
    heading: 'Do tubo pneumático à bancada de preparação.',
    introduction:
      'Seis frentes técnicas cobrem o caminho inteiro da amostra: a consultoria que desenha o processo, o sistema que transporta, a cápsula que viaja, a estação que recebe, a bancada que prepara e a manutenção que mantém tudo em operação.',
    meta: {
      title: 'Soluções em Transporte e Preparação de Amostras | Policápsula',
      description:
        'Consultoria, transporte pneumático, cápsulas, estações e amortecedores, preparação de amostras e engenharia de manutenção para a indústria do aço.',
    },
  },
  {
    path: '/produtos/',
    kind: 'products',
    label: 'Produtos',
    eyebrow: 'CATÁLOGO · 10 PRODUTOS PRÓPRIOS',
    heading: 'Equipamentos projetados para a rotina da cadeia do aço.',
    introduction:
      'Do sistema de transporte pneumático aos acessórios da bancada, cada produto Policápsula responde a uma tarefa real do transporte e da preparação de amostras.',
    meta: {
      title: 'Produtos para Transporte e Preparação de Amostras | Policápsula',
      description:
        'Catálogo Policápsula: sistema pneumático, cápsulas, estações, dispositivo para lixadeiras, suportes, lixadeira, placa magnética, separador e mandril.',
    },
  },
  {
    path: '/contato/',
    kind: 'contact',
    label: 'Contato',
    eyebrow: 'PEDIDO PRONTO · WHATSAPP',
    heading: 'Informe o item e a medida. A conversa começa no ponto.',
    introduction:
      'Escolha o item, informe o sistema, o modelo ou a dimensão, a quantidade e a urgência. O pedido chega pronto no WhatsApp da Policápsula.',
    meta: {
      title: 'Contato e Pedido pelo WhatsApp | Policápsula',
      description:
        'Monte o pedido com item, sistema ou dimensão, quantidade e urgência e envie direto para o WhatsApp da equipe técnica da Policápsula.',
    },
  },
  {
    path: '/privacidade/',
    kind: 'legal',
    label: 'Privacidade',
    eyebrow: 'PRIVACIDADE E DADOS',
    heading: 'Como os dados informados no site são tratados.',
    introduction:
      'Esta página apresenta os princípios de tratamento das informações fornecidas no pedido pelo site e nos canais de contato.',
    meta: {
      title: 'Política de Privacidade | Policápsula',
      description:
        'Consulte como a Policápsula trata os dados informados no pedido pelo site, no WhatsApp e nos demais canais digitais de contato.',
    },
  },
];

const solutionRoutes: PublicRoute[] = solutions.map((solution) => ({
  path: `/solucoes/${solution.slug}/`,
  kind: 'solution',
  label: solution.shortName,
  eyebrow: `FRENTE ${solution.number} · ${solution.eyebrow}`,
  heading: solution.heading,
  introduction: solution.introduction,
  meta: solution.meta,
  solutionSlug: solution.slug,
}));

/** Rotas fixas do site, na ordem de leitura: início, empresa, soluções e as seis frentes, depois o resto. */
export const staticRoutes: PublicRoute[] = [
  ...coreRoutes.slice(0, 3),
  ...solutionRoutes,
  ...coreRoutes.slice(3),
];

const staticRouteByPath = new Map(staticRoutes.map((route) => [route.path, route]));

export function normalizePathname(pathname: string): string {
  if (pathname === '/') {
    return pathname;
  }

  return `${pathname.replace(/\/+$/, '')}/`;
}

export function findRoute(pathname: string): PublicRoute | undefined {
  return staticRouteByPath.get(normalizePathname(pathname));
}

export function findSolution(slug?: string): Solution | undefined {
  return solutions.find((solution) => solution.slug === slug);
}

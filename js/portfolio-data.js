/* ==========================================================================
   PORTFÓLIO – JOTA EDI
   --------------------------------------------------------------------------
   COMO ATUALIZAR (não é preciso mexer no HTML):

   1. Coloque as fotos na pasta  img/portfolio/
      Sugestão de nome:  nome-da-obra-antes.jpg / -durante.jpg / -depois.jpg
      (JPG ou WebP, cerca de 1600 px de largura, até ~400 KB cada)

   2. Copie um bloco { ... } da lista PROJETOS abaixo e preencha os campos.
      - categoria: use uma das chaves de CATEGORIAS (ex.: 'cimento-queimado')
      - fotos: caminho de cada etapa. Deixe '' se não houver foto daquela etapa.
      - exemplo: true marca o card como "projeto ilustrativo". APAGUE os
        exemplos abaixo (ou remova essa linha) ao cadastrar obras reais.

   3. Salve o arquivo e publique. A galeria e os filtros se atualizam sozinhos.
   ========================================================================== */

window.JOTAEDI_CATEGORIAS = {
  'pintura':            'Pintura de alto padrão',
  'texturas':           'Texturas decorativas',
  'pedras-minerais':    'Pedras naturais e minerais',
  'gran-fino':          'Gran fino',
  'cimento-queimado':   'Cimento queimado',
  'cristalina':         'Cristalina e projetada',
  'barro-tai':          'Barro e Taí Pau-Brasil',
  'aco-corten':         'Aço corten',
  'especiais':          'Acabamentos especiais'
};

window.JOTAEDI_PROJETOS = [
  {
    titulo: 'Hall social – edifício residencial',
    categoria: 'cimento-queimado',
    local: 'Grande São Paulo',
    tipo: 'Residencial vertical',
    descricao: 'Paredes do hall em cimento queimado com juntas alinhadas ao projeto de iluminação.',
    fotos: { antes: '', durante: '', depois: '' },
    exemplo: true
  },
  {
    titulo: 'Fachada corporativa',
    categoria: 'aco-corten',
    local: 'Grande São Paulo',
    tipo: 'Comercial',
    descricao: 'Painéis com efeito aço corten aplicados sobre substrato preparado e protegido.',
    fotos: { antes: '', durante: '', depois: '' },
    exemplo: true
  },
  {
    titulo: 'Áreas comuns – torre residencial',
    categoria: 'pintura',
    local: 'Grande São Paulo',
    tipo: 'Residencial vertical',
    descricao: 'Pintura interna de alto padrão com correção de superfícies e acabamento acetinado.',
    fotos: { antes: '', durante: '', depois: '' },
    exemplo: true
  },
  {
    titulo: 'Living – residência de alto padrão',
    categoria: 'pedras-minerais',
    local: 'Interior de SP',
    tipo: 'Residencial',
    descricao: 'Parede de destaque com efeito mineral, especificada pelo escritório de arquitetura.',
    fotos: { antes: '', durante: '', depois: '' },
    exemplo: true
  },
  {
    titulo: 'Loja conceito',
    categoria: 'barro-tai',
    local: 'Grande São Paulo',
    tipo: 'Varejo',
    descricao: 'Acabamento em barro com tonalidade natural reforçando a identidade da marca.',
    fotos: { antes: '', durante: '', depois: '' },
    exemplo: true
  },
  {
    titulo: 'Fachada – condomínio de casas',
    categoria: 'gran-fino',
    local: 'Interior de SP',
    tipo: 'Residencial horizontal',
    descricao: 'Gran fino em fachadas com controle de emendas e uniformidade de textura.',
    fotos: { antes: '', durante: '', depois: '' },
    exemplo: true
  },
  {
    titulo: 'Escritório corporativo',
    categoria: 'texturas',
    local: 'Grande São Paulo',
    tipo: 'Corporativo',
    descricao: 'Textura decorativa contemporânea em recepção e salas de reunião.',
    fotos: { antes: '', durante: '', depois: '' },
    exemplo: true
  },
  {
    titulo: 'Empreendimento de uso misto',
    categoria: 'cristalina',
    local: 'Interior de SP',
    tipo: 'Uso misto',
    descricao: 'Aplicação projetada conforme especificação técnica do memorial descritivo.',
    fotos: { antes: '', durante: '', depois: '' },
    exemplo: true
  },
  {
    titulo: 'Restaurante',
    categoria: 'especiais',
    local: 'Grande São Paulo',
    tipo: 'Gastronomia',
    descricao: 'Solução personalizada combinando efeito metálico e textura mineral.',
    fotos: { antes: '', durante: '', depois: '' },
    exemplo: true
  }
];

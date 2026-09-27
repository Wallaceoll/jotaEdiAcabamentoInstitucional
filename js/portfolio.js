/* JOTA EDI – renderização da galeria de portfólio a partir de js/portfolio-data.js */
(function () {
  'use strict';

  var grid = document.getElementById('portfolio-grid');
  var filtersEl = document.getElementById('portfolio-filtros');
  var countEl = document.getElementById('portfolio-contagem');
  if (!grid || !filtersEl) return;

  var CATEGORIAS = window.JOTAEDI_CATEGORIAS || {};
  var PROJETOS = window.JOTAEDI_PROJETOS || [];
  var FASES = [['antes', 'Antes'], ['durante', 'Durante'], ['depois', 'Depois']];
  // Tom do placeholder enquanto não houver foto
  var TONS = {
    'pintura': 'tone-pintura', 'texturas': 'tone-textura', 'pedras-minerais': 'tone-pedra',
    'gran-fino': 'tone-granfino', 'cimento-queimado': 'tone-cimento', 'cristalina': 'tone-cristalina',
    'barro-tai': 'tone-barro', 'aco-corten': 'tone-corten', 'especiais': 'tone-especial'
  };

  var el = function (tag, attrs, text) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    if (text) node.textContent = text;
    return node;
  };

  var renderMedia = function (media, projeto, fase, faseLabel) {
    media.textContent = '';
    var src = projeto.fotos && projeto.fotos[fase];
    if (src) {
      media.removeAttribute('data-ph');
      media.appendChild(el('img', {
        src: src, loading: 'lazy', decoding: 'async', width: '1200', height: '900',
        alt: projeto.titulo + ' – ' + (CATEGORIAS[projeto.categoria] || '') + ' (' + faseLabel.toLowerCase() + ')'
      }));
    } else {
      media.setAttribute('data-ph', 'Foto – ' + faseLabel);
    }
  };

  var cards = PROJETOS.map(function (p, i) {
    var cat = CATEGORIAS[p.categoria] || p.categoria;
    var card = el('article', { class: 'project reveal', 'data-categoria': p.categoria });
    var media = el('div', { class: 'media ' + (TONS[p.categoria] || 'tone-pintura'), role: 'img', 'aria-label': p.titulo });

    // Mostra por padrão a etapa "depois"; se não houver, a última com foto
    var comFoto = FASES.filter(function (f) { return p.fotos && p.fotos[f[0]]; });
    var inicial = comFoto.length ? comFoto[comFoto.length - 1] : FASES[2];
    renderMedia(media, p, inicial[0], inicial[1]);
    if (comFoto.length) media.removeAttribute('role');

    var tabs = el('div', { class: 'phase-tabs', role: 'group', 'aria-label': 'Etapas da obra: ' + p.titulo });
    FASES.forEach(function (f) {
      var btn = el('button', { type: 'button', class: 'phase-tab', 'aria-pressed': String(f === inicial) }, f[1]);
      if (comFoto.length && !(p.fotos && p.fotos[f[0]])) btn.disabled = true;
      btn.addEventListener('click', function () {
        tabs.querySelectorAll('.phase-tab').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        renderMedia(media, p, f[0], f[1]);
      });
      tabs.appendChild(btn);
    });

    var body = el('div', { class: 'project-body' });
    body.appendChild(el('span', { class: 'project-cat' }, cat));
    body.appendChild(el('h3', {}, p.titulo));
    body.appendChild(el('div', { class: 'project-meta' }, [p.tipo, p.local].filter(Boolean).join(' · ')));
    if (p.descricao) body.appendChild(el('p', {}, p.descricao));
    if (p.exemplo) body.appendChild(el('p', { class: 'project-example' }, 'Projeto ilustrativo – fotos em breve'));

    card.appendChild(media);
    card.appendChild(tabs);
    card.appendChild(body);
    card.style.transitionDelay = (i % 3) * 80 + 'ms';
    return card;
  });

  grid.textContent = '';
  if (!cards.length) {
    grid.appendChild(el('p', { class: 'portfolio-empty' }, 'Em breve, novos projetos. Acompanhe no Instagram @jota_edi.'));
  }
  cards.forEach(function (c) { grid.appendChild(c); c.classList.add('is-visible'); });

  // Filtros: só aparecem categorias que têm projetos
  var usadas = Object.keys(CATEGORIAS).filter(function (k) {
    return PROJETOS.some(function (p) { return p.categoria === k; });
  });
  var botoes = [];
  var aplicar = function (cat) {
    var n = 0;
    cards.forEach(function (c) {
      var show = cat === 'todos' || c.getAttribute('data-categoria') === cat;
      c.hidden = !show;
      if (show) n++;
    });
    botoes.forEach(function (b) { b.setAttribute('aria-pressed', String(b.value === cat)); });
    if (countEl) countEl.textContent = n + (n === 1 ? ' projeto exibido' : ' projetos exibidos');
    if (history.replaceState) {
      var url = new URL(window.location);
      if (cat === 'todos') url.searchParams.delete('filtro'); else url.searchParams.set('filtro', cat);
      history.replaceState(null, '', url);
    }
  };

  [['todos', 'Todos']].concat(usadas.map(function (k) { return [k, CATEGORIAS[k]]; })).forEach(function (item) {
    var b = el('button', { type: 'button', class: 'filter-btn', value: item[0], 'aria-pressed': 'false' }, item[1]);
    b.addEventListener('click', function () { aplicar(item[0]); });
    botoes.push(b);
    filtersEl.appendChild(b);
  });

  var inicial = new URLSearchParams(window.location.search).get('filtro');
  aplicar(inicial && usadas.indexOf(inicial) > -1 ? inicial : 'todos');
})();

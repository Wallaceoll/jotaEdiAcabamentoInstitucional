/* JOTA EDI – scripts globais (menu, animações, formulário de contato) */
(function () {
  'use strict';

  var WHATSAPP = '5511937161515';
  var EMAIL = 'jotaedi@hotmail.com';

  document.documentElement.classList.remove('no-js');

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu');
  if (toggle && nav) {
    var setMenu = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
    };
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 1101px)').addEventListener('change', function (mq) {
      if (mq.matches) setMenu(false);
    });
  }

  /* ---------- Header ao rolar ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 12); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Animações de entrada ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Ano no rodapé ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Formulário de contato ----------
     Site estático: o envio monta a mensagem e abre o WhatsApp ou o e-mail.
     Para enviar a um serviço de formulários (ex.: Formspree), basta definir
     o atributo action/method no <form> e remover o preventDefault abaixo. */
  var form = document.getElementById('form-contato');
  if (!form) return;

  // Pré-seleciona o acabamento quando vier de ?acabamento=... (links das especialidades)
  var params = new URLSearchParams(window.location.search);
  var pre = params.get('acabamento');
  if (pre && form.acabamento) {
    var opt = form.acabamento.querySelector('option[value="' + CSS.escape(pre) + '"]');
    if (opt) form.acabamento.value = pre;
  }

  var status = document.getElementById('form-status');

  var showError = function (field, msg) {
    var err = document.getElementById(field.id + '-erro');
    field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) err.textContent = msg || '';
  };

  var validate = function () {
    var firstInvalid = null;
    Array.prototype.forEach.call(form.elements, function (field) {
      if (!field.willValidate || field.type === 'submit') return;
      var msg = '';
      if (field.validity.valueMissing) msg = 'Preencha este campo.';
      else if (field.validity.typeMismatch) msg = 'Verifique o formato informado.';
      else if (field.validity.tooShort) msg = 'Escreva um pouco mais sobre o projeto.';
      showError(field, msg);
      if (msg && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  };

  form.addEventListener('input', function (e) {
    if (e.target.getAttribute('aria-invalid') === 'true' && e.target.checkValidity()) showError(e.target, '');
  });

  var label = function (select) {
    return select.value ? select.options[select.selectedIndex].text : '';
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) {
      status.textContent = 'Revise os campos destacados.';
      return;
    }
    var f = form.elements;
    var linhas = [
      'Olá, Jota Edi! Gostaria de conversar sobre um projeto.',
      '',
      'Nome: ' + f.nome.value.trim(),
      'Empresa: ' + f.empresa.value.trim(),
      f.cargo.value.trim() ? 'Cargo: ' + f.cargo.value.trim() : null,
      'Tipo de empresa: ' + label(f.tipo_empresa),
      'Cidade da obra: ' + f.cidade.value.trim(),
      f.acabamento.value ? 'Acabamento de interesse: ' + label(f.acabamento) : null,
      f.email.value.trim() ? 'E-mail: ' + f.email.value.trim() : null,
      f.telefone.value.trim() ? 'Telefone: ' + f.telefone.value.trim() : null,
      '',
      'Mensagem:',
      f.mensagem.value.trim()
    ].filter(function (l) { return l !== null; });
    var texto = linhas.join('\n');

    var canal = e.submitter && e.submitter.value === 'email' ? 'email' : 'whatsapp';
    if (canal === 'email') {
      var assunto = 'Contato pelo site – ' + f.empresa.value.trim();
      window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(assunto) + '&body=' + encodeURIComponent(texto);
      status.textContent = 'Abrimos seu aplicativo de e-mail com a mensagem pronta. Basta enviar.';
    } else {
      window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
      status.textContent = 'Abrimos o WhatsApp com a mensagem pronta. Basta enviar.';
    }
  });
})();

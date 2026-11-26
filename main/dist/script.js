/* ============================================================
   PARKING CENTER S.A.S. — script.js
   Fondo de estelas, pantalla de carga, animaciones al hacer
   scroll, tema claro/oscuro y efectos de cursor.
   Es solo frontend: si algo falla, el contenido sigue visible.
   ============================================================ */
(function () {
  'use strict';

  // Sonido de click solo en botones, enlaces, imágenes, tarjetas y controles (no en espacios vacíos).
  // Viene ACTIVADO por defecto; los botones de altavoz (intro y cabecera) lo apagan/encienden y se recuerda.
  var SON = true;
  try { SON = localStorage.getItem('pc-son') !== '0'; } catch (e) {}
  (function () {
    var exts = ['mp4', 'mp3', 'm4a', 'wav', 'ogg'], au, i = 0;
    try {
      au = new Audio(); au.preload = 'auto'; au.volume = 0.7;
      var next = function () { if (i < exts.length) { au.src = 'click.' + exts[i++]; au.load(); } };
      au.addEventListener('error', next); next();
    } catch (e) { return; }
    var SEL = 'a,button,input,select,textarea,label,img,svg,[role="radio"],.spot,.chip,.car-wrap,.char,.panel,.ticker';
    var play = function () { try { au.currentTime = 0; var r = au.play(); if (r && r.catch) r.catch(function () {}); } catch (err) { /* sin audio */ } };
    document.addEventListener('click', function (e) {
      var t = e.target;
      if (!SON || !t || !t.closest || !t.closest(SEL) || t.closest('.son-btn')) return;
      play();
    }, true);
    var btns = Array.prototype.slice.call(document.querySelectorAll('.son-btn'));
    var pinta = function () {
      btns.forEach(function (b) {
        b.setAttribute('aria-pressed', SON ? 'true' : 'false');
        b.title = SON ? 'Silenciar el sonido del mouse' : 'Activar el sonido del mouse';
      });
    };
    pinta();
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        SON = !SON; pinta();
        try { localStorage.setItem('pc-son', SON ? '1' : '0'); } catch (e) {}
        if (SON) play();
      });
    });
  })();

  window.__pcIntro = true;
  var root = document.documentElement, body = document.body;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

  // Si algo falla, se quita la clase "js" y todo el contenido queda visible
  root.classList.add('js');
  addEventListener('error', function () { root.classList.remove('js'); });


  // ── 1. Estelas de luz (faros blancos y luces de freno rojas) ───────────
  var scrollSpeed = 0;
  (function () {
    var fx = $('.bg-fx'); if (!fx) return;
    var cv = document.createElement('canvas'); fx.insertBefore(cv, fx.firstChild);
    var ctx = cv.getContext('2d'), w = 0, h = 0, list = [], running = true, last = 0;

    function make(init) {
      var dir = Math.random() < .5 ? 1 : -1;               // 1 = derecha (faros), -1 = izquierda (freno)
      return {
        x: init ? Math.random() * w : (dir > 0 ? -300 : w + 300), y: Math.random() * h,
        len: 90 + Math.random() * 220, v: (.6 + Math.random() * 1.6) * dir, dir: dir,
        a: .12 + Math.random() * .3, th: Math.random() < .25 ? 3 : 1.5
      };
    }
    function resize() {
      var dpr = Math.min(devicePixelRatio || 1, 2); w = innerWidth; h = innerHeight;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      list = []; for (var i = 0; i < (w < 700 ? 9 : 20); i++) list.push(make(true));
    }
    function frame(t) {
      if (!running) return;
      if (root.classList.contains('switching')) { last = t; requestAnimationFrame(frame); return; }
      var dt = Math.min(48, t - last) / 16.7; last = t;
      var light = root.getAttribute('data-theme') === 'light', boost = 1 + scrollSpeed * .5;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < list.length; i++) {
        var s = list[i]; s.x += s.v * dt * boost;
        if ((s.dir > 0 && s.x - s.len > w) || (s.dir < 0 && s.x + s.len < 0)) { list[i] = make(false); continue; }
        var x0 = s.x - s.dir * s.len, g = ctx.createLinearGradient(x0, 0, s.x, 0);
        var c = s.dir > 0 ? (light ? '230,150,0' : '255,236,160') : (light ? '214,43,69' : '255,61,87');
        g.addColorStop(0, 'rgba(' + c + ',0)'); g.addColorStop(1, 'rgba(' + c + ',' + (light ? s.a * 1.1 : s.a) + ')');
        ctx.strokeStyle = g; ctx.lineWidth = s.th; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(x0, s.y); ctx.lineTo(s.x, s.y); ctx.stroke();
        ctx.fillStyle = 'rgba(' + c + ',' + Math.min(1, s.a * 2.4) + ')';
        ctx.beginPath(); ctx.arc(s.x, s.y, s.th * 1.3, 0, 6.283); ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    resize();
    if (reduced) { frame(0); running = false; } else requestAnimationFrame(frame);
    var rt; addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(resize, 200); });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) running = false; else if (!reduced && !running) { running = true; requestAnimationFrame(frame); }
    });
  })();


  // ── 2. Intro: tarjeta con golpe y persiana que sube ────────────────────
  var en = $('#en'), heroCounted = false;
  function heroCount() {
    if (heroCounted) return; heroCounted = true;
    $$('.hero-stats [data-count]').forEach(countUp);
  }
  function abrirSitio() {
    // Las animaciones del hero estaban pensadas para empezar a ~1.8 s: se adelantan
    try {
      document.getAnimations().forEach(function (a) {
        var tg = a.effect && a.effect.target, d = a.effect && a.effect.getTiming().delay;
        if (tg && !(en && en.contains(tg)) && d >= 1500) a.currentTime = 1450;
      });
    } catch (e) { /* sin API de animaciones */ }
    root.classList.remove('intro'); body.style.overflow = '';
    setTimeout(heroCount, 900);
  }
  if (en) {
    var enPlaca = $('#en-placa'), enBtn = $('#en-abrir'), entrado = false;
    body.style.overflow = 'hidden';
    requestAnimationFrame(function () { enPlaca.classList.add('lista'); });
    var golpe = function (g) {
      enPlaca.style.setProperty('--giro', g); enPlaca.classList.remove('golpe'); void enPlaca.offsetWidth; enPlaca.classList.add('golpe');
      try { navigator.vibrate && navigator.vibrate(18); } catch (e) { /* sin vibración */ }
    };
    var entrar = function () {
      if (entrado) return; entrado = true; enBtn.disabled = true;
      var t = reduced ? [0, 0, 0, 0] : [30, 320, 630, 720];
      if (!reduced) {
        setTimeout(function () { golpe('-.6deg'); }, t[0]);
        setTimeout(function () { golpe('.6deg'); }, t[1]);
        setTimeout(function () { golpe('-.9deg'); }, t[2]);
      }
      setTimeout(function () { en.classList.add('abre'); abrirSitio(); }, t[3]);
      setTimeout(function () { if (en.parentNode) en.parentNode.removeChild(en); }, t[3] + 1450);
    };
    enBtn.addEventListener('click', entrar);
    // La persiana NO se mueve con arrastres, rueda ni teclado: solo se abre al hacer clic en el botón
    var quieto = function (e) { if (!entrado || en.parentNode) e.preventDefault(); };
    ['touchmove', 'wheel'].forEach(function (t) { en.addEventListener(t, quieto, { passive: false }); });
    addEventListener('scroll', function () { if (!entrado) scrollTo(0, 0); }, { passive: true });
    setTimeout(function () { try { enBtn.focus({ preventScroll: true }); } catch (e) { /* sin foco */ } }, 50);
  } else { root.classList.remove('intro'); }

  // ── 3. Título del hero letra por letra ─────────────────────────────────
  var ci = 0;
  $$('.hero-title span').forEach(function (line) {
    var txt = line.textContent; line.textContent = '';
    line.setAttribute('aria-hidden', 'true');
    txt.split('').forEach(function (ch) {
      var s = document.createElement('span');
      s.className = 'char'; s.style.setProperty('--i', ci++); s.textContent = ch;
      line.appendChild(s);
    });
  });


  // ── 4. Tema claro / oscuro con transición circular ─────────────────────
  var themeBtn = $('#themeBtn');
  function setTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('pc-theme', t); } catch (e) { /* sin almacenamiento */ }
    var m = $('meta[name="theme-color"]'); if (m) m.setAttribute('content', t === 'light' ? '#f3f0e8' : '#07080d');
  }
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    themeBtn.classList.remove('spin'); void themeBtn.offsetWidth; themeBtn.classList.add('spin');
    if (!document.startViewTransition || reduced) { setTheme(next); return; }
    var r = themeBtn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    var R = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.classList.add('switching');
    var vt = document.startViewTransition(function () { setTheme(next); });
    vt.ready.then(function () {
      root.animate({ clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + R + 'px at ' + x + 'px ' + y + 'px)'] },
        { duration: 900, easing: 'cubic-bezier(.77,0,.18,1)', pseudoElement: '::view-transition-new(root)' });
    }).catch(function () {});
    var done = function () { root.classList.remove('switching'); };
    vt.finished.then(done, done);
  });


  // ── 4b. Menú hamburguesa (celular) ─────────────────────────────────────
  (function () {
    var m = $('#menu'), ab = $('#menuAbrir'), ce = $('#menuCerrar'); if (!m || !ab || !ce) return;
    var abrir = function () {
      m.hidden = false; ab.setAttribute('aria-expanded', 'true');
      requestAnimationFrame(function () { m.classList.add('abierto'); });
      body.style.overflow = 'hidden'; try { ce.focus(); } catch (e) { /* sin foco */ }
    };
    var cerrar = function () {
      m.classList.remove('abierto'); m.hidden = true; ab.setAttribute('aria-expanded', 'false'); body.style.overflow = '';
    };
    ab.addEventListener('click', abrir); ce.addEventListener('click', cerrar);
    $$('a', m).forEach(function (a) { a.addEventListener('click', cerrar); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !m.hidden) cerrar(); });
    addEventListener('resize', function () { if (innerWidth >= 900 && !m.hidden) cerrar(); });
  })();


  // ── 5. Aparición al hacer scroll (con variantes) y contadores ──────────
  var variants = ['rv-up', 'rv-zoom', 'rv-up'];
  $$('.reveal').forEach(function (el) {
    var sibs = $$('.reveal', el.parentNode).filter(function (n) { return n.parentNode === el.parentNode; });
    var i = Math.max(0, sibs.indexOf(el)), v;
    if (el.classList.contains('head')) v = 'rv-left';
    else if (el.classList.contains('calc') || el.classList.contains('cta')) v = 'rv-zoom';
    else if (el.classList.contains('f-wide')) v = 'rv-up';
    else if (sibs.length === 3) v = i === 0 ? 'rv-left' : (i === 2 ? 'rv-right' : 'rv-up');
    else v = variants[i % 3];
    el.classList.add(v);
    el.style.setProperty('--rd', ((i % 3) * .12).toFixed(2) + 's');
  });

  var fmt = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); };
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count')); if (isNaN(target) || reduced) return;
    var suf = el.getAttribute('data-suffix') || '', dot = el.hasAttribute('data-dot'), t0 = performance.now();
    (function step(t) {
      var p = clamp((t - t0) / 1600, 0, 1), e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p), v = Math.round(target * e);
      el.textContent = (dot ? fmt(v) : v) + suf;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  function show(el) {
    if (el.classList.contains('visible')) return;
    el.classList.add('visible');
    $$('[data-count]', el).forEach(countUp);
    setTimeout(function () { el.style.removeProperty('--rd'); }, 1800);
  }
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
  }, { threshold: .1, rootMargin: '0px 0px -30px 0px' }) : null;
  $$('.reveal').forEach(function (el) { if (io) io.observe(el); else show(el); });
  // Contadores del hero (no están dentro de un .reveal)
  if (!en) setTimeout(heroCount, 600);


  // ── 6. Scroll: progreso, menú, sección activa, camino de pasos ─────────
  var nav = $('#nav'), links = $$('.nav-links a'), steps = $('#steps'), stage = $('#stage');
  var secs = links.map(function (a) { return $(a.getAttribute('href')); });
  var ticking = false, lastY = 0;
  function update() {
    ticking = false;
    var y = scrollY, max = root.scrollHeight - innerHeight;
    scrollSpeed = clamp(Math.abs(y - lastY) / 40, 0, 6); lastY = y;
    var bar = $('.scroll-progress'); if (bar) bar.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
    if (nav) nav.classList.toggle('scrolled', y > 30);
    if (stage) stage.style.setProperty('--sy', Math.min(y, 800));
    if (steps) { var r = steps.getBoundingClientRect(); steps.style.setProperty('--sp', clamp((innerHeight * .75 - r.top) / (r.height + 60), 0, 1).toFixed(3)); }
    var cur = -1; secs.forEach(function (s, i) { if (s && s.getBoundingClientRect().top <= innerHeight * .4) cur = i; });
    links.forEach(function (a, i) { a.classList.toggle('active', i === cur); });
    // Respaldo: si el observador falla, muestra lo que ya está a la vista
    $$('.reveal:not(.visible)').forEach(function (el) { if (el.getBoundingClientRect().top < innerHeight * .9) show(el); });
  }
  var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });
  update();
  setInterval(function () { scrollSpeed *= .8; }, 120);


  // ── 7. Luz que sigue al cursor + inclinación 3D en tarjetas ────────────
  $$('.spot').forEach(function (el) {
    var tilt = fine && !reduced && el.classList.contains('tilt');
    el.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var r = el.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      el.style.setProperty('--mx', x + 'px'); el.style.setProperty('--my', y + 'px');
      if (tilt) {
        el.classList.add('tilting');
        el.style.setProperty('--rx', ((.5 - y / r.height) * 12).toFixed(2) + 'deg');
        el.style.setProperty('--ry', ((x / r.width - .5) * 14).toFixed(2) + 'deg');
      }
    });
    el.addEventListener('pointerleave', function () {
      el.classList.remove('tilting'); el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg');
    });
  });

  var glow = $('.cursor-glow'), tx = innerWidth / 2, ty = innerHeight / 3, gx = tx, gy = ty;
  if (fine && !reduced && glow) {
    addEventListener('pointermove', function (e) { tx = e.clientX; ty = e.clientY; glow.classList.add('on'); }, { passive: true });
    document.addEventListener('pointerleave', function () { glow.classList.remove('on'); });
    (function loop() {
      gx = lerp(gx, tx, .08); gy = lerp(gy, ty, .08);
      glow.style.transform = 'translate(' + gx + 'px,' + gy + 'px)';
      requestAnimationFrame(loop);
    })();
  }


  // ── 8. Botones: efecto imán y onda al hacer clic ───────────────────────
  if (fine && !reduced) $$('.buttons .btn, .nav .btn').forEach(function (b) {
    b.addEventListener('pointermove', function (e) {
      var r = b.getBoundingClientRect();
      b.style.setProperty('--bx', ((e.clientX - r.left - r.width / 2) * .25).toFixed(1) + 'px');
      b.style.setProperty('--by', ((e.clientY - r.top - r.height / 2) * .35).toFixed(1) + 'px');
    });
    b.addEventListener('pointerleave', function () { b.style.setProperty('--bx', '0px'); b.style.setProperty('--by', '0px'); });
  });
  document.addEventListener('pointerdown', function (e) {
    var b = e.target.closest ? e.target.closest('.btn') : null; if (!b || reduced) return;
    var r = b.getBoundingClientRect(), s = Math.max(r.width, r.height), rip = document.createElement('span');
    rip.className = 'ripple';
    rip.style.cssText = 'width:' + s + 'px;height:' + s + 'px;left:' + (e.clientX - r.left - s / 2) + 'px;top:' + (e.clientY - r.top - s / 2) + 'px';
    b.appendChild(rip); setTimeout(function () { if (rip.parentNode) rip.parentNode.removeChild(rip); }, 750);
  });
})();

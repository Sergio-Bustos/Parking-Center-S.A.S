/* ============================================================
   PARKING CENTER S.A.S. — demo.js
   1) Panel en vivo: simula entradas y salidas de vehículos.
      Son datos de ejemplo generados al azar (no hay backend).
   2) Simulador de cobro con las mismas tarifas y el mismo
      redondeo hacia arriba que usa el programa.
   ============================================================ */
(function () {
  'use strict';

  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s) { return document.querySelector(s); };
  var fmt = function (n) { return '$' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); };
  var RATES = { Moto: 1000, Carro: 2000, Camioneta: 2500 };
  var TYPES = ['Carro', 'Moto', 'Carro', 'Camioneta'];


  // ── 1. Panel en vivo ───────────────────────────────────────────────────
  var feed = $('#feed'), kTotal = $('#kpiTotal'), kActive = $('#kpiActive'), toast = $('#toast');
  if (feed && kTotal && kActive) {
    var L = 'ABCDEFGHJKLMNPRSTUVWXYZ', total = 0, cars = [], toastTimer;
    var pick = function (s) { return s.charAt(Math.floor(Math.random() * s.length)); };
    var plate = function (moto) {
      var a = pick(L) + pick(L) + pick(L), d = '' + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
      return a + ' ' + d + (moto ? pick(L) : Math.floor(Math.random() * 10));
    };
    var mmss = function (s) { var m = Math.floor(s / 60), r = s % 60; return (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r; };

    function add(type, secs) {
      var li = document.createElement('li'); li.className = 'row';
      li.innerHTML = '<span class="plate"></span><span class="vt"></span><time></time>';
      var c = { type: type, secs: secs, plate: plate(type === 'Moto'), el: li };
      li.firstChild.textContent = c.plate; li.children[1].textContent = type;
      li.lastChild.textContent = mmss(secs);
      feed.insertBefore(li, feed.firstChild); cars.unshift(c); return c;
    }
    function render() { kActive.textContent = cars.length; kTotal.textContent = fmt(total); }
    function bump(el) { el.style.transition = 'transform .35s cubic-bezier(.34,1.56,.64,1)'; el.style.transform = 'scale(1.18)'; setTimeout(function () { el.style.transform = ''; }, 320); }

    function say(msg) {
      if (!toast) return; toast.textContent = msg; toast.classList.add('show');
      clearTimeout(toastTimer); toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2200);
    }
    function leave() {
      if (cars.length < 2) return;
      var c = cars.pop(), hours = 1 + Math.floor(Math.random() * 4), cost = hours * RATES[c.type];
      total += cost; c.el.classList.add('out');
      setTimeout(function () { if (c.el.parentNode) c.el.parentNode.removeChild(c.el); }, 600);
      say('Salida ' + c.plate + ' · ' + hours + ' h · ' + fmt(cost)); bump(kTotal); render();
    }
    function enter() {
      if (cars.length >= 4) { leave(); return; }
      add(TYPES[Math.floor(Math.random() * TYPES.length)], 0); bump(kActive); render();
    }

    // Arranca con 3 vehículos de ejemplo (reemplaza las filas de relleno del HTML)
    feed.innerHTML = '';
    add('Camioneta', 11); add('Moto', 27); add('Carro', 42); render();
    if (!reduced) {
      setInterval(function () { cars.forEach(function (c) { c.secs++; c.el.lastChild.textContent = mmss(c.secs); }); }, 1000);
      setTimeout(function () { setInterval(function () { Math.random() < .55 ? enter() : leave(); }, 3200); }, 5200);
    }
  }


  // ── 2. Simulador de cobro ──────────────────────────────────────────────
  var range = $('#calcRange'), out = $('#calcTime'), hrs = $('#calcHours'), rate = $('#calcRate'), tot = $('#calcTotal');
  var seg = document.querySelectorAll('.seg button'), cur = 2000;
  if (range && out && hrs && rate && tot) {
    var prev = '';
    function calc() {
      var min = +range.value, h = Math.ceil(min / 60), hh = Math.floor(min / 60), mm = min % 60;
      out.textContent = (hh ? hh + ' h ' : '') + (mm ? mm + ' min' : '').trim() || '0 min';
      hrs.textContent = h; rate.textContent = fmt(cur); tot.textContent = fmt(h * cur);
      range.style.setProperty('--rp', ((min - range.min) / (range.max - range.min) * 100).toFixed(1) + '%');
      var key = h + '-' + cur;
      if (key !== prev && tot.parentNode) { tot.parentNode.classList.remove('bump'); void tot.offsetWidth; tot.parentNode.classList.add('bump'); }
      prev = key;
    }
    range.addEventListener('input', calc);
    Array.prototype.forEach.call(seg, function (b) {
      b.addEventListener('click', function () {
        Array.prototype.forEach.call(seg, function (o) { o.classList.remove('on'); o.setAttribute('aria-checked', 'false'); });
        b.classList.add('on'); b.setAttribute('aria-checked', 'true'); cur = +b.getAttribute('data-rate'); calc();
      });
    });
    calc();
  }
})();

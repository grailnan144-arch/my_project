/* ============================================================
   INTERACTIVE MAP OF ASIA — homepage photo frame
   ------------------------------------------------------------
   The map in the white photo frame is real SVG geometry, not a
   screenshot: every country is its own <path>, so each one can
   be hovered, highlighted and clicked on its own. The geometry
   itself lives inline in index.html, so the map cannot disappear
   after the page finishes loading; this file only adds behaviour.

   Country shapes come from the free amCharts SVG map of Asia
   (map data derived from Natural Earth — public domain).

   To change which photos a country shows, edit COUNTRY_PHOTOS below:
   the key is the ISO country code and the values are file paths inside
   images/MAP/. A country without an entry (or without photos) shows
   the "no photos yet" message — nothing is ever invented.
   ============================================================ */
(function () {
  'use strict';

  /* ============================================================
     COUNTRY → PHOTOS
     Jarred's country photos live in images/MAP/<COUNTRY>/ and every
     folder is named after one of the locations drawn on the map, so
     the list below only follows the folder structure that already
     exists — no country is guessed. Folders that are still empty
     (Philippines, Thailand) fall through to the friendly empty state.

     Original file names and capitalisation are kept exactly as they
     are on disk (including "malasyia (1).jpg" and "SOUTH KOREA"),
     and the paths stay relative so they work at
     http://localhost:8080/my_project/ as well as on the deployed site.
     ============================================================ */
  var MAP_DIR = 'images/MAP/';

  var COUNTRY_PHOTOS = {
    CN: ['CHINA/china (1).jpg', 'CHINA/china (2).jpg'],
    HK: ['HONGKONG/hongkong.jpg'],
    ID: ['INDONESIA/indonesia (1).jpg', 'INDONESIA/indonesia (2).jpg'],
    JP: ['JAPAN/japan (1).jpg', 'JAPAN/japan (2).jpg', 'JAPAN/japan (3).jpg', 'JAPAN/japan (4).jpg'],
    MY: ['MALAYSIA/malasyia (1).jpg', 'MALAYSIA/malasyia (2).jpg'],
    PH: [],
    SG: ['SINGAPORE/singapore (1).jpg', 'SINGAPORE/singapore (2).jpg'],
    KR: ['SOUTH KOREA/south_korea.jpg'],
    TH: [],
    TW: ['TAIWAN/taiwan (1).jpg', 'TAIWAN/taiwan (2).jpg'],
    VN: ['VIETNAM/vietnam.jpg', 'VIETNAM/vietnam.mp4']
  };

  function isVideoSrc(src) {
    return /\.(mp4|webm|ogg|mov)$/i.test(String(src || ''));
  }

  var EMPTY_MESSAGE = 'No photos available for this destination yet.';

  /* ---------- helpers ---------- */
  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function overlayEl() { return document.getElementById('mapGalleryOverlay'); }

  function countryGalleryIsOpen() {
    var o = overlayEl();
    return !!(o && !o.classList.contains('hidden'));
  }

  /* ---------- country gallery ---------- */
  var lastFocused = null;

  function openCountryGallery(code, name) {
    var overlay = overlayEl();
    var body = document.getElementById('mapGalleryBody');
    var title = document.getElementById('mapGalleryTitle');
    if (!overlay || !body || !title) return;

    title.textContent = name || code;

    /* the same country's flag is printed beside its name */
    var flag = document.getElementById('mapGalleryFlag');
    if (flag) {
      flag.style.display = '';
      flag.alt = (name || code) + ' flag';
      flag.onerror = function () { flag.style.display = 'none'; };
      var flagSrc = FLAG_DIR + String(code || '').toLowerCase() + '.png';
      if (flag.getAttribute('src') !== flagSrc) flag.setAttribute('src', flagSrc);
    }

    var files = COUNTRY_PHOTOS[code] || [];
    var html = '';
    for (var i = 0; i < files.length; i++) {
      var src = MAP_DIR + files[i];
      var label = (name || code) + ' photo ' + (i + 1);
      html += '<figure>' +
        (isVideoSrc(src)
          ? '<video src="' + esc(src) + '" controls playsinline preload="metadata" aria-label="' + esc(label) + '"></video>'
          : '<img src="' + esc(src) + '" alt="' + esc(label) + '">') +
        '</figure>';
    }
    if (!html) html = '<p class="map-gallery-empty">' + EMPTY_MESSAGE + '</p>';
    body.innerHTML = html;

    /* a missing file must not break the gallery */
    var media = body.querySelectorAll('img, video');
    Array.prototype.forEach.call(media, function (node) {
      node.addEventListener('error', function () {
        var fig = node.parentNode;
        if (fig && fig.tagName === 'FIGURE') fig.className = 'is-broken';
      });
    });

    lastFocused = document.activeElement;
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    var closeBtn = document.getElementById('mapGalleryClose');
    if (closeBtn) {
      window.setTimeout(function () {
        if (countryGalleryIsOpen()) closeBtn.focus();
      }, 40);
    }
  }

  function closeCountryGallery() {
    var overlay = overlayEl();
    if (!overlay || overlay.classList.contains('hidden')) return;
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) {
      try { lastFocused.focus(); } catch (err) { /* element gone */ }
    }
    lastFocused = null;
  }

  /* ---------- small-country tap targets ----------
     Island nations such as the Philippines or Singapore are only a
     few pixels wide once the whole continent fits in the frame,
     especially on a phone. Each country smaller than MIN_PX gets an
     invisible round pad at its centre, so a finger can still hit it.
     The pads carry the same data-code, so every handler below works
     for both the country shape and its pad. */
  var MIN_PX = 15;

  function buildTapPads() {
    var map = document.querySelector('#asiaMap svg');
    if (!map) return;
    var old = map.querySelectorAll('circle.land-hit');
    Array.prototype.forEach.call(old, function (c) {
      if (c.parentNode) c.parentNode.removeChild(c);
    });
    var ctm = map.getScreenCTM();
    if (!ctm || !ctm.a) return;
    var scale = ctm.a;

    /* a point that is really inside the country: the middle of its
       bounding box often falls in the sea (an archipelago like the
       Philippines), so a coarse grid is scanned until one lands on
       the filled shape */
    function interiorPoint(p, b) {
      var cx = b.x + b.width / 2;
      var cy = b.y + b.height / 2;
      if (typeof p.isPointInFill !== 'function') return { x: cx, y: cy, center: true };
      if (p.isPointInFill(new DOMPoint(cx, cy))) return { x: cx, y: cy, center: true };
      for (var gy = 1; gy <= 7; gy++) {
        for (var gx = 1; gx <= 7; gx++) {
          var x = b.x + (b.width * gx) / 8;
          var y = b.y + (b.height * gy) / 8;
          if (p.isPointInFill(new DOMPoint(x, y))) return { x: x, y: y, center: false };
        }
      }
      return { x: cx, y: cy, center: true };
    }

    Array.prototype.forEach.call(map.querySelectorAll('path.land'), function (p) {
      var r = p.getBoundingClientRect();
      if (!r.width || !r.height) return;
      var b = p.getBBox();
      if (!b.width || !b.height) return;
      var pt = interiorPoint(p, b);
      /* small countries always get a pad; big ones get one only when
         their own middle is not on their land (e.g. island nations) */
      if (r.width >= MIN_PX && r.height >= MIN_PX && pt.center) return;
      var pad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      pad.setAttribute('class', 'land-hit');
      pad.setAttribute('cx', pt.x.toFixed(2));
      pad.setAttribute('cy', pt.y.toFixed(2));
      pad.setAttribute('r', (MIN_PX / 2 / scale).toFixed(2));
      pad.setAttribute('data-code', p.getAttribute('data-code'));
      pad.setAttribute('data-name', p.getAttribute('data-name'));
      map.appendChild(pad);
    });
  }

  /* ---------- hover flag card ----------
     Pointing at a country (or focusing it with the keyboard) brings
     up a small card with that country's flag and name, which follows
     the pointer. The flag files live in images/flags/ (lowercase ISO
     code). A missing flag simply hides the picture; the name stays. */
  var FLAG_DIR = 'images/flags/';

  function initFlagCard(map, countryFrom) {
    var holder = document.getElementById('asiaMap');
    var card = document.getElementById('mapFlagCard');
    var img = document.getElementById('mapFlagImg');
    var nameEl = document.getElementById('mapFlagName');
    if (!holder || !card || !img || !nameEl) return;

    var hideTimer = 0;
    var currentCode = '';

    function place(clientX, clientY) {
      var hr = holder.getBoundingClientRect();
      var cw = card.offsetWidth;
      var ch = card.offsetHeight;
      var x = clientX - hr.left + 14;
      var y = clientY - hr.top + 16;
      if (x + cw > hr.width - 6) x = clientX - hr.left - cw - 14;
      if (y + ch > hr.height - 6) y = clientY - hr.top - ch - 16;
      card.style.left = Math.max(4, Math.round(x)) + 'px';
      card.style.top = Math.max(4, Math.round(y)) + 'px';
    }

    function show(code, name, clientX, clientY) {
      window.clearTimeout(hideTimer);
      if (code !== currentCode) {
        currentCode = code;
        nameEl.textContent = name || code;
        var src = FLAG_DIR + String(code || '').toLowerCase() + '.png';
        if (img.getAttribute('src') !== src) img.setAttribute('src', src);
      }
      card.classList.add('is-on');
      if (typeof clientX === 'number') place(clientX, clientY);
    }

    function hide() {
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(function () {
        card.classList.remove('is-on');
        currentCode = '';
      }, 70);
    }

    map.addEventListener('mousemove', function (e) {
      var node = countryFrom(e.target);
      if (!node) { hide(); return; }
      show(node.getAttribute('data-code'), node.getAttribute('data-name'), e.clientX, e.clientY);
    });
    map.addEventListener('mouseleave', hide);

    /* keyboard: the card is pinned above the focused country */
    map.addEventListener('focusin', function (e) {
      var node = countryFrom(e.target);
      if (!node) return;
      var r = node.getBoundingClientRect();
      show(node.getAttribute('data-code'), node.getAttribute('data-name'),
           r.left + r.width / 2, r.top - 8);
    });
    map.addEventListener('focusout', hide);

    img.addEventListener('error', function () { img.style.display = 'none'; });
    img.addEventListener('load', function () { img.style.display = ''; });
  }

  /* ---------- wiring ---------- */
  function initAsiaMap() {
    var holder = document.getElementById('asiaMap');
    if (!holder) return;

    /* The geometry itself is already in index.html, so the map is on
       screen from the first paint and stays there. This script only
       adds behaviour on top of it; if the SVG is ever missing the
       fallback message inside the frame simply stays visible. */
    var map = holder.querySelector('svg');
    if (!map || !map.querySelector('path.land')) return;
    holder.classList.add('is-ready');

    function countryFrom(target) {
      var node = target && target.closest ? target.closest('[data-code]') : null;
      return node && node.getAttribute ? node : null;
    }

    map.addEventListener('click', function (e) {
      var node = countryFrom(e.target);
      if (!node) return;
      openCountryGallery(node.getAttribute('data-code'), node.getAttribute('data-name'));
    });

    map.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var node = countryFrom(e.target);
      if (!node) return;
      e.preventDefault();
      openCountryGallery(node.getAttribute('data-code'), node.getAttribute('data-name'));
    });

    /* flag + country name appear under the pointer */
    initFlagCard(map, countryFrom);

    /* "See my Adventures!" already opens My Gallery through the shared
       data-nav wiring in main.js; this only adds the keyboard half */
    var adventures = document.getElementById('mapAdventures');
    if (adventures) {
      adventures.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        adventures.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      });
    }

    /* pads are sized against the rendered map, so they are rebuilt
       after the first layout and whenever the window changes size */
    window.requestAnimationFrame(buildTapPads);
    /* late image loads can still shift the layout, so measure once
       more after the whole page has finished loading */
    window.addEventListener('load', buildTapPads);
    var padTimer = 0;
    window.addEventListener('resize', function () {
      window.clearTimeout(padTimer);
      padTimer = window.setTimeout(buildTapPads, 200);
    });

    /* gallery controls: close button, click outside, Escape */
    var closeBtn = document.getElementById('mapGalleryClose');
    if (closeBtn) closeBtn.addEventListener('click', closeCountryGallery);

    var overlay = overlayEl();
    if (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay ||
            (e.target.hasAttribute && e.target.hasAttribute('data-map-close'))) {
          closeCountryGallery();
        }
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && countryGalleryIsOpen()) closeCountryGallery();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAsiaMap);
  } else {
    initAsiaMap();
  }
})();

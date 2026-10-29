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
  "use strict";

  /* ============================================================
     COUNTRY → PHOTOS
     Jarred's country photos live in images/MAP/<COUNTRY>/ and every
     folder is named after one of the locations drawn on the map, so
     the list below only follows the folder structure that already
     exists — no country is guessed. Every file inside a country's
     folder appears in that country's gallery, and nothing else does.

     Original file names and capitalisation are kept exactly as they
     are on disk (including "SOUTH KOREA"), and the paths stay
     relative so they work at http://localhost:8080/my_project/ as
     well as on the deployed site.
     ============================================================ */
  var MAP_DIR = "images/MAP/";

  var COUNTRY_PHOTOS = {
    CN: [
      "CHINA/china (1).jpg",
      "CHINA/china (2).jpg",
      "CHINA/china (3).jpg",
      "CHINA/china.mp4",
    ],
    HK: [
      "HONGKONG/hongkong (1).jpg",
      "HONGKONG/hongkong (2).jpg",
      "HONGKONG/hongkong (3).mp4",
      "HONGKONG/hongkong (4).jpg",
    ],
    ID: [
      "INDONESIA/indonesia (1).jpg",
      "INDONESIA/indonesia (2).jpg",
      "INDONESIA/indonesia (3).jpg",
    ],
    /* Japan, Taiwan, Vietnam and the Philippines are printed with the
       wide (landscape) photographs on top and the smaller, portrait or
       square ones below them. Every file is kept, in its own folder,
       and each group keeps its original file order. */
     JP: [
       "JAPAN/japan (1).jpg",
       "JAPAN/japan (2).jpg",
       "JAPAN/japan (3).jpg",
       "JAPAN/japan (4).jpg",
       "JAPAN/japan (5).jpg",
       "JAPAN/japan (6).jpg",
       "JAPAN/japan (7).mp4",
     ],
    MY: [
      "MALAYSIA/malaysia (1).jpg",
      "MALAYSIA/malaysia (2).jpg",
      "MALAYSIA/malaysia (3).jpg",
    ],
    PH: [
      "PHILIPPINES/philippines (1).jpg",
      "PHILIPPINES/philippines (2).jpg",
      "PHILIPPINES/philippines (5).jpg",
      "PHILIPPINES/philippines (3).jpg",
      "PHILIPPINES/philippines (4).jpg",
      "PHILIPPINES/philippines (6).jpg",
    ],
    SG: [
      "SINGAPORE/singapore (1).jpg",
      "SINGAPORE/singapore (2).jpg",
      "SINGAPORE/singapore (3).jpg",
    ],
    KR: [
      "SOUTH KOREA/south_korea (1).jpg",
      "SOUTH KOREA/south_korea (2).jpg",
      "SOUTH KOREA/south_korea (3).jpg",
    ],
    TH: [
      "THAILAND/thailand (1).jpg",
      "THAILAND/thailand (2).jpg",
      "THAILAND/thailand (3).jpg",
      "THAILAND/thailand (1).mp4",
    ],
    TW: [
      "TAIWAN/taiwan (1).jpg",
      "TAIWAN/taiwan (3).jpg",
      "TAIWAN/taiwan (2).jpg",
    ],
    VN: [
      "VIETNAM/vietnam (2).jpg",
      "VIETNAM/vietnam (1).jpg",
      "VIETNAM/vietnam (1).mp4",
    ],
  };

  function isVideoSrc(src) {
    return /\.(mp4|webm|ogg|mov)$/i.test(String(src || ""));
  }

  var EMPTY_MESSAGE = "No photos available for this destination yet.";

  /* ---- destination subtitles ----
     One short travel line per country, printed under the country's
     own name. Only the wording is added here: the country names,
     the map labels and the photographs stay exactly as they are. */
  var DESTINATION_SUBTITLES = {
    CN: "Ancient culture. Modern wonders. Endless discoveries.",
    HK: "Neon streets, harbour lights and skyline views.",
    ID: "Island adventures, green hills and endless coastlines.",
    JP: "Where tradition meets tomorrow, one season at a time.",
    KR: "City energy, mountain trails and timeless traditions.",
    MY: "Rainforest flavours, skyline views and warm hospitality.",
    PH: "Crystal waters, friendly smiles and island horizons.",
    SG: "A garden city of light, order and adventure.",
    TH: "Discover vibrant traditions and unforgettable places.",
    TW: "A journey through culture, city lights, and beautiful scenery.",
    VN: "Lantern lanes, limestone bays and flavours worth travelling for.",
  };

  /* the vintage compass artwork is shared with js/main.js, so the
     decoration is drawn from one single source */
  function compassMarkup() {
    var svg = window.PORTFOLIO_COMPASS_SVG;
    return svg
      ? '<span class="mg-compass" aria-hidden="true">' + svg + "</span>"
      : "";
  }

  /* ---------- helpers ---------- */
  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c];
    });
  }

  function overlayEl() {
    return document.getElementById("mapGalleryOverlay");
  }

  function countryGalleryIsOpen() {
    var o = overlayEl();
    return !!(o && !o.classList.contains("hidden"));
  }

  /* the shared media viewer (js/main.js) sits above this overlay; it
     is open whenever #lightboxOverlay is not hidden */
  function lightboxIsOpen() {
    var lb = document.getElementById("lightboxOverlay");
    return !!(lb && !lb.classList.contains("hidden"));
  }

  /* the country currently open in the gallery */
  var openCountry = { code: "", name: "" };

  /* one flat list per country: every photograph of that country
     together, in file order — never split into categories */
  function galleryItems(code, name) {
    var files = COUNTRY_PHOTOS[code] || [];
    var items = [];
    for (var i = 0; i < files.length; i++) {
      var src = MAP_DIR + files[i];
      /* a country folder may hold a short video; the viewer plays it */
      if (isVideoSrc(src)) continue;
      items.push({
        id: "map-" + code + "-" + i,
        title: name || code,
        image: src,
      });
    }
    return items;
  }

  /* opens the shared viewer on one of the country's photographs */
  function openCountryPhoto(code, name, index) {
    var items = galleryItems(code, name);
    if (!items.length) return;
    document.dispatchEvent(
      new CustomEvent("portfolio:open-lightbox", {
        /* country photographs always show whole in the viewer — a tall
         travel photo is never cut into a scrollable strip; only the
         subject galleries keep that long/scrollable layout */
        detail: { index: index, items: items, wholeFit: true },
      }),
    );
  }

  /* ---------- country gallery ---------- */
  var lastFocused = null;

  function openCountryGallery(code, name) {
    var overlay = overlayEl();
    var body = document.getElementById("mapGalleryBody");
    var title = document.getElementById("mapGalleryTitle");
    if (!overlay || !body || !title) return;

    openCountry.code = String(code || "");
    openCountry.name = name || code || "";

    title.textContent = openCountry.name;

    /* a short travel line under the name — see DESTINATION_SUBTITLES */
    var sub = document.getElementById("mapGallerySub");
    if (sub) sub.textContent = DESTINATION_SUBTITLES[openCountry.code] || "";

    /* the same country's flag is printed beside its name */
    var flag = document.getElementById("mapGalleryFlag");
    if (flag) {
      flag.style.display = "";
      flag.alt = (name || code) + " flag";
      flag.onerror = function () {
        flag.style.display = "none";
      };
      var flagSrc = FLAG_DIR + String(code || "").toLowerCase() + ".png";
      if (flag.getAttribute("src") !== flagSrc)
        flag.setAttribute("src", flagSrc);
    }

    var files = COUNTRY_PHOTOS[code] || [];
    var photos = galleryItems(code, name);
    var photoIndex = 0;
    var html = "";
    for (var i = 0; i < files.length; i++) {
      var src = MAP_DIR + files[i];
      var isVideo = isVideoSrc(src);
      var label = (name || code) + " photo " + (i + 1);
      var media = isVideo
        ? '<video src="' +
          esc(src) +
          '" controls playsinline preload="metadata" aria-label="' +
          esc(label) +
          '"></video>'
        : '<img src="' +
          esc(src) +
          '" alt="' +
          esc(label) +
          '" loading="lazy">';
      /* photographs open full size in the shared viewer; videos keep
         their own inline playback controls */
      html +=
        "<figure>" +
        (isVideo
          ? media
          : '<button type="button" class="map-gallery-open" data-photo-index="' +
            photoIndex++ +
            '" aria-label="Open ' +
            esc(label) +
            ' full size">' +
            media +
            "</button>") +
        "</figure>";
    }
    if (!html) {
      html =
        '<div class="map-gallery-empty">' +
        "<strong>Nothing pinned here yet</strong>" +
        "<span>" +
        EMPTY_MESSAGE +
        "</span>" +
        "</div>";
    }

    /* ---- the travel-journal page -------------------------------
       Left: field notes, travel stamp and compass.
       Right: this country's own photographs, and nothing else. */
    var count = photos.length;
    var countText = count
      ? "<strong>" +
        count +
        "</strong> photograph" +
        (count === 1 ? "" : "s") +
        " pinned from this destination."
      : "Nothing pinned from this destination yet.";

    body.setAttribute("data-country", openCountry.code);
    var isThreeCol = ["JP", "TW", "VN", "PH"].indexOf(openCountry.code) !== -1;

    body.innerHTML =
      '<div class="mg-info">' +
      '<div class="mg-note">' +
      '<span class="mg-note-tape" aria-hidden="true"></span>' +
      '<p class="mg-note-kicker">Field notes</p>' +
      '<p class="map-gallery-intro" id="mapGalleryIntro"></p>' +
      '<p class="mg-note-count">' +
      countText +
      "</p>" +
      "</div>" +
      '<span class="mg-stamp">EXPLORE <i>&bull;</i> LEARN <i>&bull;</i> GROW</span>' +
      compassMarkup() +
      "</div>" +
      '<div class="mg-photos' + (isThreeCol ? ' is-3col' : '') + '">' +
      html +
      "</div>";

    /* the journal line is written after the markup it lives in */
    var intro = document.getElementById("mapGalleryIntro");
    if (intro) {
      intro.textContent =
        "A collection of my travel photographs from " + openCountry.name + ".";
    }

    /* a missing file must not break the gallery */
    var media = body.querySelectorAll("img, video");
    Array.prototype.forEach.call(media, function (node) {
      node.addEventListener("error", function () {
        var fig = node.parentNode;
        if (fig && fig.tagName === "FIGURE") fig.className = "is-broken";
      });
    });

    lastFocused = document.activeElement;
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    var closeBtn = document.getElementById("mapGalleryClose");
    if (closeBtn) {
      window.setTimeout(function () {
        if (countryGalleryIsOpen()) closeBtn.focus();
      }, 40);
    }
  }

  function closeCountryGallery() {
    var overlay = overlayEl();
    if (!overlay || overlay.classList.contains("hidden")) return;
    /* stop any inline video that was playing inside the gallery */
    var body = document.getElementById("mapGalleryBody");
    if (body) {
      var vids = body.querySelectorAll("video");
      Array.prototype.forEach.call(vids, function (v) {
        if (!v.paused) v.pause();
      });
    }
    overlay.classList.add("hidden");
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) {
      try {
        lastFocused.focus();
      } catch (err) {
        /* element gone */
      }
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
    var map = document.querySelector("#asiaMap svg");
    if (!map) return;
    var old = map.querySelectorAll("circle.land-hit");
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
      if (typeof p.isPointInFill !== "function")
        return { x: cx, y: cy, center: true };
      if (p.isPointInFill(new DOMPoint(cx, cy)))
        return { x: cx, y: cy, center: true };
      for (var gy = 1; gy <= 7; gy++) {
        for (var gx = 1; gx <= 7; gx++) {
          var x = b.x + (b.width * gx) / 8;
          var y = b.y + (b.height * gy) / 8;
          if (p.isPointInFill(new DOMPoint(x, y)))
            return { x: x, y: y, center: false };
        }
      }
      return { x: cx, y: cy, center: true };
    }

    Array.prototype.forEach.call(
      map.querySelectorAll("path.land"),
      function (p) {
        var r = p.getBoundingClientRect();
        if (!r.width || !r.height) return;
        var b = p.getBBox();
        if (!b.width || !b.height) return;
        var pt = interiorPoint(p, b);
        /* small countries always get a pad; big ones get one only when
         their own middle is not on their land (e.g. island nations) */
        if (r.width >= MIN_PX && r.height >= MIN_PX && pt.center) return;
        var pad = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle",
        );
        pad.setAttribute("class", "land-hit");
        pad.setAttribute("cx", pt.x.toFixed(2));
        pad.setAttribute("cy", pt.y.toFixed(2));
        pad.setAttribute("r", (MIN_PX / 2 / scale).toFixed(2));
        pad.setAttribute("data-code", p.getAttribute("data-code"));
        pad.setAttribute("data-name", p.getAttribute("data-name"));
        map.appendChild(pad);
      },
    );
  }

  /* ---------- hover flag card ----------
     Pointing at a country (or focusing it with the keyboard) brings
     up a small card with that country's flag and name, which follows
     the pointer. The flag files live in images/flags/ (lowercase ISO
     code). A missing flag simply hides the picture; the name stays. */
  var FLAG_DIR = "images/flags/";

  function initFlagCard(map, countryFrom) {
    var holder = document.getElementById("asiaMap");
    var card = document.getElementById("mapFlagCard");
    var img = document.getElementById("mapFlagImg");
    var nameEl = document.getElementById("mapFlagName");
    if (!holder || !card || !img || !nameEl) return;

    var hideTimer = 0;
    var currentCode = "";

    function place(clientX, clientY) {
      var hr = holder.getBoundingClientRect();
      var cw = card.offsetWidth;
      var ch = card.offsetHeight;
      var x = clientX - hr.left + 14;
      var y = clientY - hr.top + 16;
      if (x + cw > hr.width - 6) x = clientX - hr.left - cw - 14;
      if (y + ch > hr.height - 6) y = clientY - hr.top - ch - 16;
      card.style.left = Math.max(4, Math.round(x)) + "px";
      card.style.top = Math.max(4, Math.round(y)) + "px";
    }

    function show(code, name, clientX, clientY) {
      window.clearTimeout(hideTimer);
      if (code !== currentCode) {
        currentCode = code;
        nameEl.textContent = name || code;
        var src = FLAG_DIR + String(code || "").toLowerCase() + ".png";
        if (img.getAttribute("src") !== src) img.setAttribute("src", src);
      }
      card.classList.add("is-on");
      if (typeof clientX === "number") place(clientX, clientY);
    }

    function hide() {
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(function () {
        card.classList.remove("is-on");
        currentCode = "";
      }, 70);
    }

    map.addEventListener("mousemove", function (e) {
      var node = countryFrom(e.target);
      if (!node) {
        hide();
        return;
      }
      show(
        node.getAttribute("data-code"),
        node.getAttribute("data-name"),
        e.clientX,
        e.clientY,
      );
    });
    map.addEventListener("mouseleave", hide);

    /* keyboard: the card is pinned above the focused country */
    map.addEventListener("focusin", function (e) {
      var node = countryFrom(e.target);
      if (!node) return;
      var r = node.getBoundingClientRect();
      show(
        node.getAttribute("data-code"),
        node.getAttribute("data-name"),
        r.left + r.width / 2,
        r.top - 8,
      );
    });
    map.addEventListener("focusout", hide);

    img.addEventListener("error", function () {
      img.style.display = "none";
    });
    img.addEventListener("load", function () {
      img.style.display = "";
    });
  }

  /* ---------- wiring ---------- */
  function initAsiaMap() {
    var holder = document.getElementById("asiaMap");
    if (!holder) return;

    /* The geometry itself is already in index.html, so the map is on
       screen from the first paint and stays there. This script only
       adds behaviour on top of it; if the SVG is ever missing the
       fallback message inside the frame simply stays visible. */
    var map = holder.querySelector("svg");
    if (!map || !map.querySelector("path.land")) return;
    holder.classList.add("is-ready");

    function countryFrom(target) {
      var node =
        target && target.closest ? target.closest("[data-code]") : null;
      return node && node.getAttribute ? node : null;
    }

    map.addEventListener("click", function (e) {
      /* a drag is never a click: the visitor just moved the map */
      if (performance.now() < dragSuppressUntil) return;
      var node = countryFrom(e.target);
      if (!node) return;
      openCountryGallery(
        node.getAttribute("data-code"),
        node.getAttribute("data-name"),
      );
    });

    map.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var node = countryFrom(e.target);
      if (!node) return;
      e.preventDefault();
      openCountryGallery(
        node.getAttribute("data-code"),
        node.getAttribute("data-name"),
      );
    });

    /* flag + country name appear under the pointer */
    initFlagCard(map, countryFrom);

    /* "See my Adventures!" is only a paper label printed over the
       frame's top edge (pointer-events: none) — it never navigates. */

    /* ==========================================================
       DRAG TO MOVE THE MAP
       ------------------------------------------------------------
       The map opens fitted inside its frame, exactly as before.
       Pressing and dragging only pans the picture inside the frame,
       clamped so the drawing is never left behind — dragging never
       changes the zoom level; magnification belongs to the + / −
       controls alone. A drag can never be mistaken for a click on a
       country, the page keeps scrolling vertically on touch
       (touch-action: pan-y) and a double-click on the sea — or the
       small pill that appears in the corner — fits the map back into
       its frame.
       ========================================================== */
    var DEFAULT_VIEW = readViewBox(map);
    var view = {
      x: DEFAULT_VIEW.x,
      y: DEFAULT_VIEW.y,
      w: DEFAULT_VIEW.w,
      h: DEFAULT_VIEW.h,
    };
    var dragSuppressUntil = 0;
    var drag = null;
    var resetBtn = document.getElementById("mapReset");
    var zoomInBtn = document.getElementById("mapZoomIn");
    var zoomOutBtn = document.getElementById("mapZoomOut");
    var holderEl = document.getElementById("asiaMap");

    function readViewBox(node) {
      var raw = (node.getAttribute("viewBox") || "").trim().split(/[\s,]+/);
      var n = [
        parseFloat(raw[0]) || 0,
        parseFloat(raw[1]) || 0,
        parseFloat(raw[2]) || 0,
        parseFloat(raw[3]) || 0,
      ];
      return { x: n[0], y: n[1], w: n[2], h: n[3] };
    }

    /* how far the photograph may slide inside its frame: the map can
       use the letterbox space the fitted drawing already leaves on
       each side, so dragging always moves the picture — yet the
       drawing is never clipped and never leaves more sky visible
       than the frame shows to begin with */
    function panPadding(v) {
      var r = map.getBoundingClientRect();
      if (!r.width || !r.height) return { x: 0, y: 0 };
      var scale = Math.min(r.width / v.w, r.height / v.h);
      if (!(scale > 0)) return { x: 0, y: 0 };
      return {
        x: Math.max(0, (r.width / scale - DEFAULT_VIEW.w) / 2),
        y: Math.max(0, (r.height / scale - DEFAULT_VIEW.h) / 2),
      };
    }

    function clampView(v) {
      var pad = panPadding(v);
      var minX = DEFAULT_VIEW.x - pad.x;
      var maxX = DEFAULT_VIEW.x + DEFAULT_VIEW.w - v.w + pad.x;
      var minY = DEFAULT_VIEW.y - pad.y;
      var maxY = DEFAULT_VIEW.y + DEFAULT_VIEW.h - v.h + pad.y;
      if (minX > maxX) maxX = minX;
      if (minY > maxY) maxY = minY;
      v.x = Math.max(minX, Math.min(v.x, maxX));
      v.y = Math.max(minY, Math.min(v.y, maxY));
      return v;
    }

    function viewIsDefault() {
      return (
        Math.abs(view.x - DEFAULT_VIEW.x) < 0.01 &&
        Math.abs(view.y - DEFAULT_VIEW.y) < 0.01 &&
        Math.abs(view.w - DEFAULT_VIEW.w) < 0.01
      );
    }

    function applyView() {
      map.setAttribute(
        "viewBox",
        view.x.toFixed(3) +
          " " +
          view.y.toFixed(3) +
          " " +
          view.w.toFixed(3) +
          " " +
          view.h.toFixed(3),
      );
      if (resetBtn) resetBtn.hidden = viewIsDefault();
    }

    function resetView() {
      view = {
        x: DEFAULT_VIEW.x,
        y: DEFAULT_VIEW.y,
        w: DEFAULT_VIEW.w,
        h: DEFAULT_VIEW.h,
      };
      applyView();
    }

    function zoomView(factor) {
      var nextW = Math.max(
        DEFAULT_VIEW.w / 3,
        Math.min(DEFAULT_VIEW.w, view.w * factor),
      );
      var nextH = Math.max(
        DEFAULT_VIEW.h / 3,
        Math.min(DEFAULT_VIEW.h, view.h * factor),
      );
      var cx = view.x + view.w / 2;
      var cy = view.y + view.h / 2;
      view = clampView({
        x: cx - nextW / 2,
        y: cy - nextH / 2,
        w: nextW,
        h: nextH,
      });
      applyView();
    }

    /* screen pixels → map units, using the uniform scale of the
       fitted viewBox (the frame letterboxes the drawing) */
    function userPerPx() {
      var r = map.getBoundingClientRect();
      if (!r.width || !r.height) return 1;
      var pxPerUser = Math.min(r.width / view.w, r.height / view.h);
      return pxPerUser > 0 ? 1 / pxPerUser : 1;
    }

    map.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      /* a new press ends the previous drag's click suppression, so a
         normal click is never swallowed by an old drag */
      dragSuppressUntil = 0;
      drag = {
        id: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        active: false,
        base: null,
      };
      /* NOTE: no pointer capture here — capturing would retarget the
         following click away from the country shape. The move and
         release listeners live on the window instead, so a fast drag
         that leaves the frame cannot leave the map half-dragged. */
    });

    window.addEventListener("pointermove", function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.startX;
      var dy = e.clientY - drag.startY;
      if (!drag.active) {
        if (Math.sqrt(dx * dx + dy * dy) < 5) return; /* still a click */
        drag.active = true;
        /* a drag only moves the picture: the current zoom level is
           kept exactly as it is (no magnify-on-press any more) */
        drag.base = { x: view.x, y: view.y };
        drag.startX = e.clientX;
        drag.startY = e.clientY;
        if (holderEl) holderEl.classList.add("is-dragging");
        return;
      }
      var upp = userPerPx();
      view.x = drag.base.x - (e.clientX - drag.startX) * upp;
      view.y = drag.base.y - (e.clientY - drag.startY) * upp;
      clampView(view);
      applyView();
    });

    function endDrag(e) {
      if (!drag || (e && e.pointerId !== drag.id)) return;
      var wasActive = drag.active;
      drag = null;
      if (holderEl) holderEl.classList.remove("is-dragging");
      if (wasActive) {
        /* swallow the click that follows a drag */
        dragSuppressUntil = performance.now() + 350;
      }
    }
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);

    /* double-clicking the open sea fits the map back into its frame */
    map.addEventListener("dblclick", function () {
      resetView();
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", resetView);
    }
    if (zoomInBtn)
      zoomInBtn.addEventListener("click", function () {
        zoomView(0.8);
      });
    if (zoomOutBtn)
      zoomOutBtn.addEventListener("click", function () {
        zoomView(1.25);
      });

    /* pads are sized against the rendered map, so they are rebuilt
       after the first layout and whenever the window changes size */
    window.requestAnimationFrame(buildTapPads);
    /* late image loads can still shift the layout, so measure once
       more after the whole page has finished loading */
    window.addEventListener("load", buildTapPads);
    var padTimer = 0;
    window.addEventListener("resize", function () {
      window.clearTimeout(padTimer);
      padTimer = window.setTimeout(buildTapPads, 200);
    });

    /* gallery controls: close button, labelled back button, click
       outside, and clicking any photograph to see it full size */
    var closeBtn = document.getElementById("mapGalleryClose");
    if (closeBtn) closeBtn.addEventListener("click", closeCountryGallery);

    var backBtn = document.getElementById("mapGalleryBack");
    if (backBtn) backBtn.addEventListener("click", closeCountryGallery);

    /* "View My Gallery" is a real action, never a decoration: it
       closes this journal page and opens My Gallery through the
       site's own navigation */
    var galleryBtn = document.getElementById("mapGalleryMyGallery");
    if (galleryBtn) {
      galleryBtn.addEventListener("click", function () {
        closeCountryGallery();
        var link = document.querySelector('.nav-link[data-nav="mygallery"]');
        if (link) link.click();
      });
    }

    var body = document.getElementById("mapGalleryBody");
    if (body) {
      body.addEventListener("click", function (e) {
        var btn =
          e.target && e.target.closest
            ? e.target.closest(".map-gallery-open")
            : null;
        if (!btn) return;
        var index = parseInt(btn.getAttribute("data-photo-index"), 10);
        if (isNaN(index)) return;
        openCountryPhoto(openCountry.code, openCountry.name, index);
      });
    }

    var overlay = overlayEl();
    if (overlay) {
      overlay.addEventListener("click", function (e) {
        if (
          e.target === overlay ||
          (e.target.hasAttribute && e.target.hasAttribute("data-map-close"))
        ) {
          closeCountryGallery();
        }
      });
    }

    /* capture phase, so this sees the viewer while it is still open:
       the shared viewer closes on its own Escape (see js/main.js), and
       the gallery underneath must stay exactly where it is */
    document.addEventListener(
      "keydown",
      function (e) {
        if (e.key !== "Escape" || !countryGalleryIsOpen()) return;
        if (lightboxIsOpen()) return;
        closeCountryGallery();
      },
      true,
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAsiaMap);
  } else {
    initAsiaMap();
  }
})();

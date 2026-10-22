/* ============================================================
   Student Portfolio Gallery — application script
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     CONFIG — drop your logo file next to index.html and set the
     path here (e.g. 'assets/logo.png'). If the file is missing,
     a generic avatar fallback is shown automatically.
     ============================================================ */
  var CONFIG = {
    logoPath: 'logo.png'
  };

  /* ---------- the picture that fills the preview area at first ---------- */
  var DEFAULT_PREVIEW = {
    image: 'images/plane.jpg',
    alt: 'Preview: an airplane in the sky',
    title: 'Your preview area is ready',
    sub: 'Choose a subject on the right, then pick an item to preview it here.'
  };

  /* ---------- subject icons (inline SVG) ---------- */
  var ICONS = {
    english: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"></path><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5z"></path><path d="M9 8h7M9 11.5h5"></path></svg>',
    mathematics: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="3"></rect><path d="M8.5 7.5h7"></path><path d="M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01"></path></svg>',
    science: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3v6.2L5.2 17.6A2.4 2.4 0 0 0 7.3 21h9.4a2.4 2.4 0 0 0 2.1-3.4L14 9.2V3"></path><path d="M9 3h6"></path><path d="M8.2 14h7.6"></path></svg>',
    filipino: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A2.5 2.5 0 0 1 17.5 17H10l-4.5 3.2V17H6.5A2.5 2.5 0 0 1 4 14.5v-7A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5z"></path><path d="M8 9.5h8M8 12.8h5"></path></svg>',
    araling: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"></circle><path d="M3.5 12h17"></path><path d="M12 3.5c2.4 2.4 3.6 5.3 3.6 8.5S14.4 18.1 12 20.5c-2.4-2.4-3.6-5.3-3.6-8.5S9.6 5.9 12 3.5z"></path></svg>',
    values: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-6.8-4.3-8.4-8.1C2.4 9 3.7 5.9 6.7 5.1c1.9-.5 3.9.2 5.3 1.7 1.4-1.5 3.4-2.2 5.3-1.7 3 .8 4.3 3.9 3.1 6.8C18.8 15.7 12 20 12 20z"></path></svg>',
    tle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4.2 4.2 0 0 0 5.1 5.4l-8.4 8.4a2.4 2.4 0 0 1-3.4-3.4l8.3-8.4a4.2 4.2 0 0 0-1.6-2z"></path><path d="M9 4.5l2.2 2.2-3 3L6 7.5A2.5 2.5 0 0 1 9 4.5z"></path></svg>',
    mapeh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5a8.5 8.5 0 1 0 0 17h1.2a1.8 1.8 0 0 0 1.3-3.1 1.8 1.8 0 0 1 1.3-3.1H18A3.5 3.5 0 0 0 21.5 11 8.5 8.5 0 0 0 12 3.5z"></path><circle cx="8.2" cy="10" r="1.1" fill="currentColor" stroke="none"></circle><circle cx="12" cy="7.6" r="1.1" fill="currentColor" stroke="none"></circle><circle cx="15.8" cy="10" r="1.1" fill="currentColor" stroke="none"></circle></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 3v5h5"></path><path d="M9 13h6M9 16.5h4"></path></svg>',
    arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"></path></svg>'
  };

  /* small icons need inline width/height for list contexts */
  var LIST_ICONS = {
    english: sizeIcon(ICONS.english, 21),
    mathematics: sizeIcon(ICONS.mathematics, 21),
    science: sizeIcon(ICONS.science, 21),
    filipino: sizeIcon(ICONS.filipino, 21),
    araling: sizeIcon(ICONS.araling, 21),
    values: sizeIcon(ICONS.values, 21),
    tle: sizeIcon(ICONS.tle, 21),
    mapeh: sizeIcon(ICONS.mapeh, 21),
    doc: sizeIcon(ICONS.doc, 26)
  };

  function sizeIcon(svg, size) {
    return svg.replace('<svg ', '<svg width="' + size + '" height="' + size + '" ');
  }

  /* ============================================================
     SUBJECT DATA
     Each subject owns its own portfolio collection. To add more
     work later, push objects into `portfolio`:
       { id: 'p1', title: 'Title', description: 'Note',
         image: 'images/file.svg' }   // image optional
     The gallery grid and the gallery popup both read straight
     from these collections.
     ============================================================ */
  var subjects = [
    {
      id: 'english', title: 'English', tone: 0,
      desc: 'Reading, writing, and communication works.',
      intro: 'Language arts outputs — essays, speeches, and creative writing from class activities.',
      icon: ICONS.english,
      portfolio: [
        { id: 'en-1', title: 'Read-In Report', description: 'Reaction paper for the class reading.', image: 'images/english-1.svg' },
        { id: 'en-2', title: 'Poem of the Rain', description: 'Original poem submitted for the recital.', image: 'images/english-2.svg' },
        { id: 'en-3', title: 'Speech Draft', description: 'Draft and final delivery notes.', image: 'images/english-3.svg' },
        { id: 'en-4', title: 'Character Sketch', description: 'Analysis of the protagonist.', image: 'images/english-4.svg' }
      ]
    },
    {
      id: 'mathematics', title: 'Mathematics', tone: 1,
      desc: 'Problem solving and numeracy projects.',
      intro: 'Mathematical reasoning shown through solutions, models, and project work.',
      icon: ICONS.mathematics,
      portfolio: [
        { id: 'ma-1', title: 'Problem Set 04', description: 'Solutions with complete working.', image: 'images/mathematics-1.svg' },
        { id: 'ma-2', title: 'Geometry Model', description: 'Built model of the solid figures.', image: 'images/mathematics-2.svg' },
        { id: 'ma-3', title: 'Data Report', description: 'Interpretation of collected data.', image: 'images/mathematics-3.svg' },
        { id: 'ma-4', title: 'Calculus Notes', description: 'Summary of the differentiation topic.', image: 'images/mathematics-4.svg' }
      ]
    },
    {
      id: 'science', title: 'Science', tone: 2,
      desc: 'Experiments, reports, and discoveries.',
      intro: 'Investigations, lab reports, and science fair outputs collected in one place.',
      icon: ICONS.science,
      portfolio: [
        { id: 'sc-1', title: 'Volcano Experiment', description: 'Model eruption and observations.', image: 'images/science-1.svg' },
        { id: 'sc-2', title: 'Lab Report', description: 'Write-up of the approved experiment.', image: 'images/science-2.svg' },
        { id: 'sc-3', title: 'Plant Growth Log', description: 'Two-week growth measurements.', image: 'images/science-3.svg' },
        { id: 'sc-4', title: 'Circuit Model', description: 'Working series-parallel circuit.', image: 'images/science-4.svg' }
      ]
    },
    {
      id: 'filipino', title: 'Filipino', tone: 3,
      desc: 'Wika, panitikan, at pagsulat.',
      intro: 'Mga gawaing pamp Filipino — sanaysay, tula, ulat, at proyekto sa wika.',
      icon: ICONS.filipino,
      portfolio: [
        { id: 'fi-1', title: 'Sanaysay', description: 'Pagsusulat tungkol sa aking karanasan.', image: 'images/filipino-1.svg' },
        { id: 'fi-2', title: 'Tula ng Pag-asa', description: 'Tula inilathala sa panitikan ng klase.', image: 'images/filipino-2.svg' },
        { id: 'fi-3', title: 'Ulat sa Klase', description: 'Ulat kinalam na ulat-panayam.', image: 'images/filipino-3.svg' },
        { id: 'fi-4', title: 'Batasang Pambansa', description: 'Balangkas ng isang panukalang batas.', image: 'images/filipino-4.svg' }
      ]
    },
    {
      id: 'araling-panlipunan', title: 'Araling Panlipunan', tone: 0,
      desc: 'History, society, and civics outputs.',
      intro: 'Research, maps, and community studies that explore people and society.',
      icon: ICONS.araling,
      portfolio: [
        { id: 'ap-1', title: 'Pre-Colonial Map', description: 'Mapa ng mga sinaunang kabayanan.', image: 'images/araling-panlipunan-1.svg' },
        { id: 'ap-2', title: 'Community Survey', description: 'Pag-aaral ng komunidad ng aming barangay.', image: 'images/araling-panlipunan-2.svg' },
        { id: 'ap-3', title: 'Timeline Poster', description: 'Timeline ng mga panahonang kasaysayan.', image: 'images/araling-panlipunan-3.svg' },
        { id: 'ap-4', title: 'Economic Report', description: 'Ulat sa kalagayan ng ekonomiya.', image: 'images/araling-panlipunan-4.svg' }
      ]
    },
    {
      id: 'values-education', title: 'Values Education', tone: 1,
      desc: 'Character reflections and good-citizenship work.',
      intro: 'Reflections, action plans, and service-learning outputs about values in practice.',
      icon: ICONS.values,
      portfolio: [
        { id: 'va-1', title: 'Reflection Paper', description: 'Pagninilay sa mga aral ng klase.', image: 'images/values-education-1.svg' },
        { id: 'va-2', title: 'Action Plan', description: 'Plano para sa isang linggong pagpapabuti.', image: 'images/values-education-2.svg' },
        { id: 'va-3', title: 'Service Diary', description: 'Talaan ng pagtutulong sa komunidad.', image: 'images/values-education-3.svg' },
        { id: 'va-4', title: 'Good Citizenship', description: 'Poster tungkol sa mabuting mamamayan.', image: 'images/values-education-4.svg' }
      ]
    },
    {
      id: 'tle', title: 'T.L.E.', tone: 2,
      desc: 'Technology and livelihood skills projects.',
      intro: 'Practical creations, livelihood demos, and technology projects from T.L.E. class.',
      icon: ICONS.tle,
      portfolio: [
        { id: 'tl-1', title: 'Chair Build', description: 'Ginawa at pinatag na istruktura ng Upuan.', image: 'images/tle-1.svg' },
        { id: 'tl-2', title: 'PowerPoint Deck', description: 'Presentasyon para sa livelihood project.', image: 'images/tle-2.svg' },
        { id: 'tl-3', title: 'Knife Handling', description: 'Tamang paghawak ng kutseryo.', image: 'images/tle-3.svg' },
        { id: 'tl-4', title: 'Cable Organiser', description: 'Proyektong praktikal na organizer.', image: 'images/tle-4.svg' }
      ]
    },
    {
      id: 'mapeh', title: 'MAPEH', tone: 3,
      desc: 'Music, arts, PE, and health outputs.',
      intro: 'Performances, artwork, fitness records, and health projects in one gallery.',
      icon: ICONS.mapeh,
      portfolio: [
        { id: 'ma-1', title: 'Acoustic Piece', description: 'Performance notes for the recital.', image: 'images/mapeh-1.svg' },
        { id: 'ma-2', title: 'Still Life', description: 'Likhang sining na ginawa sa klase.', image: 'images/mapeh-2.svg' },
        { id: 'ma-3', title: 'Fitness Record', description: 'Talaan ng mga benisyaryong ehersisyo.', image: 'images/mapeh-3.svg' },
        { id: 'ma-4', title: 'Health Poster', description: 'Poster tungkol sa malusog na pamumuhay.', image: 'images/mapeh-4.svg' }
      ]
    }
  ];

  /* hero accent gradients per tone */
  var TONES = [
    'linear-gradient(140deg, #6fb9e8, #2f86c7)',
    'linear-gradient(140deg, #2f86c7, #17375e)',
    'linear-gradient(140deg, #f2994a, #e07b2a)',
    'linear-gradient(140deg, #5b9bd5, #1f6aa8)'
  ];

  /* ---------- state ---------- */
  var activeSubjectId = null;
  var activeItemId = null;
  var currentView = 'home';
  var returnView = 'home';
  var searchQuery = '';

  /* gallery popup slideshow */
  var gpItems = [];
  var gpIndex = 0;
  var gpSubject = null;
  var gpActiveEl = null;
  var gpLastFocused = null;
  var gpAnimating = false;
  var gpSlot = 0;
  var gpCenter = 0;
  var gpScrollY = 0;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- dom refs ---------- */
  var el = {
    homeView: document.getElementById('homeView'),
    galleryView: document.getElementById('galleryView'),
    searchView: document.getElementById('searchView'),
    subjectList: document.getElementById('subjectList'),
    galleryTitle: document.getElementById('galleryTitle'),
    galleryIntro: document.getElementById('galleryIntro'),
    galleryGrid: document.getElementById('galleryGrid'),
    galleryEmpty: document.getElementById('galleryEmpty'),
    heroIcon: document.getElementById('heroIcon'),
    itemCount: document.getElementById('itemCount'),
    crumbTitle: document.getElementById('crumbTitle'),
    crumbHome: document.getElementById('crumbHome'),
    backBtn: document.getElementById('backBtn'),
    searchInput: document.getElementById('searchInput'),
    searchClear: document.getElementById('searchClear'),
    searchBackBtn: document.getElementById('searchBackBtn'),
    searchSummary: document.getElementById('searchSummary'),
    searchSubjectsSection: document.getElementById('searchSubjectsSection'),
    searchSubjectsList: document.getElementById('searchSubjectsList'),
    searchItemsSection: document.getElementById('searchItemsSection'),
    searchItemsList: document.getElementById('searchItemsList'),
    searchEmpty: document.getElementById('searchEmpty'),
    exploreBtn: document.getElementById('exploreBtn'),
    displayContent: document.getElementById('displayContent'),
    displayStage: document.getElementById('displayStage'),
    displayTitle: document.getElementById('displayTitle'),
    displaySub: document.getElementById('displaySub'),
    clearDisplayBtn: document.getElementById('clearDisplayBtn'),
    brandLogo: document.getElementById('brandLogo'),
    brandHome: document.getElementById('brandHome'),
    profileAvatar: document.getElementById('profileAvatar'),
    gpOverlay: document.getElementById('galleryPopup'),
    gpPopup: document.getElementById('gpPopup'),
    gpViewport: document.getElementById('gpViewport'),
    gpTrack: document.getElementById('gpTrack'),
    gpClose: document.getElementById('gpClose'),
    gpPrev: document.getElementById('gpPrev'),
    gpNext: document.getElementById('gpNext'),
    blobs: Array.prototype.slice.call(document.querySelectorAll('.blob'))
  };

  /* ---------- helpers ---------- */
  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function findSubject(id) {
    for (var i = 0; i < subjects.length; i++) {
      if (subjects[i].id === id) return subjects[i];
    }
    return null;
  }

  function findItemIndex(subject, itemId) {
    for (var i = 0; i < subject.portfolio.length; i++) {
      if (subject.portfolio[i].id === itemId) return i;
    }
    return -1;
  }

  function itemCountLabel(n) {
    if (n === 0) return 'No items yet';
    return n + ' item' + (n === 1 ? '' : 's');
  }

  /* ---------- logo setup (path configurable, graceful fallback) ---------- */
  function setupLogo(container, path, mode) {
    if (!container) return;
    var img = document.createElement('img');
    img.alt = mode === 'brand' ? 'Student Portfolio Gallery logo' : 'Gallery logo';
    img.addEventListener('error', function () {
      if (img.parentNode) img.parentNode.removeChild(img);
    });
    img.src = path;
    if (mode === 'brand') {
      container.innerHTML = '';
      container.appendChild(img);
    } else {
      var existing = container.querySelector('svg');
      container.insertBefore(img, existing || null);
      img.addEventListener('load', function () {
        if (existing) existing.classList.add('hidden');
      });
    }
  }

  setupLogo(el.brandLogo, CONFIG.logoPath, 'brand');
  setupLogo(el.profileAvatar, CONFIG.logoPath, 'avatar');

  /* ---------- view switching ---------- */
  function showView(name) {
    currentView = name;
    el.homeView.classList.toggle('is-active', name === 'home');
    el.galleryView.classList.toggle('is-active', name === 'gallery');
    el.searchView.classList.toggle('is-active', name === 'search');
    /* restart view animation */
    var active = name === 'home' ? el.homeView
      : name === 'gallery' ? el.galleryView
      : el.searchView;
    active.style.animation = 'none';
    void active.offsetWidth;
    active.style.animation = '';
  }

  /* ---------- home: subject list ---------- */
  function renderSubjects() {
    var html = '';
    for (var i = 0; i < subjects.length; i++) {
      var s = subjects[i];
      html +=
        '<li class="subject-item" style="--i:' + i + '">' +
          '<button type="button" class="subject-btn" data-subject="' + esc(s.id) + '">' +
            '<span class="subject-icon" aria-hidden="true">' + sizeIcon(s.icon, 21) + '</span>' +
            '<span class="subject-copy">' +
              '<strong>' + esc(s.title) + '</strong>' +
              '<span>' + esc(s.desc) + '</span>' +
            '</span>' +
            '<span class="subject-arrow" aria-hidden="true">' + ICONS.arrow + '</span>' +
          '</button>' +
        '</li>';
    }
    el.subjectList.innerHTML = html;
  }

  /* ---------- gallery page ---------- */
  function renderGallery() {
    var subject = findSubject(activeSubjectId);
    if (!subject) return;

    el.galleryTitle.textContent = subject.title;
    el.galleryIntro.textContent = subject.intro;
    el.crumbTitle.textContent = subject.title;
    el.heroIcon.innerHTML = subject.icon;
    el.heroIcon.style.background = TONES[subject.tone % TONES.length];
    el.itemCount.textContent = itemCountLabel(subject.portfolio.length);

    if (!subject.portfolio.length) {
      el.galleryGrid.innerHTML = '';
      el.galleryGrid.classList.add('hidden');
      el.galleryEmpty.classList.remove('hidden');
      return;
    }

    el.galleryEmpty.classList.add('hidden');
    el.galleryGrid.classList.remove('hidden');

    var html = '';
    for (var i = 0; i < subject.portfolio.length; i++) {
      var item = subject.portfolio[i];
      var thumb = item.image
        ? '<img src="' + esc(item.image) + '" alt="' + esc(item.title) + '" loading="lazy">'
        : sizeIcon(ICONS.doc, 40);
      html +=
        '<button type="button" class="g-card" style="--i:' + i + '" data-item="' + esc(item.id) + '" ' +
          'aria-label="Open ' + esc(item.title) + ' in preview">' +
          '<span class="g-thumb" aria-hidden="true">' + thumb + '</span>' +
          '<span class="g-body">' +
            '<h3>' + esc(item.title) + '</h3>' +
            '<p>' + esc(subject.title) + '</p>' +
            '<span class="g-tag">Portfolio</span>' +
          '</span>' +
        '</button>';
    }
    el.galleryGrid.innerHTML = html;

    if (canHover && !reducedMotion) {
      var cards = el.galleryGrid.querySelectorAll('.g-card');
      Array.prototype.forEach.call(cards, attachTilt);
    }
  }

  function openSubject(id) {
    var subject = findSubject(id);
    if (!subject) return;
    /* the gallery opens behind the loading screen */
    showLoader(LOADER_SUBJECT, function () {
      activeSubjectId = id;
      activeItemId = null;
      clearDisplay();
      renderSubjects();
      renderGallery();
      showView('gallery');
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  }

  function backToSubjects() {
    gpClose();
    activeSubjectId = null;
    activeItemId = null;
    clearDisplay();
    renderSubjects();
    showView('home');
  }

  /* ---------- home display panel ---------- */
  function showInDisplay(subject, item) {
    activeItemId = item.id;

    var stageHtml;
    if (item.image) {
      stageHtml = '<img src="' + esc(item.image) + '" alt="' + esc(item.title) + '">';
    } else {
      stageHtml =
        '<div class="display-doc">' +
          '<span class="doc-icon" aria-hidden="true">' + sizeIcon(ICONS.doc, 28) + '</span>' +
          '<strong>' + esc(item.title) + '</strong>' +
        '</div>';
    }
    el.displayStage.innerHTML = stageHtml;
    el.displayTitle.textContent = item.title;
    el.displaySub.textContent = subject.title;
    el.clearDisplayBtn.classList.remove('hidden');
  }

  function clearDisplay() {
    activeItemId = null;
    /* back to the default preview picture, filling the whole area */
    el.displayStage.innerHTML =
      '<img class="is-full" src="' + esc(DEFAULT_PREVIEW.image) + '" alt="' + esc(DEFAULT_PREVIEW.alt) + '">';
    el.displayTitle.textContent = DEFAULT_PREVIEW.title;
    el.displaySub.textContent = DEFAULT_PREVIEW.sub;
    el.clearDisplayBtn.classList.add('hidden');
  }

  /* ============================================================
     GALLERY POPUP SLIDESHOW

     A borderless, image-only viewer built on a horizontal track.

     The track holds three real gallery images: the previous one
     peeking on the left, the active one in the middle and the next
     one peeking on the right. Navigating physically moves the slide
     elements (append on forward, prepend on backward) and animates
     the track with a CSS transform transition, so the images
     themselves slide instead of being swapped in place.

     Track geometry (viewport width V, slide width W, gap G):
       slot    = W + G
       center  = (V - W) / 2          left offset of the centred slide
       T(idle) = center - slot        child 1 sits in the middle
       T(left) = center - 2 * slot    child 2 sits in the middle
     ============================================================ */

  var GP_SLIDE_RATIO = 0.6;   /* active slide = 60% of the viewport width */
  var GP_DURATION = 450;      /* keep in sync with the CSS transition      */

  function gpWrap(i) {
    var n = gpItems.length;
    return ((i % n) + n) % n;
  }

  function gpSlideNode(item, index) {
    var slide = document.createElement('div');
    slide.className = 'gp-slide';
    slide.setAttribute('data-index', String(index));
    if (item.image) {
      var img = document.createElement('img');
      img.alt = item.title || 'Portfolio image';
      img.decoding = 'async';
      slide.appendChild(img);
      img.addEventListener('load', function () { gpOnImageReady(slide); });
      img.src = item.image;
      if (img.complete && img.naturalWidth) gpOnImageReady(slide);
    } else {
      var ph = document.createElement('div');
      ph.className = 'gp-placeholder';
      ph.setAttribute('aria-hidden', 'true');
      ph.innerHTML = sizeIcon(ICONS.doc, 68);
      slide.appendChild(ph);
    }
    return slide;
  }

  /* Sizes the active picture to its natural aspect ratio inside the
     slide box. The image is then rendered with object-fit: cover on a
     perfectly matching box, so it is never cropped and never
     stretched - and switching between slides never changes the
     object-fit, which keeps the transition free of popping. */
  function gpFitImage(slide, snap) {
    var img = slide.querySelector('img');
    if (!img || !img.naturalWidth || !img.naturalHeight) return;
    var cs = getComputedStyle(slide);
    var boxW = slide.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    var boxH = slide.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    if (boxW <= 0 || boxH <= 0) return;

    var ar = img.naturalWidth / img.naturalHeight;
    var w = boxW;
    var h = w / ar;
    if (h > boxH) { h = boxH; w = h * ar; }

    if (snap) {
      var prev = img.style.transition;
      img.style.transition = 'none';
      img.style.width = w + 'px';
      img.style.height = h + 'px';
      img.getBoundingClientRect();
      img.style.transition = prev;
      return;
    }
    img.style.width = w + 'px';
    img.style.height = h + 'px';
  }

  function gpOnImageReady(slide) {
    if (!slide.classList.contains('is-active')) return;
    gpFitImage(slide, true);
  }

  /* the active slide is tracked by node identity so that subjects
     with only two images never highlight the same picture twice */
  function gpMarkActive() {
    var slides = el.gpTrack.children;
    for (var i = 0; i < slides.length; i++) {
      var slide = slides[i];
      var isActive = slide === gpActiveEl;
      if (slide.classList.contains('is-active') === isActive) continue;
      slide.classList.toggle('is-active', isActive);
      var img = slide.querySelector('img');
      if (!img) continue;
      if (isActive) {
        /* the incoming picture settles into its own proportions */
        gpFitImage(slide, false);
      } else {
        /* the outgoing picture returns to the cropped neighbour box */
        img.style.width = '';
        img.style.height = '';
      }
    }
  }

  function gpFindNode(index, preferRight) {
    var slides = el.gpTrack.children;
    var found = null;
    for (var i = 0; i < slides.length; i++) {
      if (parseInt(slides[i].getAttribute('data-index'), 10) !== index) continue;
      if (preferRight) found = slides[i];
      else if (!found) found = slides[i];
    }
    return found;
  }

  function gpMeasure() {
    var vw = el.gpViewport.clientWidth;
    if (!vw) return;
    var slideW = Math.round(vw * GP_SLIDE_RATIO);
    var gap = vw < 640 ? 10 : 16;
    el.gpViewport.style.setProperty('--gp-slide-w', slideW + 'px');
    el.gpViewport.style.setProperty('--gp-gap', gap + 'px');
    gpSlot = slideW + gap;
    gpCenter = (vw - slideW) / 2;
  }

  function gpIdleT() { return gpCenter - gpSlot; }
  function gpLeftT() { return gpCenter - 2 * gpSlot; }

  function gpSetTrack(px, animate) {
    if (animate) {
      /* make sure the transition is live before the value changes */
      if (el.gpTrack.classList.contains('no-anim')) {
        el.gpTrack.classList.remove('no-anim');
        el.gpTrack.getBoundingClientRect();
      }
      el.gpTrack.style.transform = 'translateX(' + px + 'px)';
    } else {
      el.gpTrack.classList.add('no-anim');
      el.gpTrack.style.transform = 'translateX(' + px + 'px)';
      el.gpTrack.getBoundingClientRect();
    }
  }

  function gpBuild() {
    el.gpTrack.innerHTML = '';
    gpActiveEl = null;
    var n = gpItems.length;
    if (!n) return;
    if (n === 1) {
      el.gpTrack.appendChild(gpSlideNode(gpItems[0], 0));
      gpActiveEl = el.gpTrack.firstElementChild;
    } else {
      var prev = gpWrap(gpIndex - 1);
      var next = gpWrap(gpIndex + 1);
      el.gpTrack.appendChild(gpSlideNode(gpItems[prev], prev));
      el.gpTrack.appendChild(gpSlideNode(gpItems[gpIndex], gpIndex));
      el.gpTrack.appendChild(gpSlideNode(gpItems[next], next));
      gpActiveEl = el.gpTrack.children[1];
    }
    gpMarkActive();
  }

  /* warm the neighbouring images so the slide never pops in */
  function gpPreload() {
    if (gpItems.length < 2) return;
    var targets = [gpWrap(gpIndex - 1), gpWrap(gpIndex + 1)];
    for (var i = 0; i < targets.length; i++) {
      var item = gpItems[targets[i]];
      if (!item || !item.image) continue;
      var pre = new Image();
      pre.src = item.image;
    }
  }

  /* runs `done` once the track transition finished (timeout fallback).
     The fallback is deliberately generous: transitionend is only
     dispatched on the next rendered frame, so on a slow device a tight
     timeout would cancel the running transition and snap the carousel
     instead of letting it settle. */
  function gpAfterMove(done) {
    var fired = false;
    function finish() {
      if (fired) return;
      fired = true;
      el.gpTrack.removeEventListener('transitionend', onEnd);
      window.clearTimeout(timer);
      done();
      gpAnimating = false;
    }
    function onEnd(e) {
      if (e.target !== el.gpTrack || e.propertyName !== 'transform') return;
      finish();
    }
    el.gpTrack.addEventListener('transitionend', onEnd);
    var timer = window.setTimeout(finish, GP_DURATION + 450);
  }

  /* keeps the home preview panel in sync with the popup selection */
  function gpSyncSelection() {
    if (!gpSubject || !gpItems[gpIndex]) return;
    activeItemId = gpItems[gpIndex].id;
    showInDisplay(gpSubject, gpItems[gpIndex]);
  }

  function gpGoNext() {
    var n = gpItems.length;
    if (gpAnimating || n < 2) return;
    gpAnimating = true;
    gpIndex = (gpIndex + 1) % n;

    /* the incoming slide is the current right neighbour */
    gpActiveEl = gpFindNode(gpIndex, true);
    if (!gpActiveEl) { gpBuild(); gpSetTrack(gpIdleT(), false); gpAnimating = false; return; }

    var newRight = (gpIndex + 1) % n;
    el.gpTrack.appendChild(gpSlideNode(gpItems[newRight], newRight));
    el.gpTrack.getBoundingClientRect();   /* commit the new slide */

    gpMarkActive();
    gpSetTrack(gpLeftT(), true);
    gpSyncSelection();

    gpAfterMove(function () {
      if (el.gpTrack.children.length > 3) {
        el.gpTrack.removeChild(el.gpTrack.firstElementChild);
      }
      gpSetTrack(gpIdleT(), false);
    });
  }

  function gpGoPrev() {
    var n = gpItems.length;
    if (gpAnimating || n < 2) return;
    gpAnimating = true;
    gpIndex = (gpIndex - 1 + n) % n;

    /* the incoming slide is the current left neighbour */
    gpActiveEl = gpFindNode(gpIndex, false);
    if (!gpActiveEl) { gpBuild(); gpSetTrack(gpIdleT(), false); gpAnimating = false; return; }

    var newLeft = (gpIndex - 1 + n) % n;
    el.gpTrack.insertBefore(
      gpSlideNode(gpItems[newLeft], newLeft),
      el.gpTrack.firstElementChild
    );
    /* compensate for the inserted slide so the picture does not jump */
    gpSetTrack(gpLeftT(), false);

    gpMarkActive();
    gpSetTrack(gpIdleT(), true);
    gpSyncSelection();

    gpAfterMove(function () {
      if (el.gpTrack.children.length > 3) {
        el.gpTrack.removeChild(el.gpTrack.lastElementChild);
      }
      gpSetTrack(gpIdleT(), false);
    });
  }

  function gpLockScroll() {
    var gap = window.innerWidth - document.documentElement.clientWidth;
    if (gap > 0) document.body.style.paddingRight = gap + 'px';
    document.body.style.overflow = 'hidden';
  }

  function gpUnlockScroll() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  function gpOpen(subject, index) {
    if (!subject || !subject.portfolio || !subject.portfolio.length) return;
    /* the picture opens behind the loading screen */
    showLoader(LOADER_ITEM, function () { gpOpenNow(subject, index); });
  }

  function gpOpenNow(subject, index) {
    gpSubject = subject;
    gpItems = subject.portfolio.slice();
    gpIndex = Math.max(0, Math.min(index, gpItems.length - 1));
    gpLastFocused = document.activeElement;
    gpScrollY = window.scrollY;
    gpAnimating = false;

    gpBuild();
    el.gpOverlay.classList.remove('hidden');
    gpLockScroll();

    gpMeasure();
    gpSetTrack(gpIdleT(), false);
    if (gpActiveEl) gpFitImage(gpActiveEl, true);

    var multi = gpItems.length > 1;
    el.gpPrev.classList.toggle('hidden', !multi);
    el.gpNext.classList.toggle('hidden', !multi);

    /* commit the hidden state before playing the entrance animation */
    el.gpPopup.getBoundingClientRect();
    el.gpOverlay.classList.add('is-visible');

    gpSyncSelection();
    gpPreload();
    window.setTimeout(function () {
      if (!el.gpOverlay.classList.contains('hidden')) el.gpClose.focus();
    }, 40);
  }

  function gpClose() {
    if (el.gpOverlay.classList.contains('hidden')) return;
    el.gpOverlay.classList.remove('is-visible');
    window.setTimeout(function () {
      if (el.gpOverlay.classList.contains('is-visible')) return;
      el.gpOverlay.classList.add('hidden');
      el.gpTrack.innerHTML = '';
      gpItems = [];
      gpSubject = null;
      gpActiveEl = null;
      gpAnimating = false;
      gpUnlockScroll();
      if (window.scrollY !== gpScrollY) window.scrollTo(0, gpScrollY);
      if (gpLastFocused && gpLastFocused.focus) {
        try { gpLastFocused.focus(); } catch (err) { /* element gone */ }
      }
      gpLastFocused = null;
    }, reducedMotion ? 40 : 340);
  }

  /* ---------- search ---------- */
  function runSearch(raw) {
    searchQuery = (raw || '').trim().toLowerCase();
    el.searchClear.classList.toggle('is-visible', searchQuery.length > 0);

    if (!searchQuery) {
      showView(returnView === 'gallery' && activeSubjectId ? 'gallery' : 'home');
      return;
    }

    if (currentView !== 'search') returnView = currentView;

    var matchedSubjects = [];
    var matchedItems = [];

    for (var i = 0; i < subjects.length; i++) {
      var s = subjects[i];
      var sHay = (s.title + ' ' + s.desc + ' ' + s.intro).toLowerCase();
      if (sHay.indexOf(searchQuery) !== -1) matchedSubjects.push(s);

      for (var j = 0; j < s.portfolio.length; j++) {
        var item = s.portfolio[j];
        var iHay = (item.title + ' ' + (item.description || '') + ' ' + s.title).toLowerCase();
        if (iHay.indexOf(searchQuery) !== -1) {
          matchedItems.push({ subject: s, item: item });
        }
      }
    }

    var total = matchedSubjects.length + matchedItems.length;
    el.searchSummary.textContent = total
      ? total + ' result' + (total === 1 ? '' : 's') + ' for “' + raw.trim() + '”'
      : 'No results for “' + raw.trim() + '”';

    if (matchedSubjects.length) {
      el.searchSubjectsSection.classList.remove('hidden');
      var sh = '';
      for (var k = 0; k < matchedSubjects.length; k++) {
        var ms = matchedSubjects[k];
        sh +=
          '<li><button type="button" class="result-btn" data-subject="' + esc(ms.id) + '">' +
            '<span class="result-icon" aria-hidden="true">' + sizeIcon(ms.icon, 22) + '</span>' +
            '<span class="result-copy"><strong>' + esc(ms.title) + '</strong><span>' + esc(ms.desc) + '</span></span>' +
            '<span class="result-arrow" aria-hidden="true">' + ICONS.arrow + '</span>' +
          '</button></li>';
      }
      el.searchSubjectsList.innerHTML = sh;
    } else {
      el.searchSubjectsSection.classList.add('hidden');
      el.searchSubjectsList.innerHTML = '';
    }

    if (matchedItems.length) {
      el.searchItemsSection.classList.remove('hidden');
      var ih = '';
      for (var m = 0; m < matchedItems.length; m++) {
        var mi = matchedItems[m];
        var thumbHtml = mi.item.image
          ? '<img src="' + esc(mi.item.image) + '" alt="">'
          : sizeIcon(mi.subject.icon, 22);
        ih +=
          '<li><button type="button" class="result-btn" data-subject="' + esc(mi.subject.id) + '" data-item="' + esc(mi.item.id) + '">' +
            '<span class="result-icon" aria-hidden="true">' + thumbHtml + '</span>' +
            '<span class="result-copy"><strong>' + esc(mi.item.title) + '</strong><span>' + esc(mi.subject.title) + '</span></span>' +
            '<span class="result-arrow" aria-hidden="true">' + ICONS.arrow + '</span>' +
          '</button></li>';
      }
      el.searchItemsList.innerHTML = ih;
    } else {
      el.searchItemsSection.classList.add('hidden');
      el.searchItemsList.innerHTML = '';
    }

    el.searchEmpty.classList.toggle('hidden', total > 0);
    showView('search');
  }

  /* ---------- 3D tilt for gallery cards ---------- */
  function attachTilt(card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width;
      var py = (e.clientY - rect.top) / rect.height;
      card.style.setProperty('--ry', ((px - 0.5) * 10).toFixed(2) + 'deg');
      card.style.setProperty('--rx', ((0.5 - py) * 10).toFixed(2) + 'deg');
      card.style.setProperty('--ty', '-6px');
    });
    card.addEventListener('mouseleave', function () {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--ty', '0px');
    });
  }

  /* ---------- parallax decor ---------- */
  if (canHover && !reducedMotion) {
    var ticking = false;
    var lastX = 0, lastY = 0;
    window.addEventListener('mousemove', function (e) {
      lastX = e.clientX;
      lastY = e.clientY;
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var cx = (lastX / window.innerWidth - 0.5);
        var cy = (lastY / window.innerHeight - 0.5);
        for (var i = 0; i < el.blobs.length; i++) {
          var depth = parseFloat(el.blobs[i].getAttribute('data-depth')) || 0;
          el.blobs[i].style.transform =
            'translate3d(' + (cx * depth).toFixed(1) + 'px,' + (cy * depth).toFixed(1) + 'px,0)';
        }
        ticking = false;
      });
    });
  }

  /* ---------- events ---------- */
  el.subjectList.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-subject]');
    if (!btn) return;
    openSubject(btn.getAttribute('data-subject'));
  });

  el.galleryGrid.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-item]');
    if (!btn) return;
    var subject = findSubject(activeSubjectId);
    if (!subject) return;
    var index = findItemIndex(subject, btn.getAttribute('data-item'));
    if (index >= 0) gpOpen(subject, index);
  });

  el.backBtn.addEventListener('click', backToSubjects);
  el.crumbHome.addEventListener('click', backToSubjects);
  el.clearDisplayBtn.addEventListener('click', clearDisplay);

  el.searchInput.addEventListener('input', function () {
    runSearch(el.searchInput.value);
  });

  el.searchClear.addEventListener('click', function () {
    el.searchInput.value = '';
    runSearch('');
    el.searchInput.focus();
  });

  el.searchBackBtn.addEventListener('click', function () {
    el.searchInput.value = '';
    runSearch('');
  });

  el.searchView.addEventListener('click', function (e) {
    var btn = e.target.closest('.result-btn');
    if (!btn) return;
    var subjectId = btn.getAttribute('data-subject');
    var itemId = btn.getAttribute('data-item');
    el.searchInput.value = '';
    openSubject(subjectId);
    if (itemId) {
      var subject = findSubject(subjectId);
      var index = subject ? findItemIndex(subject, itemId) : -1;
      if (index >= 0) gpOpen(subject, index);
    }
  });

  el.exploreBtn.addEventListener('click', function () {
    el.searchInput.value = '';
    runSearch('');
    if (currentView !== 'home') showView('home');
    var target = el.subjectList;
    if (target.scrollIntoView) {
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest' });
    }
    var first = el.subjectList.querySelector('.subject-btn');
    if (first) first.focus({ preventScroll: true });
  });

  function goHome() {
    el.searchInput.value = '';
    runSearch('');
    backToSubjects();
  }
  el.brandHome.addEventListener('click', goHome);
  el.brandHome.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goHome();
    }
  });

  /* gallery popup controls */
  el.gpClose.addEventListener('click', gpClose);
  el.gpPrev.addEventListener('click', gpGoPrev);
  el.gpNext.addEventListener('click', gpGoNext);
  el.gpOverlay.addEventListener('click', function (e) {
    if (e.target.hasAttribute && e.target.hasAttribute('data-close')) gpClose();
  });

  /* keep the carousel centred when the viewport is resized */
  window.addEventListener('resize', function () {
    if (el.gpOverlay.classList.contains('hidden')) return;
    gpMeasure();
    gpSetTrack(gpIdleT(), false);
    if (gpActiveEl) gpFitImage(gpActiveEl, true);
  });

  document.addEventListener('keydown', function (e) {
    if (el.gpOverlay.classList.contains('hidden')) return;
    if (e.key === 'Escape') {
      gpClose();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      gpGoPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      gpGoNext();
    } else if (e.key === 'Tab') {
      /* keep focus inside the popup */
      var focusables = el.gpOverlay.querySelectorAll('button:not(.hidden)');
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ============================================================
     3D AIRPLANE SCENES
     ------------------------------------------------------------
     A miniature software renderer, used twice:
       1. the preview picture - the plane loops around the top of
          the picture and dives behind its left edge, so it
          disappears for a moment and comes straight back out on
          the left;
       2. the loading screen - the same plane, always in front.
     Points are rotated by a yaw + pitch camera and projected with
     a simple perspective divide. No libraries, no build step.
     ============================================================ */

  var PLANE_BODY  = '#f2f6fb';
  var PLANE_WING  = '#2f86c7';
  var PLANE_TAIL  = '#57a6e2';
  var PLANE_FIN   = '#e07b2a';
  var PLANE_GLASS = '#2b3a4a';

  var PLANE_BANK = 0.42;      /* bank angle while turning (radians) */
  var PLANE_VIEW = 0.30;      /* tip towards the viewer (radians)   */

  /* ---------- tiny vector helpers ---------- */
  function vAdd(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function vSub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function vScale(a, k) { return [a[0] * k, a[1] * k, a[2] * k]; }
  function vCross(a, b) {
    return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0]
    ];
  }
  function vDot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function vNorm(a) {
    var l = Math.sqrt(vDot(a, a)) || 1;
    return [a[0] / l, a[1] / l, a[2] / l];
  }

  /* ---------- the airplane mesh (local space) ---------- */
  /*  +z is the nose, +x the right wing, +y the top of the cabin  */
  function buildPlaneMesh() {
    var V = [], F = [];

    function add(x, y, z) { V.push([x, y, z]); return V.length - 1; }
    function tri(a, b, c, col) { F.push({ i: [a, b, c], c: col }); }
    function quad(a, b, c, d, col) { tri(a, b, c, col); tri(a, c, d, col); }
    function plate(pts, col) {
      var idx = [];
      for (var i = 0; i < pts.length; i++) idx.push(add(pts[i][0], pts[i][1], pts[i][2]));
      for (var j = 1; j < idx.length - 1; j++) {
        tri(idx[0], idx[j], idx[j + 1], col);
        tri(idx[0], idx[j + 1], idx[j], col);
      }
    }

    /* fuselage: a small hexagonal tube that tapers to the nose */
    var RING = 6;
    var secs = [
      [-0.50, 0.012, 0.000],
      [-0.42, 0.030, 0.000],
      [-0.20, 0.044, 0.000],
      [ 0.14, 0.046, 0.005],
      [ 0.34, 0.032, 0.010],
      [ 0.45, 0.016, 0.014],
      [ 0.52, 0.005, 0.016]
    ];
    var rings = [];
    for (var s = 0; s < secs.length; s++) {
      var ring = [];
      for (var i = 0; i < RING; i++) {
        var a = i / RING * Math.PI * 2;
        ring.push(add(
          Math.cos(a) * secs[s][1],
          secs[s][2] + Math.sin(a) * secs[s][1] * 0.8,
          secs[s][0]
        ));
      }
      rings.push(ring);
    }
    for (var r = 0; r < rings.length - 1; r++) {
      for (var k = 0; k < RING; k++) {
        var j = (k + 1) % RING;
        quad(rings[r][k], rings[r][j], rings[r + 1][j], rings[r + 1][k], PLANE_BODY);
      }
    }

    /* main wings (swept back, slight dihedral) */
    function wing(sign) {
      plate([
        [0.040 * sign, 0.004,  0.060],
        [0.040 * sign, 0.004, -0.150],
        [0.360 * sign, 0.030, -0.270],
        [0.360 * sign, 0.030, -0.170]
      ], PLANE_WING);
    }
    wing(1);
    wing(-1);

    /* tail plane */
    function tailplane(sign) {
      plate([
        [0.030 * sign, 0.010, -0.360],
        [0.030 * sign, 0.010, -0.470],
        [0.170 * sign, 0.022, -0.530],
        [0.170 * sign, 0.022, -0.455]
      ], PLANE_TAIL);
    }
    tailplane(1);
    tailplane(-1);

    /* vertical fin */
    plate([
      [0, 0.020, -0.360],
      [0, 0.020, -0.490],
      [0, 0.190, -0.530],
      [0, 0.170, -0.400]
    ], PLANE_FIN);

    /* cockpit glass */
    plate([
      [-0.022, 0.038, 0.200],
      [ 0.022, 0.038, 0.200],
      [ 0.018, 0.032, 0.020],
      [-0.018, 0.032, 0.020]
    ], PLANE_GLASS);

    return { V: V, F: F };
  }

  /* ---------- flight paths ---------- */
  /* a plain tilted ring: the far side is up and behind */
  function pathRing(t, tilt, rx, ry) {
    var a = t * Math.PI * 2;
    var s = Math.sin(a), c = Math.cos(a);
    return [c * rx, s * ry * Math.sin(tilt), s * ry * Math.cos(tilt)];
  }
  /* a ring whose depth is shifted, so the plane dives behind the
     picture exactly on the left side and pops out there again */
  function pathSwoop(t, tilt, rx, ry, depth, zc) {
    var a = t * Math.PI * 2;
    var s = Math.sin(a), c = Math.cos(a);
    return [c * rx, s * ry * Math.sin(tilt), zc - depth * c];
  }

  /* ---------- camera (straight on, small perspective) ---------- */
  function planeCamSpace(pt, cam) {
    var cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw);
    var x = pt[0] * cy - pt[2] * sy;
    var z = pt[0] * sy + pt[2] * cy;
    var y = pt[1];
    var cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    return { x: x, y: y * cp - z * sp, z: y * sp + z * cp };
  }

  function planeProject(pt, cam) {
    var c = planeCamSpace(pt, cam);
    var s = cam.focal / (cam.focal + c.z);
    return { x: cam.cx + c.x * s * cam.unit, y: cam.cy - c.y * s * cam.unit, s: s, z: c.z };
  }

  /* ---------- colours ---------- */
  function hexToRgb(hex) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function shade(hex, k, mix) {
    var c = hexToRgb(hex);
    var m = mix ? hexToRgb(mix) : null;
    var r = Math.min(255, Math.round(c[0] * k));
    var g = Math.min(255, Math.round(c[1] * k));
    var b = Math.min(255, Math.round(c[2] * k));
    if (m) {
      r = Math.round(r * 0.82 + m[0] * 0.18);
      g = Math.round(g * 0.82 + m[1] * 0.18);
      b = Math.round(b * 0.82 + m[2] * 0.18);
    }
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  /* ---------- the airplane ---------- */
  function drawPlaneMesh(ctx, cam, mesh, pos, basis, alpha, scale, occlude, pic) {
    var S = scale;
    var world = [];
    for (var i = 0; i < mesh.V.length; i++) {
      var v = mesh.V[i];
      world.push([
        pos[0] + (basis.r[0] * v[0] + basis.u[0] * v[1] + basis.f[0] * v[2]) * S,
        pos[1] + (basis.r[1] * v[0] + basis.u[1] * v[1] + basis.f[1] * v[2]) * S,
        pos[2] + (basis.r[2] * v[0] + basis.u[2] * v[1] + basis.f[2] * v[2]) * S
      ]);
    }

    var camV = [];
    for (var j = 0; j < world.length; j++) camV.push(planeCamSpace(world[j], cam));

    var L = vNorm([-0.42, 0.78, -0.46]);   /* light, in camera space */

    var faces = [];
    for (var f = 0; f < mesh.F.length; f++) {
      var idx = mesh.F[f].i;
      var a = camV[idx[0]], b = camV[idx[1]], c = camV[idx[2]];
      var n = vNorm(vCross(vSub([b.x, b.y, b.z], [a.x, a.y, a.z]), vSub([c.x, c.y, c.z], [a.x, a.y, a.z])));
      if (vDot(n, L) < 0) n = vScale(n, -1);           /* always shade the visible side */
      var light = Math.max(0, vDot(n, L));
      var k = 0.44 + 0.56 * light;
      var depth = (a.z + b.z + c.z) / 3;
      faces.push({
        idx: idx,
        col: shade(mesh.F[f].c, k, '#dbeaf8'),
        edge: shade(mesh.F[f].c, k * 0.62, '#4a6a86'),
        depth: depth,
        light: light
      });
    }
    faces.sort(function (p, q) { return q.depth - p.depth; });   /* far first */

    ctx.globalAlpha = alpha;
    for (var d = 0; d < faces.length; d++) {
      var fc = faces[d];

      /* the picture hides whatever is behind it */
      var poly = null;
      if (occlude && pic) {
        var over = false;
        for (var m = 0; m < 3; m++) {
          var pm = planeProject(world[fc.idx[m]], cam);
          if (pm.x >= pic.l && pm.x <= pic.r && pm.y >= pic.t && pm.y <= pic.b) { over = true; break; }
        }
        if (over) {
          poly = [];
          for (var e = 0; e < 3; e++) {
            var p0 = camV[fc.idx[e]];
            var p1 = camV[fc.idx[(e + 1) % 3]];
            var in0 = p0.z <= 0, in1 = p1.z <= 0;
            if (in0) poly.push(p0);
            if (in0 !== in1) {
              var t = p0.z / (p0.z - p1.z);
              poly.push({ x: p0.x + (p1.x - p0.x) * t, y: p0.y + (p1.y - p0.y) * t, z: 0 });
            }
          }
          if (poly.length < 3) continue;             /* fully behind */
        }
      }
      if (!poly) poly = [camV[fc.idx[0]], camV[fc.idx[1]], camV[fc.idx[2]]];

      ctx.beginPath();
      for (var q = 0; q < poly.length; q++) {
        var pp = planeProject([poly[q].x, poly[q].y, poly[q].z], cam);
        if (q === 0) ctx.moveTo(pp.x, pp.y); else ctx.lineTo(pp.x, pp.y);
      }
      ctx.closePath();
      ctx.fillStyle = fc.col;
      ctx.fill();
      ctx.strokeStyle = fc.edge;
      ctx.lineWidth = 0.4;
      ctx.stroke();
      if (fc.light > 0.62) {
        ctx.strokeStyle = 'rgba(255,255,255,0.45)';
        ctx.lineWidth = 0.3;
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }

  /* ---------- the trail behind the plane ---------- */
  function drawTrail(ctx, cam, trail, depthFade, occlude, pic) {
    if (trail.length < 2) return;

    function overPicture(pt) {
      if (!occlude || !pic) return false;
      var p = planeProject(pt, cam);
      return p.x >= pic.l && p.x <= pic.r && p.y >= pic.t && p.y <= pic.b;
    }

    for (var i = 1; i < trail.length; i++) {
      var a = trail[i - 1], b = trail[i];
      if (occlude && pic) {
        var hidden = a[2] > 0 && b[2] > 0 && overPicture(a);
        if (hidden) continue;                        /* behind the picture */
        if ((a[2] > 0 || b[2] > 0) && (overPicture(a) || overPicture(b))) {
          var t = a[2] / (a[2] - b[2]);              /* cross the picture plane */
          var cut = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, 0];
          if (a[2] > 0) a = cut; else b = cut;
        }
      }
      var pa = planeProject(a, cam);
      var pb = planeProject(b, cam);
      var f = i / trail.length;
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.strokeStyle = 'rgba(87,166,226,' + (0.30 * f).toFixed(3) + ')';
      ctx.lineWidth = 0.5 + 1.7 * f;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
    for (var j = 0; j < trail.length; j++) {
      if (occlude && pic && trail[j][2] > 0 && overPicture(trail[j])) continue;
      var g = (j + 1) / trail.length;
      var p = planeProject(trail[j], cam);
      var fade = depthFade ? depthFade(trail[j][2]) : 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 0.4 + 1.7 * g, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,' + (0.45 * g * fade).toFixed(3) + ')';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x, p.y, 0.3 + 1.1 * g, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(47,134,199,' + (0.5 * g * fade).toFixed(3) + ')';
      ctx.fill();
    }
  }

  /* ============================================================
     A SCENE = one canvas with its own plane, path and timing
     ============================================================ */
  function createPlaneScene(canvas, cfg) {
    if (!canvas) return null;
    var ctx = canvas.getContext('2d');
    if (!ctx) return null;
    return {
      canvas: canvas,
      ctx: ctx,
      cfg: cfg,
      w: 0, h: 0,
      time: 0,
      phase: cfg.phase || 0,
      last: 0,
      raf: 0,
      trail: [],
      mesh: buildPlaneMesh(),
      rx: 0, ry: 0, cy: 0, scale: 20, focal: 320,
      depth: 0, zc: 0,
      pic: { l: 0, t: 0, r: 0, b: 0 }
    };
  }

  /* measures the canvas and works out where the plane has to fly */
  function sceneSync(st) {
    if (!st) return;
    var canvas = st.canvas;
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    if (w === st.w && h === st.h) return;
    st.w = w;
    st.h = h;
    if (!w || !h) return;

    var cfg = st.cfg;

    if (cfg.picture) {
      /* the plane loops around the top of the picture and dives
         behind its left edge */
      var stage = document.getElementById(cfg.picture);
      if (stage) {
        st.pic.l = stage.offsetLeft;
        st.pic.t = stage.offsetTop;
        st.pic.r = stage.offsetLeft + stage.offsetWidth;
        st.pic.b = stage.offsetTop + stage.offsetHeight;
      }
      var picW = Math.max(1, st.pic.r - st.pic.l);
      st.rx = Math.max(40, picW / 2 - 10);
      st.ry = Math.max(16, h * 0.085);
      st.cy = st.pic.t + st.ry * 0.45;
      st.scale = Math.max(26, Math.min(50, h * 0.16));
      st.depth = Math.max(18, h * 0.09);
      st.zc = -0.78 * st.depth;
    } else {
      st.rx = Math.max(30, w * 0.36);
      st.ry = Math.max(14, h * 0.26);
      st.cy = h * 0.5;
      st.scale = Math.max(18, Math.min(36, h * 0.22));
      st.depth = st.ry * Math.cos(cfg.tilt || 0.5);
      st.zc = 0;
    }
    st.focal = Math.max(210, st.ry * 3.4);

    var dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    st.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function sceneFrame(st, dt) {
    var ctx = st.ctx;
    var w = st.w, h = st.h;
    if (!w || !h) return;

    ctx.clearRect(0, 0, w, h);

    st.phase += dt * st.cfg.speed;
    if (st.phase >= 1) st.phase -= 1;
    st.time += dt;

    var cam = {
      yaw: 0,
      pitch: 0,
      focal: st.focal,
      cx: w * 0.5,
      cy: st.cy,
      unit: 1
    };

    /* the ring slowly rocks, which makes the depth easier to read */
    var tilt = (st.cfg.tilt || 0.5) + Math.sin(st.time * 0.45) * 0.10;

    var path = st.cfg.swoop ? pathSwoop : pathRing;
    var pos = path(st.phase, tilt, st.rx, st.ry, st.depth, st.zc);
    var ahead = path(st.phase + 0.004, tilt, st.rx, st.ry, st.depth, st.zc);
    var f = vNorm(vSub(ahead, pos));
    var right = vNorm(vCross([0, 1, 0], f));
    var up = vCross(f, right);

    /* bank into the turn */
    var cb = Math.cos(PLANE_BANK), sb = Math.sin(PLANE_BANK);
    var br = vAdd(vScale(right, cb), vScale(up, sb));
    var bu = vSub(vScale(up, cb), vScale(right, sb));

    /* tip the plane a little towards the viewer, so its wings are
       visible instead of a thin line */
    var cv = Math.cos(PLANE_VIEW), sv = Math.sin(PLANE_VIEW);
    var basis = {
      r: vAdd(vScale(br, cv), vScale(bu, sv)),
      u: vSub(vScale(bu, cv), vScale(br, sv)),
      f: f
    };

    st.trail.push(pos);
    if (st.trail.length > st.cfg.trailMax) st.trail.shift();

    var occlude = !!st.cfg.picture;
    var zSpan = Math.max(1, st.depth);
    function depthFade(z) {
      if (occlude && z > 0) return 0;          /* behind the picture */
      var far = Math.max(0, -z) / (2 * zSpan);
      return 1 - 0.28 * far;
    }

    drawTrail(ctx, cam, st.trail, depthFade, occlude, st.pic);
    drawPlaneMesh(ctx, cam, st.mesh, pos, basis, depthFade(pos[2]), st.scale, occlude, st.pic);
  }

  function sceneLoop(st, now) {
    if (!st) return;
    var dt = st.last ? Math.min(0.05, (now - st.last) / 1000) : 0.016;
    st.last = now;
    sceneSync(st);
    if (!document.hidden && st.w && st.h) {
      sceneFrame(st, dt);
    }
    st.raf = window.requestAnimationFrame(function (t) { sceneLoop(st, t); });
  }

  function sceneStop(st) {
    if (!st) return;
    if (st.raf && window.cancelAnimationFrame) {
      window.cancelAnimationFrame(st.raf);
    }
    st.raf = 0;
  }

  /* starts the animation again after sceneStop() */
  function sceneResume(st) {
    if (!st || st.raf) return;
    st.last = 0;
    st.raf = window.requestAnimationFrame(function (t) { sceneLoop(st, t); });
  }

  function sceneStart(st) {
    if (!st) return;
    sceneSync(st);
    window.addEventListener('resize', function () { sceneSync(st); });
    if (window.ResizeObserver) {
      var ro = new ResizeObserver(function () { sceneSync(st); });
      ro.observe(st.canvas);
    }
    if (reducedMotion) {
      /* one still frame of the very same scene */
      st.phase = st.cfg.phase || 0.18;
      for (var i = 0; i < st.cfg.trailMax; i++) {
        var path = st.cfg.swoop ? pathSwoop : pathRing;
        st.trail.push(path(st.phase - 0.006 * i, st.cfg.tilt || 0.5, st.rx, st.ry, st.depth, st.zc));
      }
      sceneFrame(st, 0);
      return;
    }
    sceneResume(st);
  }

  /* ============================================================
     THE TWO SCENES
     ============================================================ */
  var previewScene = null;
  var loaderScene = null;

  function startPreviewScene() {
    previewScene = createPlaneScene(document.getElementById('previewPlane'), {
      picture: 'displayStage',     /* the picture hides what is behind it */
      swoop: true,                /* dives behind the left edge          */
      tilt: 0.5,
      speed: 0.17,
      trailMax: 34
    });
    sceneStart(previewScene);
  }

  /* ============================================================
     THE LOADING SCREEN
     ------------------------------------------------------------
     A full screen overlay with the same 3D airplane flying in it.
     It is used when the page starts, when a subject is opened and
     when a portfolio item is opened. If two of those happen at
     once, the second one simply waits for the first to finish.
     ============================================================ */
  var LOADER_DELAY = 2500;      /* the first load of the page */
  var LOADER_SUBJECT = 1200;    /* opening a subject          */
  var LOADER_ITEM = 1000;       /* opening a portfolio item   */

  var loaderBusy = false;
  var loaderQueue = [];

  function startLoaderScene() {
    loaderScene = createPlaneScene(document.getElementById('loaderPlane'), {
      tilt: 0.5,
      speed: 0.22,
      trailMax: 30
    });
    sceneStart(loaderScene);
  }

  /* shows the loading screen for `delay` ms, then calls `done` */
  function showLoader(delay, done) {
    var loader = document.getElementById('loader');
    if (!loader) { if (done) done(); return; }

    if (loaderBusy) {                 /* one after the other */
      loaderQueue.push({ delay: delay, done: done });
      return;
    }
    if (reducedMotion) {              /* no animation, no waiting */
      if (done) done();
      return;
    }

    loaderBusy = true;
    loader.classList.remove('hidden');
    loader.classList.remove('is-done');

    var fill = document.getElementById('loaderFill');
    if (fill) fill.style.width = '0%';

    if (!loaderScene) {
      startLoaderScene();
    } else {
      loaderScene.phase = 0;
      loaderScene.trail.length = 0;
      sceneResume(loaderScene);
    }

    var now = function () {
      return (window.performance && performance.now) ? performance.now() : Date.now();
    };
    var start = now();

    function tick() {
      var p = Math.min(1, (now() - start) / delay);
      if (fill) fill.style.width = (p * 100).toFixed(1) + '%';
      if (p < 1) {
        window.requestAnimationFrame(tick);
        return;
      }
      loader.classList.add('is-done');
      window.setTimeout(function () {
        loader.classList.add('hidden');
      }, 500);
      sceneStop(loaderScene);
      loaderBusy = false;
      if (done) done();
      var next = loaderQueue.shift();
      if (next) window.setTimeout(function () { showLoader(next.delay, next.done); }, 260);
    }
    window.requestAnimationFrame(tick);
  }

  /* ---------- init ---------- */
  renderSubjects();
  showView('home');
  clearDisplay();
  startPreviewScene();
  showLoader(LOADER_DELAY, null);
})();

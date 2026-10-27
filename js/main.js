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
    logoPath: 'images/logo.png'
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
          image: 'images/file.svg', section: 'projects' }
     `section` is one of: gallery, projects, activities, outputs
     and is shown as a small tag on the card. An item may carry
     an `images` array to show several pictures of one project,
     or a `video` source to play inside the shared viewer. The
     gallery grid and the media viewer both read straight from
     these collections.
     ============================================================ */
  var subjects = [
    {
      id: 'english', title: 'English', tone: 0,
      desc: 'Read, Write, and Express Your Ideas While Exploring Literature.',
      intro: 'Language arts outputs — essays, speeches, and creative writing from class activities.',
      icon: ICONS.english,
      cover: 'images/covers/english.svg',
      portfolio: [
        { id: 'en-gallery', title: 'English Gallery', description: 'Reading, writing, and communication outputs from our English class.', image: 'images/ENGLISH/%20(1).png', images: ['images/ENGLISH/%20(1).png','images/ENGLISH/%20(2).png','images/ENGLISH/%20(3).png','images/ENGLISH/%20(4).png','images/ENGLISH/%20(5).png'], section: 'outputs', display: 'scroll' }
      ]
    },
    {
      id: 'mathematics', title: 'Mathematics', tone: 1,
      desc: 'Think Critically, Solve Problems, and Improve your Mathematical Skills.',
      intro: 'Mathematical reasoning shown through solutions, models, and project work.',
      icon: ICONS.mathematics,
      cover: 'images/covers/mathematics.svg',
      portfolio: [
        { id: 'ma-gallery', title: 'Mathematics Gallery', description: 'Mathematical reasoning shown through worked solutions and project work.', image: 'images/MATH/math.png', images: ['images/MATH/math.png'], section: 'outputs', display: 'scroll' }
      ]
    },
    {
      id: 'science', title: 'Science', tone: 2,
      desc: 'Experiments, Reports, and Discoveries',
      intro: 'Investigations, lab reports, and science fair outputs collected in one place.',
      icon: ICONS.science,
      cover: 'images/covers/science.svg',
      portfolio: [
        { id: 'sc-gallery', title: 'Science Gallery', description: 'Mga proyekto at gawain sa Science.', image: 'images/SCIENCE/1.png', images: ['images/SCIENCE/1.png','images/SCIENCE/2.png','images/SCIENCE/3.png','images/SCIENCE/4.png','images/SCIENCE/5.png','images/SCIENCE/6.png','images/SCIENCE/7.png','images/SCIENCE/8.png','images/SCIENCE/9.png','images/SCIENCE/10.png'], section: 'outputs', display: 'scroll' }
      ]
    },
    {
      id: 'filipino', title: 'Filipino', tone: 3,
      desc: 'Magbasa, Umunawa, at Ipagmalaki ang Wikang Filipino.',
      intro: 'Mga gawaing pamp Filipino — sanaysay, tula, ulat, at proyekto sa wika.',
      icon: ICONS.filipino,
      cover: 'images/covers/filipino.svg',
      portfolio: [
        { id: 'fi-tanka', title: 'Tanka at Haiku', description: 'Mga tanka at haiku tungkol sa aking karanasan.', image: 'images/FILIPINO/tanka_at_haiku/1.png', images: ['images/FILIPINO/tanka_at_haiku/1.png','images/FILIPINO/tanka_at_haiku/2.png','images/FILIPINO/tanka_at_haiku/3.png','images/FILIPINO/tanka_at_haiku/4.png'], section: 'outputs', display: 'scroll' }
      ]
    },
    {
      id: 'araling-panlipunan', title: 'Araling Panlipunan', tone: 0,
      desc: 'Explore History, Understand Society and Civics, and Learn About Economics.',
      intro: 'Research, maps, and community studies that explore people and society.',
      icon: ICONS.araling,
      cover: 'images/covers/araling-panlipunan.svg',
      portfolio: [
        { id: 'ap-gallery', title: 'Araling Panlipunan Gallery', description: 'Research, maps, and community studies from our Araling Panlipunan class.', image: 'images/AP/1.png', images: ['images/AP/1.png','images/AP/2.png','images/AP/3.png','images/AP/4.png','images/AP/5.png','images/AP/6.png'], section: 'outputs', display: 'scroll' }
      ]
    },
    {
      id: 'values-education', title: 'Values Education', tone: 1,
      desc: 'Learn to Be Kind, Honest, Respectful, and Responsible.',
      intro: 'Reflections, action plans, and service-learning outputs about values in practice.',
      icon: ICONS.values,
      cover: 'images/covers/values-education.svg',
      portfolio: []
    },
    {
      id: 'tle', title: 'TLE', tone: 2,
      desc: 'Learn Practical Skills, Create Useful Projects, and Achieve Your Goals.',
      intro: 'Practical creations, livelihood demos, and technology projects from TLE class.',
      icon: ICONS.tle,
      cover: 'images/covers/tle.svg',
      portfolio: [
        {
          id: 'tl-1',
          title: 'My Signature Salad',
          description: 'Personal salad recipe presented for the cook-off.',
          image: 'images/TLE/my_salad/2.png',
          /* a slide deck, browsed left and right like a presentation */
          images: [
            'images/TLE/my_salad/2.png',
            'images/TLE/my_salad/3.png',
            'images/TLE/my_salad/4.png',
            'images/TLE/my_salad/5.png',
            'images/TLE/my_salad/6.png',
            'images/TLE/my_salad/7.png',
            'images/TLE/my_salad/8.png',
            'images/TLE/my_salad/9.png',
            'images/TLE/my_salad/10.png'
          ],
          section: 'outputs',
          /* 3.png carries an animated salad photo laid exactly over its
             own photo panel; the printed caption stays on top */
          overlay: {
            image: 'images/TLE/my_salad/3.png',
            media: 'images/TLE/my_salad/salad.gif',
            box: { x: 62.59, y: 10.03, w: 31.77, h: 79.95 },
            lines: ['FRESH GARDEN SALAD', 'Green Salad / Tossed Salad']
          }
        }
      ]
    },
    {
      id: 'mapeh', title: 'MAPEH', tone: 3,
      desc: 'Stay Active, Create Art, Perform with Confidence, and Express Yourself.',
      intro: 'Performances, artwork, fitness records, and health projects in one gallery.',
      icon: ICONS.mapeh,
      cover: 'images/covers/mapeh.svg',
      portfolio: []
    }
  ];

  /* subject sections, in the order the tabs appear */
  var SECTIONS = [
    { id: 'gallery', label: 'Gallery' },
    { id: 'projects', label: 'Projects' },
    { id: 'activities', label: 'Activities' },
    { id: 'outputs', label: 'Outputs' }
  ];

  var SUBJECT_TINTS = [
    'linear-gradient(150deg, #8FC5E8, #244E75)',
    'linear-gradient(150deg, #F6D3C1, #A96F54)',
    'linear-gradient(150deg, #A5D2EF, #2F86C7)',
    'linear-gradient(150deg, #EDBB9E, #704631)'
  ];

  /* ---------- My Gallery: personal scrapbook manifest ---------- */
  var GALLERY_CATEGORIES = [
    { id: 'all', label: 'All memories' },
    { id: 'aviation', label: 'Aviation and Airplanes' },
    { id: 'travel', label: 'Travel and Places' },
    { id: 'music', label: 'Guitar and Music' },
    { id: 'food', label: 'Food Adventures' },
    { id: 'movies', label: 'Animations and Movies' },
    { id: 'memories', label: 'Personal Memories' }
  ];

  var EMPTY_CATEGORY_NOTE = {
    food: 'Food adventures will be pinned here soon — new dishes, cafés, and family recipes.',
    movies: 'Animations and movie favourites will be pinned here soon.',
    travel: 'Travel photos will be pinned here soon.'
  };

  var PROFILE_GALLERY = [
    { id: 'pg-1', title: 'Gallery Image 1', image: 'images/PROFILE_GALLERY/gallery (1).jpg' },
    { id: 'pg-2', title: 'Gallery Image 2', image: 'images/PROFILE_GALLERY/gallery (2).jpg' },
    { id: 'pg-3', title: 'Gallery Image 3', image: 'images/PROFILE_GALLERY/gallery (3).jpg' },
    { id: 'pg-4', title: 'Gallery Image 4', image: 'images/PROFILE_GALLERY/gallery (4).jpg' },
    { id: 'pg-5', title: 'Gallery Image 5', image: 'images/PROFILE_GALLERY/gallery (5).jpg' },
    { id: 'pg-6', title: 'Gallery Image 6', image: 'images/PROFILE_GALLERY/gallery (6).jpg' }
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
  var activeCategory = 'all';
  var currentView = 'home';
  var returnView = 'home';
  var searchQuery = '';

  /* unified media viewer state */
  var lbItems = [];
  var lbIndex = 0;
  var lbScrollY = 0;
  var lbLastFocused = null;
  /* direction of the last slide change, drives the transition animation */
  var lbDir = 0;
  /* pixel box of the slide artwork overlay currently on screen */
  var lbOverlayBox = null;
  /* true when the open set comes from My Gallery: those photos must
     always fit whole in the viewport, never the scrollable long layout */
  var lbWholeFit = false;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- dom refs ---------- */
  var el = {
    homeView: document.getElementById('homeView'),
    subjectsView: document.getElementById('subjectsView'),
    galleryView: document.getElementById('galleryView'),
    searchView: document.getElementById('searchView'),
    myGalleryView: document.getElementById('myGalleryView'),
    subjectCards: document.getElementById('subjectCards'),
    galleryTitle: document.getElementById('galleryTitle'),
    galleryDesc: document.getElementById('galleryDesc'),
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
    searchToggle: document.getElementById('searchToggle'),
    navSearch: document.getElementById('navSearch'),
    brandHome: document.getElementById('brandHome'),
    navLinks: Array.prototype.slice.call(document.querySelectorAll('.nav-link')),
    navTargets: Array.prototype.slice.call(document.querySelectorAll('[data-nav]')),
    myGalleryBackBtn: document.getElementById('myGalleryBackBtn'),
    myGalleryGrid: document.getElementById('myGalleryGrid'),
    myGalleryFilters: document.getElementById('myGalleryFilters'),
    myGalleryTitle: document.getElementById('myGalleryTitle'),
    lightboxOverlay: document.getElementById('lightboxOverlay'),
    lightboxContent: document.getElementById('lightboxContent'),
    lightboxClose: document.getElementById('lightboxClose'),
    lightboxPrev: document.getElementById('lightboxPrev'),
    lightboxNext: document.getElementById('lightboxNext'),
    lightboxImage: document.getElementById('lightboxImage'),
    lightboxFrame: document.getElementById('lightboxFrame'),
    lightboxSlide: document.getElementById('lightboxSlide'),
    lightboxVideo: document.getElementById('lightboxVideo'),
    lightboxError: document.getElementById('lightboxError'),
    lightboxCaption: document.getElementById('lightboxCaption'),
    lightboxCounter: document.getElementById('lightboxCounter'),
    heroVideo: document.getElementById('heroVideo'),
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
    img.alt = mode === 'brand' ? 'Jarred\'s Digital Portfolio logo' : 'Gallery logo';
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

  setupLogo(
    el.brandHome ? el.brandHome.querySelector('.nav-logo') : null,
    CONFIG.logoPath,
    'avatar'
  );

  /* ---------- view switching ---------- */
  var VIEW_NODES = {
    home: function () { return el.homeView; },
    subjects: function () { return el.subjectsView; },
    gallery: function () { return el.galleryView; },
    mygallery: function () { return el.myGalleryView; },
    search: function () { return el.searchView; }
  };

  function showView(name) {
    currentView = name;
    /* home is where the music belongs: it comes back automatically
       whenever the visitor returns to this view */
    if (name === 'home') startBackgroundMusic();
    el.homeView.classList.toggle('is-active', name === 'home');
    el.subjectsView.classList.toggle('is-active', name === 'subjects');
    el.galleryView.classList.toggle('is-active', name === 'gallery');
    el.searchView.classList.toggle('is-active', name === 'search');
    el.myGalleryView.classList.toggle('is-active', name === 'mygallery');

    /* keep the top navigation highlight in sync */
    var linkView = name === 'gallery' ? 'subjects' : name;
    for (var i = 0; i < el.navLinks.length; i++) {
      el.navLinks[i].classList.toggle('is-active', el.navLinks[i].getAttribute('data-nav') === linkView);
    }

    /* restart view animation */
    var active = (VIEW_NODES[name] || VIEW_NODES.home)();
    active.style.animation = 'none';
    void active.offsetWidth;
    active.style.animation = '';
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  }

  /* ---------- subjects page: printed-photo cards ---------- */
  function renderSubjects() {
    if (!el.subjectCards) return;
    var html = '';
    for (var i = 0; i < subjects.length; i++) {
      var s = subjects[i];
      var cover = s.cover || (s.portfolio[0] && s.portfolio[0].image);
      html +=
        '<button type="button" class="subject-card" style="--i:' + i + '" data-subject="' + esc(s.id) + '" ' +
          'aria-label="Open the ' + esc(s.title) + ' gallery">' +
          '<span class="sc-photo">' +
            '<span class="sc-tape sc-tape-l" aria-hidden="true"></span>' +
            '<span class="sc-tape sc-tape-r" aria-hidden="true"></span>' +
            '<span class="sc-img-wrap">' +
              /* covers load eagerly: a lazy image is only fetched once it is
                 painted, so off-screen covers would load late and make any
                 "all cover photos loaded" check race. There are only 8 small
                 SVGs, so eager is cheap and deterministic. */
              '<img src="' + esc(cover) + '" alt="' + esc(s.title) + ' subject cover photo" loading="eager">' +
            '</span>' +
            '<span class="sc-icon" aria-hidden="true">' + sizeIcon(s.icon, 24) + '</span>' +
          '</span>' +
          '<span class="sc-body">' +
            '<h3>' + esc(s.title) + '</h3>' +
            '<p>' + esc(s.desc) + '</p>' +
          '</span>' +
          '<span class="sc-arrow" aria-hidden="true">' + ICONS.arrow + '</span>' +
        '</button>';
    }
    el.subjectCards.innerHTML = html;
  }

  function sectionLabel(id) {
    for (var i = 0; i < SECTIONS.length; i++) {
      if (SECTIONS[i].id === id) return SECTIONS[i].label;
    }
    return 'Gallery';
  }

  /* ---------- gallery page ---------- */
  function renderGallery() {
    var subject = findSubject(activeSubjectId);
    if (!subject) return;

    var items = subject.portfolio;

    el.galleryTitle.textContent = subject.title;
    el.galleryIntro.textContent = subject.intro;
    if (el.galleryDesc) el.galleryDesc.textContent = subject.desc || '';
    el.crumbTitle.textContent = subject.title;
    el.heroIcon.innerHTML = subject.icon;
    el.heroIcon.style.background = SUBJECT_TINTS[subject.tone % SUBJECT_TINTS.length];
    el.itemCount.textContent = itemCountLabel(items.length);

    if (!items.length) {
      el.galleryGrid.innerHTML = '';
      el.galleryGrid.classList.add('hidden');
      el.galleryGrid.classList.remove('is-single');
      el.galleryGrid.classList.remove('is-posters');
      el.galleryEmpty.classList.remove('hidden');
      return;
    }

    el.galleryEmpty.classList.add('hidden');
    el.galleryGrid.classList.remove('hidden');
    /* one item only: the grid swaps to a single, centred feature card
       (see .gallery-grid.is-single) so the page never looks empty */
    el.galleryGrid.classList.toggle('is-single', items.length === 1);
    /* Mathematics work is a portrait poster, not a snapshot: its preview
       keeps the whole sheet on screen (object-fit: contain, see
       .gallery-grid.is-posters) instead of cropping it like a photo */
    el.galleryGrid.classList.toggle('is-posters', subject.id === 'mathematics');

    var html = '';
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var thumb = item.image
        ? '<img src="' + esc(item.image) + '" alt="' + esc(item.title) + '" loading="lazy">'
        : sizeIcon(ICONS.doc, 40);
      html +=
        '<button type="button" class="g-card" style="--i:' + i + '" data-item="' + esc(item.id) + '" ' +
          'aria-label="Open ' + esc(item.title) + ' in viewer">' +
          '<span class="g-tape" aria-hidden="true"></span>' +
          '<span class="g-thumb" aria-hidden="true">' + thumb + '</span>' +
          '<span class="g-body">' +
            '<h3>' + esc(item.title) + '</h3>' +
            '<p>' + esc(subject.title) + '</p>' +
            '<span class="g-tag">' + esc(sectionLabel(item.section || 'gallery')) + '</span>' +
          '</span>' +
        '</button>';
    }
    el.galleryGrid.innerHTML = html;

    if (canHover && !reducedMotion) {
      var cards = el.galleryGrid.querySelectorAll('.g-card');
      Array.prototype.forEach.call(cards, attachTilt);
    }
  }

  function openSubject(id, afterOpen) {
    var subject = findSubject(id);
    if (!subject) return;
    stopMusic();
    activeSubjectId = id;
    activeItemId = null;
    renderSubjects();
    renderGallery();
    showView('gallery');
    scrollToTop();
    if (afterOpen) afterOpen(subject);
  }

  function backToSubjects() {
    closeLightbox();
    stopMusic();
    activeSubjectId = null;
    activeItemId = null;
    renderSubjects();
    showView('subjects');
    scrollToTop();
  }

  function goHome() {
    el.searchInput.value = '';
    runSearch('');
    closeLightbox();
    stopMusic();
    activeSubjectId = null;
    activeItemId = null;
    showView('home');
    scrollToTop();
  }

  /* ---------- music control ---------- */
  function getBgMusic() {
    return document.getElementById('bgMusic');
  }

  function stopMusic() {
    var m = getBgMusic();
    if (m && !m.paused) {
      m.pause();
    }
  }

  /*     The music starts by itself as soon as the site opens, stops again
     whenever the visitor moves into a focused view (subjects, my
     gallery, the media viewer) or starts the hero video, and comes
     back by itself when they return to the home view.

     Browsers normally block autoplay with sound before any user
     interaction, so the rejected play() promise is caught and the
     start is retried on the visitor's very first click or key press.
     That way the music still comes on automatically, and no error is
     ever thrown. */
  function startBackgroundMusic() {
    var m = getBgMusic();
    if (!m) return;
    /* never talk over the hero video while it is still running */
    if (el.heroVideo && !el.heroVideo.paused && !el.heroVideo.ended) return;

    var unlockersRemoved = false;
    function removeUnlockers() {
      if (unlockersRemoved) return;
      unlockersRemoved = true;
      window.removeEventListener('pointerdown', begin, true);
      window.removeEventListener('touchstart', begin, true);
      window.removeEventListener('keydown', begin, true);
    }
    function begin() {
      removeUnlockers();
      var retry = m.play();
      if (retry && typeof retry.catch === 'function') {
        retry.catch(function () { /* still blocked - nothing to do */ });
      }
    }

    var attempt = m.play();
    if (attempt && typeof attempt.then === 'function') {
      attempt.then(removeUnlockers, function () {
        window.addEventListener('pointerdown', begin, true);
        window.addEventListener('touchstart', begin, true);
        window.addEventListener('keydown', begin, true);
      });
    }
  }

  /* ---------- my gallery ---------- */
  function renderMyGalleryFilters() {
    if (!el.myGalleryFilters) return;
    var html = '';
    for (var i = 0; i < GALLERY_CATEGORIES.length; i++) {
      var c = GALLERY_CATEGORIES[i];
      html +=
        '<button type="button" class="chip' + (c.id === activeCategory ? ' is-active' : '') + '" ' +
          'data-category="' + esc(c.id) + '" role="tab" aria-selected="' + (c.id === activeCategory) + '">' +
          esc(c.label) +
        '</button>';
    }
    el.myGalleryFilters.innerHTML = html;
  }

  function categoryLabel(id) {
    for (var i = 0; i < GALLERY_CATEGORIES.length; i++) {
      if (GALLERY_CATEGORIES[i].id === id) return GALLERY_CATEGORIES[i].label;
    }
    return 'All memories';
  }

  function itemsForCategory(cat) {
    if (!cat || cat === 'all') return PROFILE_GALLERY.slice();
    var out = [];
    for (var i = 0; i < PROFILE_GALLERY.length; i++) {
      if (PROFILE_GALLERY[i].cat === cat) out.push(PROFILE_GALLERY[i]);
    }
    return out;
  }

  var SCRAP_TILTS = ['-1.6deg', '1.2deg', '-0.8deg', '1.8deg', '-1.2deg', '0.9deg'];

  function renderMyGallery() {
    if (!el.myGalleryGrid) return;
    var items = itemsForCategory(activeCategory);
    if (el.myGalleryTitle) el.myGalleryTitle.textContent = categoryLabel(activeCategory);

    if (!items.length) {
      var note = EMPTY_CATEGORY_NOTE[activeCategory] ||
        'New memories will be pinned to this page soon.';
      el.myGalleryGrid.innerHTML =
        '<div class="note-card"><strong>Coming soon&#33;</strong><p>' + esc(note) + '</p></div>';
      return;
    }

    var html = '';
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var media;
      if (item.video) {
        media =
          '<video src="' + esc(item.video) + '" poster="' + esc(item.poster || '') + '" ' +
          'muted playsinline preload="metadata"></video>' +
          '<span class="play-badge">&#9658; Video</span>';
      } else {
        media = '<img src="' + esc(item.image) + '" alt="' + esc(item.title) + '" loading="lazy">';
      }
      html +=
        '<button type="button" class="my-gallery-card" style="--i:' + i + ';--tilt:' + SCRAP_TILTS[i % SCRAP_TILTS.length] + '" ' +
          'data-index="' + i + '" aria-label="Open ' + esc(item.title) + '">' +
          '<span class="tape-strip" aria-hidden="true"></span>' +
          '<span class="mg-img">' + media +
            '<span class="card-overlay"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"></path></svg></span>' +
          '</span>' +
          '<span class="mg-meta">' +
            '<strong>' + esc(item.title) + '</strong>' +
            '<span>' + esc(item.caption || categoryLabel(item.cat)) + '</span>' +
          '</span>' +
        '</button>';
    }
    el.myGalleryGrid.innerHTML = html;
  }

  function openMyGallery() {
    stopMusic();
    activeCategory = 'all';
    renderMyGalleryFilters();
    renderMyGallery();
    showView('mygallery');
    scrollToTop();
  }

  function backToHomeFromMyGallery() {
    closeLightbox();
    showView('home');
    scrollToTop();
  }

  /* ============================================================
     UNIFIED MEDIA VIEWER
     ------------------------------------------------------------
     One implementation shared by My Gallery and every subject
     gallery.
       - normal photos keep their aspect ratio and use the screen
         space effectively, never stretched
       - tall images / infographics from a subject gallery render at
         their full usable width and the overlay itself scrolls
         vertically from top to bottom, so no part of the picture is
         ever cut off
       - My Gallery photos are the exception: they always fit whole
         inside the viewport and the overlay never scrolls
       - videos keep their aspect ratio and pause on close
     ============================================================ */
  function lockPageScroll() {
    var gap = window.innerWidth - document.documentElement.clientWidth;
    if (gap > 0) document.body.style.paddingRight = gap + 'px';
    document.body.style.overflow = 'hidden';
  }

  function unlockPageScroll() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  function pauseLightboxVideo() {
    var v = el.lightboxVideo;
    if (!v) return;
    if (!v.paused) v.pause();
    if (v.getAttribute('src')) {
      v.removeAttribute('src');
      try { v.load(); } catch (err) { /* media reset unsupported */ }
    }
  }

  function openLightbox(index, items, wholeFit) {
    if (!items || !items.length) return;
    lbItems = items;
    lbIndex = Math.max(0, Math.min(index, items.length - 1));
    lbWholeFit = !!wholeFit;
    lbDir = 0;
    lbLastFocused = document.activeElement;
    lbScrollY = window.scrollY;
    updateLightbox();
    el.lightboxOverlay.classList.remove('hidden');
    stopMusic();
    lockPageScroll();
    window.setTimeout(function () {
      if (!el.lightboxOverlay.classList.contains('hidden')) el.lightboxClose.focus();
    }, 40);
  }

  function closeLightbox() {
    if (el.lightboxOverlay.classList.contains('hidden')) return;
    pauseLightboxVideo();
    el.lightboxOverlay.classList.add('hidden');
    el.lightboxContent.classList.remove('is-long');
    el.lightboxImage.classList.add('hidden');
    el.lightboxFrame.classList.add('hidden');
    clearSlideOverlay();
    el.lightboxVideo.classList.add('hidden');
    el.lightboxError.classList.add('hidden');
    unlockPageScroll();
    if (window.scrollY !== lbScrollY) window.scrollTo(0, lbScrollY);
    if (lbLastFocused && lbLastFocused.focus) {
      try { lbLastFocused.focus(); } catch (err) { /* element gone */ }
    }
    lbLastFocused = null;
    lbItems = [];
    lbWholeFit = false;
  }

  function lightboxIsOpen() {
    return !el.lightboxOverlay.classList.contains('hidden');
  }

  function updateLightbox() {
    var item = lbItems[lbIndex];
    if (!item) return;

    var caption = item.title || '';
    if (item.caption) caption += ' — ' + item.caption;
    el.lightboxCaption.textContent = caption;
    el.lightboxCounter.textContent = (lbIndex + 1) + ' of ' + lbItems.length;

    var multi = lbItems.length > 1;
    el.lightboxPrev.classList.toggle('hidden', !multi);
    el.lightboxNext.classList.toggle('hidden', !multi);

    el.lightboxContent.classList.remove('is-long');
    el.lightboxError.classList.add('hidden');

    if (item.video) {
      el.lightboxImage.classList.add('hidden');
      el.lightboxFrame.classList.add('hidden');
      clearSlideOverlay();
      el.lightboxError.classList.add('hidden');
      el.lightboxVideo.classList.remove('hidden');
      var poster = item.poster || '';
      if (poster) el.lightboxVideo.setAttribute('poster', poster);
      else el.lightboxVideo.removeAttribute('poster');
      if (el.lightboxVideo.getAttribute('src') !== item.video) {
        pauseLightboxVideo();
        el.lightboxVideo.setAttribute('src', item.video);
      }
      return;
    }

    pauseLightboxVideo();
    el.lightboxVideo.classList.add('hidden');
    el.lightboxError.classList.add('hidden');
    el.lightboxImage.classList.remove('hidden');
    el.lightboxFrame.classList.remove('hidden');
    el.lightboxImage.alt = item.title || 'Gallery image';

    function imageReady() {
      el.lightboxImage.classList.remove('hidden');
      el.lightboxFrame.classList.remove('hidden');
      el.lightboxError.classList.add('hidden');
      /* "long" only ever applies to subject images; My Gallery photos
         keep the contained, whole-image layout (never scrollable) */
      var long = !lbWholeFit &&
        el.lightboxImage.naturalWidth > 0 &&
        (el.lightboxImage.naturalHeight / el.lightboxImage.naturalWidth) > 1.3;
      el.lightboxContent.classList.toggle('is-long', long);
      el.lightboxOverlay.scrollTop = 0;
      /* slide artwork + printed caption sit exactly over the photo */
      applySlideOverlay(item);
      playSlideAnimation();
    }
    function imageFailed() {
      el.lightboxImage.classList.add('hidden');
      el.lightboxFrame.classList.add('hidden');
      clearSlideOverlay();
      el.lightboxContent.classList.remove('is-long');
      el.lightboxError.classList.remove('hidden');
    }

    el.lightboxImage.onload = imageReady;
    el.lightboxImage.onerror = imageFailed;

    var src = item.image;
    if (!src) { imageFailed(); return; }
    if (el.lightboxImage.getAttribute('src') === src && el.lightboxImage.complete) {
      if (el.lightboxImage.naturalWidth) imageReady();
      else imageFailed();
    } else {
      el.lightboxImage.setAttribute('src', src);
    }
  }

  function lightboxNext() {
    if (!lbItems.length) return;
    lbDir = 1;
    lbIndex = (lbIndex + 1) % lbItems.length;
    updateLightbox();
    playFlight();
  }

  function lightboxPrev() {
    if (!lbItems.length) return;
    lbDir = -1;
    lbIndex = (lbIndex - 1 + lbItems.length) % lbItems.length;
    updateLightbox();
    playFlight();
  }

  /* ============================================================
     SLIDE ARTWORK OVERLAY
     ------------------------------------------------------------
     Some presentation slides carry extra artwork (an animated gif)
     laid exactly over the photo printed on the slide, while the
     slide's own caption stays readable on top of it. The box is
     stored as percentages of the slide and converted to pixels
     against the rendered photo, so the artwork never overflows the
     picture it belongs to, whatever the window size.
     ============================================================ */
  function clearSlideOverlay() {
    lbOverlayBox = null;
    el.lightboxSlide.classList.add('hidden');
    el.lightboxSlide.innerHTML = '';
  }

  function layoutSlideOverlay() {
    if (!lbOverlayBox || el.lightboxSlide.classList.contains('hidden')) return;
    var photo = el.lightboxImage.getBoundingClientRect();
    var frame = el.lightboxFrame.getBoundingClientRect();
    if (!photo.width || !photo.height) return;

    var b = lbOverlayBox;
    var s = el.lightboxSlide;
    s.style.left = ((photo.left - frame.left) + photo.width * b.x / 100) + 'px';
    s.style.top = ((photo.top - frame.top) + photo.height * b.y / 100) + 'px';
    s.style.width = (photo.width * b.w / 100) + 'px';
    s.style.height = (photo.height * b.h / 100) + 'px';
    /* the caption is typeset for a 1366px-wide slide (32px heading) */
    s.style.fontSize = (photo.width * 32 / 1366) + 'px';
  }

  function applySlideOverlay(item) {
    var ov = item && item.overlay;
    if (!ov || !ov.media || ov.image !== item.image) {
      clearSlideOverlay();
      return;
    }
    var lines = ov.lines || [];
    var s = el.lightboxSlide;
    s.innerHTML =
      '<img class="lb-slide-media" src="' + esc(ov.media) + '" alt="" aria-hidden="true">' +
      '<span class="lb-slide-text">' +
        '<strong>' + esc(lines[0] || '') + '</strong>' +
        (lines[1] ? '<span>' + esc(lines[1]) + '</span>' : '') +
      '</span>';
    s.classList.remove('hidden');
    lbOverlayBox = ov.box;
    layoutSlideOverlay();
  }

  /* gentle slide/fade whenever the viewer moves to another picture */
  function playSlideAnimation() {
    if (reducedMotion) return;
    var f = el.lightboxFrame;
    f.classList.remove('lb-anim', 'lb-fade', 'lb-next', 'lb-prev');
    void f.offsetWidth; /* force a restart when the same class is reused */
    f.classList.add('lb-anim');
    f.classList.add(lbDir < 0 ? 'lb-prev' : (lbDir > 0 ? 'lb-next' : 'lb-fade'));
  }

  /* ============================================================
     AIRPLANE FLIGHT ACROSS THE VIEWER
     ------------------------------------------------------------
     A small paper-airplane (the same silhouette already used by the
     navigation and the paper banners) crosses the picture only when
     the visitor moves to another image: Next, Previous or one of the
     gallery thumbnails. It climbs, dips and leaves a short fading
     trail, then removes itself from sight — nothing loops while a
     picture is simply on screen, and nothing runs on page load.
     ============================================================ */
  var flightEl = null;

  function playFlight() {
    if (reducedMotion) return;
    var host = el.lightboxContent;
    if (!host) return;
    if (!flightEl || !flightEl.parentNode) {
      flightEl = document.createElement('span');
      flightEl.className = 'lb-flight';
      flightEl.setAttribute('aria-hidden', 'true');
      flightEl.innerHTML =
        '<svg viewBox="74 2 44 40" width="34" height="31" focusable="false">' +
          '<path d="M112 10.4a2.2 2.2 0 0 0-3.1-2l-8.1 3.5-8.6-3a1.4 1.4 0 0 0-1.7.9l-1.3 3.5 6.5 3.6-.3 5 2.9 2.2.2 1.6-4.1.5-2.8 2.2.2 1.4 3.6-.5 3.3-2.3-.2-5 8.8-3.6a1.4 1.4 0 0 0 .9-1.7z" fill="currentColor"></path>' +
        '</svg>';
      host.appendChild(flightEl);
    }
    /* restart the animation even when the same class is reused */
    flightEl.classList.remove('is-flying');
    void flightEl.offsetWidth;
    flightEl.classList.add('is-flying');
  }

  window.addEventListener('resize', layoutSlideOverlay);

  /* opens a subject portfolio item — an item with its own `images`
     array shows its own pictures; otherwise the whole subject set
     becomes browsable from the clicked card (previous behaviour). */
  function openSubjectItem(subject, index) {
    if (!subject || !subject.portfolio || !subject.portfolio.length) return;
    index = Math.max(0, Math.min(index, subject.portfolio.length - 1));
    var item = subject.portfolio[index];
    var items = [];
    var start = 0;

    if (item && item.images && item.images.length) {
      for (var p = 0; p < item.images.length; p++) {
        var built = {
          id: item.id + '-p' + p,
          title: item.title,
          image: item.images[p],
          caption: item.description
        };
        if (item.overlay && item.overlay.image === item.images[p]) built.overlay = item.overlay;
        items.push(built);
      }
      start = 0;
    } else {
      for (var i = 0; i < subject.portfolio.length; i++) {
        var it = subject.portfolio[i];
        if (!it.image && !it.video) continue;
        var builtItem = {
          id: it.id,
          title: it.title,
          image: it.image,
          video: it.video,
          poster: it.poster,
          caption: it.description
        };
        if (it.overlay && it.overlay.image === it.image) builtItem.overlay = it.overlay;
        items.push(builtItem);
        if (i === index) start = items.length - 1;
      }
    }
    openLightbox(start, items);
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
  /* subject cards (subjects page) */
  el.subjectCards.addEventListener('click', function (e) {
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
    if (index >= 0) {
      openSubjectItem(subject, index);
      /* picking a thumbnail is a change of picture too */
      playFlight();
    }
  });

  el.backBtn.addEventListener('click', backToSubjects);
  el.crumbHome.addEventListener('click', backToSubjects);

  /* top navigation + hero cards */
  el.navTargets.forEach(function (node) {
    node.addEventListener('click', function () {
      var target = node.getAttribute('data-nav');
      if (target === 'home') goHome();
      else if (target === 'subjects') {
        closeLightbox();
        stopMusic();
        renderSubjects();
        showView('subjects');
        scrollToTop();
      } else if (target === 'mygallery') openMyGallery();
    });
  });

  /* collapsible search inside the navigation */
  if (el.searchToggle && el.navSearch) {
    el.searchToggle.addEventListener('click', function () {
      var open = el.navSearch.hasAttribute('hidden');
      if (open) {
        el.navSearch.removeAttribute('hidden');
        el.searchToggle.setAttribute('aria-expanded', 'true');
        el.searchInput.focus();
      } else {
        el.navSearch.setAttribute('hidden', '');
        el.searchToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

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
    if (itemId) {
      openSubject(subjectId, function (subject) {
        var index = findItemIndex(subject, itemId);
        if (index >= 0) openSubjectItem(subject, index);
      });
    } else {
      openSubject(subjectId);
    }
  });

  el.myGalleryBackBtn.addEventListener('click', backToHomeFromMyGallery);

  /* stop music when the hero video is clicked or starts playing */
  if (el.heroVideo) {
    el.heroVideo.addEventListener('click', stopMusic);
    el.heroVideo.addEventListener('play', stopMusic);
  }

  el.myGalleryFilters.addEventListener('click', function (e) {
    var chip = e.target.closest('[data-category]');
    if (!chip) return;
    activeCategory = chip.getAttribute('data-category');
    renderMyGalleryFilters();
    renderMyGallery();
  });

  el.myGalleryGrid.addEventListener('click', function (e) {
    var card = e.target.closest('[data-index]');
    if (!card) return;
    var index = parseInt(card.getAttribute('data-index'), 10);
    /* third argument: My Gallery always shows the whole photo */
    if (!isNaN(index)) openLightbox(index, itemsForCategory(activeCategory), true);
  });

  /* viewer controls */
  el.lightboxClose.addEventListener('click', closeLightbox);
  el.lightboxPrev.addEventListener('click', lightboxPrev);
  el.lightboxNext.addEventListener('click', lightboxNext);
  el.lightboxOverlay.addEventListener('click', function (e) {
    if (e.target === el.lightboxOverlay ||
        (e.target.hasAttribute && e.target.hasAttribute('data-close'))) {
      closeLightbox();
    }
  });

  el.brandHome.addEventListener('click', goHome);
  el.brandHome.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goHome();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (!lightboxIsOpen()) return;
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      lightboxPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      lightboxNext();
    } else if (e.key === 'Tab') {
      /* keep focus inside the viewer */
      var focusables = el.lightboxOverlay.querySelectorAll('button:not(.hidden)');
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
     A miniature software renderer. It draws the airplane that
     circuits the outer edges of the hero sky, always behind the
     scrapbook collage so it never covers the heading, the face or
     the video controls.
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
  function drawPlaneMesh(ctx, cam, mesh, pos, basis, alpha, scale) {
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

      var poly = [camV[fc.idx[0]], camV[fc.idx[1]], camV[fc.idx[2]]];

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

  /* ---------- the trail behind the plane ----------
     `soft` gives the flying airplanes a smooth vapour trail: a wide
     faint halo plus a brighter core, both fading out towards the
     far end. */
  function drawTrail(ctx, cam, trail, depthFade, soft, mul) {
    if (trail.length < 2) return;
    var m = mul === undefined ? 1 : mul;

    if (soft) {
      /* the soft halo */
      for (var s = 1; s < trail.length; s++) {
        var sa = planeProject(trail[s - 1], cam);
        var sb = planeProject(trail[s], cam);
        var sf = s / trail.length;
        ctx.beginPath();
        ctx.moveTo(sa.x, sa.y);
        ctx.lineTo(sb.x, sb.y);
        ctx.strokeStyle = 'rgba(255,255,255,' + (0.11 * sf * m).toFixed(3) + ')';
        ctx.lineWidth = 1.5 + 6.5 * sf;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      /* the bright core of the vapour */
      for (var c = 1; c < trail.length; c++) {
        var ca = planeProject(trail[c - 1], cam);
        var cb2 = planeProject(trail[c], cam);
        var cf = c / trail.length;
        ctx.beginPath();
        ctx.moveTo(ca.x, ca.y);
        ctx.lineTo(cb2.x, cb2.y);
        ctx.strokeStyle = 'rgba(255,255,255,' + (0.34 * cf * cf * m).toFixed(3) + ')';
        ctx.lineWidth = 0.4 + 2.2 * cf;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      return;
    }

    for (var i = 1; i < trail.length; i++) {
      var a = trail[i - 1], b = trail[i];
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

    if (cfg.mode === 'flight') {
      /* the profile airplane: a horizontal run across the picture */
      var mobile = w < 700;
      var halfPlane = st.scale * 0.62;          /* wings + tail */
      var trailLen = mobile ? Math.min(150, w * 0.42) : 288;   /* ~3in on desktop */
      st.cy = h * 0.5;
      st.scale = Math.max(24, w * 0.088);
      halfPlane = st.scale * 0.62;
      st.focal = Math.max(300, w * 0.9);
      st.fly = {
        startX: -(halfPlane + 10),
        endX: w + 150 + halfPlane + 10,
        exit: 150,                 /* the trail fades out over this */
        cx: w * 0.5,               /* the camera looks at the middle */
        baseY: h * (mobile ? 0.35 : 0.38),
        arc: h * (mobile ? 0.055 : 0.028),     /* how much it climbs   */
        depth: h * (mobile ? 0.09 : 0.05),      /* depth wave           */
        waves: mobile ? 1.5 : 1,
        phase: 0,
        trailLen: trailLen,
        bankBase: mobile ? 0.32 : 0.22,
        bankAmp: mobile ? 0.30 : 0.10,          /* banking while turning */
        mobile: mobile
      };
      st.trailSoft = true;
    } else if (cfg.mode === 'hero') {
      /* the hero airplane: a smooth circuit around the outer edges
         of the sky, always behind the scrapbook collage */
      var hm = Math.max(44, Math.min(110, w * 0.06));
      var hTop = Math.max(38, Math.min(90, h * 0.08));
      var hBot = Math.max(38, Math.min(84, h * 0.075));
      st.cy = h * 0.5;
      st.scale = Math.max(22, Math.min(48, Math.min(w, h) * 0.058));
      st.focal = Math.max(420, w * 1.05);
      st.fly = {
        w: w, h: h,
        mx: hm, myTop: hTop, myBot: hBot,
        r: Math.max(38, Math.min(96, Math.min(w, h) * 0.12)),
        cx: w * 0.5,
        cy: h * 0.5,
        zAmp: Math.min(34, h * 0.05),
        trailLen: w < 760 ? Math.min(150, w * 0.42) : 288,
        exit: 0
      };
      st.trailSoft = true;
    } else {
      st.ry = Math.max(14, h * 0.26);
      st.cy = h * 0.5;
      st.scale = Math.max(18, Math.min(36, h * 0.22));
      st.depth = st.ry * Math.cos(cfg.tilt || 0.5);
      st.zc = 0;
      st.focal = Math.max(260, st.ry * 6);
      var near2 = st.focal / (st.focal + (st.zc - st.depth));
      var room2 = w * 0.5 - st.scale * 0.8;
      st.rx = Math.max(30, Math.min(w * 0.38, room2 / near2));
      st.trailSoft = false;
    }

    var dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    st.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /* ---------- the profile flight path ----------
     A straight run from outside the left edge to outside the right
     edge, with a gentle arc and a small depth wave so the airplane
     climbs, banks and breathes while it crosses the picture. */
  function pathFlight(t, st) {
    var c = st.fly;
    /* the path is given in picture coordinates and shifted into the
       camera space, whose origin sits in the middle of the picture */
    var screenX = c.startX + (c.endX - c.startX) * t;
    var a = t * Math.PI * 2 * c.waves + c.phase;
    return [
      screenX - c.cx,
      c.baseY + c.arc * Math.sin(a),
      c.depth * Math.sin(a + 0.9)
    ];
  }

  /* ---------- the hero flight path ----------
     A rounded-rectangle circuit around the outer edges of the sky,
     so the airplane never flies over the heading, the introduction,
     the profile face or the video controls. */
  function pathHero(t, st) {
    var c = st.fly;
    var x0 = c.mx, y0 = c.myTop;
    var x1 = c.w - c.mx, y1 = c.h - c.myBot;
    var r = Math.max(8, Math.min(c.r, (x1 - x0) / 2, (y1 - y0) / 2));
    var lw = x1 - x0 - 2 * r;
    var lh = y1 - y0 - 2 * r;
    var arc = Math.PI * r / 2;
    var total = 2 * lw + 2 * lh + 4 * arc;
    var d = (((t % 1) + 1) % 1) * total;
    var x, y, a;

    if (d < lw) {                                   /* top edge, left to right */
      x = x0 + r + d; y = y0;
    } else if ((d -= lw) < arc) {                   /* top-right corner */
      a = d / arc * Math.PI / 2;
      x = x1 - r + Math.sin(a) * r; y = y0 + r - Math.cos(a) * r;
    } else if ((d -= arc) < lh) {                   /* right edge, down */
      x = x1; y = y0 + r + d;
    } else if ((d -= lh) < arc) {                   /* bottom-right corner */
      a = d / arc * Math.PI / 2;
      x = x1 - r + Math.cos(a) * r; y = y1 - r + Math.sin(a) * r;
    } else if ((d -= arc) < lw) {                   /* bottom edge, right to left */
      x = x1 - r - d; y = y1;
    } else if ((d -= lw) < arc) {                   /* bottom-left corner */
      a = d / arc * Math.PI / 2;
      x = x0 + r - Math.sin(a) * r; y = y1 - r + Math.cos(a) * r;
    } else if ((d -= arc) < lh) {                   /* left edge, up */
      x = x0; y = y1 - r - d;
    } else {                                        /* top-left corner */
      d -= lh;
      a = Math.max(0, Math.min(1, d / arc)) * Math.PI / 2;
      x = x0 + r - Math.cos(a) * r; y = y0 + r - Math.sin(a) * r;
    }

    return [
      x - c.cx,
      c.cy - y,
      c.zAmp * Math.sin(t * Math.PI * 4)
    ];
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

    var flight = st.cfg.mode === 'flight';
    var hero = st.cfg.mode === 'hero';
    var pos, ahead, bank;

    if (flight) {
      pos = pathFlight(st.phase, st);
      ahead = pathFlight(st.phase + 0.004, st);
      /* the airplane leans into its turn */
      bank = st.fly.bankBase + st.fly.bankAmp *
             Math.sin(st.phase * Math.PI * 2 * st.fly.waves + 0.6);
    } else if (hero) {
      /* a smooth circuit around the sky, banking into every corner */
      pos = pathHero(st.phase, st);
      ahead = pathHero(st.phase + 0.002, st);
      var p2 = pathHero(st.phase + 0.006, st);
      var h0 = Math.atan2(ahead[1] - pos[1], ahead[0] - pos[0]);
      var h1 = Math.atan2(p2[1] - ahead[1], p2[0] - ahead[0]);
      var turn = Math.atan2(Math.sin(h1 - h0), Math.cos(h1 - h0));
      bank = Math.max(-0.55, Math.min(0.55, turn * 4.2)) + 0.08;
    } else {
      /* the ring slowly rocks, which makes the depth easier to read */
      var tilt = (st.cfg.tilt || 0.5) + Math.sin(st.time * 0.45) * 0.10;
      pos = pathRing(st.phase, tilt, st.rx, st.ry, st.depth, st.zc);
      ahead = pathRing(st.phase + 0.004, tilt, st.rx, st.ry, st.depth, st.zc);
      bank = PLANE_BANK;
    }

    var f = vNorm(vSub(ahead, pos));
    var right = vNorm(vCross([0, 1, 0], f));
    var up = vCross(f, right);

    /* bank into the turn */
    var cb = Math.cos(bank), sb = Math.sin(bank);
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

    if (flight || hero) {
      /* the contrail is rebuilt from the path behind the airplane, so
         it keeps the wanted length whatever the frame rate is */
      st.trail = buildFlightTrail(st, cam);
    } else {
      st.trail.push(pos);
      if (st.trail.length > st.cfg.trailMax) st.trail.shift();
    }

    var zSpan = Math.max(1, st.depth);
    function depthFade(z) {
      var far = Math.max(0, -z) / (2 * zSpan);
      return 1 - 0.28 * far;
    }

    /* the contrail fades away while the airplane leaves the picture */
    var trailMul = 1;
    if (flight) {
      var out = (pos[0] + st.fly.cx) - w;
      if (out > 0) trailMul = Math.max(0, 1 - out / st.fly.exit);
    }

    drawTrail(ctx, cam, st.trail, depthFade, st.trailSoft, trailMul);
    drawPlaneMesh(ctx, cam, st.mesh, pos, basis, depthFade(pos[2]), st.scale);
  }

  /* walks back along the flight path until the wanted trail length
     is reached, oldest point first */
  function buildFlightTrail(st, cam) {
    var pathFn = st.cfg.mode === 'hero' ? pathHero : pathFlight;
    var target = st.fly.trailLen;
    var pts = [];
    var ph = st.phase;
    var prev = null;
    var dist = 0;
    var step = st.cfg.mode === 'hero' ? 0.004 : 0.006;
    while (pts.length < 140 && dist < target) {
      var p = pathFn(ph, st);
      var sc = planeProject(p, cam);
      if (prev) {
        dist += Math.sqrt((sc.x - prev.x) * (sc.x - prev.x) + (sc.y - prev.y) * (sc.y - prev.y));
        if (dist > target) break;
      }
      pts.push(p);
      prev = sc;
      ph -= step;
    }
    return pts.reverse();
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

  /* starts the animation (again) for a scene that was never started */
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
      if (st.cfg.mode === 'flight' || st.cfg.mode === 'hero') {
        st.trail = [];
      } else {
        for (var i = 0; i < st.cfg.trailMax; i++) {
          st.trail.push(pathRing(st.phase - 0.006 * i, st.cfg.tilt || 0.5, st.rx, st.ry, st.depth, st.zc));
        }
      }
      sceneFrame(st, 0);
      return;
    }
    sceneResume(st);
  }

  var heroScene = null;

  /* ============================================================
     THE HERO AIRPLANE
     ------------------------------------------------------------
     A 3D airplane that circuits the outer edges of the hero sky
     with a fading vapour trail, always behind the scrapbook
     collage so it never covers the heading, the face or the
     video controls.
     ============================================================ */
  function startHeroScene() {
    heroScene = createPlaneScene(document.getElementById('heroPlane'), {
      mode: 'hero',
      speed: 1 / 30,           /* one full circuit in 30 seconds */
      phase: 0.06,
      trailMax: 60
    });
    sceneStart(heroScene);
  }

  /* ---------- init ---------- */
  function initApp() {
    renderSubjects();
    renderMyGalleryFilters();
    renderMyGallery();
    showView('home');
    startHeroScene();
    /* the background music starts automatically with the home view
       (see showView above) */
  }

  try {
    initApp();
  } catch (err) {
    console.error('Init error:', err);
    var home = document.getElementById('homeView');
    if (home) home.classList.add('is-active');
    /* fallback: try rendering subjects again after a short delay */
    window.setTimeout(function () {
      try { renderSubjects(); } catch (e) { console.error('Subject render fallback failed:', e); }
    }, 100);
  }
})();

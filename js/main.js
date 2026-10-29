/* ============================================================
   Student Portfolio Gallery — application script
   ============================================================ */

(function () {
  "use strict";

  /* ============================================================
     CONFIG — drop your logo file next to index.html and set the
     path here (e.g. 'assets/logo.png'). If the file is missing,
     a generic avatar fallback is shown automatically.
     ============================================================ */
  var CONFIG = {
    logoPath: "images/logo.png",
  };

  /* ---------- subject icons (inline SVG) ---------- */
  var ICONS = {
    english:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"></path><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5z"></path><path d="M9 8h7M9 11.5h5"></path></svg>',
    mathematics:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="3"></rect><path d="M8.5 7.5h7"></path><path d="M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01"></path></svg>',
    science:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3v6.2L5.2 17.6A2.4 2.4 0 0 0 7.3 21h9.4a2.4 2.4 0 0 0 2.1-3.4L14 9.2V3"></path><path d="M9 3h6"></path><path d="M8.2 14h7.6"></path></svg>',
    filipino:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A2.5 2.5 0 0 1 17.5 17H10l-4.5 3.2V17H6.5A2.5 2.5 0 0 1 4 14.5v-7A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5z"></path><path d="M8 9.5h8M8 12.8h5"></path></svg>',
    araling:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"></circle><path d="M3.5 12h17"></path><path d="M12 3.5c2.4 2.4 3.6 5.3 3.6 8.5S14.4 18.1 12 20.5c-2.4-2.4-3.6-5.3-3.6-8.5S9.6 5.9 12 3.5z"></path></svg>',
    values:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-6.8-4.3-8.4-8.1C2.4 9 3.7 5.9 6.7 5.1c1.9-.5 3.9.2 5.3 1.7 1.4-1.5 3.4-2.2 5.3-1.7 3 .8 4.3 3.9 3.1 6.8C18.8 15.7 12 20 12 20z"></path></svg>',
    tle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4.2 4.2 0 0 0 5.1 5.4l-8.4 8.4a2.4 2.4 0 0 1-3.4-3.4l8.3-8.4a4.2 4.2 0 0 0-1.6-2z"></path><path d="M9 4.5l2.2 2.2-3 3L6 7.5A2.5 2.5 0 0 1 9 4.5z"></path></svg>',
    mapeh:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5a8.5 8.5 0 1 0 0 17h1.2a1.8 1.8 0 0 0 1.3-3.1 1.8 1.8 0 0 1 1.3-3.1H18A3.5 3.5 0 0 0 21.5 11 8.5 8.5 0 0 0 12 3.5z"></path><circle cx="8.2" cy="10" r="1.1" fill="currentColor" stroke="none"></circle><circle cx="12" cy="7.6" r="1.1" fill="currentColor" stroke="none"></circle><circle cx="15.8" cy="10" r="1.1" fill="currentColor" stroke="none"></circle></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 3v5h5"></path><path d="M9 13h6M9 16.5h4"></path></svg>',
    arrow:
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"></path></svg>',
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
    doc: sizeIcon(ICONS.doc, 26),
  };

  function sizeIcon(svg, size) {
    return svg.replace(
      "<svg ",
      '<svg width="' + size + '" height="' + size + '" ',
    );
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
      id: "english",
      title: "English",
      tone: 0,
      tagline: "Communication today, opportunities tomorrow.",
      desc: "Read, Write, and Express Your Ideas While Exploring Literature.",
      intro:
        "Language arts outputs — essays, speeches, and creative writing from class activities.",
      icon: ICONS.english,
      cover: "images/covers/english.svg",
      portfolio: [
        {
          id: "en-gallery",
          title: "Shakespearean Sonnet",
          description:
            "An analytical essay about William Shakespeare\u2019s Sonnet 25, \u201CLet those who are in favour with their stars,\u201D exploring its language, imagery, and meaning.",
          activityType: "Analytical Essay",
          image: "images/ENGLISH/%20(1).png",
          images: [
            "images/ENGLISH/%20(1).png",
            "images/ENGLISH/%20(2).png",
            "images/ENGLISH/%20(3).png",
            "images/ENGLISH/%20(4).png",
            "images/ENGLISH/%20(5).png",
          ],
          section: "outputs",
          display: "scroll",
        },
      ],
    },
    {
      id: "mathematics",
      title: "Mathematics",
      tone: 1,
      tagline: "Think clearly, solve boldly, build a brighter future.",
      desc: "Think Critically, Solve Problems, and Improve your Mathematical Skills.",
      intro:
        "Mathematical reasoning shown through solutions, models, and project work.",
      icon: ICONS.mathematics,
      cover: "images/covers/mathematics.svg",
      portfolio: [
        {
          id: "ma-gallery",
          title: "Direct Variation",
          description:
            "Infographic on direct variation: its real-life meaning, a data table, and a step-by-step solution to a notebook-cost problem.",
          image: "images/MATH/math.png",
          images: ["images/MATH/math.png"],
          section: "outputs",
          display: "scroll",
        },
      ],
    },
    {
      id: "science",
      title: "Science",
      tone: 2,
      tagline: "Curiosity leads to discovery.",
      desc: "Experiments, Reports, and Discoveries",
      intro:
        "Investigations, lab reports, and science fair outputs collected in one place.",
      icon: ICONS.science,
      cover: "images/covers/science.svg",
      portfolio: [
        {
          id: "sc-gallery",
          title: "Plate Boundaries",
          description:
            "Poster set about plate boundaries: the three types, their effects, how plate movement is detected, and a short reflection.",
          image: "images/SCIENCE/1.png",
          images: [
            "images/SCIENCE/1.png",
            "images/SCIENCE/2.png",
            "images/SCIENCE/3.png",
            "images/SCIENCE/4.png",
            "images/SCIENCE/5.png",
            "images/SCIENCE/6.png",
            "images/SCIENCE/7.png",
            "images/SCIENCE/8.png",
            "images/SCIENCE/9.png",
            "images/SCIENCE/10.png",
          ],
          section: "outputs",
          display: "scroll",
        },
      ],
    },
    {
      id: "filipino",
      title: "Filipino",
      tone: 3,
      tagline: "Wika, kultura, at pagkakakilanlan.",
      desc: "Magbasa, Umunawa, at Ipagmalaki ang Wikang Filipino.",
      intro:
        "Mga gawaing pang-Filipino — sanaysay, tula, ulat, at proyekto sa wika.",
      icon: ICONS.filipino,
      cover: "images/covers/filipino.svg",
      portfolio: [
        {
          id: "fi-tanka",
          title: "Tanka at Haiku",
          description: "Mga tanka at haiku tungkol sa aking karanasan.",
          image: "images/FILIPINO/(1).png",
          images: [
            "images/FILIPINO/(1).png",
            "images/FILIPINO/(2).png",
            "images/FILIPINO/(3).png",
            "images/FILIPINO/(4).png",
            "images/FILIPINO/(5).png",
          ],
          section: "outputs",
          display: "scroll",
        },
      ],
    },
    {
      id: "araling-panlipunan",
      title: "Araling Panlipunan",
      tone: 0,
      tagline: "Understand our past, shape our shared future.",
      desc: "Explore History, Understand Society and Civics, and Learn About Economics.",
      intro:
        "Research, maps, and community studies that explore people and society.",
      icon: ICONS.araling,
      cover: "images/covers/araling-panlipunan.svg",
      portfolio: [
        {
          id: "ap-gallery",
          title: "Ang Pamilihan",
          description:
            "Ang pamilihan: susi sa araw-araw na pangangailangan ng komunidad.",
          image: "images/AP/1.png",
          images: [
            "images/AP/1.png",
            "images/AP/2.png",
            "images/AP/3.png",
            "images/AP/4.png",
            "images/AP/5.png",
            "images/AP/6.png",
          ],
          section: "outputs",
          display: "scroll",
        },
      ],
    },
    {
      id: "values-education",
      title: "Values Education",
      tone: 1,
      tagline: "Choose kindness. Live with purpose.",
      desc: "Learn to Be Kind, Honest, Respectful, and Responsible.",
      intro:
        "Reflections, action plans, and service-learning outputs about values in practice.",
      icon: ICONS.values,
      cover: "images/covers/values-education.svg",
      portfolio: [
        {
          id: "ve-gallery",
          title: "Bawas Konsumo, Alaga sa Kalikasan!",
          description:
            "Mga simpleng gawain para makatipid at pangalagaan ang kalikasan.",
          image: "images/VALUES_EDUCATION/Screenshot%20(139).png",
          images: [
            "images/VALUES_EDUCATION/Screenshot%20(139).png",
            "images/VALUES_EDUCATION/Screenshot%20(140).png",
            "images/VALUES_EDUCATION/Screenshot%20(141).png",
            "images/VALUES_EDUCATION/Screenshot%20(142).png",
            "images/VALUES_EDUCATION/Screenshot%20(143).png",
            "images/VALUES_EDUCATION/Screenshot%20(145).png",
            "images/VALUES_EDUCATION/Screenshot%20(146).png",
            "images/VALUES_EDUCATION/Screenshot%20(147).png",
            "images/VALUES_EDUCATION/Screenshot%20(148).png",
            "images/VALUES_EDUCATION/Screenshot%20(149).png",
            "images/VALUES_EDUCATION/Screenshot%20(150).png",
          ],
          section: "outputs",
          display: "scroll",
        },
      ],
    },
    {
      id: "tle",
      title: "TLE",
      tone: 2,
      tagline: "Practical skills for everyday life.",
      desc: "Learn Practical Skills, Create Useful Projects, and Achieve Your Goals.",
      intro:
        "Practical creations, livelihood demos, and technology projects from TLE class.",
      icon: ICONS.tle,
      cover: "images/covers/tle.svg",
      portfolio: [
        {
          id: "tl-1",
          title: "My Signature Salad",
          description: "Personal salad recipe presented for the cook-off.",
          image: "images/TLE/my_salad/2.png",
          /* a slide deck, browsed left and right like a presentation */
          images: [
            "images/TLE/my_salad/2.png",
            "images/TLE/my_salad/3.png",
            "images/TLE/my_salad/4.png",
            "images/TLE/my_salad/5.png",
            "images/TLE/my_salad/6.png",
            "images/TLE/my_salad/7.png",
            "images/TLE/my_salad/8.png",
            "images/TLE/my_salad/9.png",
            "images/TLE/my_salad/10.png",
          ],
          section: "outputs",
          /* 3.png carries an animated salad photo laid exactly over its
             own photo panel; the printed caption stays on top */
          overlay: {
            image: "images/TLE/my_salad/3.png",
            media: "images/TLE/my_salad/salad.gif",
            box: { x: 62.59, y: 10.03, w: 31.77, h: 79.95 },
            lines: ["FRESH GARDEN SALAD", "Green Salad / Tossed Salad"],
          },
        },
      ],
    },
    {
      id: "mapeh",
      title: "MAPEH",
      tone: 3,
      tagline: "Create, move, and care for your wellbeing.",
      desc: "Stay Active, Create Art, Perform with Confidence, and Express Yourself.",
      intro:
        "Performances, artwork, fitness records, and health projects in one gallery.",
      icon: ICONS.mapeh,
      cover: "images/covers/mapeh.svg",
      portfolio: [
        {
          id: "mp-gallery",
          title: "The Music of the Renaissance Era",
          description:
            "Renaissance music and art: an introduction, a selected piece by Josquin des Prez, and a short reflection.",
          image: "images/MAPEH/1.png",
          images: [
            "images/MAPEH/1.png",
            "images/MAPEH/2.png",
            "images/MAPEH/3.png",
            "images/MAPEH/4.png",
            "images/MAPEH/5.png",
            "images/MAPEH/6.png",
            "images/MAPEH/7.png",
            "images/MAPEH/8.png",
          ],
          section: "outputs",
          display: "scroll",
        },
      ],
    },
  ];

  /* subject sections, in the order the tabs appear */
  var SECTIONS = [
    { id: "gallery", label: "Gallery" },
    { id: "projects", label: "Projects" },
    { id: "activities", label: "Activities" },
    { id: "outputs", label: "Outputs" },
  ];

  var SUBJECT_TINTS = [
    "linear-gradient(150deg, #8FC5E8, #244E75)",
    "linear-gradient(150deg, #F6D3C1, #A96F54)",
    "linear-gradient(150deg, #A5D2EF, #2F86C7)",
    "linear-gradient(150deg, #EDBB9E, #704631)",
  ];

  /* ---------- My Gallery: personal scrapbook manifest ----------
     Exactly seven categories, shown on the page in exactly this order.
     "All Memories" is the opening tab; it lists every photograph
     grouped by category in this same order. Picking a selected
     category again brings every memory back. */
  var GALLERY_CATEGORIES = [
    { id: "all", label: "All Memories" },
    { id: "school", label: "School" },
    { id: "aviation", label: "Aviation and Airplanes" },
    { id: "toyota", label: "Toyota" },
    { id: "guitar", label: "Guitar and Musics" },
    { id: "food", label: "Food Adventure" },
    { id: "movies", label: "Animation and Movies" },
  ];

  var EMPTY_CATEGORY_NOTE = {
    school: "School memories will be pinned here soon.",
    aviation: "Aviation and airplane photos will be pinned here soon.",
    toyota: "Toyota memories will be pinned here soon.",
    guitar: "Guitar and music photos will be pinned here soon.",
    food: "Food adventures will be pinned here soon — new dishes, cafés, and family recipes.",
    movies: "Animations and movie favourites will be pinned here soon.",
  };

  /* each photograph keeps its own category; nothing is ever moved
     between categories or invented */
  var PROFILE_GALLERY = [
    {
      id: "pg-1",
      title: "Gallery Image 1",
      image: "images/PROFILE_GALLERY/gallery (1).jpg",
      cat: "aviation",
    },
    {
      id: "pg-2",
      title: "Gallery Image 2",
      image: "images/PROFILE_GALLERY/gallery (2).jpg",
      cat: "school",
    },
    {
      id: "pg-3",
      title: "Gallery Image 3",
      image: "images/PROFILE_GALLERY/gallery (3).jpg",
      cat: "guitar",
    },
    {
      id: "pg-4",
      title: "Gallery Image 4",
      image: "images/PROFILE_GALLERY/gallery (4).jpg",
      cat: "school",
    },
    {
      id: "pg-5",
      title: "Gallery Image 5",
      image: "images/PROFILE_GALLERY/gallery (5).jpg",
      cat: "toyota",
    },
    {
      id: "pg-6",
      title: "Gallery Image 6",
      image: "images/PROFILE_GALLERY/gallery (6).jpg",
      cat: "toyota",
    },
  ];

  /* hero accent gradients per tone */
  var TONES = [
    "linear-gradient(140deg, #6fb9e8, #2f86c7)",
    "linear-gradient(140deg, #2f86c7, #17375e)",
    "linear-gradient(140deg, #f2994a, #e07b2a)",
    "linear-gradient(140deg, #5b9bd5, #1f6aa8)",
  ];

  /* ---------- state ---------- */
  var activeSubjectId = null;
  var activeItemId = null;
  /* the activity and slide the subject presentation is showing */
  var presoItemId = null;
  var presoIndex = 0;
  var activeCategory = "all";
  var currentView = "home";
  var returnView = "home";
  var searchQuery = "";

  /* unified media viewer state */
  var lbItems = [];
  var lbIndex = 0;
  var lbScrollY = 0;
  var lbLastFocused = null;
  /* direction of the last slide change, drives the transition animation */
  var lbDir = 0;
  /* pixel box of the slide artwork overlay currently on screen */
  var lbOverlayBox = null;
  /* true when the open set is a photo gallery rather than tall subject work */
  var lbWholeFit = false;

  var reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  var canHover = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;

  /* ---------- dom refs ---------- */
  var el = {
    homeView: document.getElementById("homeView"),
    subjectsView: document.getElementById("subjectsView"),
    galleryView: document.getElementById("galleryView"),
    searchView: document.getElementById("searchView"),
    myGalleryView: document.getElementById("myGalleryView"),
    subjectCards: document.getElementById("subjectCards"),
    galleryTitle: document.getElementById("galleryTitle"),
    galleryTagline: document.getElementById("galleryTagline"),
    galleryDesc: document.getElementById("galleryDesc"),
    galleryIntro: document.getElementById("galleryIntro"),
    galleryEmpty: document.getElementById("galleryEmpty"),
    preso: document.getElementById("preso"),
    presoSlide: document.getElementById("presoSlide"),
    presoKicker: document.getElementById("presoKicker"),
    presoTitle: document.getElementById("presoTitle"),
    presoDesc: document.getElementById("presoDesc"),
    presoZoom: document.getElementById("presoZoom"),
    presoType: document.getElementById("presoType"),
    presoImg: document.getElementById("presoImg"),
    presoVideo: document.getElementById("presoVideo"),
    presoCount: document.getElementById("presoCount"),
    presoPrev: document.getElementById("presoPrev"),
    presoNext: document.getElementById("presoNext"),
    presoFull: document.getElementById("presoFull"),
    presoViewBtn: document.getElementById("presoViewBtn"),
    presoThumbs: document.getElementById("presoThumbs"),
    presoFrame: document.getElementById("presoFrame"),
    heroIcon: document.getElementById("heroIcon"),
    itemCount: document.getElementById("itemCount"),
    crumbTitle: document.getElementById("crumbTitle"),
    crumbHome: document.getElementById("crumbHome"),
    backBtn: document.getElementById("backBtn"),
    searchInput: document.getElementById("searchInput"),
    searchClear: document.getElementById("searchClear"),
    searchBackBtn: document.getElementById("searchBackBtn"),
    searchSummary: document.getElementById("searchSummary"),
    searchSubjectsSection: document.getElementById("searchSubjectsSection"),
    searchSubjectsList: document.getElementById("searchSubjectsList"),
    searchItemsSection: document.getElementById("searchItemsSection"),
    searchItemsList: document.getElementById("searchItemsList"),
    searchEmpty: document.getElementById("searchEmpty"),
    searchToggle: document.getElementById("searchToggle"),
    navSearch: document.getElementById("navSearch"),
    brandHome: document.getElementById("brandHome"),
    navLinks: Array.prototype.slice.call(
      document.querySelectorAll(".nav-link"),
    ),
    navTargets: Array.prototype.slice.call(
      document.querySelectorAll("[data-nav]"),
    ),
    myGalleryBackBtn: document.getElementById("myGalleryBackBtn"),
    myGalleryGrid: document.getElementById("myGalleryGrid"),
    myGalleryFilters: document.getElementById("myGalleryFilters"),
    myGalleryTitle: document.getElementById("myGalleryTitle"),
    lightboxOverlay: document.getElementById("lightboxOverlay"),
    lightboxContent: document.getElementById("lightboxContent"),
    lightboxClose: document.getElementById("lightboxClose"),
    lightboxFull: document.getElementById("lightboxFull"),
    lightboxPrev: document.getElementById("lightboxPrev"),
    lightboxNext: document.getElementById("lightboxNext"),
    lightboxImage: document.getElementById("lightboxImage"),
    lightboxFrame: document.getElementById("lightboxFrame"),
    lightboxSlide: document.getElementById("lightboxSlide"),
    lightboxVideo: document.getElementById("lightboxVideo"),
    lightboxError: document.getElementById("lightboxError"),
    lightboxCaption: document.getElementById("lightboxCaption"),
    lightboxCounter: document.getElementById("lightboxCounter"),
    lightboxPush: document.getElementById("lightboxPush"),
    lightboxThumbs: document.getElementById("lightboxThumbs"),
    heroVideo: document.getElementById("heroVideo"),
    blobs: Array.prototype.slice.call(document.querySelectorAll(".blob")),
  };

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
    if (n === 0) return "No items yet";
    return n + " item" + (n === 1 ? "" : "s");
  }

  /* ---------- logo setup (path configurable, graceful fallback) ---------- */
  function setupLogo(container, path, mode) {
    if (!container) return;
    var img = document.createElement("img");
    img.alt =
      mode === "brand" ? "Jarred's Digital Portfolio logo" : "Gallery logo";
    img.addEventListener("error", function () {
      if (img.parentNode) img.parentNode.removeChild(img);
    });
    img.src = path;
    if (mode === "brand") {
      container.innerHTML = "";
      container.appendChild(img);
    } else {
      var existing = container.querySelector("svg");
      container.insertBefore(img, existing || null);
      img.addEventListener("load", function () {
        if (existing) existing.classList.add("hidden");
      });
    }
  }

  setupLogo(
    el.brandHome ? el.brandHome.querySelector(".nav-logo") : null,
    CONFIG.logoPath,
    "avatar",
  );

  /* ---------- view switching ---------- */
  var VIEW_NODES = {
    home: function () {
      return el.homeView;
    },
    subjects: function () {
      return el.subjectsView;
    },
    gallery: function () {
      return el.galleryView;
    },
    mygallery: function () {
      return el.myGalleryView;
    },
    search: function () {
      return el.searchView;
    },
  };

  function showView(name) {
    currentView = name;
    /* home is where the music belongs: it comes back automatically
       whenever the visitor returns to this view */
    if (name === "home") startBackgroundMusic();
    el.homeView.classList.toggle("is-active", name === "home");
    el.subjectsView.classList.toggle("is-active", name === "subjects");
    el.galleryView.classList.toggle("is-active", name === "gallery");
    el.searchView.classList.toggle("is-active", name === "search");
    el.myGalleryView.classList.toggle("is-active", name === "mygallery");

    /* keep the top navigation highlight in sync */
    var linkView = name === "gallery" ? "subjects" : name;
    for (var i = 0; i < el.navLinks.length; i++) {
      el.navLinks[i].classList.toggle(
        "is-active",
        el.navLinks[i].getAttribute("data-nav") === linkView,
      );
    }

    /* restart view animation */
    var active = (VIEW_NODES[name] || VIEW_NODES.home)();
    active.style.animation = "none";
    void active.offsetWidth;
    active.style.animation = "";
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }

  /* ---------- subjects page: printed-photo cards ---------- */
  function renderSubjects() {
    if (!el.subjectCards) return;
    var html = "";
    for (var i = 0; i < subjects.length; i++) {
      var s = subjects[i];
      var cover = s.cover || (s.portfolio[0] && s.portfolio[0].image);
      html +=
        '<button type="button" class="subject-card" style="--i:' +
        i +
        '" data-subject="' +
        esc(s.id) +
        '" ' +
        'aria-label="Open the ' +
        esc(s.title) +
        ' gallery">' +
        '<span class="sc-photo">' +
        '<span class="sc-tape sc-tape-l" aria-hidden="true"></span>' +
        '<span class="sc-tape sc-tape-r" aria-hidden="true"></span>' +
        '<span class="sc-img-wrap">' +
        /* covers load eagerly: a lazy image is only fetched once it is
                 painted, so off-screen covers would load late and make any
                 "all cover photos loaded" check race. There are only 8 small
                 SVGs, so eager is cheap and deterministic. */
        '<img src="' +
        esc(cover) +
        '" alt="' +
        esc(s.title) +
        ' subject cover photo" loading="eager">' +
        "</span>" +
        '<span class="sc-icon" aria-hidden="true">' +
        sizeIcon(s.icon, 24) +
        "</span>" +
        "</span>" +
        '<span class="sc-body">' +
        "<h3>" +
        esc(s.title) +
        "</h3>" +
        "<p>" +
        esc(s.desc) +
        "</p>" +
        "</span>" +
        '<span class="sc-arrow" aria-hidden="true">' +
        ICONS.arrow +
        "</span>" +
        "</button>";
    }
    el.subjectCards.innerHTML = html;
  }

  function sectionLabel(id) {
    for (var i = 0; i < SECTIONS.length; i++) {
      if (SECTIONS[i].id === id) return SECTIONS[i].label;
    }
    return "Gallery";
  }

  /* ---------- gallery page ---------- */
  function renderGallery() {
    var subject = findSubject(activeSubjectId);
    if (!subject) return;

    var items = subject.portfolio;

    el.galleryTitle.textContent = subject.title;
    if (el.galleryTagline)
      el.galleryTagline.textContent = subject.tagline || subject.desc || "";
    el.galleryIntro.textContent = subject.intro;
    if (el.galleryDesc) el.galleryDesc.textContent = subject.desc || "";
    el.crumbTitle.textContent = subject.title;
    el.heroIcon.innerHTML = subject.icon;
    el.heroIcon.style.background =
      SUBJECT_TINTS[subject.tone % SUBJECT_TINTS.length];
    el.itemCount.textContent = itemCountLabel(items.length);

    if (!items.length) {
      el.galleryEmpty.classList.remove("hidden");
      renderPreso(); /* hides the presentation for an empty subject */
      return;
    }

    el.galleryEmpty.classList.add("hidden");

    /* the presentation shows this subject's activity (the picked one,
       or simply the first — every subject currently holds one) */
    var picked = findItemIndex(subject, presoItemId);
    presoItemId = items[picked >= 0 ? picked : 0].id;
    presoIndex = 0;
    renderPreso();
  }

  /* ============================================================
     PRESENTATION — Canva-style slide viewer inside a subject
     ------------------------------------------------------------
     The slide count always comes from the activity's real files:
     one image is "1 / 1" with the arrows hidden, a real deck of
     nine pages is "1 / 9" with a clickable thumbnail row. No
     slide is ever invented.
     ============================================================ */
  function presoSlidesOf(item) {
    if (!item) return [];
    if (item.images && item.images.length) return item.images.slice();
    return item.image ? [item.image] : [];
  }

  function presoItem() {
    var subject = findSubject(activeSubjectId);
    if (!subject || !subject.portfolio.length) return null;
    var i = findItemIndex(subject, presoItemId);
    return subject.portfolio[i >= 0 ? i : 0];
  }

  /* the same item turned into the unified viewer's list */
  function lightboxItemsFor(item) {
    var out = [];
    if (!item) return out;
    if (item.images && item.images.length) {
      for (var p = 0; p < item.images.length; p++) {
        var built = {
          id: item.id + "-p" + p,
          title: item.title,
          image: item.images[p],
          caption: item.description,
        };
        if (item.overlay && item.overlay.image === item.images[p])
          built.overlay = item.overlay;
        out.push(built);
      }
    } else if (item.video) {
      out.push({
        id: item.id,
        title: item.title,
        video: item.video,
        poster: item.poster,
        caption: item.description,
      });
    } else if (item.image) {
      out.push({
        id: item.id,
        title: item.title,
        image: item.image,
        caption: item.description,
      });
    }
    return out;
  }

  function renderPreso() {
    if (!el.preso) return;
    var item = presoItem();
    if (!item) {
      el.preso.classList.add("hidden");
      return;
    }
    el.preso.classList.remove("hidden");
    presoIndex = 0;
    updatePreso();
  }

  function updatePreso() {
    var subject = findSubject(activeSubjectId);
    var item = presoItem();
    if (!subject || !item || !el.preso) return;

    var slides = presoSlidesOf(item);

    el.presoKicker.textContent = (subject.title || "").toUpperCase();
    el.presoTitle.textContent = item.title || subject.title;
    el.presoZoom.setAttribute(
      "aria-label",
      "View presentation: " + (item.title || subject.title),
    );
    if (el.presoViewBtn)
      el.presoViewBtn.setAttribute(
        "aria-label",
        "View presentation: " + (item.title || subject.title),
      );
    /* the activity type comes straight from the portfolio data —
       nothing is ever invented for a subject that has none */
    if (el.presoType) {
      el.presoType.textContent =
        item.activityType ||
        (item.section ? "Activity \u00B7 " + sectionLabel(item.section) : "");
    }
    if (item.description) {
      el.presoDesc.textContent = item.description;
      el.presoDesc.classList.remove("hidden");
    } else {
      el.presoDesc.textContent = "";
      el.presoDesc.classList.add("hidden");
    }

    /* a video-only activity plays right inside the slide */
    if (!slides.length && item.video) {
      el.presoZoom.classList.add("hidden");
      el.presoVideo.classList.remove("hidden");
      if (el.presoVideo.getAttribute("src") !== item.video) {
        el.presoVideo.setAttribute("src", item.video);
      }
      el.presoCount.textContent = "1 / 1";
      el.presoPrev.classList.add("hidden");
      el.presoNext.classList.add("hidden");
      el.presoThumbs.classList.add("hidden");
      el.presoThumbs.innerHTML = "";
      return;
    }
    if (!slides.length) return;

    if (!el.presoVideo.paused) el.presoVideo.pause();
    el.presoVideo.classList.add("hidden");
    el.presoZoom.classList.remove("hidden");

    presoIndex = Math.max(0, Math.min(presoIndex, slides.length - 1));
    var src = slides[presoIndex];
    el.presoImg.alt = item.title || "Presentation slide";
    if (el.presoImg.getAttribute("src") !== src)
      el.presoImg.setAttribute("src", src);

    var single = slides.length < 2;
    el.presoCount.textContent = presoIndex + 1 + " / " + slides.length;
    el.presoPrev.classList.toggle("hidden", single);
    el.presoNext.classList.toggle("hidden", single);
    el.presoThumbs.classList.toggle("hidden", single);

    if (single) {
      el.presoThumbs.innerHTML = "";
    } else {
      var html = "";
      for (var i = 0; i < slides.length; i++) {
        html +=
          '<button type="button" class="preso-thumb' +
          (i === presoIndex ? " is-active" : "") +
          '" ' +
          'data-slide="' +
          i +
          '" aria-label="Show slide ' +
          (i + 1) +
          " of " +
          slides.length +
          '" ' +
          'aria-selected="' +
          (i === presoIndex) +
          '">' +
          '<img src="' +
          esc(slides[i]) +
          '" alt="" loading="eager"></button>';
      }
      el.presoThumbs.innerHTML = html;
    }
  }

  function setPresoSlide(next) {
    var slides = presoSlidesOf(presoItem());
    if (slides.length < 2) return;
    presoIndex = (next + slides.length) % slides.length;
    updatePreso();
    playPresoAnim();
  }

  /* gentle paper-slide flourish when the deck moves */
  function playPresoAnim() {
    if (reducedMotion) return;
    var s = el.presoSlide;
    if (!s) return;
    s.classList.remove("ps-anim");
    void s.offsetWidth;
    s.classList.add("ps-anim");
  }

  function togglePresoFullscreen() {
    var frame = el.presoFrame;
    if (!frame) return;
    try {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (frame.requestFullscreen) frame.requestFullscreen();
    } catch (err) {
      /* fullscreen unsupported here */
    }
  }

  function openSubject(id, afterOpen) {
    var subject = findSubject(id);
    if (!subject) return;
    stopMusic();
    activeSubjectId = id;
    activeItemId = null;
    presoItemId = null;
    renderSubjects();
    renderGallery();
    showView("gallery");
    scrollToTop();
    if (afterOpen) afterOpen(subject);
  }

  function backToSubjects() {
    closeLightbox();
    stopMusic();
    activeSubjectId = null;
    activeItemId = null;
    renderSubjects();
    showView("subjects");
    scrollToTop();
  }

  function goHome() {
    el.searchInput.value = "";
    runSearch("");
    closeLightbox();
    stopMusic();
    activeSubjectId = null;
    activeItemId = null;
    showView("home");
    scrollToTop();
  }

  /* ---------- music control ---------- */
  function getBgMusic() {
    return document.getElementById("bgMusic");
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
      window.removeEventListener("pointerdown", begin, true);
      window.removeEventListener("touchstart", begin, true);
      window.removeEventListener("keydown", begin, true);
    }
    function begin() {
      removeUnlockers();
      var retry = m.play();
      if (retry && typeof retry.catch === "function") {
        retry.catch(function () {
          /* still blocked - nothing to do */
        });
      }
    }

    var attempt = m.play();
    if (attempt && typeof attempt.then === "function") {
      attempt.then(removeUnlockers, function () {
        window.addEventListener("pointerdown", begin, true);
        window.addEventListener("touchstart", begin, true);
        window.addEventListener("keydown", begin, true);
      });
    }
  }

  /* ---------- my gallery ---------- */
  function renderMyGalleryFilters() {
    if (!el.myGalleryFilters) return;
    var html = "";
    for (var i = 0; i < GALLERY_CATEGORIES.length; i++) {
      var c = GALLERY_CATEGORIES[i];
      var on = c.id === activeCategory;
      html +=
        '<button type="button" class="chip' +
        (on ? " is-active" : "") +
        '" ' +
        'data-category="' +
        esc(c.id) +
        '" role="tab" aria-selected="' +
        on +
        '"' +
        (on ? ' title="Show all memories"' : "") +
        ">" +
        esc(c.label) +
        "</button>";
    }
    el.myGalleryFilters.innerHTML = html;
  }

  function categoryLabel(id) {
    for (var i = 0; i < GALLERY_CATEGORIES.length; i++) {
      if (GALLERY_CATEGORIES[i].id === id) return GALLERY_CATEGORIES[i].label;
    }
    return "All Memories";
  }

  /* Photos are kept in their own category order. "All Memories" walks
     the category list — School, Aviation and Airplanes, Toyota, Guitar
     and Musics, Food Adventure, Animation and Movies — and appends each
     group fully before starting the next, so groups are never mixed. */
  function itemsForCategory(cat) {
    if (cat && cat !== "all") {
      var only = [];
      for (var j = 0; j < PROFILE_GALLERY.length; j++) {
        if (PROFILE_GALLERY[j].cat === cat) only.push(PROFILE_GALLERY[j]);
      }
      return only;
    }
    var out = [];
    for (var c = 0; c < GALLERY_CATEGORIES.length; c++) {
      var id = GALLERY_CATEGORIES[c].id;
      if (id === "all") continue;
      for (var i = 0; i < PROFILE_GALLERY.length; i++) {
        if (PROFILE_GALLERY[i].cat === id) out.push(PROFILE_GALLERY[i]);
      }
    }
    /* anything without a known category still shows, never lost */
    for (var k = 0; k < PROFILE_GALLERY.length; k++) {
      var item = PROFILE_GALLERY[k];
      var known = false;
      for (var m = 0; m < GALLERY_CATEGORIES.length; m++) {
        if (GALLERY_CATEGORIES[m].id === item.cat) {
          known = true;
          break;
        }
      }
      if (!known) out.push(item);
    }
    return out;
  }

  var SCRAP_TILTS = [
    "-1.6deg",
    "1.2deg",
    "-0.8deg",
    "1.8deg",
    "-1.2deg",
    "0.9deg",
  ];

  function renderMyGallery() {
    if (!el.myGalleryGrid) return;
    var items = itemsForCategory(activeCategory);
    if (el.myGalleryTitle)
      el.myGalleryTitle.textContent = categoryLabel(activeCategory);

    if (!items.length) {
      var note =
        EMPTY_CATEGORY_NOTE[activeCategory] ||
        "New memories will be pinned to this page soon.";
      el.myGalleryGrid.innerHTML =
        '<div class="note-card"><strong>Coming soon&#33;</strong><p>' +
        esc(note) +
        "</p></div>";
      return;
    }

    var html = "";
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var media;
      if (item.video) {
        media =
          '<video src="' +
          esc(item.video) +
          '" poster="' +
          esc(item.poster || "") +
          '" ' +
          'muted playsinline preload="metadata"></video>' +
          '<span class="play-badge">&#9658; Video</span>';
      } else {
        media =
          '<img src="' +
          esc(item.image) +
          '" alt="' +
          esc(item.title) +
          '" loading="lazy">';
      }
      html +=
        '<button type="button" class="my-gallery-card" style="--i:' +
        i +
        ";--tilt:" +
        SCRAP_TILTS[i % SCRAP_TILTS.length] +
        '" ' +
        'data-index="' +
        i +
        '" aria-label="Open ' +
        esc(item.title) +
        '">' +
        '<span class="tape-strip" aria-hidden="true"></span>' +
        '<span class="mg-img">' +
        media +
        '<span class="card-overlay"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"></path></svg></span>' +
        "</span>" +
        '<span class="mg-meta">' +
        "<strong>" +
        esc(item.title) +
        "</strong>" +
        "<span>" +
        esc(item.caption || categoryLabel(item.cat)) +
        "</span>" +
        "</span>" +
        "</button>";
    }
    el.myGalleryGrid.innerHTML = html;
  }

  function openMyGallery() {
    stopMusic();
    activeCategory = "all";
    renderMyGalleryFilters();
    renderMyGallery();
    showView("mygallery");
    scrollToTop();
  }

  function backToHomeFromMyGallery() {
    closeLightbox();
    showView("home");
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
       - Personal photos fit proportionally, while portrait images
         remain fully accessible through vertical scrolling
       - videos keep their aspect ratio and pause on close
     ============================================================ */
  function lockPageScroll() {
    var gap = window.innerWidth - document.documentElement.clientWidth;
    if (gap > 0) document.body.style.paddingRight = gap + "px";
    document.body.style.overflow = "hidden";
  }

  function unlockPageScroll() {
    /* the country gallery opened from the map keeps its own scroll lock:
       closing the viewer on top of it must not unlock the page behind */
    var mapGallery = document.getElementById("mapGalleryOverlay");
    if (mapGallery && !mapGallery.classList.contains("hidden")) return;
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }

  function pauseLightboxVideo() {
    var v = el.lightboxVideo;
    if (!v) return;
    if (!v.paused) v.pause();
    if (v.getAttribute("src")) {
      v.removeAttribute("src");
      try {
        v.load();
      } catch (err) {
        /* media reset unsupported */
      }
    }
  }

  function openLightbox(index, items, wholeFit) {
    if (!items || !items.length) return;
    lbItems = items;
    lbIndex = Math.max(0, Math.min(index, items.length - 1));
    lbWholeFit = !!wholeFit;
    el.lightboxContent.classList.toggle("is-whole-fit", lbWholeFit);
    lbDir = 0;
    lbLastFocused = document.activeElement;
    lbScrollY = window.scrollY;
    updateLightbox();
    el.lightboxOverlay.classList.remove("hidden");
    stopMusic();
    lockPageScroll();
    window.setTimeout(function () {
      if (!el.lightboxOverlay.classList.contains("hidden"))
        el.lightboxClose.focus();
    }, 40);
  }

  function closeLightbox() {
    if (el.lightboxOverlay.classList.contains("hidden")) return;
    /* leaving fullscreen first keeps the page exactly as it was */
    if (document.fullscreenElement === el.lightboxOverlay) {
      try {
        document.exitFullscreen();
      } catch (err) {
        /* unsupported */
      }
    }
    lbStepToken++; /* drop any flight still in the air */
    clearPushSnapshot();
    pauseLightboxVideo();
    el.lightboxOverlay.classList.add("hidden");
    el.lightboxContent.classList.remove("is-long", "is-whole-fit");
    el.lightboxImage.classList.add("hidden");
    el.lightboxFrame.classList.add("hidden");
    clearSlideOverlay();
    if (el.lightboxThumbs) {
      el.lightboxThumbs.classList.add("hidden");
      el.lightboxThumbs.innerHTML = "";
    }
    el.lightboxVideo.classList.add("hidden");
    el.lightboxError.classList.add("hidden");
    unlockPageScroll();
    if (window.scrollY !== lbScrollY) window.scrollTo(0, lbScrollY);
    if (lbLastFocused && lbLastFocused.focus) {
      try {
        lbLastFocused.focus();
      } catch (err) {
        /* element gone */
      }
    }
    lbLastFocused = null;
    lbItems = [];
    lbWholeFit = false;
  }

  function lightboxIsOpen() {
    return !el.lightboxOverlay.classList.contains("hidden");
  }

  /* fullscreen inside the viewer: the real content fills the screen
     (tall sheets still scroll), a second press of the button comes
     back to the page, and Esc leaves fullscreen before the viewer */
  function toggleLightboxFullscreen() {
    try {
      if (document.fullscreenElement === el.lightboxOverlay)
        document.exitFullscreen();
      else if (
        !document.fullscreenElement &&
        el.lightboxOverlay.requestFullscreen
      ) {
        /* the whole overlay goes fullscreen so close, next/previous and
           this button stay on screen while the content fills it */
        el.lightboxOverlay.requestFullscreen();
      }
    } catch (err) {
      /* fullscreen unsupported here */
    }
  }

  function updateLightbox() {
    var item = lbItems[lbIndex];
    if (!item) return;

    var caption = item.title || "";
    if (item.caption) caption += " — " + item.caption;
    el.lightboxCaption.textContent = caption;
    el.lightboxCounter.textContent = lbIndex + 1 + " of " + lbItems.length;
    renderLightboxThumbs();

    var multi = lbItems.length > 1;
    el.lightboxPrev.classList.toggle("hidden", !multi);
    el.lightboxNext.classList.toggle("hidden", !multi);

    el.lightboxContent.classList.remove("is-long");
    el.lightboxError.classList.add("hidden");

    if (item.video) {
      el.lightboxImage.classList.add("hidden");
      el.lightboxFrame.classList.add("hidden");
      clearSlideOverlay();
      el.lightboxError.classList.add("hidden");
      el.lightboxVideo.classList.remove("hidden");
      var poster = item.poster || "";
      if (poster) el.lightboxVideo.setAttribute("poster", poster);
      else el.lightboxVideo.removeAttribute("poster");
      if (el.lightboxVideo.getAttribute("src") !== item.video) {
        pauseLightboxVideo();
        el.lightboxVideo.setAttribute("src", item.video);
      }
      return;
    }

    pauseLightboxVideo();
    el.lightboxVideo.classList.add("hidden");
    el.lightboxError.classList.add("hidden");
    el.lightboxImage.classList.remove("hidden");
    el.lightboxFrame.classList.remove("hidden");
    el.lightboxImage.alt = item.title || "Gallery image";

    function imageReady() {
      el.lightboxImage.classList.remove("hidden");
      el.lightboxFrame.classList.remove("hidden");
      el.lightboxError.classList.add("hidden");
      /* Portraits use the tall-image layout whether they come from a
         subject deck or a personal photo collection. */
      var long =
        el.lightboxImage.naturalWidth > 0 &&
        el.lightboxImage.naturalHeight / el.lightboxImage.naturalWidth > 1.3;
      el.lightboxContent.classList.toggle("is-long", long);
      el.lightboxOverlay.scrollTop = 0;
      /* slide artwork + printed caption sit exactly over the photo */
      applySlideOverlay(item);
      playSlideAnimation();
    }
    function imageFailed() {
      el.lightboxImage.classList.add("hidden");
      el.lightboxFrame.classList.add("hidden");
      clearSlideOverlay();
      el.lightboxContent.classList.remove("is-long");
      el.lightboxError.classList.remove("hidden");
    }

    var renderToken = lbStepToken;
    el.lightboxImage.onload = function () {
      if (renderToken !== lbStepToken) return;
      imageReady();
    };
    el.lightboxImage.onerror = function () {
      if (renderToken !== lbStepToken) return;
      imageFailed();
    };

    var src = item.image;
    if (!src) {
      imageFailed();
      return;
    }
    /* the slide direction is applied the moment the src changes, not
       only when the picture finishes decoding: with a pre-cached slide
       (thumbnails load eagerly) the viewer must still show the correct
       forward/backward flourish */
    playSlideAnimation();
    if (
      el.lightboxImage.getAttribute("src") === src &&
      el.lightboxImage.complete
    ) {
      if (el.lightboxImage.naturalWidth) imageReady();
      else imageFailed();
    } else {
      el.lightboxImage.setAttribute("src", src);
    }
  }

  function renderLightboxThumbs() {
    var host = el.lightboxThumbs;
    if (!host) return;
    var images = lbItems.filter(function (entry) {
      return !!entry.image;
    });
    if (images.length < 2 || lbItems.length !== images.length) {
      host.classList.add("hidden");
      host.innerHTML = "";
      return;
    }
    host.classList.remove("hidden");
    host.innerHTML = images
      .map(function (entry, i) {
        return (
          '<button type="button" class="lightbox-thumb' +
          (i === lbIndex ? " is-active" : "") +
          '" data-lightbox-slide="' +
          i +
          '" aria-label="Show image ' +
          (i + 1) +
          " of " +
          images.length +
          '" aria-current="' +
          (i === lbIndex ? "true" : "false") +
          '"><img src="' +
          esc(entry.image) +
          '" alt="" loading="eager"></button>'
        );
      })
      .join("");
  }

  function lightboxNext() {
    stepLightbox(1);
  }

  function lightboxPrev() {
    stepLightbox(-1);
  }

  /* ============================================================
     AIRPLANE-POWERED IMAGE TRANSITION
     ------------------------------------------------------------
     Moving to another picture is one coordinated movement:
       1. the photograph on screen is copied into a box parked at its
          exact on-screen position,
       2. the airplane flies in from the side the new photo comes from
          (Next: from the right, Previous: from the left) trailing a
          short dotted contrail,
       3. it physically pushes the copy off the viewer in that same
          direction while the new photograph slides in behind it,
       4. the copy removes itself once the flight is over.
     The index is updated first, so rapid clicks can never leave the
     counter out of sync, and an interrupted flight is simply dropped
     in favour of the newest one.
     ============================================================ */
  var lbStepToken = 0;
  var lbPushTimer = 0;

  function stepLightbox(dir, targetIndex) {
    if (!lbItems.length) return;
    var count = lbItems.length;
    var currentIndex = lbIndex;
    var nextIndex =
      typeof targetIndex === "number"
        ? Math.max(0, Math.min(targetIndex, count - 1))
        : (currentIndex + dir + count) % count;
    lbDir =
      typeof targetIndex === "number"
        ? nextIndex >= currentIndex
          ? 1
          : -1
        : dir < 0
          ? -1
          : 1;
    if (count < 2 || nextIndex === currentIndex) return;
    var token = ++lbStepToken;
    lbIndex = nextIndex; /* never out of bounds */
    dir = lbDir;

    var item = lbItems[lbIndex];
    var src = item && item.image;
    var fromImage = currentIndex >= 0 ? lbItems[currentIndex] : null;
    var animate =
      !reducedMotion &&
      src &&
      fromImage &&
      fromImage.image &&
      !el.lightboxFrame.classList.contains("hidden") &&
      !el.lightboxImage.classList.contains("hidden") &&
      !!el.lightboxImage.getAttribute("src");

    if (!animate) {
      updateLightbox();
      return;
    }

    function swap() {
      if (token !== lbStepToken) return; /* a newer click won */
      var snap = capturePushSnapshot();
      updateLightbox();
      if (snap) {
        showPushSnapshot(snap, dir);
        playFlight(dir);
      }
    }

    /* the incoming picture is decoded first so the frame does not
       collapse to the default replaced-element size mid-flight; a
       slow or broken file still swaps after a short wait */
    preloadImage(src, swap, 2500);
  }

  function preloadImage(src, done, timeoutMs) {
    var settled = false;
    var probe = new Image();
    function finish() {
      if (settled) return;
      settled = true;
      done();
    }
    probe.addEventListener("load", finish);
    probe.addEventListener("error", finish);
    probe.src = src;
    if (probe.complete) {
      finish();
      return;
    }
    window.setTimeout(finish, timeoutMs || 2500);
  }

  /* the photograph exactly as the visitor sees it right now */
  function capturePushSnapshot() {
    var img = el.lightboxImage;
    var src = img.getAttribute("src");
    if (!src) return null;
    var iRect = img.getBoundingClientRect();
    var cRect = el.lightboxContent.getBoundingClientRect();
    if (!iRect.width || !iRect.height) return null;
    var snap = {
      src: src,
      left: iRect.left - cRect.left,
      top: iRect.top - cRect.top,
      width: iRect.width,
      height: iRect.height,
      overlay: null,
    };
    /* an animated slide overlay travels with the picture it belongs to */
    if (lbOverlayBox && !el.lightboxSlide.classList.contains("hidden")) {
      snap.overlay = {
        html: el.lightboxSlide.innerHTML,
        left: el.lightboxSlide.style.left,
        top: el.lightboxSlide.style.top,
        width: el.lightboxSlide.style.width,
        height: el.lightboxSlide.style.height,
        fontSize: el.lightboxSlide.style.fontSize,
      };
    }
    return snap;
  }

  function showPushSnapshot(snap, dir) {
    var host = el.lightboxPush;
    if (!host || !snap) return;
    host.className = "lb-push";
    host.innerHTML = "";
    host.style.left = Math.round(snap.left) + "px";
    host.style.top = Math.round(snap.top) + "px";
    host.style.width = Math.round(snap.width) + "px";
    host.style.height = Math.round(snap.height) + "px";

    var img = document.createElement("img");
    img.alt = "";
    img.setAttribute("aria-hidden", "true");
    img.src = snap.src;
    host.appendChild(img);

    if (snap.overlay) {
      var ov = document.createElement("div");
      ov.className = "lightbox-slide";
      ov.innerHTML = snap.overlay.html;
      ov.style.left = snap.overlay.left;
      ov.style.top = snap.overlay.top;
      ov.style.width = snap.overlay.width;
      ov.style.height = snap.overlay.height;
      ov.style.fontSize = snap.overlay.fontSize;
      host.appendChild(ov);
    }

    /* force a frame so the direction class restarts the animation */
    void host.offsetWidth;
    host.classList.add(dir < 0 ? "is-prev" : "is-next");
    window.clearTimeout(lbPushTimer);
    lbPushTimer = window.setTimeout(clearPushSnapshot, 960);
  }

  function clearPushSnapshot() {
    window.clearTimeout(lbPushTimer);
    var host = el.lightboxPush;
    if (!host) return;
    host.className = "lb-push";
    host.innerHTML = "";
    host.style.left = "";
    host.style.top = "";
    host.style.width = "";
    host.style.height = "";
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
    el.lightboxSlide.classList.add("hidden");
    el.lightboxSlide.innerHTML = "";
  }

  function layoutSlideOverlay() {
    if (!lbOverlayBox || el.lightboxSlide.classList.contains("hidden")) return;
    var photo = el.lightboxImage.getBoundingClientRect();
    var frame = el.lightboxFrame.getBoundingClientRect();
    if (!photo.width || !photo.height) return;

    var b = lbOverlayBox;
    var s = el.lightboxSlide;
    s.style.left = photo.left - frame.left + (photo.width * b.x) / 100 + "px";
    s.style.top = photo.top - frame.top + (photo.height * b.y) / 100 + "px";
    s.style.width = (photo.width * b.w) / 100 + "px";
    s.style.height = (photo.height * b.h) / 100 + "px";
    /* the caption is typeset for a 1366px-wide slide (32px heading) */
    s.style.fontSize = (photo.width * 32) / 1366 + "px";
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
      '<img class="lb-slide-media" src="' +
      esc(ov.media) +
      '" alt="" aria-hidden="true">' +
      '<span class="lb-slide-text">' +
      "<strong>" +
      esc(lines[0] || "") +
      "</strong>" +
      (lines[1] ? "<span>" + esc(lines[1]) + "</span>" : "") +
      "</span>";
    s.classList.remove("hidden");
    lbOverlayBox = ov.box;
    layoutSlideOverlay();
  }

  /* gentle slide/fade whenever the viewer moves to another picture */
  function playSlideAnimation() {
    if (reducedMotion) return;
    var f = el.lightboxFrame;
    f.classList.remove("lb-anim", "lb-fade", "lb-next", "lb-prev");
    void f.offsetWidth; /* force a restart when the same class is reused */
    f.classList.add("lb-anim");
    f.classList.add(lbDir < 0 ? "lb-prev" : lbDir > 0 ? "lb-next" : "lb-fade");
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

  function playFlight(dir) {
    if (reducedMotion) return;
    var host = el.lightboxContent;
    if (!host) return;
    if (!flightEl || !flightEl.parentNode) {
      flightEl = document.createElement("span");
      flightEl.className = "lb-flight";
      flightEl.setAttribute("aria-hidden", "true");
      flightEl.innerHTML =
        '<svg viewBox="74 2 44 40" width="34" height="31" focusable="false">' +
        '<path d="M112 10.4a2.2 2.2 0 0 0-3.1-2l-8.1 3.5-8.6-3a1.4 1.4 0 0 0-1.7.9l-1.3 3.5 6.5 3.6-.3 5 2.9 2.2.2 1.6-4.1.5-2.8 2.2.2 1.4 3.6-.5 3.3-2.3-.2-5 8.8-3.6a1.4 1.4 0 0 0 .9-1.7z" fill="currentColor"></path>' +
        "</svg>";
      host.appendChild(flightEl);
    }
    /* restart the animation even when the same class is reused */
    flightEl.classList.remove("is-flying", "is-next", "is-prev");
    void flightEl.offsetWidth;
    /* dir: 1 = Next (right → left), -1 = Previous (left → right),
       0/undefined = the picture was simply opened */
    flightEl.classList.add(
      dir < 0 ? "is-prev" : dir > 0 ? "is-next" : "is-flying",
    );
    /* the old-photo layer is above the incoming image; keep the plane
       just above that layer so it appears to make physical contact */
    flightEl.style.zIndex = dir ? "5" : "";
  }

  window.addEventListener("resize", layoutSlideOverlay);

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
      items = lightboxItemsFor(item);
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
          caption: it.description,
        };
        if (it.overlay && it.overlay.image === it.image)
          builtItem.overlay = it.overlay;
        items.push(builtItem);
        if (i === index) start = items.length - 1;
      }
    }
    openLightbox(start, items);
  }

  /* ---------- search ---------- */
  function runSearch(raw) {
    searchQuery = (raw || "").trim().toLowerCase();
    el.searchClear.classList.toggle("is-visible", searchQuery.length > 0);

    if (!searchQuery) {
      showView(
        returnView === "gallery" && activeSubjectId ? "gallery" : "home",
      );
      return;
    }

    if (currentView !== "search") returnView = currentView;

    var matchedSubjects = [];
    var matchedItems = [];

    for (var i = 0; i < subjects.length; i++) {
      var s = subjects[i];
      var sHay = (s.title + " " + s.desc + " " + s.intro).toLowerCase();
      if (sHay.indexOf(searchQuery) !== -1) matchedSubjects.push(s);

      for (var j = 0; j < s.portfolio.length; j++) {
        var item = s.portfolio[j];
        var iHay = (
          item.title +
          " " +
          (item.description || "") +
          " " +
          s.title
        ).toLowerCase();
        if (iHay.indexOf(searchQuery) !== -1) {
          matchedItems.push({ subject: s, item: item });
        }
      }
    }

    var total = matchedSubjects.length + matchedItems.length;
    el.searchSummary.textContent = total
      ? total +
        " result" +
        (total === 1 ? "" : "s") +
        " for “" +
        raw.trim() +
        "”"
      : "No results for “" + raw.trim() + "”";

    if (matchedSubjects.length) {
      el.searchSubjectsSection.classList.remove("hidden");
      var sh = "";
      for (var k = 0; k < matchedSubjects.length; k++) {
        var ms = matchedSubjects[k];
        sh +=
          '<li><button type="button" class="result-btn" data-subject="' +
          esc(ms.id) +
          '">' +
          '<span class="result-icon" aria-hidden="true">' +
          sizeIcon(ms.icon, 22) +
          "</span>" +
          '<span class="result-copy"><strong>' +
          esc(ms.title) +
          "</strong><span>" +
          esc(ms.desc) +
          "</span></span>" +
          '<span class="result-arrow" aria-hidden="true">' +
          ICONS.arrow +
          "</span>" +
          "</button></li>";
      }
      el.searchSubjectsList.innerHTML = sh;
    } else {
      el.searchSubjectsSection.classList.add("hidden");
      el.searchSubjectsList.innerHTML = "";
    }

    if (matchedItems.length) {
      el.searchItemsSection.classList.remove("hidden");
      var ih = "";
      for (var m = 0; m < matchedItems.length; m++) {
        var mi = matchedItems[m];
        var thumbHtml = mi.item.image
          ? '<img src="' + esc(mi.item.image) + '" alt="">'
          : sizeIcon(mi.subject.icon, 22);
        ih +=
          '<li><button type="button" class="result-btn" data-subject="' +
          esc(mi.subject.id) +
          '" data-item="' +
          esc(mi.item.id) +
          '">' +
          '<span class="result-icon" aria-hidden="true">' +
          thumbHtml +
          "</span>" +
          '<span class="result-copy"><strong>' +
          esc(mi.item.title) +
          "</strong><span>" +
          esc(mi.subject.title) +
          "</span></span>" +
          '<span class="result-arrow" aria-hidden="true">' +
          ICONS.arrow +
          "</span>" +
          "</button></li>";
      }
      el.searchItemsList.innerHTML = ih;
    } else {
      el.searchItemsSection.classList.add("hidden");
      el.searchItemsList.innerHTML = "";
    }

    el.searchEmpty.classList.toggle("hidden", total > 0);
    showView("search");
  }

  /* ---------- 3D tilt for gallery cards ---------- */
  function attachTilt(card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width;
      var py = (e.clientY - rect.top) / rect.height;
      card.style.setProperty("--ry", ((px - 0.5) * 10).toFixed(2) + "deg");
      card.style.setProperty("--rx", ((0.5 - py) * 10).toFixed(2) + "deg");
      card.style.setProperty("--ty", "-6px");
    });
    card.addEventListener("mouseleave", function () {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--ty", "0px");
    });
  }

  /* ---------- parallax decor ---------- */
  if (canHover && !reducedMotion) {
    var ticking = false;
    var lastX = 0,
      lastY = 0;
    window.addEventListener("mousemove", function (e) {
      lastX = e.clientX;
      lastY = e.clientY;
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var cx = lastX / window.innerWidth - 0.5;
        var cy = lastY / window.innerHeight - 0.5;
        for (var i = 0; i < el.blobs.length; i++) {
          var depth = parseFloat(el.blobs[i].getAttribute("data-depth")) || 0;
          el.blobs[i].style.transform =
            "translate3d(" +
            (cx * depth).toFixed(1) +
            "px," +
            (cy * depth).toFixed(1) +
            "px,0)";
        }
        ticking = false;
      });
    });
  }

  /* ---------- events ---------- */
  /* subject cards (subjects page) */
  el.subjectCards.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-subject]");
    if (!btn) return;
    openSubject(btn.getAttribute("data-subject"));
  });

  /* ---------- presentation controls (inside a subject) ---------- */
  el.presoPrev.addEventListener("click", function () {
    setPresoSlide(presoIndex - 1);
  });
  el.presoNext.addEventListener("click", function () {
    setPresoSlide(presoIndex + 1);
  });

  el.presoThumbs.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-slide]");
    if (!btn) return;
    var n = parseInt(btn.getAttribute("data-slide"), 10);
    if (!isNaN(n)) setPresoSlide(n);
  });

  /* clicking the big slide (or its preview) opens the shared full-size
     viewer with this subject's presentation; the arrow buttons, the
     thumbnails and the video keep their own behaviour */
  function openPresoPresentation() {
    var items = lightboxItemsFor(presoItem());
    if (!items.length) return;
    openLightbox(Math.min(presoIndex, items.length - 1), items);
    playFlight();
  }

  el.presoZoom.addEventListener("click", openPresoPresentation);
  if (el.presoViewBtn)
    el.presoViewBtn.addEventListener("click", openPresoPresentation);

  el.presoSlide.addEventListener("click", function (e) {
    if (e.target.closest("button, video, a")) return;
    openPresoPresentation();
  });

  /* a portrait sheet is allowed to grow taller in its preview and in
     fullscreen instead of being shrunk into an unreadable strip */
  el.presoImg.addEventListener("load", function () {
    var tall =
      el.presoImg.naturalWidth > 0 &&
      el.presoImg.naturalHeight / el.presoImg.naturalWidth > 1.3;
    el.presoZoom.classList.toggle("is-tall", tall);
  });

  el.presoFull.addEventListener("click", togglePresoFullscreen);

  /* fullscreen: the page behind it is locked while the deck fills the
     screen, the button shows its pressed state, and scrolling comes
     back the moment the browser leaves fullscreen (Esc included) */
  document.addEventListener("fullscreenchange", function () {
    var fsEl = document.fullscreenElement;
    var on = !!fsEl;
    /* each button only lights up while its own surface is fullscreen */
    if (el.presoFull)
      el.presoFull.classList.toggle("is-on", on && fsEl === el.presoFrame);
    if (el.lightboxFull)
      el.lightboxFull.classList.toggle(
        "is-on",
        on && fsEl === el.lightboxOverlay,
      );
    if (on) lockPageScroll();
    /* the open viewer keeps the page behind it locked */ else if (
      !lightboxIsOpen()
    )
      unlockPageScroll();
  });

  el.backBtn.addEventListener("click", backToSubjects);
  el.crumbHome.addEventListener("click", backToSubjects);

  /* top navigation + hero cards */
  el.navTargets.forEach(function (node) {
    node.addEventListener("click", function () {
      var target = node.getAttribute("data-nav");
      if (target === "home") goHome();
      else if (target === "subjects") {
        closeLightbox();
        stopMusic();
        renderSubjects();
        showView("subjects");
        scrollToTop();
      } else if (target === "mygallery") openMyGallery();
    });
  });

  /* collapsible search inside the navigation */
  if (el.searchToggle && el.navSearch) {
    el.searchToggle.addEventListener("click", function () {
      var open = el.navSearch.hasAttribute("hidden");
      if (open) {
        el.navSearch.removeAttribute("hidden");
        el.searchToggle.setAttribute("aria-expanded", "true");
        el.searchInput.focus();
      } else {
        el.navSearch.setAttribute("hidden", "");
        el.searchToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  el.searchInput.addEventListener("input", function () {
    runSearch(el.searchInput.value);
  });

  el.searchClear.addEventListener("click", function () {
    el.searchInput.value = "";
    runSearch("");
    el.searchInput.focus();
  });

  el.searchBackBtn.addEventListener("click", function () {
    el.searchInput.value = "";
    runSearch("");
  });

  el.searchView.addEventListener("click", function (e) {
    var btn = e.target.closest(".result-btn");
    if (!btn) return;
    var subjectId = btn.getAttribute("data-subject");
    var itemId = btn.getAttribute("data-item");
    el.searchInput.value = "";
    if (itemId) {
      openSubject(subjectId, function (subject) {
        var index = findItemIndex(subject, itemId);
        if (index >= 0) openSubjectItem(subject, index);
      });
    } else {
      openSubject(subjectId);
    }
  });

  el.myGalleryBackBtn.addEventListener("click", backToHomeFromMyGallery);

  /* stop music when the hero video is clicked or starts playing */
  if (el.heroVideo) {
    el.heroVideo.addEventListener("click", stopMusic);
    el.heroVideo.addEventListener("play", stopMusic);
  }

  el.myGalleryFilters.addEventListener("click", function (e) {
    var chip = e.target.closest("[data-category]");
    if (!chip) return;
    var cat = chip.getAttribute("data-category");
    /* pressing the selected category again brings every memory back */
    activeCategory = cat === activeCategory ? "all" : cat;
    renderMyGalleryFilters();
    renderMyGallery();
  });

  el.myGalleryGrid.addEventListener("click", function (e) {
    var card = e.target.closest("[data-index]");
    if (!card) return;
    var index = parseInt(card.getAttribute("data-index"), 10);
    /* third argument: My Gallery always shows the whole photo */
    if (!isNaN(index))
      openLightbox(index, itemsForCategory(activeCategory), true);
  });

  /* viewer controls */
  el.lightboxClose.addEventListener("click", closeLightbox);
  if (el.lightboxFull)
    el.lightboxFull.addEventListener("click", toggleLightboxFullscreen);
  if (el.lightboxThumbs)
    el.lightboxThumbs.addEventListener("click", function (e) {
      var button = e.target.closest("[data-lightbox-slide]");
      if (!button || !lbItems.length) return;
      var next = parseInt(button.getAttribute("data-lightbox-slide"), 10);
      if (!isNaN(next) && next !== lbIndex)
        stepLightbox(next > lbIndex ? 1 : -1, next);
    });
  el.lightboxPrev.addEventListener("click", lightboxPrev);
  el.lightboxNext.addEventListener("click", lightboxNext);
  el.lightboxOverlay.addEventListener("click", function (e) {
    if (
      e.target === el.lightboxOverlay ||
      (e.target.hasAttribute && e.target.hasAttribute("data-close"))
    ) {
      closeLightbox();
    }
  });

  /* other parts of the page (the country galleries in js/asia-map.js)
     borrow this same viewer instead of building a second one: they
     announce the picture set with this event and the viewer opens it */
  document.addEventListener("portfolio:open-lightbox", function (e) {
    var d = e && e.detail;
    if (!d || !d.items || !d.items.length) return;
    openLightbox(d.index || 0, d.items, !!d.wholeFit);
  });

  el.brandHome.addEventListener("click", goHome);
  el.brandHome.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goHome();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (!lightboxIsOpen()) return;
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      lightboxPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      lightboxNext();
    } else if (e.key === "Tab") {
      /* keep focus inside the viewer */
      var focusables = el.lightboxOverlay.querySelectorAll(
        "button:not(.hidden)",
      );
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

  var PLANE_BODY = "#f2f6fb";
  var PLANE_WING = "#2f86c7";
  var PLANE_TAIL = "#57a6e2";
  var PLANE_FIN = "#e07b2a";
  var PLANE_GLASS = "#2b3a4a";

  var PLANE_BANK = 0.42; /* bank angle while turning (radians) */
  var PLANE_VIEW = 0.3; /* tip towards the viewer (radians)   */

  /* ---------- tiny vector helpers ---------- */
  function vAdd(a, b) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  }
  function vSub(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  }
  function vScale(a, k) {
    return [a[0] * k, a[1] * k, a[2] * k];
  }
  function vCross(a, b) {
    return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0],
    ];
  }
  function vDot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  function vNorm(a) {
    var l = Math.sqrt(vDot(a, a)) || 1;
    return [a[0] / l, a[1] / l, a[2] / l];
  }

  /* ---------- the airplane mesh (local space) ---------- */
  /*  +z is the nose, +x the right wing, +y the top of the cabin  */
  function buildPlaneMesh() {
    var V = [],
      F = [];

    function add(x, y, z) {
      V.push([x, y, z]);
      return V.length - 1;
    }
    function tri(a, b, c, col) {
      F.push({ i: [a, b, c], c: col });
    }
    function quad(a, b, c, d, col) {
      tri(a, b, c, col);
      tri(a, c, d, col);
    }
    function plate(pts, col) {
      var idx = [];
      for (var i = 0; i < pts.length; i++)
        idx.push(add(pts[i][0], pts[i][1], pts[i][2]));
      for (var j = 1; j < idx.length - 1; j++) {
        tri(idx[0], idx[j], idx[j + 1], col);
        tri(idx[0], idx[j + 1], idx[j], col);
      }
    }

    /* fuselage: a small hexagonal tube that tapers to the nose */
    var RING = 6;
    var secs = [
      [-0.5, 0.012, 0.0],
      [-0.42, 0.03, 0.0],
      [-0.2, 0.044, 0.0],
      [0.14, 0.046, 0.005],
      [0.34, 0.032, 0.01],
      [0.45, 0.016, 0.014],
      [0.52, 0.005, 0.016],
    ];
    var rings = [];
    for (var s = 0; s < secs.length; s++) {
      var ring = [];
      for (var i = 0; i < RING; i++) {
        var a = (i / RING) * Math.PI * 2;
        ring.push(
          add(
            Math.cos(a) * secs[s][1],
            secs[s][2] + Math.sin(a) * secs[s][1] * 0.8,
            secs[s][0],
          ),
        );
      }
      rings.push(ring);
    }
    for (var r = 0; r < rings.length - 1; r++) {
      for (var k = 0; k < RING; k++) {
        var j = (k + 1) % RING;
        quad(
          rings[r][k],
          rings[r][j],
          rings[r + 1][j],
          rings[r + 1][k],
          PLANE_BODY,
        );
      }
    }

    /* main wings (swept back, slight dihedral) */
    function wing(sign) {
      plate(
        [
          [0.04 * sign, 0.004, 0.06],
          [0.04 * sign, 0.004, -0.15],
          [0.36 * sign, 0.03, -0.27],
          [0.36 * sign, 0.03, -0.17],
        ],
        PLANE_WING,
      );
    }
    wing(1);
    wing(-1);

    /* tail plane */
    function tailplane(sign) {
      plate(
        [
          [0.03 * sign, 0.01, -0.36],
          [0.03 * sign, 0.01, -0.47],
          [0.17 * sign, 0.022, -0.53],
          [0.17 * sign, 0.022, -0.455],
        ],
        PLANE_TAIL,
      );
    }
    tailplane(1);
    tailplane(-1);

    /* vertical fin */
    plate(
      [
        [0, 0.02, -0.36],
        [0, 0.02, -0.49],
        [0, 0.19, -0.53],
        [0, 0.17, -0.4],
      ],
      PLANE_FIN,
    );

    /* cockpit glass */
    plate(
      [
        [-0.022, 0.038, 0.2],
        [0.022, 0.038, 0.2],
        [0.018, 0.032, 0.02],
        [-0.018, 0.032, 0.02],
      ],
      PLANE_GLASS,
    );

    return { V: V, F: F };
  }

  /* ---------- flight paths ---------- */
  /* a plain tilted ring: the far side is up and behind */
  function pathRing(t, tilt, rx, ry) {
    var a = t * Math.PI * 2;
    var s = Math.sin(a),
      c = Math.cos(a);
    return [c * rx, s * ry * Math.sin(tilt), s * ry * Math.cos(tilt)];
  }

  /* ---------- camera (straight on, small perspective) ---------- */
  function planeCamSpace(pt, cam) {
    var cy = Math.cos(cam.yaw),
      sy = Math.sin(cam.yaw);
    var x = pt[0] * cy - pt[2] * sy;
    var z = pt[0] * sy + pt[2] * cy;
    var y = pt[1];
    var cp = Math.cos(cam.pitch),
      sp = Math.sin(cam.pitch);
    return { x: x, y: y * cp - z * sp, z: y * sp + z * cp };
  }

  function planeProject(pt, cam) {
    var c = planeCamSpace(pt, cam);
    var s = cam.focal / (cam.focal + c.z);
    return {
      x: cam.cx + c.x * s * cam.unit,
      y: cam.cy - c.y * s * cam.unit,
      s: s,
      z: c.z,
    };
  }

  /* ---------- colours ---------- */
  function hexToRgb(hex) {
    var h = hex.replace("#", "");
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
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  /* ---------- the airplane ---------- */
  function drawPlaneMesh(ctx, cam, mesh, pos, basis, alpha, scale) {
    var S = scale;
    var world = [];
    for (var i = 0; i < mesh.V.length; i++) {
      var v = mesh.V[i];
      world.push([
        pos[0] +
          (basis.r[0] * v[0] + basis.u[0] * v[1] + basis.f[0] * v[2]) * S,
        pos[1] +
          (basis.r[1] * v[0] + basis.u[1] * v[1] + basis.f[1] * v[2]) * S,
        pos[2] +
          (basis.r[2] * v[0] + basis.u[2] * v[1] + basis.f[2] * v[2]) * S,
      ]);
    }

    var camV = [];
    for (var j = 0; j < world.length; j++)
      camV.push(planeCamSpace(world[j], cam));

    var L = vNorm([-0.42, 0.78, -0.46]); /* light, in camera space */

    var faces = [];
    for (var f = 0; f < mesh.F.length; f++) {
      var idx = mesh.F[f].i;
      var a = camV[idx[0]],
        b = camV[idx[1]],
        c = camV[idx[2]];
      var n = vNorm(
        vCross(
          vSub([b.x, b.y, b.z], [a.x, a.y, a.z]),
          vSub([c.x, c.y, c.z], [a.x, a.y, a.z]),
        ),
      );
      if (vDot(n, L) < 0) n = vScale(n, -1); /* always shade the visible side */
      var light = Math.max(0, vDot(n, L));
      var k = 0.44 + 0.56 * light;
      var depth = (a.z + b.z + c.z) / 3;
      faces.push({
        idx: idx,
        col: shade(mesh.F[f].c, k, "#dbeaf8"),
        edge: shade(mesh.F[f].c, k * 0.62, "#4a6a86"),
        depth: depth,
        light: light,
      });
    }
    faces.sort(function (p, q) {
      return q.depth - p.depth;
    }); /* far first */

    ctx.globalAlpha = alpha;
    for (var d = 0; d < faces.length; d++) {
      var fc = faces[d];

      var poly = [camV[fc.idx[0]], camV[fc.idx[1]], camV[fc.idx[2]]];

      ctx.beginPath();
      for (var q = 0; q < poly.length; q++) {
        var pp = planeProject([poly[q].x, poly[q].y, poly[q].z], cam);
        if (q === 0) ctx.moveTo(pp.x, pp.y);
        else ctx.lineTo(pp.x, pp.y);
      }
      ctx.closePath();
      ctx.fillStyle = fc.col;
      ctx.fill();
      ctx.strokeStyle = fc.edge;
      ctx.lineWidth = 0.4;
      ctx.stroke();
      if (fc.light > 0.62) {
        ctx.strokeStyle = "rgba(255,255,255,0.45)";
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
        ctx.strokeStyle =
          "rgba(255,255,255," + (0.11 * sf * m).toFixed(3) + ")";
        ctx.lineWidth = 1.5 + 6.5 * sf;
        ctx.lineCap = "round";
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
        ctx.strokeStyle =
          "rgba(255,255,255," + (0.34 * cf * cf * m).toFixed(3) + ")";
        ctx.lineWidth = 0.4 + 2.2 * cf;
        ctx.lineCap = "round";
        ctx.stroke();
      }
      return;
    }

    for (var i = 1; i < trail.length; i++) {
      var a = trail[i - 1],
        b = trail[i];
      var pa = planeProject(a, cam);
      var pb = planeProject(b, cam);
      var f = i / trail.length;
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.strokeStyle = "rgba(87,166,226," + (0.3 * f).toFixed(3) + ")";
      ctx.lineWidth = 0.5 + 1.7 * f;
      ctx.lineCap = "round";
      ctx.stroke();
    }
    for (var j = 0; j < trail.length; j++) {
      var g = (j + 1) / trail.length;
      var p = planeProject(trail[j], cam);
      var fade = depthFade ? depthFade(trail[j][2]) : 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 0.4 + 1.7 * g, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255," + (0.45 * g * fade).toFixed(3) + ")";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x, p.y, 0.3 + 1.1 * g, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(47,134,199," + (0.5 * g * fade).toFixed(3) + ")";
      ctx.fill();
    }
  }

  /* ============================================================
     A SCENE = one canvas with its own plane, path and timing
     ============================================================ */
  function createPlaneScene(canvas, cfg) {
    if (!canvas) return null;
    var ctx = canvas.getContext("2d");
    if (!ctx) return null;
    return {
      canvas: canvas,
      ctx: ctx,
      cfg: cfg,
      w: 0,
      h: 0,
      time: 0,
      phase: cfg.phase || 0,
      last: 0,
      raf: 0,
      trail: [],
      mesh: buildPlaneMesh(),
      rx: 0,
      ry: 0,
      cy: 0,
      scale: 20,
      focal: 320,
      depth: 0,
      zc: 0,
      pic: { l: 0, t: 0, r: 0, b: 0 },
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

    if (cfg.mode === "flight") {
      /* the profile airplane: a horizontal run across the picture */
      var mobile = w < 700;
      var halfPlane = st.scale * 0.62; /* wings + tail */
      var trailLen = mobile
        ? Math.min(150, w * 0.42)
        : 288; /* ~3in on desktop */
      st.cy = h * 0.5;
      st.scale = Math.max(24, w * 0.088);
      halfPlane = st.scale * 0.62;
      st.focal = Math.max(300, w * 0.9);
      st.fly = {
        startX: -(halfPlane + 10),
        endX: w + 150 + halfPlane + 10,
        exit: 150 /* the trail fades out over this */,
        cx: w * 0.5 /* the camera looks at the middle */,
        baseY: h * (mobile ? 0.35 : 0.38),
        arc: h * (mobile ? 0.055 : 0.028) /* how much it climbs   */,
        depth: h * (mobile ? 0.09 : 0.05) /* depth wave           */,
        waves: mobile ? 1.5 : 1,
        phase: 0,
        trailLen: trailLen,
        bankBase: mobile ? 0.32 : 0.22,
        bankAmp: mobile ? 0.3 : 0.1 /* banking while turning */,
        mobile: mobile,
      };
      st.trailSoft = true;
    } else if (cfg.mode === "hero") {
      /* the hero airplane: a smooth circuit around the outer edges
         of the sky, always behind the scrapbook collage */
      var hm = Math.max(44, Math.min(110, w * 0.06));
      var hTop = Math.max(38, Math.min(90, h * 0.08));
      var hBot = Math.max(38, Math.min(84, h * 0.075));
      st.cy = h * 0.5;
      st.scale = Math.max(22, Math.min(48, Math.min(w, h) * 0.058));
      st.focal = Math.max(420, w * 1.05);
      st.fly = {
        w: w,
        h: h,
        mx: hm,
        myTop: hTop,
        myBot: hBot,
        r: Math.max(38, Math.min(96, Math.min(w, h) * 0.12)),
        cx: w * 0.5,
        cy: h * 0.5,
        zAmp: Math.min(34, h * 0.05),
        trailLen: w < 760 ? Math.min(150, w * 0.42) : 288,
        exit: 0,
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
      c.depth * Math.sin(a + 0.9),
    ];
  }

  /* ---------- the hero flight path ----------
     A rounded-rectangle circuit around the outer edges of the sky,
     so the airplane never flies over the heading, the introduction,
     the profile face or the video controls. */
  function pathHero(t, st) {
    var c = st.fly;
    var x0 = c.mx,
      y0 = c.myTop;
    var x1 = c.w - c.mx,
      y1 = c.h - c.myBot;
    var r = Math.max(8, Math.min(c.r, (x1 - x0) / 2, (y1 - y0) / 2));
    var lw = x1 - x0 - 2 * r;
    var lh = y1 - y0 - 2 * r;
    var arc = (Math.PI * r) / 2;
    var total = 2 * lw + 2 * lh + 4 * arc;
    var d = (((t % 1) + 1) % 1) * total;
    var x, y, a;

    if (d < lw) {
      /* top edge, left to right */
      x = x0 + r + d;
      y = y0;
    } else if ((d -= lw) < arc) {
      /* top-right corner */
      a = ((d / arc) * Math.PI) / 2;
      x = x1 - r + Math.sin(a) * r;
      y = y0 + r - Math.cos(a) * r;
    } else if ((d -= arc) < lh) {
      /* right edge, down */
      x = x1;
      y = y0 + r + d;
    } else if ((d -= lh) < arc) {
      /* bottom-right corner */
      a = ((d / arc) * Math.PI) / 2;
      x = x1 - r + Math.cos(a) * r;
      y = y1 - r + Math.sin(a) * r;
    } else if ((d -= arc) < lw) {
      /* bottom edge, right to left */
      x = x1 - r - d;
      y = y1;
    } else if ((d -= lw) < arc) {
      /* bottom-left corner */
      a = ((d / arc) * Math.PI) / 2;
      x = x0 + r - Math.sin(a) * r;
      y = y1 - r + Math.cos(a) * r;
    } else if ((d -= arc) < lh) {
      /* left edge, up */
      x = x0;
      y = y1 - r - d;
    } else {
      /* top-left corner */
      d -= lh;
      a = (Math.max(0, Math.min(1, d / arc)) * Math.PI) / 2;
      x = x0 + r - Math.cos(a) * r;
      y = y0 + r - Math.sin(a) * r;
    }

    return [x - c.cx, c.cy - y, c.zAmp * Math.sin(t * Math.PI * 4)];
  }

  function sceneFrame(st, dt) {
    var ctx = st.ctx;
    var w = st.w,
      h = st.h;
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
      unit: 1,
    };

    var flight = st.cfg.mode === "flight";
    var hero = st.cfg.mode === "hero";
    var pos, ahead, bank;

    if (flight) {
      pos = pathFlight(st.phase, st);
      ahead = pathFlight(st.phase + 0.004, st);
      /* the airplane leans into its turn */
      bank =
        st.fly.bankBase +
        st.fly.bankAmp * Math.sin(st.phase * Math.PI * 2 * st.fly.waves + 0.6);
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
      var tilt = (st.cfg.tilt || 0.5) + Math.sin(st.time * 0.45) * 0.1;
      pos = pathRing(st.phase, tilt, st.rx, st.ry, st.depth, st.zc);
      ahead = pathRing(st.phase + 0.004, tilt, st.rx, st.ry, st.depth, st.zc);
      bank = PLANE_BANK;
    }

    var f = vNorm(vSub(ahead, pos));
    var right = vNorm(vCross([0, 1, 0], f));
    var up = vCross(f, right);

    /* bank into the turn */
    var cb = Math.cos(bank),
      sb = Math.sin(bank);
    var br = vAdd(vScale(right, cb), vScale(up, sb));
    var bu = vSub(vScale(up, cb), vScale(right, sb));

    /* tip the plane a little towards the viewer, so its wings are
       visible instead of a thin line */
    var cv = Math.cos(PLANE_VIEW),
      sv = Math.sin(PLANE_VIEW);
    var basis = {
      r: vAdd(vScale(br, cv), vScale(bu, sv)),
      u: vSub(vScale(bu, cv), vScale(br, sv)),
      f: f,
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
      var out = pos[0] + st.fly.cx - w;
      if (out > 0) trailMul = Math.max(0, 1 - out / st.fly.exit);
    }

    drawTrail(ctx, cam, st.trail, depthFade, st.trailSoft, trailMul);
    drawPlaneMesh(ctx, cam, st.mesh, pos, basis, depthFade(pos[2]), st.scale);
  }

  /* walks back along the flight path until the wanted trail length
     is reached, oldest point first */
  function buildFlightTrail(st, cam) {
    var pathFn = st.cfg.mode === "hero" ? pathHero : pathFlight;
    var target = st.fly.trailLen;
    var pts = [];
    var ph = st.phase;
    var prev = null;
    var dist = 0;
    var step = st.cfg.mode === "hero" ? 0.004 : 0.006;
    while (pts.length < 140 && dist < target) {
      var p = pathFn(ph, st);
      var sc = planeProject(p, cam);
      if (prev) {
        dist += Math.sqrt(
          (sc.x - prev.x) * (sc.x - prev.x) + (sc.y - prev.y) * (sc.y - prev.y),
        );
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
    st.raf = window.requestAnimationFrame(function (t) {
      sceneLoop(st, t);
    });
  }

  /* starts the animation (again) for a scene that was never started */
  function sceneResume(st) {
    if (!st || st.raf) return;
    st.last = 0;
    st.raf = window.requestAnimationFrame(function (t) {
      sceneLoop(st, t);
    });
  }

  function sceneStart(st) {
    if (!st) return;
    sceneSync(st);
    window.addEventListener("resize", function () {
      sceneSync(st);
    });
    if (window.ResizeObserver) {
      var ro = new ResizeObserver(function () {
        sceneSync(st);
      });
      ro.observe(st.canvas);
    }
    if (reducedMotion) {
      /* one still frame of the very same scene */
      st.phase = st.cfg.phase || 0.18;
      if (st.cfg.mode === "flight" || st.cfg.mode === "hero") {
        st.trail = [];
      } else {
        for (var i = 0; i < st.cfg.trailMax; i++) {
          st.trail.push(
            pathRing(
              st.phase - 0.006 * i,
              st.cfg.tilt || 0.5,
              st.rx,
              st.ry,
              st.depth,
              st.zc,
            ),
          );
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
    heroScene = createPlaneScene(document.getElementById("heroPlane"), {
      mode: "hero",
      speed: 1 / 30 /* one full circuit in 30 seconds */,
      phase: 0.06,
      trailMax: 60,
    });
    sceneStart(heroScene);
  }

  /* ============================================================
     SHARED VINTAGE TRAVEL COMPASS
     ------------------------------------------------------------
     One drawing, reused everywhere: the homepage already prints it
     inside its hero sky, and Subjects, every subject gallery and My
     Gallery get the very same decoration dropped at their bottom
     edge. It is always decorative — pointer-events: none in the CSS,
     never over a control, never wider than its own column.
     ============================================================ */
  var COMPASS_SVG =
    '<svg viewBox="0 0 100 100" fill="none" focusable="false" aria-hidden="true">' +
    '<circle cx="50" cy="50" r="47" fill="#F4E7D6" stroke="#8A5A3B" stroke-width="4.5"></circle>' +
    '<circle cx="50" cy="50" r="40.5" fill="#FFFDF7" stroke="#C89B69" stroke-width="1.6"></circle>' +
    '<circle cx="50" cy="50" r="34" stroke="#24507E" stroke-width="1" stroke-dasharray="2 5" opacity="0.5"></circle>' +
    '<g stroke="#8A5A3B" stroke-width="2.2" stroke-linecap="round" opacity="0.85">' +
    '<path d="M50 4.5v4.5"></path><path d="M50 91v4.5"></path>' +
    '<path d="M4.5 50h4.5"></path><path d="M91 50h4.5"></path>' +
    "</g>" +
    '<g stroke="#A9713F" stroke-width="1.5" stroke-linecap="round" opacity="0.75">' +
    '<path d="M78.6 21.4l3-3"></path><path d="M21.4 78.6l-3 3"></path>' +
    '<path d="M78.6 78.6l3 3"></path><path d="M21.4 21.4l-3-3"></path>' +
    "</g>" +
    '<path d="M50 26 L55.5 50 L50 50 Z" fill="#17375E"></path>' +
    '<path d="M50 26 L44.5 50 L50 50 Z" fill="#2F86C7"></path>' +
    '<path d="M50 74 L55.5 50 L50 50 Z" fill="#E07B2A"></path>' +
    '<path d="M50 74 L44.5 50 L50 50 Z" fill="#C9752F"></path>' +
    '<circle cx="50" cy="50" r="4.2" fill="#FFFDF7" stroke="#8A5A3B" stroke-width="2"></circle>' +
    '<text x="50" y="22" text-anchor="middle" font-size="9" font-weight="700" ' +
    'font-family="Georgia, serif" fill="#17375E">N</text>' +
    "</svg>";

  function mountCompasses() {
    var heroCompass = document.querySelector(".hero-sky .compass");
    if (heroCompass) heroCompass.innerHTML = COMPASS_SVG;
    var hosts = [el.subjectsView, el.galleryView, el.myGalleryView];
    for (var i = 0; i < hosts.length; i++) {
      var host = hosts[i];
      if (!host || host.querySelector(".page-compass")) continue;
      host.insertAdjacentHTML(
        "beforeend",
        '<span class="page-compass" aria-hidden="true">' +
          COMPASS_SVG +
          "</span>",
      );
    }
  }

  /* the destination gallery (js/asia-map.js) prints the very same
     compass, so the artwork exists in exactly one place */
  window.PORTFOLIO_COMPASS_SVG = COMPASS_SVG;

  /* ---------- init ---------- */
  function initApp() {
    renderSubjects();
    renderMyGalleryFilters();
    renderMyGallery();
    mountCompasses();
    showView("home");
    startHeroScene();
    /* the background music starts automatically with the home view
       (see showView above) */
  }

  try {
    initApp();
  } catch (err) {
    console.error("Init error:", err);
    var home = document.getElementById("homeView");
    if (home) home.classList.add("is-active");
    /* fallback: try rendering subjects again after a short delay */
    window.setTimeout(function () {
      try {
        renderSubjects();
      } catch (e) {
        console.error("Subject render fallback failed:", e);
      }
    }, 100);
  }
})();

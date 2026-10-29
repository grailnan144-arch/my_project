'use strict';

/* ============================================================
   Finalization tests — one check per family of requirements
   1. "See My Adventures!" is decorative only, map instruction shown
   2. the map really can be dragged, and a drag never clicks a country
   3. My Gallery shows exactly the seven categories, in order
   4. the eight subject cards, in order, each with its own page
   5. one large presentation card per subject, clickable end to end
   6. the airplane physically pushes photographs both ways
   7. compass decoration on every major page, never over a control
   8. no horizontal overflow and no console errors, desktop + mobile
   ============================================================ */

const { test, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');

const { createServer, listen } = require('./serve');
const { launch } = require('./browser');

let server;
let baseUrl;
let browser;
let page;
const pageErrors = [];

const CATEGORIES = [
  'All Memories',
  'School',
  'Aviation and Airplanes',
  'Toyota',
  'Guitar and Musics',
  'Food Adventure',
  'Animation and Movies'
];

const SUBJECTS = [
  'English',
  'Mathematics',
  'Science',
  'Filipino',
  'Araling Panlipunan',
  'Values Education',
  'TLE',
  'MAPEH'
];

before(async () => {
  server = createServer();
  baseUrl = 'http://127.0.0.1:' + (await listen(server)) + '/';
  browser = await launch();
  const context = await browser.newContext({ viewport: { width: 1366, height: 850 } });
  page = await context.newPage();
  page.on('pageerror', function (err) { pageErrors.push(String(err)); });
});

after(async () => {
  if (browser) await browser.close();
  if (server) await new Promise((r) => server.close(r));
});

beforeEach(async () => {
  pageErrors.length = 0;
  await page.goto(baseUrl, { waitUntil: 'load' });
});

function horizontalOverflow() {
  return page.evaluate(function () {
    var doc = document.documentElement;
    return Math.max(0, doc.scrollWidth - doc.clientWidth);
  });
}

function activeViewId() {
  return page.evaluate(function () {
    var v = document.querySelector('.view.is-active');
    return v ? v.id : null;
  });
}

/* tiny island countries are clicked through their tap pad, the way a
   finger would reach them */
async function clickCountry(target, code) {
  const pad = 'circle.land-hit[data-code="' + code + '"]';
  if (await target.locator(pad).count()) await target.click(pad);
  else await target.click('path.land[data-code="' + code + '"]');
}

/* ---------- 1. homepage: scrapbook map heading and instruction ---------- */

test('the journey banner and map instruction stay decorative and visible', async () => {
  const banner = await page.evaluate(function () {
    var el = document.querySelector('.adventures-banner');
    if (!el) return null;
    var s = getComputedStyle(el);
    return {
      tag: el.tagName,
      dataNav: el.getAttribute('data-nav'),
      pointerEvents: s.pointerEvents,
      cursor: s.cursor,
      text: el.textContent.replace(/\s+/g, ' ').trim()
    };
  });

  assert.ok(banner, 'the banner must exist on the homepage');
  assert.equal(banner.tag, 'DIV', 'it must not be a <button> any more');
  assert.equal(banner.dataNav, null, 'it must carry no navigation');
  assert.equal(banner.pointerEvents, 'none', 'it must never catch a click');
  assert.match(banner.text, /See my Journey/i);

  /* clicking exactly where it sits must not navigate anywhere */
  const box = await page.locator('.adventures-banner').boundingBox();
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(250);
  assert.equal(await activeViewId(), 'homeView', 'clicking the title must not change the view');

  assert.deepEqual(pageErrors, [], 'no page errors while clicking the banner');
});

test('the map instruction is visible in the heading and never covers a country label', async () => {
  const info = await page.evaluate(function () {
    var hint = document.querySelector('.map-hint');
    var holder = document.getElementById('asiaMap');
    if (!hint || !holder) return null;
    var banner = document.querySelector('.adventures-banner');
    var h = hint.getBoundingClientRect();
    var labels = Array.prototype.map.call(
      document.querySelectorAll('.land-label'),
      function (l) { return l.getBoundingClientRect(); }
    );
    return {
      text: hint.textContent.replace(/\s+/g, ' ').trim(),
      visible: h.width > 0 && h.height > 0,
      /* layout offsets are measured before the frame's decorative
         rotation, so "under the map" is exact */
      belowMap: hint.closest('.adventures-banner') === banner && hint.offsetTop < holder.offsetTop,
      overlapsLabel: labels.some(function (l) {
        return !(l.right < h.left || l.left > h.right || l.bottom < h.top || l.top > h.bottom);
      })
    };
  });

  assert.ok(info, 'the instruction must exist');
  assert.match(info.text, /Explore the map: drag to move and click a country/i);
  assert.equal(info.visible, true);
  assert.equal(info.belowMap, true,
    'the instruction sits under the map, not over the countries');
  assert.equal(info.overlapsLabel, false, 'no country label may be covered');
});

/* ---------- 2. dragging the map ---------- */

test('the map can be dragged and a drag never opens a country', async () => {
  const before = await page.evaluate(function () {
    return document.querySelector('#asiaMap svg').getAttribute('viewBox');
  });

  const box = await page.locator('#asiaMap svg').boundingBox();
  const startX = box.x + box.width * 0.55;
  const startY = box.y + box.height * 0.5;

  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX - 40, startY, { steps: 4 });
  await page.mouse.move(startX - 140, startY - 30, { steps: 8 });
  await page.mouse.up();
  await page.waitForTimeout(200);

  const after = await page.evaluate(function () {
    return {
      viewBox: document.querySelector('#asiaMap svg').getAttribute('viewBox'),
      galleryOpen: !document.getElementById('mapGalleryOverlay').classList.contains('hidden'),
      resetShown: !document.getElementById('mapReset').hidden
    };
  });

  assert.notEqual(after.viewBox, before, 'dragging must move the map');
  /* dragging only pans: the zoom level (viewBox size) never changes */
  const beforeSize = before.split(/[\s,]+/).map(Number);
  const afterSize = after.viewBox.split(/[\s,]+/).map(Number);
  assert.ok(Math.abs(afterSize[2] - beforeSize[2]) < 0.01, 'dragging must not zoom in or out');
  assert.ok(Math.abs(afterSize[3] - beforeSize[3]) < 0.01, 'dragging must not zoom in or out');
  assert.equal(after.galleryOpen, false, 'a drag must never open a country gallery');
  assert.equal(after.resetShown, true, 'the reset pill appears once the map has moved');

  /* after a real drag, clicking a country still works */
  await page.click('path.land[data-code="CN"]');
  await page.waitForSelector('#mapGalleryOverlay:not(.hidden)', { timeout: 10000 });
  assert.equal(await page.textContent('#mapGalleryTitle'), 'China');

  await page.click('#mapGalleryClose');
  await page.waitForSelector('#mapGalleryOverlay', { state: 'hidden' });

  /* the reset pill fits the map back into its frame */
  await page.click('#mapReset');
  await page.waitForTimeout(150);
  const reset = await page.evaluate(function () {
    return {
      viewBox: document.querySelector('#asiaMap svg').getAttribute('viewBox'),
      hidden: document.getElementById('mapReset').hidden
    };
  });
  const nums = reset.viewBox.split(/[\s,]+/).map(Number);
  const orig = before.split(/[\s,]+/).map(Number);
  assert.equal(nums.length, 4, 'the viewBox must stay well formed');
  nums.forEach(function (n, i) {
    assert.ok(Math.abs(n - orig[i]) < 0.01,
      'reset must restore the fitted view (' + n + ' vs ' + orig[i] + ')');
  });
  assert.equal(reset.hidden, true, 'the pill hides itself again');

  /* magnification belongs to the + / − controls alone */
  await page.click('#mapZoomIn');
  await page.waitForTimeout(120);
  const zoomIn = await page.evaluate(function () {
    return document.querySelector('#asiaMap svg').getAttribute('viewBox');
  });
  const zi = zoomIn.split(/[\s,]+/).map(Number);
  assert.ok(zi[2] < orig[2] - 0.01, 'the + control must zoom in');

  await page.click('#mapZoomOut');
  await page.waitForTimeout(120);
  const zoomOut = await page.evaluate(function () {
    return document.querySelector('#asiaMap svg').getAttribute('viewBox');
  });
  const zo = zoomOut.split(/[\s,]+/).map(Number);
  assert.ok(Math.abs(zo[2] - orig[2]) < 0.01, 'the − control must zoom back out');

  assert.deepEqual(pageErrors, [], 'no page errors while dragging the map');
});

/* ---------- 2b. homepage collage: cards straddle the map border ---------- */

test('the photos and video are taped over the map frame border', async () => {
  const m = await page.evaluate(function () {
    function box(sel) {
      var el = document.querySelector(sel);
      if (!el) return null;
      var r = el.getBoundingClientRect();
      return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height };
    }
    function overlaps(a, b) {
      return !(a.right <= b.left + 1 || a.left >= b.right - 1 ||
               a.bottom <= b.top + 1 || a.top >= b.bottom - 1);
    }
    /* true when a card pokes out past the frame on at least one side */
    function straddles(card, frame) {
      return card.left < frame.left + 1 || card.right > frame.right - 1 ||
             card.top < frame.top + 1 || card.bottom > frame.bottom - 1;
    }
    var map = box('.map-holder');
    var frame = box('.display-frame');
    var video = box('.video-card');
    var photo1 = box('.mini-1');
    var photo2 = box('.mini-2');
    var p1el = document.querySelector('.mini-1');
    var p2el = document.querySelector('.mini-2');
    var vel = document.querySelector('.video-card');
    return {
      map: map, frame: frame, video: video, photo1: photo1, photo2: photo2,
      videoOnFrame: video && frame ? overlaps(video, frame) : false,
      photo1OnFrame: photo1 && frame ? overlaps(photo1, frame) : false,
      photo2OnFrame: photo2 && frame ? overlaps(photo2, frame) : false,
      videoStraddles: video && frame ? straddles(video, frame) : false,
      photo1Straddles: photo1 && frame ? straddles(photo1, frame) : false,
      photo2Straddles: photo2 && frame ? straddles(photo2, frame) : false,
      videoInFrame: vel && frame ? vel.closest('.display-frame') !== null : false,
      photo1InFrame: p1el && frame ? p1el.closest('.display-frame') !== null : false,
      photo2InFrame: p2el && frame ? p2el.closest('.display-frame') !== null : false,
      photo1Pointer: p1el ? getComputedStyle(p1el).pointerEvents : 'auto',
      photo2Pointer: p2el ? getComputedStyle(p2el).pointerEvents : 'auto',
      position1: p1el ? getComputedStyle(p1el).position : '',
      position2: p2el ? getComputedStyle(p2el).position : '',
      positionV: vel ? getComputedStyle(vel).position : '',
      videoLeftOfMap: video && map ? video.right < map.left + map.width * 0.55 : false,
      controls: (function () {
        var c = document.querySelector('.map-controls');
        var plus = document.getElementById('mapZoomIn');
        var minus = document.getElementById('mapZoomOut');
        if (!c || !plus || !minus) return null;
        var cb = c.getBoundingClientRect();
        var pb = plus.getBoundingClientRect();
        var mb = minus.getBoundingClientRect();
        return {
          insideMap: cb.right <= map.right + 1 && cb.bottom <= map.bottom + 1 &&
                     cb.left >= map.left - 1 && cb.top >= map.top - 1,
          plusAboveMinus: pb.bottom <= mb.top + 1,
          bottomRight: cb.right > map.left + map.width * 0.7 && cb.bottom > map.top + map.height * 0.7
        };
      })()
    };
  });

  assert.ok(m.map && m.video && m.photo1 && m.photo2, 'all four collage pieces must exist');
  assert.equal(m.videoInFrame, true, 'the video lives inside the map frame element');
  assert.equal(m.photo1InFrame, true, 'the Airline Day photo lives inside the map frame');
  assert.equal(m.photo2InFrame, true, 'the achievement photo lives inside the map frame');
  assert.equal(m.videoOnFrame, true, 'the video overlaps the map frame');
  assert.equal(m.photo1OnFrame, true, 'the Airline Day photo overlaps the map frame');
  assert.equal(m.photo2OnFrame, true, 'the achievement photo overlaps the map frame');
  assert.equal(m.videoStraddles, true, 'the video pokes out past the frame border');
  assert.equal(m.photo1Straddles, true, 'the Airline Day photo pokes out past the frame border');
  assert.equal(m.photo2Straddles, true, 'the achievement photo pokes out past the frame border');
  assert.equal(m.position1, 'absolute', 'the Airline Day photo is positioned against the map frame');
  assert.equal(m.position2, 'absolute', 'the achievement photo is positioned against the map frame');
  assert.equal(m.positionV, 'absolute', 'the video is positioned against the map frame');
  assert.equal(m.photo1Pointer, 'none', 'the Airline Day photo never swallows a map click');
  assert.equal(m.photo2Pointer, 'none', 'the achievement photo never swallows a map click');
  assert.equal(m.videoLeftOfMap, true, 'the video hangs off the left side, clear of the zoom controls');

  /* the Airline Day snapshot replaced Adventure Awaits at the top-right */
  const airline = await page.evaluate(function () {
    var el = document.querySelector('.mini-1');
    var img = el ? el.querySelector('img') : null;
    var cap = el ? el.querySelector('figcaption') : null;
    return {
      src: img ? img.getAttribute('src') : '',
      caption: cap ? cap.textContent.trim() : '',
      zIndex: el ? parseInt(getComputedStyle(el).zIndex, 10) : 0
    };
  });
  assert.equal(airline.src, 'images/profile.jpg',
    'the top-right photo is the existing profile.jpg asset');
  assert.equal(airline.caption, 'Airline Day', 'the polaroid is captioned Airline Day');
  assert.ok(airline.zIndex >= 8,
    'the Airline Day photo stacks above the See My Journey banner (z-index ' + airline.zIndex + ')');

  /* zoom controls: stacked + over −, anchored bottom-right inside the map */
  assert.ok(m.controls, 'map controls must exist');
  assert.equal(m.controls.insideMap, true, 'the zoom controls stay inside the map');
  assert.equal(m.controls.plusAboveMinus, true, '+ stacks above −');
  assert.equal(m.controls.bottomRight, true, 'the controls sit in the bottom-right corner');

  /* the map is comfortably sized; the video grew slightly but stays a card */
  assert.ok(m.map.width >= 600 && m.map.width <= 950,
    'the map is a comfortable size, not dominating (got ' + Math.round(m.map.width) + 'px)');
  assert.ok(m.video.width >= 340 && m.video.width <= 470,
    'the video is the slightly bigger taped card (got ' + Math.round(m.video.width) + 'px)');
  assert.ok(m.video.width < m.map.width * 0.6, 'the video is clearly smaller than the map');
  assert.ok(m.photo1.width >= 170, 'the Airline Day photo is visible (got ' + Math.round(m.photo1.width) + 'px)');
  assert.ok(m.photo2.width >= 170, 'the achievement photo is visible (got ' + Math.round(m.photo2.width) + 'px)');

  /* nothing pokes past the viewport */
  const overflow = await horizontalOverflow();
  assert.ok(overflow <= 1, 'no horizontal overflow (got ' + overflow + 'px)');

  /* zoom buttons still work */
  const vb0 = await page.evaluate(function () {
    return document.querySelector('#asiaMap svg').getAttribute('viewBox');
  });
  await page.click('#mapZoomIn');
  await page.waitForTimeout(150);
  const vb1 = await page.evaluate(function () {
    return document.querySelector('#asiaMap svg').getAttribute('viewBox');
  });
  assert.notEqual(vb1, vb0, 'zoom in still works');
  await page.click('#mapZoomOut');
  await page.waitForTimeout(150);

  /* the map remains draggable from under a photo (use the overlap
     area — the card's center may hang off the frame) */
  const drag = await page.evaluate(function () {
    var before = document.querySelector('#asiaMap svg').getAttribute('viewBox');
    var p1 = document.querySelector('.mini-1').getBoundingClientRect();
    var map = document.querySelector('.map-holder').getBoundingClientRect();
    var x = Math.min(p1.right, map.right) - Math.abs(Math.min(p1.right, map.right) - Math.max(p1.left, map.left)) / 2;
    var y = Math.min(p1.bottom, map.bottom) - Math.abs(Math.min(p1.bottom, map.bottom) - Math.max(p1.top, map.top)) / 2;
    return { before: before, x: x, y: y };
  });
  await page.mouse.move(drag.x, drag.y);
  await page.mouse.down();
  await page.mouse.move(drag.x - 60, drag.y, { steps: 5 });
  await page.mouse.up();
  await page.waitForTimeout(200);
  const moved = await page.evaluate(function () {
    return document.querySelector('#asiaMap svg').getAttribute('viewBox');
  });
  assert.notEqual(moved, drag.before, 'dragging over a photo still pans the map');

  assert.deepEqual(pageErrors, [], 'no page errors while checking the homepage collage');
});

/* ---------- 3. My Gallery categories ---------- */

test('My Gallery shows exactly the seven categories in the required order', async () => {
  await page.click('.nav-link[data-nav="mygallery"]');
  await page.waitForSelector('#myGalleryView.is-active');

  const chips = page.locator('#myGalleryFilters .chip');
  assert.equal(await chips.count(), CATEGORIES.length, 'exactly seven categories, nothing else');

  const labels = [];
  for (let i = 0; i < CATEGORIES.length; i++) labels.push((await chips.nth(i).textContent()).trim());
  assert.deepEqual(labels, CATEGORIES, 'category labels and order must match exactly');

  /* the opening view still pins every existing photograph */
  assert.equal(await page.locator('.my-gallery-card').count(), 6,
    'every gallery photo must be visible when the page opens');
  assert.equal((await page.textContent('#myGalleryTitle')).trim(), 'All Memories');

  /* All Memories groups the photos School → Aviation → Toyota → Guitar */
  const grouped = await page.evaluate(function () {
    var imgs = Array.prototype.map.call(
      document.querySelectorAll('.my-gallery-card img'),
      function (i) { return (i.getAttribute('src') || '').split('/').pop(); }
    );
    return imgs;
  });
  assert.deepEqual(grouped, [
    'gallery (2).jpg', 'gallery (4).jpg',
    'gallery (1).jpg',
    'gallery (5).jpg', 'gallery (6).jpg',
    'gallery (3).jpg'
  ], 'All Memories must group photos by category, never mixed');

  /* picking a category filters the grid, pressing it again brings all back */
  await chips.nth(1).click();
  await page.waitForTimeout(150);
  const school = await page.evaluate(function () {
    return {
      title: document.getElementById('myGalleryTitle').textContent,
      cards: document.querySelectorAll('.my-gallery-card').length,
      active: document.querySelectorAll('#myGalleryFilters .chip.is-active').length
    };
  });
  assert.equal(school.active, 1, 'one chip is selected at a time');
  assert.equal(school.cards, 2, 'the School category shows its two photographs');
  assert.equal(school.title, 'School');

  await chips.nth(1).click();
  await page.waitForTimeout(150);
  assert.equal(await page.locator('.my-gallery-card').count(), 6,
    'pressing the selected category again brings every memory back');

  /* the Toyota category holds its two real photographs */
  await chips.nth(3).click();
  await page.waitForTimeout(150);
  const toyota = await page.evaluate(function () {
    return {
      title: document.getElementById('myGalleryTitle').textContent,
      cards: document.querySelectorAll('.my-gallery-card').length
    };
  });
  assert.equal(toyota.title, 'Toyota');
  assert.equal(toyota.cards, 2, 'the Toyota category shows its two photographs');

  /* the categories that hold no photograph yet say so honestly */
  await chips.nth(6).click();
  await page.waitForTimeout(150);
  const empty = await page.locator('.note-card').count();
  assert.equal(empty, 1, 'an empty category shows the coming-soon note');

  assert.deepEqual(pageErrors, [], 'no page errors while filtering the gallery');
});

/* ---------- 4. subjects page ---------- */

test('the Subjects page lists the eight subjects in order', async () => {
  await page.click('.nav-link[data-nav="subjects"]');
  await page.waitForSelector('#subjectsView.is-active');

  const cards = page.locator('.subject-card');
  assert.equal(await cards.count(), 8, 'eight subject cards');

  const titles = [];
  for (let i = 0; i < 8; i++) titles.push((await cards.nth(i).locator('h3').textContent()).trim());
  assert.deepEqual(titles, SUBJECTS, 'subject order must match');

  /* every card has an icon, a description and its own destination */
  for (let i = 0; i < 8; i++) {
    const card = cards.nth(i);
    assert.ok(await card.locator('.sc-icon svg').count(), 'subject icon missing on ' + titles[i]);
    const desc = (await card.locator('.sc-body p').textContent()).trim();
    assert.ok(desc.length > 10, 'description missing on ' + titles[i]);
  }

  assert.deepEqual(pageErrors, [], 'no page errors on the subjects page');
});

/* ---------- 5. one large presentation card per subject ---------- */

test('every subject opens one large clickable presentation card', async () => {
  await page.click('.nav-link[data-nav="subjects"]');
  await page.waitForSelector('#subjectsView.is-active');

  for (const id of ['english', 'mathematics', 'science', 'filipino',
                    'araling-panlipunan', 'values-education', 'tle', 'mapeh']) {
    await page.click('.subject-card[data-subject="' + id + '"]');
    await page.waitForSelector('#galleryView.is-active');

    /* banner, description and ONE large presentation card — no separate
       activity-overview panel and no duplicated summary card */
    assert.ok((await page.textContent('#galleryTitle')).length > 1, id + ' banner title');
    assert.ok((await page.textContent('#galleryDesc')).length > 1, id + ' description');
    assert.equal(await page.locator('.g-card').count(), 0, id + ' must not repeat an activity card');
    assert.equal(await page.locator('.preso-left, #galleryGrid').count(), 0, id + ' must not show an Activity Overview panel');
    assert.equal(await page.locator('#preso').count(), 1, id + ' must show one presentation');
    assert.equal(await page.locator('#presoViewBtn').count(), 1, id + ' must offer one View Presentation button');

    /* no slide navigation and no fullscreen before the presentation opens */
    assert.equal(await page.locator('#preso .preso-bar').isVisible(), false, id + ' hides slide controls until opened');
    assert.equal(await page.locator('#preso .preso-thumbs').isVisible(), false, id + ' hides thumbnails until opened');

    /* the presentation announces itself and carries a real activity type */
    const hint = (await page.textContent('.ps-hint')).replace(/\s+/g, ' ').trim();
    assert.match(hint, /Click to view presentation/i, id + ' preview hint');
    assert.ok((await page.textContent('#presoType')).trim().length > 0, id + ' activity type');
    assert.ok(await page.getAttribute('#presoImg', 'src'), id + ' preview image');

    /* the whole card opens the presentation, the Back button does not */
    await page.click('#presoTitle');
    await page.waitForSelector('#lightboxOverlay:not(.hidden)', { timeout: 10000 });
    assert.ok((await page.textContent('#lightboxCounter')).length > 0, id + ' slide counter');
    await page.keyboard.press('Escape');
    await page.waitForSelector('#lightboxOverlay', { state: 'hidden' });

    await page.click('#backBtn');
    await page.waitForSelector('#subjectsView.is-active');
  }

  assert.deepEqual(pageErrors, [], 'no page errors while opening all eight subjects');
});

/* ---------- 6. airplane-powered transition ---------- */

test('Next and Previous push the photograph with the airplane', async () => {
  await page.click('.nav-link[data-nav="subjects"]');
  await page.click('.subject-card[data-subject="tle"]');
  await page.waitForSelector('#galleryView.is-active');
  await page.click('#presoViewBtn');
  await page.waitForSelector('#lightboxOverlay:not(.hidden)');

  await page.waitForFunction(function () {
    var img = document.getElementById('lightboxImage');
    return img.complete && img.naturalWidth > 0 && /my_salad\/2\.png$/.test(img.getAttribute('src') || '');
  }, null, { timeout: 15000 });

  /* ---- NEXT: the plane comes in from the right, the photo leaves left ---- */
  await page.keyboard.press('ArrowRight');
  await page.waitForSelector('#lightboxPush.is-next img', { timeout: 15000 });

  const forward = await page.evaluate(function () {
    var push = document.getElementById('lightboxPush');
    var flight = document.querySelector('.lb-flight');
    var frame = document.getElementById('lightboxFrame');
    var out = push.querySelector('img');
    return {
      pushClass: push.className,
      outSrc: out ? out.getAttribute('src') : '',
      pushAnimation: getComputedStyle(push).animationName,
      planeClass: flight ? flight.className : '',
      planeAnimation: flight ? getComputedStyle(flight).animationName : '',
      frameAnimation: getComputedStyle(frame).animationName,
      box: push.getBoundingClientRect().width
    };
  });

  assert.match(forward.pushClass, /\bis-next\b/, 'the outgoing photo must be pushed left');
  assert.match(forward.outSrc, /my_salad\/2\.png$/, 'the outgoing photo is the one on screen');
  assert.equal(forward.pushAnimation, 'lbPushOutNext');
  assert.match(forward.planeClass, /\bis-next\b/, 'the airplane must fly in for Next');
  assert.equal(forward.planeAnimation, 'lbPlaneNext');
  assert.equal(forward.frameAnimation, 'lbFromNext', 'the new photo slides in from the right');
  assert.ok(forward.box > 100, 'the pushed photograph keeps its size');

  await page.waitForFunction(function () {
    var img = document.getElementById('lightboxImage');
    return img.complete && img.naturalWidth > 0 && /my_salad\/3\.png$/.test(img.getAttribute('src') || '');
  }, null, { timeout: 15000 });
  assert.equal(await page.textContent('#lightboxCounter'), '2 of 9');

  /* ---- PREVIOUS: mirrored, the photo is pushed to the right ---- */
  await page.keyboard.press('ArrowLeft');
  await page.waitForSelector('#lightboxPush.is-prev img', { timeout: 15000 });

  const backward = await page.evaluate(function () {
    var push = document.getElementById('lightboxPush');
    var flight = document.querySelector('.lb-flight');
    var frame = document.getElementById('lightboxFrame');
    return {
      pushClass: push.className,
      pushAnimation: getComputedStyle(push).animationName,
      planeClass: flight ? flight.className : '',
      planeAnimation: getComputedStyle(flight).animationName,
      frameAnimation: getComputedStyle(frame).animationName
    };
  });

  assert.match(backward.pushClass, /\bis-prev\b/);
  assert.equal(backward.pushAnimation, 'lbPushOutPrev');
  assert.match(backward.planeClass, /\bis-prev\b/, 'the airplane must fly the other way');
  assert.equal(backward.planeAnimation, 'lbPlanePrev');
  assert.equal(backward.frameAnimation, 'lbFromPrev', 'the previous photo comes from the left');

  await page.waitForFunction(function () {
    var img = document.getElementById('lightboxImage');
    return img.complete && img.naturalWidth > 0 && /my_salad\/2\.png$/.test(img.getAttribute('src') || '');
  }, null, { timeout: 15000 });
  assert.equal(await page.textContent('#lightboxCounter'), '1 of 9');

  /* ---- rapid clicks must not corrupt the index or the counter ---- */
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(1500);
  const settled = await page.evaluate(function () {
    var img = document.getElementById('lightboxImage');
    return {
      src: img.getAttribute('src') || '',
      counter: document.getElementById('lightboxCounter').textContent,
      push: document.getElementById('lightboxPush').className
    };
  });
  assert.match(settled.src, /my_salad\/5\.png$/, 'three quick steps land on slide 4 (5.png)');
  assert.equal(settled.counter, '4 of 9', 'the counter follows the rapid clicks');

  /* the pushed copy cleans itself up and the viewer still closes */
  await page.waitForTimeout(1200);
  assert.equal(await page.evaluate(function () {
    return document.getElementById('lightboxPush').querySelector('img') === null;
  }), true, 'the outgoing copy is removed after the flight');
  await page.click('#lightboxClose');
  await page.waitForSelector('#lightboxOverlay', { state: 'hidden' });

  assert.deepEqual(pageErrors, [], 'no page errors during the airplane transition');
});

/* ---------- 7. compass on every major page ---------- */

test('a compass decorates every major page without covering anything', async () => {
  const seen = {};

  /* homepage keeps the compass printed in its hero sky */
  seen.home = await page.evaluate(function () {
    var c = document.querySelector('.hero-sky .compass');
    if (!c) return null;
    var s = getComputedStyle(c);
    return { svg: !!c.querySelector('svg'), pointer: s.pointerEvents, w: c.getBoundingClientRect().width };
  });
  assert.ok(seen.home && seen.home.svg, 'the homepage compass must be drawn');

  for (const [view, nav] of [['subjectsView', 'subjects'], ['myGalleryView', 'mygallery']]) {
    await page.click('.nav-link[data-nav="' + nav + '"]');
    await page.waitForSelector('#' + view + '.is-active');
    seen[view] = await page.evaluate(function () {
      var c = document.querySelector('.view.is-active .page-compass');
      if (!c) return null;
      var r = c.getBoundingClientRect();
      var s = getComputedStyle(c);
      return { svg: !!c.querySelector('svg'), pointer: s.pointerEvents, right: r.right, width: r.width, docW: document.documentElement.clientWidth };
    });
    assert.ok(seen[view], 'the compass must exist on ' + view);
    assert.equal(seen[view].svg, true, 'the compass drawing must be there on ' + view);
    assert.equal(seen[view].pointer, 'none', 'the compass must never catch a click');
    assert.ok(seen[view].width > 40 && seen[view].width < 160, 'the compass stays small');
    assert.ok(seen[view].right <= seen[view].docW + 1, 'the compass never leaves the page');
  }

  /* every subject page (same view) also carries it */
  await page.click('.nav-link[data-nav="subjects"]');
  await page.click('.subject-card[data-subject="english"]');
  await page.waitForSelector('#galleryView.is-active');
  const gal = await page.evaluate(function () {
    var c = document.querySelector('#galleryView .page-compass');
    if (!c) return null;
    var r = c.getBoundingClientRect();
    return { svg: !!c.querySelector('svg'), pointer: getComputedStyle(c).pointerEvents, right: r.right, docW: document.documentElement.clientWidth };
  });
  assert.ok(gal && gal.svg, 'the subject page compass must be drawn');
  assert.equal(gal.pointer, 'none');
  assert.ok(gal.right <= gal.docW + 1, 'the compass never causes horizontal scrolling');

  assert.deepEqual(pageErrors, [], 'no page errors while checking the compasses');
});

/* ---------- 8. layout: overflow, desktop and mobile ---------- */

test('no view scrolls sideways on desktop', async () => {
  for (const nav of ['home', 'subjects', 'mygallery']) {
    await page.click('.nav-link[data-nav="' + nav + '"]');
    await page.waitForTimeout(350);
    const over = await horizontalOverflow();
    assert.ok(over <= 1, nav + ' view overflows horizontally by ' + over + 'px');
  }

  await page.click('.nav-link[data-nav="subjects"]');
  await page.click('.subject-card[data-subject="science"]');
  await page.waitForSelector('#galleryView.is-active');
  await page.waitForTimeout(350);
  const galleryOver = await horizontalOverflow();
  assert.ok(galleryOver <= 1, 'subject view overflows horizontally by ' + galleryOver + 'px');

  assert.deepEqual(pageErrors, [], 'no page errors while measuring overflow');
});

test('mobile layout: no sideways scrolling, everything reachable', async () => {
  const mobile = await browser.newContext({ viewport: { width: 390, height: 780 } });
  const mpage = await mobile.newPage();
  const errors = [];
  mpage.on('pageerror', function (err) { errors.push(String(err)); });

  try {
    await mpage.goto(baseUrl, { waitUntil: 'load' });

    /* the introduction box hugs its four paragraphs */
    const intro = await mpage.evaluate(function () {
      var box = document.getElementById('heroIntro');
      var all = Array.prototype.slice.call(box.querySelectorAll('p'));
      var ps = all.filter(function (p) { return !p.classList.contains('intro-quote'); });
      var last = all[all.length - 1].getBoundingClientRect();
      var b = box.getBoundingClientRect();
      return {
        paragraphs: ps.length,
        emptySpace: Math.round(b.bottom - last.bottom),
        scrollable: box.scrollHeight > box.clientHeight + 2,
        overflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth)
      };
    });
    assert.equal(intro.paragraphs, 4, 'all four introduction paragraphs stay');
    /* the decorative quote after them is optional decoration */
    assert.ok(intro.emptySpace < 48, 'the box ends close to the fourth paragraph (' + intro.emptySpace + 'px)');
    assert.equal(intro.scrollable, false, 'the box must not scroll its own text');
    assert.ok(intro.overflow <= 1, 'the homepage overflows horizontally by ' + intro.overflow + 'px');

    for (const nav of ['subjects', 'mygallery']) {
      await mpage.click('.nav-link[data-nav="' + nav + '"]');
      await mpage.waitForTimeout(350);
      const over = await mpage.evaluate(function () {
        return Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth);
      });
      assert.ok(over <= 1, nav + ' overflows horizontally by ' + over + 'px on mobile');
    }

    await mpage.click('.nav-link[data-nav="subjects"]');
    await mpage.click('.subject-card[data-subject="tle"]');
    await mpage.waitForSelector('#galleryView.is-active');
    const galOver = await mpage.evaluate(function () {
      return Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth);
    });
    assert.ok(galOver <= 1, 'a subject page overflows horizontally by ' + galOver + 'px on mobile');

    assert.deepEqual(errors, [], 'no page errors on mobile');
  } finally {
    await mobile.close();
  }
});

/* ---------- 10. destination gallery redesign ---------- */

test('the destination gallery opens as a travel-journal page for China', async () => {
  await clickCountry(page, 'CN');
  await page.waitForSelector('#mapGalleryOverlay:not(.hidden)');
  await page.waitForFunction(function () {
    var imgs = document.querySelectorAll('#mapGalleryBody figure img');
    return imgs.length === 3 && Array.prototype.every.call(imgs, function (i) {
      return i.complete && i.naturalWidth > 0;
    });
  }, null, { timeout: 15000 });

  const data = await page.evaluate(function () {
    var body = document.getElementById('mapGalleryBody');
    var card = document.querySelector('.map-gallery-card');
    var kicker = document.querySelector('.map-gallery-kicker');
    var figs = body.querySelectorAll('figure');
    var imgs = Array.prototype.map.call(body.querySelectorAll('figure img'), function (i) {
      var r = i.getBoundingClientRect();
      return {
        src: i.getAttribute('src'),
        complete: i.complete && i.naturalWidth > 0,
        natural: i.naturalWidth ? i.naturalHeight / i.naturalWidth : 0,
        /* client box ignores the scrapbook rotation of the polaroid */
        rendered: i.clientHeight ? i.clientHeight / i.clientWidth : 0,
        width: i.clientWidth
      };
    });
    var close = document.getElementById('mapGalleryClose').getBoundingClientRect();
    var compass = body.querySelector('.mg-compass svg');
    return {
      kicker: kicker.textContent.trim(),
      kickerUpper: getComputedStyle(kicker).textTransform,
      title: document.getElementById('mapGalleryTitle').textContent.trim(),
      flag: document.getElementById('mapGalleryFlag').getAttribute('src'),
      sub: document.getElementById('mapGallerySub').textContent.trim(),
      intro: document.getElementById('mapGalleryIntro').textContent.trim(),
      count: (body.querySelector('.mg-note-count') || {}).textContent || '',
      stamp: (body.querySelector('.mg-stamp') || {}).textContent || '',
      flight: !!document.querySelector('.map-gallery-card .mg-flight'),
      compass: !!compass,
      info: !!body.querySelector('.mg-info'),
      photos: !!body.querySelector('.mg-photos'),
      figures: figs.length,
      imgs: imgs,
      bodyOverflow: getComputedStyle(body).overflowY,
      closeVisible: close.width > 0 && close.top >= 0 && close.bottom <= window.innerHeight,
      overflowX: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
      bodyLocked: document.body.style.overflow === 'hidden',
      cardOverflow: card.getBoundingClientRect().right <= document.documentElement.clientWidth + 1
    };
  });

  assert.equal(data.kicker.replace(/\s/g, ''), 'Destination');
  assert.equal(data.kickerUpper, 'uppercase', 'the label must print uppercase');
  assert.equal(data.title, 'China');
  assert.match(data.flag, /flags\/cn\.png$/);
  assert.equal(data.sub, 'Ancient culture. Modern wonders. Endless discoveries.');
  assert.match(data.intro, /travel photographs from China/);
  assert.match(data.count, /3\s*photographs pinned/, 'the note counts the real photographs');
  assert.match(data.stamp.replace(/\s+/g, ' '), /EXPLORE . LEARN . GROW/);
  assert.equal(data.flight, true, 'airplane + dotted flight path');
  assert.equal(data.compass, true, 'compass decoration');
  assert.equal(data.info, true);
  assert.equal(data.photos, true);
  assert.equal(data.figures, 4, 'China keeps its own photographs and video');
  assert.equal(data.bodyOverflow, 'auto', 'the collection scrolls when it is long');
  assert.equal(data.closeVisible, true, 'the close button stays on screen');
  assert.equal(data.overflowX, 0, 'the modal never scrolls the page sideways');
  assert.equal(data.bodyLocked, true, 'background scrolling is locked');
  assert.equal(data.cardOverflow, true, 'the card stays inside the viewport');

  for (const img of data.imgs) {
    assert.equal(img.complete, true, 'photo must load: ' + img.src);
    assert.ok(img.width > 180, 'photos must be large enough to appreciate');
    assert.ok(Math.abs(img.rendered - img.natural) < 0.02,
      'photo keeps its own proportions (' + img.src + ')');
  }

  assert.deepEqual(pageErrors, [], 'no page errors while opening the destination gallery');
});

test('every destination shows its own photographs, and the controls work', async () => {
  const want = { HK: 4, JP: 7, VN: 3, SG: 3, PH: 6 };

  for (const code of Object.keys(want)) {
    await clickCountry(page, code);
    await page.waitForSelector('#mapGalleryOverlay:not(.hidden)');
    await page.waitForFunction(function (n) {
      return document.querySelectorAll('#mapGalleryBody figure').length === n;
    }, want[code], { timeout: 10000 });

    const state = await page.evaluate(function () {
      return {
        figures: document.querySelectorAll('#mapGalleryBody figure').length,
        empty: (document.getElementById('mapGalleryBody').textContent || '').indexOf('No photos available') !== -1,
        sub: document.getElementById('mapGallerySub').textContent.trim(),
        title: document.getElementById('mapGalleryTitle').textContent.trim()
      };
    });
    assert.equal(state.figures, want[code], code + ' photograph count');
    assert.ok(state.sub.length > 10, code + ' must have a travel subtitle');

    /* Back to map closes the page */
    await page.click('#mapGalleryBack');
    await page.waitForSelector('#mapGalleryOverlay', { state: 'hidden' });
  }

  /* a photograph still opens in the shared viewer */
  await clickCountry(page, 'JP');
  await page.waitForSelector('#mapGalleryOverlay:not(.hidden)');
  await page.click('.map-gallery-open');
  await page.waitForSelector('#lightboxOverlay:not(.hidden)');
  await page.keyboard.press('Escape');
  await page.waitForSelector('#lightboxOverlay', { state: 'hidden' });
  assert.equal(await page.evaluate(function () {
    return !document.getElementById('mapGalleryOverlay').classList.contains('hidden');
  }), true, 'closing the viewer keeps the destination page open');

  /* Escape closes the destination page and unlocks the page */
  await page.keyboard.press('Escape');
  await page.waitForSelector('#mapGalleryOverlay', { state: 'hidden' });
  assert.equal(await page.evaluate(function () { return document.body.style.overflow; }), '',
    'closing must restore the page scroll');

  assert.deepEqual(pageErrors, [], 'no page errors across the destinations');
});

test('"View My Gallery" really opens My Gallery', async () => {
  await clickCountry(page, 'TH');
  await page.waitForSelector('#mapGalleryOverlay:not(.hidden)');
  await page.click('#mapGalleryMyGallery');
  await page.waitForSelector('#myGalleryView.is-active');
  assert.equal(await page.evaluate(function () {
    return document.getElementById('mapGalleryOverlay').classList.contains('hidden');
  }), true, 'the destination page must close first');
  assert.equal((await page.textContent('#myGalleryView .paper-banner h2')).trim(), 'My Gallery');
  assert.deepEqual(pageErrors, [], 'no page errors while jumping to My Gallery');
});

test('a long destination gallery stays usable on a small screen', async () => {
  const small = await browser.newContext({ viewport: { width: 640, height: 460 } });
  const spage = await small.newPage();
  const errors = [];
  spage.on('pageerror', function (err) { errors.push(String(err)); });

  try {
    await spage.goto(baseUrl, { waitUntil: 'load' });
    await clickCountry(spage, 'JP');
    await spage.waitForSelector('#mapGalleryOverlay:not(.hidden)');

    const state = await spage.evaluate(function () {
      var body = document.getElementById('mapGalleryBody');
      var card = document.querySelector('.map-gallery-card').getBoundingClientRect();
      var close = document.getElementById('mapGalleryClose').getBoundingClientRect();
      return {
        scrollable: body.scrollHeight > body.clientHeight + 1,
        overflowX: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
        cardInside: card.top >= 0 && card.bottom <= window.innerHeight + 1 &&
          card.left >= 0 && card.right <= window.innerWidth + 1,
        closeInside: close.width > 0 && close.top >= 0 && close.bottom <= window.innerHeight,
        columns: getComputedStyle(body).gridTemplateColumns.split(' ').length
      };
    });

    assert.equal(state.scrollable, true, 'the collection scrolls inside the modal');
    assert.equal(state.overflowX, 0, 'no horizontal overflow on a small screen');
    assert.equal(state.cardInside, true, 'the modal fits the viewport');
    assert.equal(state.closeInside, true, 'the close button is reachable');
    assert.equal(state.columns, 1, 'the journal stacks on a small screen');

    await spage.keyboard.press('Escape');
    await spage.waitForSelector('#mapGalleryOverlay', { state: 'hidden' });
    assert.deepEqual(errors, [], 'no page errors on a small screen');
  } finally {
    await small.close();
  }
});

/* ---------- 9. long images stay readable in the viewer ---------- */

test('the tall Mathematics sheet is shown whole and can be scrolled', async () => {
  await page.click('.nav-link[data-nav="subjects"]');
  await page.click('.subject-card[data-subject="mathematics"]');
  await page.waitForSelector('#galleryView.is-active');
  await page.click('#presoViewBtn');
  await page.waitForSelector('#lightboxOverlay:not(.hidden)');
  await page.waitForFunction(function () {
    var i = document.getElementById('lightboxImage');
    return i.complete && i.naturalWidth > 0;
  }, null, { timeout: 15000 });

  const state = await page.evaluate(function () {
    var img = document.getElementById('lightboxImage');
    var overlay = document.getElementById('lightboxOverlay');
    var content = document.getElementById('lightboxContent');
    return {
      isLong: content.classList.contains('is-long'),
      renderedWidth: img.getBoundingClientRect().width,
      renderedHeight: img.getBoundingClientRect().height,
      ratio: img.naturalHeight / img.naturalWidth,
      renderedRatio: img.getBoundingClientRect().height / img.getBoundingClientRect().width,
      scrollable: overlay.scrollHeight > overlay.clientHeight + 1,
      overflowX: overlay.scrollWidth > overlay.clientWidth + 1
    };
  });

  assert.ok(state.ratio > 1.3, 'expected a tall sheet');
  assert.equal(state.isLong, true, 'a tall sheet switches to the scrollable layout');
  assert.ok(Math.abs(state.renderedRatio - state.ratio) < 0.02, 'the aspect ratio is preserved');
  assert.ok(state.renderedWidth > 500, 'the sheet is shown at a readable width');
  assert.equal(state.scrollable, true, 'the viewer scrolls vertically');
  assert.equal(state.overflowX, false, 'the viewer must not scroll sideways');

  /* the close control is reachable and the page comes back */
  await page.click('#lightboxClose');
  await page.waitForSelector('#lightboxOverlay', { state: 'hidden' });
  assert.equal(await page.evaluate(function () { return document.body.style.overflow; }), '',
    'closing must restore the page scroll');

  assert.deepEqual(pageErrors, [], 'no page errors with a long image');
});

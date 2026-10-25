'use strict';

/* ============================================================
   Portfolio browser tests
   ------------------------------------------------------------
   1. all 8 subject cover photos load (eager, no scrolling) —
      the check that used to be flaky because covers were lazy
   2. My Gallery photos always fit whole: never is-long, never
      a scrollable viewer
   3. subject images keep the scrollable is-long layout for
      tall pictures
   ============================================================ */

const { test, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const { createServer, listen } = require('./serve');
const { launch } = require('./browser');

const SHOT_DIR = path.join(__dirname, '..', 'test-output');

let server;
let baseUrl;
let browser;
let page;
const pageErrors = [];

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

/* ---------- helpers ---------- */

function waitForLightboxImage() {
  return page.waitForFunction(function () {
    var img = document.getElementById('lightboxImage');
    return !img.classList.contains('hidden') && img.complete && img.naturalWidth > 0;
  }, { timeout: 15000 });
}

function lightboxState() {
  return page.evaluate(function () {
    var content = document.getElementById('lightboxContent');
    var overlay = document.getElementById('lightboxOverlay');
    var img = document.getElementById('lightboxImage');
    return {
      isLong: content.classList.contains('is-long'),
      scrollable: overlay.scrollHeight > overlay.clientHeight + 1,
      scrollTop: overlay.scrollTop,
      naturalWidth: img.naturalWidth,
      ratio: img.naturalWidth ? img.naturalHeight / img.naturalWidth : 0
    };
  });
}

async function openSubjects() {
  await page.click('.nav-link[data-nav="subjects"]');
  await page.waitForSelector('#subjectsView.is-active');
}

async function screenshot(name) {
  await page.screenshot({ path: path.join(SHOT_DIR, name), fullPage: false });
}

/* waits until the viewer shows the given slide file and it is decoded */
function waitForSlide(file) {
  return page.waitForFunction(function (expected) {
    var img = document.getElementById('lightboxImage');
    return img.getAttribute('src') &&
      img.getAttribute('src').indexOf(expected) !== -1 &&
      img.complete && img.naturalWidth > 0;
  }, file, { timeout: 20000 });
}

function musicPaused(target) {
  return target.evaluate(function () {
    var m = document.getElementById('bgMusic');
    return !m || m.paused;
  });
}

/* a real click marks the document as user-activated, which is what
   lets an <audio> start after the automatic attempt was blocked */
async function restartMusic(target) {
  await target.mouse.click(300, 300);
  await target.evaluate(function () {
    var attempt = document.getElementById('bgMusic').play();
    if (attempt && typeof attempt.catch === 'function') attempt.catch(function () {});
  });
  await target.waitForFunction(function () {
    var m = document.getElementById('bgMusic');
    return m && !m.paused;
  }, { timeout: 5000 });
}

/* ---------- 1. cover photos ---------- */

test('all 8 subject cover photos load, eagerly and without scrolling', async () => {
  await openSubjects();

  const covers = page.locator('.subject-card .sc-img-wrap img');
  assert.equal(await covers.count(), 8, 'expected one cover photo per subject');

  /* the check that used to race: every cover decoded, no scrolling */
  await page.waitForFunction(function () {
    var imgs = Array.prototype.slice.call(
      document.querySelectorAll('.subject-card .sc-img-wrap img')
    );
    return imgs.length === 8 &&
      imgs.every(function (i) { return i.complete && i.naturalWidth > 0; });
  }, { timeout: 5000 });

  const state = await page.evaluate(function () {
    var imgs = Array.prototype.slice.call(
      document.querySelectorAll('.subject-card .sc-img-wrap img')
    );
    return {
      lazy: imgs.filter(function (i) { return i.getAttribute('loading') === 'lazy'; }).length,
      broken: imgs.filter(function (i) { return i.complete && i.naturalWidth === 0; }).length,
      scrollY: window.scrollY
    };
  });

  assert.equal(state.lazy, 0, 'covers must not defer loading (that is what made the check flaky)');
  assert.equal(state.broken, 0, 'a cover photo failed to decode');
  assert.equal(state.scrollY, 0, 'covers must load without scrolling the page');

  await screenshot('01-subjects-covers.png');
});

/* ---------- 2. My Gallery fits whole ---------- */

test('My Gallery photos always fit whole: never is-long, never scrollable', async () => {
  await page.click('.nav-link[data-nav="mygallery"]');
  await page.waitForSelector('#myGalleryView.is-active');

  const cards = page.locator('.my-gallery-card');
  assert.equal(await cards.count(), 6, 'expected every gallery photo as a card');

  let tallSeen = 0;

  for (let i = 0; i < 6; i++) {
    await page.click('.my-gallery-card[data-index="' + i + '"]');
    await page.waitForSelector('#lightboxOverlay:not(.hidden)');
    await waitForLightboxImage();

    const s = await lightboxState();
    assert.equal(s.isLong, false, 'gallery photo ' + (i + 1) + ' must not switch to the long/scroll layout');
    assert.equal(s.scrollable, false, 'gallery photo ' + (i + 1) + ' must not be scrollable');
    assert.equal(s.scrollTop, 0, 'viewer must stay pinned to the top');
    if (s.ratio > 1.3) tallSeen++;

    if (i === 0) await screenshot('02-my-gallery-fit-whole.png');

    await page.click('#lightboxClose');
    await page.waitForSelector('#lightboxOverlay', { state: 'hidden' });
  }

  assert.ok(tallSeen >= 1, 'the suite must exercise at least one tall photo, otherwise the rule is untested');
});

/* ---------- 3. subject images keep is-long ---------- */

test('tall subject images keep the scrollable is-long layout', async () => {
  await openSubjects();
  await page.click('.subject-card[data-subject="english"]');
  await page.waitForSelector('#galleryView.is-active');
  await page.waitForSelector('#loader', { state: 'hidden' });

  /* "Speech Draft" uses images/english-3.svg — 800x1200, ratio 1.5 */
  await page.click('.g-card[data-item="en-3"]');
  await page.waitForSelector('#lightboxOverlay:not(.hidden)');
  await waitForLightboxImage();

  const s = await lightboxState();
  assert.ok(s.ratio > 1.3, 'expected a tall subject image, got ratio ' + s.ratio.toFixed(2));
  assert.equal(s.isLong, true, 'tall subject images must keep is-long');
  assert.equal(s.scrollable, true, 'tall subject images must scroll the overlay');

  await screenshot('03-subject-tall-is-long.png');
});

/* ---------- 4. My Salad presentation ---------- */

test('My Salad opens as a 9-slide deck with left/right navigation', async () => {
  await openSubjects();
  await page.click('.subject-card[data-subject="tle"]');
  await page.waitForSelector('#galleryView.is-active');
  await page.waitForSelector('#loader', { state: 'hidden' });

  /* the card thumbnail now points at the deck's first slide */
  const thumb = await page.getAttribute('.g-card[data-item="tl-1"] img', 'src');
  assert.match(thumb, /my_salad\/2\.png$/);

  await page.click('.g-card[data-item="tl-1"]');
  await page.waitForSelector('#lightboxOverlay:not(.hidden)');
  await waitForSlide('my_salad/2.png');
  assert.equal(await page.textContent('#lightboxCounter'), '1 of 9');
  assert.ok(!(await page.getAttribute('#lightboxNext', 'class')).includes('hidden'),
    'the next button must be available for a deck');

  for (let i = 1; i < 9; i++) {
    await page.keyboard.press('ArrowRight');
    /* slide k shows file (k + 1).png — the deck starts at 2.png */
    await waitForSlide((i + 2) + '.png');
    assert.equal(await page.textContent('#lightboxCounter'), (i + 1) + ' of 9');
    const anim = await page.evaluate(function () {
      var f = document.getElementById('lightboxFrame');
      return { cls: f.className, name: getComputedStyle(f).animationName };
    });
    assert.match(anim.cls, /\blb-anim\b/, 'slide change must be animated');
    assert.equal(anim.name, 'lbFromNext', 'moving forward must use the forward animation');
  }
  await waitForSlide('10.png');

  /* stepping back uses the opposite animation */
  await page.keyboard.press('ArrowLeft');
  await waitForSlide('9.png');
  const backAnim = await page.evaluate(function () {
    var f = document.getElementById('lightboxFrame');
    return { cls: f.className, name: getComputedStyle(f).animationName };
  });
  assert.match(backAnim.cls, /\blb-anim\b/);
  assert.equal(backAnim.name, 'lbFromPrev', 'moving back must use the backward animation');

  assert.deepEqual(pageErrors, [], 'no page errors while browsing the deck');
});

test('slide 3.png carries the animated salad gif exactly over its photo, caption kept', async () => {
  await openSubjects();
  await page.click('.subject-card[data-subject="tle"]');
  await page.waitForSelector('#galleryView.is-active');
  await page.waitForSelector('#loader', { state: 'hidden' });
  await page.click('.g-card[data-item="tl-1"]');
  await page.waitForSelector('#lightboxOverlay:not(.hidden)');

  await waitForSlide('2.png');
  await page.keyboard.press('ArrowRight');
  await waitForSlide('3.png');

  /* the artwork layer is built once the slide is ready, the gif is 4 MB */
  await page.waitForSelector('#lightboxSlide:not(.hidden) .lb-slide-media');
  await page.waitForFunction(function () {
    var m = document.querySelector('#lightboxSlide .lb-slide-media');
    return m && m.complete && m.naturalWidth > 0;
  }, null, { timeout: 20000 });

  const ov = await page.evaluate(function () {
    var s = document.getElementById('lightboxSlide');
    var media = s.querySelector('img');
    var text = s.querySelector('.lb-slide-text');
    var photo = document.getElementById('lightboxImage').getBoundingClientRect();
    var frame = document.getElementById('lightboxFrame').getBoundingClientRect();
    var box = s.getBoundingClientRect();
    return {
      hidden: s.classList.contains('hidden'),
      mediaSrc: media ? media.getAttribute('src') : null,
      natural: media ? [media.naturalWidth, media.naturalHeight] : null,
      text: text ? text.textContent : '',
      mediaBox: media ? media.getBoundingClientRect() : null,
      fontSize: parseFloat(getComputedStyle(s).fontSize),
      photo: { left: photo.left, top: photo.top, width: photo.width, height: photo.height },
      frame: { left: frame.left, top: frame.top, width: frame.width, height: frame.height },
      box: { left: box.left, top: box.top, width: box.width, height: box.height }
    };
  });

  assert.equal(ov.hidden, false, 'the gif overlay must be visible on 3.png');
  assert.match(ov.mediaSrc, /salad\.gif$/);
  assert.deepEqual(ov.natural, [360, 640], 'the salad gif must load');
  assert.ok(ov.text.indexOf('FRESH GARDEN SALAD') !== -1, 'the heading must stay on top of the gif');
  assert.ok(ov.text.indexOf('Green Salad / Tossed Salad') !== -1, 'the sub-line must stay too');

  /* the artwork is pinned to the photo panel it belongs to (measured
     from the slide: x 62.59% y 10.03% w 31.77% h 79.95%) */
  const design = { x: 62.59, y: 10.03, w: 31.77, h: 79.95 };
  const want = {
    left: ov.photo.left + ov.photo.width * design.x / 100,
    top: ov.photo.top + ov.photo.height * design.y / 100,
    width: ov.photo.width * design.w / 100,
    height: ov.photo.height * design.h / 100
  };
  const close = (a, b) => Math.abs(a - b) <= 1.5;
  assert.ok(close(ov.box.left, want.left), 'overlay left must sit on the photo edge');
  assert.ok(close(ov.box.top, want.top), 'overlay top must sit on the photo edge');
  assert.ok(close(ov.box.width, want.width), 'overlay width must match the photo');
  assert.ok(close(ov.box.height, want.height), 'overlay height must match the photo');

  /* never bigger than the picture it sits on */
  assert.ok(ov.box.left >= ov.photo.left - 1.5 &&
    ov.box.left + ov.box.width <= ov.photo.left + ov.photo.width + 1.5,
  'the gif must not overflow the photo horizontally');
  assert.ok(ov.box.top >= ov.photo.top - 1.5 &&
    ov.box.top + ov.box.height <= ov.photo.top + ov.photo.height + 1.5,
  'the gif must not overflow the photo vertically');
  assert.ok(close(ov.mediaBox.width, ov.box.width) && close(ov.mediaBox.height, ov.box.height),
    'the gif must be fitted exactly inside its box');
  assert.ok(ov.fontSize > 0, 'the caption must scale with the slide');

  assert.deepEqual(pageErrors, [], 'no page errors while showing the gif slide');

  await screenshot('05-salad-slide-gif.png');
});

/* ---------- 5. automatic background music ---------- */

test('background music starts by itself on open, and the manual play button is gone', async (t) => {
  /* a browser started with autoplay allowed proves the automatic start;
     the normal browser below proves the fallback when it is blocked */
  const autoBrowser = await launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  t.after(function () { return autoBrowser.close(); });
  const autoPage = await (await autoBrowser.newContext()).newPage();
  autoPage.on('pageerror', function (err) { pageErrors.push(String(err)); });

  await autoPage.goto(baseUrl, { waitUntil: 'load' });
  await autoPage.waitForFunction(function () {
    var m = document.getElementById('bgMusic');
    return m && !m.paused;
  }, { timeout: 10000 });

  /* with autoplay blocked, the very first click must still start it */
  await page.mouse.click(300, 300);
  await page.waitForFunction(function () {
    var m = document.getElementById('bgMusic');
    return m && !m.paused;
  }, { timeout: 10000 });

  const header = await page.evaluate(function () {
    return {
      musicButton: !!document.getElementById('musicToggle'),
      searchButton: !!document.getElementById('searchToggle')
    };
  });
  assert.equal(header.musicButton, false, 'the manual music button must be removed from the header');
  assert.equal(header.searchButton, true, 'the search button stays in the header');
  assert.deepEqual(pageErrors, [], 'no page errors while the music starts');

  await page.screenshot({
    path: path.join(SHOT_DIR, '04-header-no-music-button.png'),
    clip: { x: 0, y: 0, width: 1366, height: 70 }
  });
});

test('music stops for the hero video, Subjects and My Gallery — no errors', async () => {
  /* hero video starts playing */
  await restartMusic(page);
  await page.evaluate(function () {
    document.getElementById('heroVideo').dispatchEvent(new Event('play'));
  });
  assert.equal(await musicPaused(page), true, 'the hero video must stop the background music');

  /* entering Subjects */
  await page.goto(baseUrl, { waitUntil: 'load' });
  await restartMusic(page);
  await page.click('.nav-link[data-nav="subjects"]');
  await page.waitForSelector('#subjectsView.is-active');
  assert.equal(await musicPaused(page), true, 'Subjects must stop the background music');

  /* entering My Gallery */
  await page.goto(baseUrl, { waitUntil: 'load' });
  await restartMusic(page);
  await page.click('.nav-link[data-nav="mygallery"]');
  await page.waitForSelector('#myGalleryView.is-active');
  assert.equal(await musicPaused(page), true, 'My Gallery must stop the background music');

  assert.deepEqual(pageErrors, [], 'no page errors while the music stops');
});

test('music comes back by itself when you return to the home page', async () => {
  /* home -> Subjects -> home */
  await restartMusic(page);
  await page.click('.nav-link[data-nav="subjects"]');
  await page.waitForSelector('#subjectsView.is-active');
  assert.equal(await musicPaused(page), true, 'Subjects stops the music');

  await page.click('.nav-link[data-nav="home"]');
  await page.waitForSelector('#homeView.is-active');
  await page.waitForFunction(function () {
    var m = document.getElementById('bgMusic');
    return m && !m.paused;
  }, null, { timeout: 5000 });

  /* home -> My Gallery -> back button -> home */
  await page.click('.nav-link[data-nav="mygallery"]');
  await page.waitForSelector('#myGalleryView.is-active');
  assert.equal(await musicPaused(page), true, 'My Gallery stops the music');

  await page.click('#myGalleryBackBtn');
  await page.waitForSelector('#homeView.is-active');
  await page.waitForFunction(function () {
    var m = document.getElementById('bgMusic');
    return m && !m.paused;
  }, null, { timeout: 5000 });

  /* a running hero video keeps the floor: coming home must not start
     the music until the video is finished or paused */
  await page.click('#heroVideo');
  await page.waitForFunction(function () {
    var v = document.getElementById('heroVideo');
    return v && !v.paused && v.currentTime > 0;
  }, null, { timeout: 15000 });
  assert.equal(await musicPaused(page), true, 'playing the video stops the music');

  await page.click('.nav-link[data-nav="subjects"]');
  await page.waitForSelector('#subjectsView.is-active');
  await page.click('.nav-link[data-nav="home"]');
  await page.waitForSelector('#homeView.is-active');
  await page.waitForTimeout(700);
  assert.equal(await musicPaused(page), true, 'no music while the hero video still runs');

  /* video paused -> the next trip home brings the music back */
  await page.evaluate(function () { document.getElementById('heroVideo').pause(); });
  await page.click('.nav-link[data-nav="subjects"]');
  await page.waitForSelector('#subjectsView.is-active');
  await page.click('.nav-link[data-nav="home"]');
  await page.waitForSelector('#homeView.is-active');
  await page.waitForFunction(function () {
    var m = document.getElementById('bgMusic');
    return m && !m.paused;
  }, null, { timeout: 5000 });

  assert.deepEqual(pageErrors, [], 'no page errors while the music comes and goes');
});

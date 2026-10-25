'use strict';

/* Launches the locally installed Google Chrome through playwright-core.
   channel:'chrome' is tried first; if playwright cannot resolve it we
   fall back to well-known install paths (and CHROME_PATH if set).
   No browser download is required. */

const fs = require('node:fs');
const { chromium } = require('playwright-core');

const CANDIDATES = process.platform === 'win32'
  ? [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    ]
  : process.platform === 'darwin'
    ? [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'
      ]
    : [
        '/usr/bin/google-chrome',
        '/usr/bin/google-chrome-stable',
        '/usr/bin/chromium',
        '/usr/bin/chromium-browser'
      ];

async function launch(options) {
  const args = (options && options.args) || [];

  try {
    return await chromium.launch({ channel: 'chrome', headless: true, args: args });
  } catch (err) {
    /* fall through to an explicit executable path */
  }

  const paths = (process.env.CHROME_PATH ? [process.env.CHROME_PATH] : []).concat(CANDIDATES);
  const exe = paths.find(function (p) { return p && fs.existsSync(p); });
  if (!exe) {
    throw new Error('Google Chrome was not found. Set CHROME_PATH to its executable.');
  }
  return chromium.launch({ executablePath: exe, headless: true, args: args });
}

module.exports = { launch };

'use strict';

/* Minimal static server for the test suite: serves the project root
   over HTTP so images, video and lazy-loading behave exactly as they
   do in production. Listens on an ephemeral port to avoid clashes. */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg'
};

function createServer() {
  return http.createServer(function (req, res) {
    var urlPath;
    try {
      urlPath = decodeURIComponent(req.url.split('?')[0]);
    } catch (err) {
      res.writeHead(400);
      res.end('Bad request');
      return;
    }

    var filePath = path.join(ROOT, urlPath === '/' ? 'index.html' : urlPath);
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    fs.readFile(filePath, function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not found');
        return;
      }
      res.writeHead(200, {
        'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'no-store'
      });
      res.end(data);
    });
  });
}

function listen(server) {
  return new Promise(function (resolve, reject) {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', function () {
      resolve(server.address().port);
    });
  });
}

module.exports = { createServer, listen };

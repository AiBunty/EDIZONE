const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 8080);

function loadDotEnv() {
  const envPath = path.join(ROOT, '.env');
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx <= 0) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadDotEnv();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(data));
}

function serveFile(reqPath, res) {
  let safePath = reqPath === '/' ? '/index.html' : reqPath;
  safePath = path.normalize(safePath).replace(/^([.][.][/\\])+/, '');
  const filePath = path.join(ROOT, safePath);

  if (!filePath.startsWith(ROOT)) {
    sendJson(res, 403, { error: 'Forbidden' });
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        sendJson(res, 404, { error: 'Not found' });
      } else {
        sendJson(res, 500, { error: 'Failed to read file' });
      }
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });
    res.end(data);
  });
}

function toRelativeTime(seconds) {
  if (!Number.isFinite(seconds)) return 'Recently';
  if (seconds < 60) return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? '' : 's'} ago`;
}

function mapGoogleReviewLegacy(r) {
  return {
    author_name: r.author_name || 'Google User',
    rating: Number(r.rating || 0),
    relative_time_description: r.relative_time_description || toRelativeTime(Number(r.time || 0)),
    author_profile_photo: r.profile_photo_url || '',
    author_url: r.author_url || '',
    text: r.text || ''
  };
}

function mapGoogleReviewNew(r) {
  return {
    author_name: r?.authorAttribution?.displayName || 'Google User',
    rating: Number(r?.rating || 0),
    relative_time_description: r?.relativePublishTimeDescription || 'Recently',
    author_profile_photo: r?.authorAttribution?.photoUri || '',
    author_url: r?.authorAttribution?.uri || '',
    text: r?.text?.text || ''
  };
}

async function handleGoogleReviews(urlObj, res) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const envPlaceId = process.env.GOOGLE_PLACE_ID || '';

  if (!key) {
    sendJson(res, 500, {
      error: 'Missing GOOGLE_PLACES_API_KEY in .env'
    });
    return;
  }

  const placeId = (urlObj.searchParams.get('placeId') || envPlaceId).trim();
  if (!placeId) {
    sendJson(res, 400, {
      error: 'Missing placeId. Set GOOGLE_PLACE_ID in .env or pass ?placeId=...'
    });
    return;
  }

  const limitParam = Number(urlObj.searchParams.get('limit') || process.env.GOOGLE_REVIEWS_LIMIT || 100);
  const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 100) : 100;

  const fieldMask = [
    'id',
    'displayName',
    'rating',
    'userRatingCount',
    'reviews',
    'googleMapsUri'
  ].join(',');

  const googleUrl = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;

  try {
    const response = await fetch(googleUrl, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': fieldMask
      }
    });
    if (!response.ok) {
      const errorBody = await response.text();
      sendJson(res, 502, { error: `Google API HTTP ${response.status}`, details: errorBody });
      return;
    }

    const body = await response.json();
    const reviews = Array.isArray(body.reviews) ? body.reviews.slice(0, limit).map(mapGoogleReviewNew) : [];
    const writeReviewUrl = `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;

    sendJson(res, 200, {
      rating: Number(body.rating || 0),
      user_ratings_total: Number(body.userRatingCount || 0),
      place_url: body.googleMapsUri || process.env.GOOGLE_PLACE_URL || 'https://maps.app.goo.gl/o5QxVRtrizTHoHUq5',
      write_review_url: writeReviewUrl,
      reviews
    });
  } catch (error) {
    sendJson(res, 500, {
      error: 'Failed to fetch Google reviews',
      details: String(error && error.message ? error.message : error)
    });
  }
}

const server = http.createServer(async (req, res) => {
  const host = req.headers.host || `localhost:${PORT}`;
  const urlObj = new URL(req.url || '/', `http://${host}`);

  if (urlObj.pathname === '/api/google-reviews') {
    await handleGoogleReviews(urlObj, res);
    return;
  }

  serveFile(urlObj.pathname, res);
});

server.listen(PORT, () => {
  console.log(`Local server running at http://localhost:${PORT}`);
  console.log('Google reviews endpoint: /api/google-reviews');
});

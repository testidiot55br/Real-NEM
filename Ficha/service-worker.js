const CACHE_NAME = "nemesis-shell-v113";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./tabletop.css",
  "./script.js",
  "./tabletop.js",
  "./manifest.webmanifest",
  "./firebase-config.js",
  "./menu-background-red.png",
  "./menu-background.jpg",
  "./menu-background.svg",
  "./icon-backpack.png",
  "./icon-dagger.png",
  "./icon-eye.png",
  "./icon-d20.png",
  "./die-frame-d20.png",
  "./die-frame-d4.png",
  "./die-frame-d6.png",
  "./die-frame-d8.png",
  "./die-frame-d10.png",
  "./die-frame-d12.png"
];

const NETWORK_FIRST_DESTINATIONS = new Set(["document", "script", "style"]);
const NETWORK_FIRST_PATHS = new Set([
  "/",
  "/index.html",
  "/styles.css",
  "/tabletop.css",
  "/script.js",
  "/tabletop.js",
  "/manifest.webmanifest",
  "/firebase-config.js"
]);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => undefined)
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

function shouldUseNetworkFirst(request) {
  if (request.mode === "navigate") {
    return true;
  }

  const url = new URL(request.url);
  return NETWORK_FIRST_DESTINATIONS.has(request.destination) || NETWORK_FIRST_PATHS.has(url.pathname);
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request, { cache: "no-store" });
    if (response && response.status === 200 && response.type === "basic") {
      cache.put(request, response.clone()).catch(() => undefined);
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    return caches.match("./index.html");
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const networkPromise = fetch(request)
    .then((response) => {
      if (response && response.status === 200 && response.type === "basic") {
        cache.put(request, response.clone()).catch(() => undefined);
      }
      return response;
    })
    .catch(() => null);

  if (cached) {
    return cached;
  }

  const networkResponse = await networkPromise;
  if (networkResponse) {
    return networkResponse;
  }

  return caches.match("./index.html");
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    shouldUseNetworkFirst(request)
      ? networkFirst(request)
      : staleWhileRevalidate(request)
  );
});




























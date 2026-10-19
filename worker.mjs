export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'turntide-islands.561.group') {
      const canonical = new URL(request.url);
      canonical.hostname = 'turntide.561.group';
      return Response.redirect(canonical.toString(), 308);
    }
    const asset = await env.ASSETS.fetch(request);
    // Keep one original VICTOR static asset store and route. W3C JSON-LD
    // needs its interoperable media type, not guessed octet-stream/plain JSON.
    // Only a real available asset may claim application/ld+json.
    if (url.pathname === '/governance/standing-pathways.jsonld' &&
        (request.method === 'GET' || request.method === 'HEAD') &&
        asset.status === 200) {
      const headers = new Headers(asset.headers);
      headers.set('content-type', 'application/ld+json; charset=utf-8');
      headers.set('x-content-type-options', 'nosniff');
      return new Response(asset.body, { status: asset.status,
        statusText: asset.statusText, headers });
    }
    return asset;
  },
};

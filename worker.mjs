export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'turntide-islands.561.group') {
      const canonical = new URL(request.url);
      canonical.hostname = 'turntide.561.group';
      return Response.redirect(canonical.toString(), 308);
    }
    return env.ASSETS.fetch(request);
  },
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/') {
      // Serve the landing cell at the root itself; asking the asset binding for
      // /index/index.html answers with a redirect to /index/ instead.
      return env.ASSETS.fetch(new Request(new URL('/index/', url), request));
    }
    return env.ASSETS.fetch(request);
  },
};

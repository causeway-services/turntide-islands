// Turntide's TUFTE presentation: the site wears the same art as the guild's
// emoji (content/expressions) — navy outlines, tide water, sand islands, a sun —
// so a visitor arriving from Discord recognizes where they are. Colors come
// from the community's design tokens; VICTOR already carries the seven roles
// as TUFTE custom properties, and this layer adds only the art palette, the
// self-hosted faces (content/fonts, SIL OFL), and the shapes.
import { readFileSync } from 'node:fs';
import { cssFontFamilyList } from '@red-cup-engineering/web-theming-service/design-tokens';

const tokens = JSON.parse(readFileSync(new URL('../../data/records/design-token-records/turntide-islands.tokens.json', import.meta.url), 'utf8'));
export { tokens };

const palette = Object.fromEntries(Object.entries(tokens.color.palette).map(([name, token]) => [name, token.$value.hex]));
const stack = (name) => cssFontFamilyList(tokens.font.family[name].$value);

// Google Fonts' latin and latin-ext subsets; latin-ext carries the diacritics of Lakota and Anishinaabemowin orthographies.
const ranges = {
  latin: 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
  'latin-ext': 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF',
};
const faces = [['Literata', 'literata', 'normal', '200 900'], ['Literata', 'literata', 'italic', '200 900'], ['Nunito', 'nunito', 'normal', '600 900']]
  .flatMap(([family, file, style, weight]) => Object.entries(ranges).map(([subset, range]) =>
    `@font-face{font-family:"${family}";font-style:${style};font-weight:${weight};font-display:swap;src:url(/fonts/${file}-${style}-${subset}.woff2) format("woff2");unicode-range:${range}}`))
  .join('\n');

const svg = (markup) => `url("data:image/svg+xml,${encodeURIComponent(markup)}")`;
const waveEdge = svg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 20"><path d="M0 10 Q15 2 30 10 T60 10 T90 10 T120 10 V20 H0 Z"/></svg>');
const swell = (stroke) => svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="40" viewBox="0 0 96 40"><path d="M0 12 q12 -8 24 0 t24 0 M48 32 q12 -8 24 0 t24 0" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round"/></svg>`);
const ripple = svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 8"><path d="M0 4 q6 -4 12 0 t12 0 t12 0 t12 0" fill="none" stroke="${palette.tide}" stroke-width="2" stroke-linecap="round"/></svg>`);

const t = 'body[data-tufte-theme=turntide]';

const styles = String.raw`
${faces}
${t}{--turntide-navy:${palette.navy};--turntide-tide:${palette.tide};--turntide-shallows:${palette.shallows};--turntide-foam:${palette.foam};--turntide-sand:${palette.sand};--turntide-coral:${palette.coral};--turntide-sun:${palette.sun};--turntide-shell:${palette.shell};--turntide-reading:${stack('reading')};--turntide-display:${stack('display')};--turntide-sand-wash:#f7e8c8;--turntide-shadow:0 1px 0 rgba(15,42,61,.06),0 10px 28px -20px rgba(15,42,61,.55);--tufte-radius:14px;--tufte-gap:1rem;font-family:var(--turntide-reading);font-size:17px;line-height:1.65;background-color:var(--tufte-bg);background-image:${swell('rgba(31,154,168,.13)')};background-size:96px 40px}
@media(prefers-color-scheme:dark){${t}{--turntide-sand-wash:#2a2a22;--turntide-shadow:0 1px 0 rgba(0,0,0,.25),0 12px 30px -18px rgba(0,0,0,.8);background-image:${swell('rgba(127,211,214,.07)')}}}
${t} .tufte-shell{width:min(1180px,100%);padding-top:max(1rem,env(safe-area-inset-top))}
${t} .tufte-masthead{position:relative;display:grid;grid-template-columns:auto 1fr;grid-template-areas:"mark title" "nav nav";align-items:center;gap:.9rem 1.1rem;margin:0 0 1.25rem;padding:1.5rem 1.6rem 2.7rem;border:0;border-radius:20px;background:radial-gradient(circle at calc(100% - 4.5rem) 3.2rem,var(--turntide-sun) 0 1.55rem,rgba(246,196,69,.18) 1.6rem 2.6rem,transparent 2.65rem),linear-gradient(165deg,var(--turntide-navy) 0%,#123b52 58%,#17707d 100%);color:var(--turntide-shell);box-shadow:var(--turntide-shadow);overflow:hidden}
${t} .tufte-masthead::before{content:"";grid-area:mark;width:clamp(56px,9vw,84px);aspect-ratio:1;background:url(/emoji/turntide.svg) center/contain no-repeat;filter:drop-shadow(0 4px 10px rgba(0,0,0,.25))}
${t} .tufte-masthead::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:20px;background:var(--tufte-bg);-webkit-mask:${waveEdge} repeat-x 0 100%/120px 20px;mask:${waveEdge} repeat-x 0 100%/120px 20px}
${t} .tufte-masthead>div{grid-area:title;min-width:0}
${t} .tufte-eyebrow{margin:0 0 .2rem;color:var(--turntide-shallows);font-family:var(--turntide-display);font-size:.78rem;font-weight:800;letter-spacing:.16em}
${t} .tufte-masthead h1{margin:0;color:var(--turntide-shell);font-family:var(--turntide-display);font-size:clamp(1.85rem,4.6vw,2.75rem);font-weight:900;line-height:1.05;letter-spacing:-.005em;text-wrap:balance}
${t} .tufte-subtitle{color:var(--turntide-foam)}
${t} [data-tufte-navigation]{grid-area:nav;display:flex;flex-wrap:wrap;gap:.45rem}
${t} [data-tufte-navigation] a{padding:.38rem .85rem;border-radius:999px;background:rgba(251,247,238,.1);color:var(--turntide-shell);font-family:var(--turntide-display);font-size:.92rem;font-weight:700;text-decoration:none;transition:background-color .15s}
${t} [data-tufte-navigation] a:hover{background:rgba(251,247,238,.22)}
${t} [data-tufte-navigation] [aria-current=page]{background:var(--turntide-sand);color:var(--turntide-navy)}
${t} [data-tufte-navigation] a:focus-visible{outline:3px solid var(--turntide-sun);outline-offset:2px}
${t} .tufte-tile{padding:1.15rem 1.35rem 1.3rem;border:1px solid color-mix(in srgb,var(--tufte-line) 40%,transparent);border-radius:var(--tufte-radius);background:var(--tufte-surface);box-shadow:var(--turntide-shadow)}
${t} .tufte-tile>header{margin:0 0 .85rem;padding:0 0 .55rem;border:0;background:${ripple} no-repeat 0 100%/48px 8px}
${t} .tufte-tile>header h2{margin:0;color:var(--tufte-accent);font-family:var(--turntide-display);font-size:.8rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
/* The page's own tile runs down the left while the aside tiles stack at the top of the right rail; the last, flexible row takes the slack. */
@media(min-width:761px){${t} .tufte-grid{grid-template-rows:repeat(5,auto) 1fr}${t} .tufte-tile[data-role=now]{grid-row:span 6}}
${t} .tufte-tile[data-role=aside]{background:color-mix(in srgb,var(--tufte-surface) 82%,var(--turntide-foam))}
@media(prefers-color-scheme:dark){${t} .tufte-tile[data-role=aside]{background:color-mix(in srgb,var(--tufte-surface) 90%,var(--turntide-tide))}}
${t} .tufte-tile-body{line-height:1.7}
${t} .tufte-tile-body p,${t} .tufte-tile-body li{max-width:68ch;text-wrap:pretty}
${t} .tufte-tile-body h2,${t} .tufte-tile-body h3,${t} .tufte-tile-body h4{margin:1.9rem 0 .5rem;color:var(--tufte-ink);font-family:var(--turntide-display);font-weight:800;line-height:1.2;letter-spacing:0;text-transform:none}
${t} .tufte-tile-body h2{font-size:1.45rem}
${t} .tufte-tile-body h3{font-size:1.15rem}
${t} .tufte-tile-body a{color:var(--tufte-accent);text-decoration-color:color-mix(in srgb,var(--tufte-accent) 45%,transparent);text-decoration-thickness:2px;text-underline-offset:.18em}
${t} .tufte-tile-body a:hover{text-decoration-color:currentColor}
${t} .tufte-tile-body code{padding:.08em .38em;border-radius:6px;background:color-mix(in srgb,var(--turntide-foam) 55%,var(--tufte-surface));color:var(--tufte-ink);font-family:${stack('mono')};font-size:.86em}
@media(prefers-color-scheme:dark){${t} .tufte-tile-body code{background:color-mix(in srgb,var(--turntide-tide) 22%,var(--tufte-surface))}}
${t} .tufte-tile-body ul{padding-left:1.2rem}
${t} .tufte-tile-body li{margin:.35rem 0}
${t} .tufte-tile-body li::marker{color:var(--turntide-tide)}
${t} .tufte-tile-body img[src^="/emoji/"]{display:inline-block;width:1.6em;height:1.6em;margin:0 .15em -.4em 0;vertical-align:baseline}
${t} .tufte-tile-body img[src^="/images/"]{display:block;width:100%;margin:1.2rem 0;border-radius:12px;box-shadow:var(--turntide-shadow)}
${t} .tufte-tile-body blockquote{margin:1.2rem 0;padding:.2rem 0 .2rem 1rem;border-left:4px solid var(--turntide-shallows);color:var(--tufte-muted);font-style:italic}
${t} .callout{margin:1.6rem 0 .2rem;padding:.9rem 1.1rem;border:0;border-left:5px solid var(--turntide-tide);border-radius:0 12px 12px 0;background:var(--turntide-sand-wash)}
${t} .callout-label{margin:0 0 .25rem;color:var(--tufte-ink);font-family:var(--turntide-display);font-size:.95rem;font-weight:800}
${t} .callout-label::before{content:"";display:inline-block;width:1.25em;height:1.25em;margin-right:.45em;vertical-align:-.25em;background:url(/emoji/lighthouse.svg) center/contain no-repeat}
${t} .callout>:last-child{margin-bottom:0}
${t} .tufte-tile-body p:has(>a[href^="https://discord.gg/"]:only-child){margin:1.4rem 0}
${t} .tufte-tile-body p>a[href^="https://discord.gg/"]:only-child{display:inline-flex;align-items:center;gap:.6rem;padding:.75rem 1.4rem .75rem 1rem;border-radius:999px;background:var(--turntide-navy);color:var(--turntide-shell);font-family:var(--turntide-display);font-size:1.1rem;font-weight:800;text-decoration:none;box-shadow:var(--turntide-shadow);transition:transform .15s}
${t} .tufte-tile-body p>a[href^="https://discord.gg/"]:only-child::before{content:"";width:1.7em;height:1.7em;background:url(/emoji/anchor.svg) center/contain no-repeat}
${t} .tufte-tile-body p>a[href^="https://discord.gg/"]:only-child:hover{transform:translateY(-1px)}
@media(prefers-color-scheme:dark){${t} .tufte-tile-body p>a[href^="https://discord.gg/"]:only-child{background:var(--turntide-sand);color:var(--turntide-navy)}}
${t} .tufte-tile-body .listing{padding:0;list-style:none}
${t} .tufte-tile-body .listing>li{padding:.7rem 0;border-bottom:1px dashed color-mix(in srgb,var(--tufte-line) 50%,transparent)}
${t} .tufte-footer{margin-top:1.5rem;padding:1.4rem .25rem 0;border-top:0;background:${ripple} repeat-x 0 0/48px 8px;color:var(--tufte-muted);font-size:.8rem}
${t} .tufte-skip{border-radius:999px;background:var(--turntide-sand);color:var(--turntide-navy)}
${t} a:focus-visible{outline:3px solid var(--turntide-tide);outline-offset:2px;border-radius:4px}
@media(max-width:760px){${t}{font-size:16.5px}${t} .tufte-masthead{background:linear-gradient(165deg,var(--turntide-navy) 0%,#123b52 58%,#17707d 100%);padding:1.1rem 1.05rem 2.4rem;border-radius:16px;gap:.75rem .85rem}${t} [data-tufte-navigation]{gap:.35rem}${t} [data-tufte-navigation] a{padding:.32rem .7rem;font-size:.86rem}${t} .tufte-tile{padding:1rem 1.05rem 1.1rem}}
@media(prefers-reduced-motion:reduce){${t} *{transition:none!important}}
@media print{${t}{background:none}${t} .tufte-masthead{background:none;color:var(--tufte-ink);box-shadow:none}${t} .tufte-masthead h1{color:var(--tufte-ink)}${t} .tufte-masthead::after{display:none}${t} .tufte-tile{box-shadow:none}}
`;

export const turntidePresentation = Object.freeze({ name: 'turntide', styles, themeColor: palette.navy });

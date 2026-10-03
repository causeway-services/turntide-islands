import { themeFromDesignTokens } from '@red-cup-engineering/web-theming-service/theming';
import { tokens, turntidePresentation } from './turntide-presentation.mjs';

export default {
  configVersion: 1,
  site: {
    name: 'Turntide Islands',
    baseIri: 'https://turntide.561.group/',
    language: 'en-US',
    license: 'All rights reserved',
    eyebrow: 'Turntide Islands',
    cellLabel: 'From the islands',
    tufteTheme: turntidePresentation,
    menu: [
      { label: 'Home', href: '/' },
      { label: 'Join', href: '/join/' },
      { label: 'The islands', href: '/islands/' },
      { label: 'Events', href: '/events/' },
      { label: 'The settlement', href: '/settlement/' },
      { label: 'Proof of Adaptation', href: '/proof-of-adaptation/' },
      { label: 'Governance', href: '/governance/' },
    ],
  },
  theme: themeFromDesignTokens(tokens, { name: 'turntide-islands' }),
  // Derived by scripts/derive-public.mjs from the community's content: emoji art, charts, faces, icons.
  publicDir: 'public',
  archives: { pageSize: 12 },
  pwa: {
    manifest: {
      name: 'Turntide Islands',
      shortName: 'Turntide',
      description: 'A small archipelago of people learning to live well with climate weirding, together.',
    },
  },
};

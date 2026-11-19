/*
 * Friends' sites, shown as planets in the galaxy easter egg. Clicking one flies there:
 * the trip ends on a screen of the friend's own background colour, then we land on their site
 * with ?warp=galleyhugo, so it can play the end of the jump (see their arrival snippet).
 */
const FRIENDS = [
  {
    id: 'damien',
    name: 'Damien de Montgolfier',
    url: 'https://damiendemontgolfier.fr/',
    // his rust accent, for the planet
    planet: [0.89, 0.42, 0.31],
    // his page background, light and dark (prefers-color-scheme), for the hand-over
    paper: { light: '#f4f1ea', dark: '#16150f' },
    orbit: 26,
    arm: 1,
  },
];

export const WARP_PARAM = 'warp';
export const WARP_FROM = 'galleyhugo';

export default FRIENDS;

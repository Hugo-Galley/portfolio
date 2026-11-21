/*
 * Friends' sites, shown as planets in the galaxy easter egg. Clicking one flies there:
 * the trip ends on a screen of the friend's own background colour, then we land on their site
 * with ?warp=galleyhugo, so it can play the end of the jump (see their arrival snippet).
 */
const FRIENDS = [
  {
    id: 'damien',
    name: 'Damien de Montgolfier',
    url: 'https://portfolio.damiendemontgolfier.fr/',
    // the blue-cyan of his accent gradient (#8b5cf6 → #6d7bff → #22d3ee); the violet end is already ours
    planet: [0.28, 0.66, 0.96],
    // his portfolio's background (a single dark theme), for the hand-over
    paper: { light: '#050505', dark: '#050505' },
    orbit: 26,
    arm: 1,
  },
];

export const WARP_PARAM = 'warp';
export const WARP_FROM = 'galleyhugo';

export default FRIENDS;

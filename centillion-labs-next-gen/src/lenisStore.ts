/**
 * Module-level singleton so RedTeamPage (and any overlay)
 * can pause/resume the Lenis smooth-scroll instance created in Layout.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let instance: any = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setLenis = (l: any) => { instance = l; };
export const getLenis = () => instance;

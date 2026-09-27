/*
  Reference-counted body scroll lock.
  Multiple layers (mobile menu, project overlay, booking dialog)
  can lock scrolling independently — scrolling is only released
  when every layer has unlocked.
*/

let locks = 0;

export function lockScroll(): void {
  locks += 1;
  document.body.style.overflow = "hidden";
}

export function unlockScroll(): void {
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    document.body.style.overflow = "";
  }
}

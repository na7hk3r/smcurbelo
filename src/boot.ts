/**
 * Removes the boot loader that index.html paints before the bundle runs.
 *
 * index.html renders that loader so the first paint is never a blank page and
 * so html.dark can be applied before paint. React knows nothing about that
 * markup, so it is dismissed here once the app has actually committed.
 *
 * It is deliberately not dismissed by a timer: a fixed delay would either cut
 * the loader short on a slow connection or hold the page back behind an
 * invented wait on a fast one.
 *
 * Because this is the overlay's only normal exit, index.html also carries an
 * independent one for the case where this never runs — a boot script there
 * reveals the same overlay's failure presentation when the bundle fails to
 * start, and a <noscript> block covers a visitor whose JavaScript is off. Those
 * are additive: whenever this function does run, the overlay goes away as it
 * always did.
 */
export function dismissBootLoader(): void {
  const loader = document.getElementById('boot-loader');
  if (!loader || loader.classList.contains('boot-loader--leaving')) return;

  const remove = (): void => {
    loader.remove();
  };

  // Reduced motion: drop it outright rather than cross-fading.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    remove();
    return;
  }

  loader.classList.add('boot-loader--leaving');

  // transitionend does not fire while the tab is in the background, and an
  // invisible fixed overlay would swallow every click on the page, so the
  // removal is also forced after the transition's own duration.
  loader.addEventListener('transitionend', remove, { once: true });
  window.setTimeout(remove, 700);
}

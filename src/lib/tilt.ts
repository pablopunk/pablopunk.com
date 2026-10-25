import { animate } from "motion"

export const initializeTilt = () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
  const controller = new AbortController()
  const { signal } = controller
  document.addEventListener("astro:before-swap", () => controller.abort(), {
    once: true,
    signal,
  })

  for (const surface of document.querySelectorAll<HTMLElement>(
    '.surface-card--interactive:not([aria-current="page"]), .surface-button, [data-motion-profile]',
  )) {
    const isButton = surface.classList.contains("surface-button")
    const isSmallButton = surface.classList.contains("surface-button--small")
    const isProfile = surface.hasAttribute("data-motion-profile")
    const isPostCard =
      surface.classList.contains("surface-card") &&
      !surface.hasAttribute("data-motion-project")
    const perspective = isProfile
      ? 250
      : isSmallButton
        ? 180
        : isPostCard
          ? 1000
          : 500
    const tiltX = isProfile
      ? 22
      : isSmallButton
        ? 18
        : isButton
          ? 9
          : isPostCard
            ? 3
            : 12
    const tiltY = isProfile
      ? 22
      : isSmallButton
        ? 14
        : isButton
          ? 6
          : isPostCard
            ? 2
            : 8
    const resetTilt = () => {
      animate(
        surface,
        {
          transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`,
        },
        {
          duration: reducedMotion.matches ? 0 : 0.35,
          ease: [0.22, 1, 0.36, 1],
        },
      )
    }

    surface.addEventListener(
      "pointermove",
      (event) => {
        if (event.pointerType !== "mouse" || reducedMotion.matches) return

        const bounds = surface.getBoundingClientRect()
        const x = Math.max(
          -1,
          Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2),
        )
        const y = Math.max(
          -1,
          Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2),
        )

        animate(
          surface,
          {
            transform: `perspective(${perspective}px) rotateX(${-y * tiltX}deg) rotateY(${x * tiltY}deg)`,
          },
          { duration: 0.18, ease: "easeOut" },
        )
      },
      { signal },
    )
    surface.addEventListener("pointerleave", resetTilt, { signal })
    surface.addEventListener("pointercancel", resetTilt, { signal })
    reducedMotion.addEventListener("change", resetTilt, { signal })
  }
}

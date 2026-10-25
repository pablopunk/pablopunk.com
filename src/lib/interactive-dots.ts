export const initializeInteractiveDots = () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
  const controller = new AbortController()
  const { signal } = controller
  const cleanups: (() => void)[] = []

  for (const surface of document.querySelectorAll<HTMLElement>(
    ".surface-button--primary, .bg-dots",
  )) {
    const isHero = surface.classList.contains("bg-dots")
    const overflow = isHero ? 0 : 48
    const spacing = isHero ? 18 : 12
    const radius = isHero ? 90 : 60
    let width = 0
    let height = 0
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.classList.add("interactive-dots", isHero ? "hero-dots" : "cta-dots")
    svg.setAttribute("aria-hidden", "true")
    surface.prepend(svg)

    let dots: { element: SVGCircleElement; x: number; y: number }[] = []
    let frame = 0
    let cursor: { x: number; y: number } | null = null
    let displaced = false

    const resize = () => {
      width = surface.clientWidth + overflow
      height = surface.clientHeight + overflow
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`)
      dots = []
      svg.replaceChildren()
      for (let x = (width % spacing) / 2; x < width; x += spacing) {
        for (let y = (height % spacing) / 2; y < height; y += spacing) {
          const element = document.createElementNS(
            svg.namespaceURI,
            "circle",
          ) as SVGCircleElement
          element.setAttribute("cx", String(x))
          element.setAttribute("cy", String(y))
          svg.append(element)
          dots.push({ element, x, y })
        }
      }
      displaced = false
    }

    const update = () => {
      frame = 0
      const bounds = svg.getBoundingClientRect()
      const x =
        cursor && bounds.width
          ? ((cursor.x - bounds.left) * width) / bounds.width
          : Number.NEGATIVE_INFINITY
      const y =
        cursor && bounds.height
          ? ((cursor.y - bounds.top) * height) / bounds.height
          : Number.NEGATIVE_INFINITY
      const nearby =
        !reducedMotion.matches &&
        x > -radius &&
        x < width + radius &&
        y > -radius &&
        y < height + radius
      if (!nearby && !displaced) return

      for (const dot of dots) {
        const dx = dot.x - x
        const dy = dot.y - y
        const distance = Math.hypot(dx, dy)
        const force = nearby
          ? Math.max(0, 1 - distance / radius) ** 2 * (isHero ? 36 : 28)
          : 0
        const angle = distance > 0.01 ? Math.atan2(dy, dx) : -Math.PI / 2
        dot.element.style.transform = `translate(${Math.cos(angle) * force}px, ${Math.sin(angle) * force}px)`
      }
      displaced = nearby
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    document.addEventListener(
      "pointermove",
      (event) => {
        cursor =
          event.pointerType === "mouse"
            ? { x: event.clientX, y: event.clientY }
            : null
        schedule()
      },
      { signal },
    )
    document.documentElement.addEventListener(
      "pointerleave",
      () => {
        cursor = null
        schedule()
      },
      { signal },
    )
    window.addEventListener(
      "blur",
      () => {
        cursor = null
        schedule()
      },
      { signal },
    )
    window.addEventListener("scroll", schedule, { signal, passive: true })
    reducedMotion.addEventListener("change", schedule, { signal })
    const observer = new ResizeObserver(resize)
    observer.observe(surface)
    resize()
    cleanups.push(() => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      svg.remove()
    })
  }

  document.addEventListener(
    "astro:before-swap",
    () => {
      controller.abort()
      for (const cleanup of cleanups) cleanup()
    },
    { once: true, signal },
  )
}

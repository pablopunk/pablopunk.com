export const initializeInteractiveDots = () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
  const controller = new AbortController()
  const { signal } = controller
  const cleanups: (() => void)[] = []

  type Dot = {
    element: SVGCircleElement
    x: number
    y: number
    transform: string
  }

  for (const surface of document.querySelectorAll<HTMLElement>(
    ".surface-button--primary, .bg-dots",
  )) {
    const isHero = surface.classList.contains("bg-dots")
    const overflow = isHero ? 0 : 48
    const spacing = isHero ? 18 : 12
    const radius = isHero ? 90 : 60
    let width = 0
    let height = 0
    let gridOffsetX = 0
    let gridOffsetY = 0
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.classList.add("interactive-dots", isHero ? "hero-dots" : "cta-dots")
    svg.setAttribute("aria-hidden", "true")
    surface.prepend(svg)

    let columns: Dot[][] = []
    let displacedDots = new Set<Dot>()
    let frame = 0
    let cursor: { x: number; y: number } | null = null

    const resetDisplacedDots = () => {
      for (const dot of displacedDots) {
        if (dot.transform) {
          dot.transform = ""
          dot.element.style.transform = ""
        }
      }
      displacedDots.clear()
    }

    const resize = () => {
      width = surface.clientWidth + overflow
      height = surface.clientHeight + overflow
      gridOffsetX = (width % spacing) / 2
      gridOffsetY = (height % spacing) / 2
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`)
      cursor = null
      resetDisplacedDots()
      columns = []
      svg.replaceChildren()
      for (let x = gridOffsetX; x < width; x += spacing) {
        const column: Dot[] = []
        for (let y = (height % spacing) / 2; y < height; y += spacing) {
          const element = document.createElementNS(
            svg.namespaceURI,
            "circle",
          ) as SVGCircleElement
          element.setAttribute("cx", String(x))
          element.setAttribute("cy", String(y))
          svg.append(element)
          column.push({ element, x, y, transform: "" })
        }
        columns.push(column)
      }
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
      if (!nearby) {
        resetDisplacedDots()
        return
      }

      const firstColumn = Math.max(
        0,
        Math.ceil((x - radius - gridOffsetX) / spacing),
      )
      const lastColumn = Math.min(
        columns.length - 1,
        Math.floor((x + radius - gridOffsetX) / spacing),
      )
      const firstRow = Math.max(
        0,
        Math.ceil((y - radius - gridOffsetY) / spacing),
      )
      const lastRow = Math.floor((y + radius - gridOffsetY) / spacing)
      const nextDisplaced = new Set<Dot>()

      for (
        let columnIndex = firstColumn;
        columnIndex <= lastColumn;
        columnIndex++
      ) {
        const column = columns[columnIndex]
        const endRow = Math.min(column.length - 1, lastRow)

        for (let rowIndex = firstRow; rowIndex <= endRow; rowIndex++) {
          const dot = column[rowIndex]
          const dx = dot.x - x
          const dy = dot.y - y
          const distance = Math.hypot(dx, dy)
          if (distance >= radius) continue

          const force =
            Math.max(0, 1 - distance / radius) ** 2 * (isHero ? 36 : 28)
          const angle = distance > 0.01 ? Math.atan2(dy, dx) : -Math.PI / 2
          const transform = `translate(${Math.cos(angle) * force}px, ${Math.sin(angle) * force}px)`
          if (dot.transform !== transform) {
            dot.element.style.transform = transform
            dot.transform = transform
          }
          nextDisplaced.add(dot)
        }
      }

      for (const dot of displacedDots) {
        if (!nextDisplaced.has(dot) && dot.transform) {
          dot.element.style.transform = ""
          dot.transform = ""
        }
      }
      displacedDots = nextDisplaced
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
    window.addEventListener(
      "scroll",
      () => {
        cursor = null
        schedule()
      },
      { signal, passive: true },
    )
    window.addEventListener(
      "resize",
      () => {
        cursor = null
        resetDisplacedDots()
        schedule()
      },
      { signal },
    )
    reducedMotion.addEventListener(
      "change",
      () => {
        if (reducedMotion.matches) cursor = null
        schedule()
      },
      { signal },
    )
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

let restoreProfileFocus = false
let activeCleanup: (() => void) | undefined

document.addEventListener(
  "click",
  (event) => {
    if (!(event.target instanceof Element)) return

    const trigger = event.target.closest<HTMLAnchorElement>(
      'a[data-motion-profile][href="/lightbox"]',
    )
    if (trigger) restoreProfileFocus = true
  },
  true,
)

export const initializeLightbox = () => {
  activeCleanup?.()

  const dialog = document.querySelector<HTMLDialogElement>("#lightbox")
  if (!dialog) {
    if (!restoreProfileFocus) return

    restoreProfileFocus = false
    requestAnimationFrame(() => {
      document
        .querySelector<HTMLAnchorElement>(
          'a[data-motion-profile][href="/lightbox"]',
        )
        ?.focus({ preventScroll: true })
    })
    return
  }

  const closeLink = dialog.querySelector<HTMLAnchorElement>(
    "[data-lightbox-close]",
  )
  if (!closeLink) return

  const controller = new AbortController()
  const previousHtmlOverflow = document.documentElement.style.overflow
  const previousBodyOverflow = document.body.style.overflow
  const previousInert = new Map<HTMLElement, boolean>()

  let current: HTMLElement = dialog
  while (current.parentElement) {
    const parent = current.parentElement
    for (const sibling of parent.children) {
      if (sibling === current) continue

      const element = sibling as HTMLElement
      previousInert.set(element, element.inert)
      element.inert = true
    }
    current = parent
  }

  const cleanup = () => {
    if (dialog.open) dialog.close()
    document.documentElement.style.overflow = previousHtmlOverflow
    document.body.style.overflow = previousBodyOverflow
    for (const [element, inert] of previousInert) element.inert = inert
    controller.abort()
    if (activeCleanup === cleanup) activeCleanup = undefined
  }

  activeCleanup = cleanup
  dialog.addEventListener(
    "cancel",
    (event) => {
      event.preventDefault()
      closeLink.click()
    },
    { signal: controller.signal },
  )
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Tab") return

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [contenteditable="true"], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element) =>
          element.tabIndex >= 0 && element.getClientRects().length > 0,
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (!first || !last) {
        event.preventDefault()
        dialog.focus()
      } else if (
        !dialog.contains(document.activeElement) ||
        (event.shiftKey && document.activeElement === first)
      ) {
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    },
    { signal: controller.signal },
  )
  document.addEventListener("astro:before-swap", cleanup, { once: true })

  document.documentElement.style.overflow = "hidden"
  document.body.style.overflow = "hidden"
  dialog.removeAttribute("open")
  dialog.showModal()
  closeLink.focus({ preventScroll: true })
}

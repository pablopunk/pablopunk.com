const loadDeferredStyles = () => {
  const addStylesNode = document.getElementById('deferred-styles')
  const replacement = document.createElement('div')
  replacement.innerHTML = addStylesNode.textContent
  document.body.appendChild(replacement)
  addStylesNode.parentElement.removeChild(addStylesNode)
}

const raf =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame

if (raf) {
  raf(() => {
    window.setTimeout(loadDeferredStyles, 0)
  })
} else window.addEventListener('load', loadDeferredStyles)

const fontFaceObserver = require('fontfaceobserver')

const fonts = () => {
  const link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css?family=Amatic+SC|Lora|Titillium+Web'
  link.rel = 'stylesheet'

  document.head.appendChild(link)

  const AmaticSC = new fontFaceObserver('Amatic SC')
  const Lora = new fontFaceObserver('Lora')
  const TitilliumWeb = new fontFaceObserver('Titillium Web')

  Promise.all([
    AmaticSC.load(),
    Lora.load(),
    TitilliumWeb.load()
  ]).then(() => {
    document.documentElement.classList.add('amatic')
    document.documentElement.classList.add('lora')
    document.documentElement.classList.add('titillium')
  })
}

export default fonts

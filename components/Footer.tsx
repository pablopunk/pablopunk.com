import { _, locales } from 'lib/locales'
import { useRouter } from 'next/router'

const Footer = () => {
  const { locale } = useRouter()

  return (
    <footer
      className="items-center justify-around hidden w-full p-4 mx-auto md:flex bg-bg2 opacity-80"
      style={{ height: 'var(--footer-height)' }}
    >
      <p>
        {locales.map((l) => {
          return locale === l ? (
            <span key={l}> {l} </span>
          ) : (
            <a href={`/${l}`} key={l}>
              {l}
            </a>
          )
        })}
      </p>
      <p>© Pablo Varela {new Date().getFullYear()}</p>
      <p>
        <a href="https://github.com/pablopunk/pablopunk.com">
          {_('Source code', locale)}
        </a>
      </p>
    </footer>
  )
}

export default Footer

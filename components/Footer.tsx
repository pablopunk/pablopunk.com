import { locales, emojiForLocale } from 'locales'
import { useRouter } from 'next/router'

export const Footer = ({ copyright, source }) => {
  const { locale } = useRouter()

  return (
    <footer
      className="items-center justify-around hidden w-full p-4 mx-auto md:flex bg-bg2 opacity-80"
      style={{ height: 'var(--footer-height)' }}
    >
      <div className="relative">
        {locales.map((l) => {
          return locale === l ? (
            <div
              key={l}
              className="inline relative rotate-[-15deg] mx-1 after:content-['•'] after:text-accent after:absolute after:top-2 after:ml-[-50%] after:translate-x-[-25%] font-bold"
            >
              {emojiForLocale[l]}
            </div>
          ) : (
            <a
              href={`/${l}`}
              key={l}
              className="rotate-[-15deg] mx-1 opacity-50 transition-opacity hover:opacity-100"
            >
              {emojiForLocale[l]}
            </a>
          )
        })}
      </div>
      <div>
        {copyright} {new Date().getFullYear()}
      </div>
      <div>
        <a href="https://github.com/pablopunk/pablopunk.com">{source}</a>
      </div>
    </footer>
  )
}

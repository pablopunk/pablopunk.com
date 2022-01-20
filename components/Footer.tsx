import { locales, emojiForLocale } from 'locales'
import { useRouter } from 'next/router'
import { Button } from './Button'

export const Footer = ({ copyright, source }) => {
  const { locale } = useRouter()

  return (
    <footer
      className="items-center justify-around hidden w-full p-4 mx-auto md:flex bg-bg2 opacity-80"
      style={{ height: 'var(--footer-height)' }}
    >
      <div className="flex gap-x-1">
        {locales.map((l) => {
          return locale === l ? (
            <Button
              rounded
              disabled
              type="outline"
              href={`/${l}`}
              className="rotate-[-15deg]"
            >
              {emojiForLocale[l]}
            </Button>
          ) : (
            <Button
              rounded
              type="outline"
              href={`/${l}`}
              className="rotate-[-15deg]"
            >
              {emojiForLocale[l]}
            </Button>
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

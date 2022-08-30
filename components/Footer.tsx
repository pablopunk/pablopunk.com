import { locales } from 'locales'
import { useRouter } from 'next/router'
import { Button } from './Button'
import { _ } from 'locales'
import { SITE_COPYRIGHT, SITE_REPO } from 'config'

export const Footer = () => {
  const { locale } = useRouter()

  return (
    <footer
      className="items-center overflow-hidden justify-around hidden w-full p-4 mx-auto md:flex bg-bg-2 opacity-80"
      style={{ height: 'var(--footer-height)' }}
    >
      <div className="flex gap-x-1">
        {locales.map((l) => {
          return (
            <Button
              rounded
              disabled={locale === l}
              onClick={() => {
                window.location.href = `/${l}`
              }}
              className="rotate-[-15deg]"
              key={`change-locale-${l}`}
              title={locale === l ? null : 'Change language'}
            >
              <img
                src={`/svg/locales/${l}.svg`}
                style={{ width: '20px', height: '20px' }}
              />
            </Button>
          )
        })}
      </div>
      <div>
        © {SITE_COPYRIGHT} {new Date().getFullYear()}
      </div>
      <div>
        <a href={SITE_REPO}>{_('Source', locale)}</a>
      </div>
    </footer>
  )
}

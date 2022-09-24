import { useRouter } from 'next/router'
import classNames from 'classnames'
import Link from 'next/link'

export const Footer = () => {
  const { locale, locales } = useRouter()

  return (
    <footer
      className="items-center overflow-hidden justify-around hidden w-full p-4 mx-auto md:flex opacity-80"
      style={{ height: 'var(--footer-height)' }}
    >
      <div className="flex gap-x-1">
        {locales.map((l) => {
          return (
            <Link locale={l} href="#" key={`locale-${l}`}>
              <button
                disabled={locale === l}
                className={classNames("rotate-[-15deg] rounded-full p-1 transition", {
                  'bg-primary-1 cursor-not-allowed': locale === l,
                  'bg-primary-6 hover:opacity-60': locale !== l,
                })}
                key={`change-locale-${l}`}
                title={locale === l ? null : 'Change language'}
              >
                <img
                  src={`/svg/locales/${l}.svg`}
                  style={{ width: '20px', height: '20px' }}
                /></button>
            </Link>
          )
        })}
      </div>
    </footer>
  )
}

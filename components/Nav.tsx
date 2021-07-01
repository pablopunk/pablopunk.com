import React from 'react'
import Link from 'next/link'
import { RiMoonClearLine, RiSunLine } from 'react-icons/ri'
import { FaCreditCard } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { _ } from 'lib/locales'
import { ButtonType } from 'storyblok/types'

const ChangeThemeButton = () => {
  const { locale } = useRouter()
  const [mounted, mountedSet] = React.useState(false)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => mountedSet(true), [])

  if (!mounted) {
    return null
  }

  return (
    <a
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }}
      title={_('Change theme', locale)}
      className="text-current"
    >
      {theme === 'dark' ? (
        <span>
          <RiMoonClearLine />
        </span>
      ) : (
        <span>
          <RiSunLine />
        </span>
      )}
    </a>
  )
}

const Nav = ({ main = [] }) => {
  const { locale, asPath } = useRouter()

  return (
    <div
      className="relative z-20 flex items-center justify-between no-scrollbar"
      style={{ height: 'var(--nav-height)' }}
    >
      <nav className="flex">
        {main.map((button: ButtonType) => {
          let current = button.link.url === asPath

          return (
            <div
              key={button.link.url}
              className={`p-2 text-lg font-bold uppercase ${
                current ? 'hidden md:block' : ''
              }`}
            >
              <Link href={button.link.url} locale={locale}>
                <a
                  className={
                    current
                      ? 'md:text-accent2'
                      : 'text-fg md:hover:text-accent2'
                  }
                >
                  {button.text}
                </a>
              </Link>
            </div>
          )
        })}
      </nav>
      <div className="relative flex mt-4 mr-3 text-xl">
        <div className="z-30 p-2 text-3xl transition-colors rounded-full shadow cursor-pointer text-accent hover:text-accent2 hover:bg-bg bg-bg2 md:text-xl">
          <ChangeThemeButton />
        </div>
        <a
          href="/donate"
          title={_('Sponsor', locale)}
          className="hidden p-2 ml-2 rounded-full shadow text-accent hover:text-accent2 hover:bg-bg bg-bg2 md:block"
        >
          <FaCreditCard />
        </a>
      </div>
    </div>
  )
}

export default Nav

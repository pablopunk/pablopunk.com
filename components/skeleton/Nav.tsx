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
      className="relative z-20 flex items-center justify-between overflow-auto no-scrollbar"
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
                      : 'text-accent md:hover:text-accent2'
                  }
                >
                  {button.text}
                </a>
              </Link>
            </div>
          )
        })}
      </nav>
      <div className="relative flex mt-2 mr-2 text-xl text-accent2">
        <div className="z-30 p-1 text-3xl transition-colors rounded shadow cursor-pointer hover:text-accent hover:bg-bg bg-bg2 md:text-xl">
          <ChangeThemeButton />
        </div>
        <a
          href="/donate"
          title={_('Sponsor', locale)}
          className="hidden p-1 ml-2 rounded shadow hover:text-accent hover:bg-bg bg-bg2 md:block"
        >
          <FaCreditCard />
        </a>
      </div>
    </div>
  )
}

export default Nav

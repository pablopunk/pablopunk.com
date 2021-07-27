import React from 'react'
import Link from 'next/link'
import { RiMoonClearLine, RiSunLine } from 'react-icons/ri'
import { FaCreditCard } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { _ } from 'locales'
import { ButtonType } from 'cms/storyblok/types'
import useTheme from 'hooks/useTheme'

const ChangeThemeButton = () => {
  const { locale } = useRouter()
  const [mounted, mountedSet] = React.useState(false)
  const [theme, toggleTheme] = useTheme()

  React.useEffect(() => mountedSet(true), [])

  if (!mounted) {
    return null
  }

  return (
    <a
      onClick={toggleTheme}
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
      className="relative z-20 flex items-center justify-between px-1 no-scrollbar"
      style={{ height: 'var(--nav-height)' }}
    >
      <nav className="flex">
        {main.map((button: ButtonType) => {
          let current = button.link.url === asPath

          return (
            <div
              key={button.link.url}
              className={`px-2 py-1 text-lg font-bold uppercase ${
                current ? 'hidden md:block' : ''
              }`}
            >
              <Link href={button.link.url} locale={locale}>
                <a
                  className={
                    current
                      ? 'md:text-accent3'
                      : 'text-fg md:hover:text-accent3'
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
        <div className="z-30 p-2 text-3xl transition-colors border rounded-full shadow cursor-pointer text-accent3 hover:text-accent3-alt hover:bg-bg bg-bg2 md:text-xl">
          <ChangeThemeButton />
        </div>
        <a
          href="/donate"
          title={_('Sponsor', locale)}
          className="hidden p-2 ml-2 border rounded-full shadow text-accent3 hover:text-accent3-alt hover:bg-bg bg-bg2 md:block"
        >
          <FaCreditCard />
        </a>
      </div>
    </div>
  )
}

export default Nav

import React from 'react'
import Link from 'next/link'
import { RiMoonClearLine, RiSunLine } from 'react-icons/ri'
import { FaCreditCard } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { _ } from 'lib/locales'

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

const Nav = ({ main = [], path }) => {
  const { locale } = useRouter()

  return (
    <div
      className="flex items-center justify-between overflow-auto no-scrollbar"
      style={{ height: 'var(--nav-height)' }}
    >
      <nav className="flex">
        {main.map((link) => {
          let current = link.link === path

          return (
            <div
              key={link.link}
              className={`px-3 py-2 text-lg font-bold uppercase ${
                current ? 'hidden md:block' : ''
              }`}
            >
              <Link href={'/' + link.link} locale={locale}>
                <a
                  className={
                    current
                      ? 'md:text-accent2'
                      : 'text-accent md:hover:text-accent2'
                  }
                >
                  {link.text}
                </a>
              </Link>
            </div>
          )
        })}
      </nav>
      <div className="flex text-xl text-accent2 mt-2 mr-2 relative">
        <div className="cursor-pointer hover:text-accent hover:bg-bg bg-bg2 p-1 rounded shadow text-3xl md:text-xl">
          <ChangeThemeButton />
        </div>
        <a
          href="/donate"
          title={_('Sponsor', locale)}
          className="ml-2 hover:text-accent hover:bg-bg bg-bg2 p-1 rounded shadow hidden md:block"
        >
          <FaCreditCard />
        </a>
      </div>
    </div>
  )
}

export default Nav

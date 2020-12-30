import React from 'react'
import Link from 'next/link'
import { RiMoonClearLine, RiSunLine } from 'react-icons/ri'
import { FaCreditCard } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'

const ChangeThemeButton = () => {
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
      title="Toggle light/dark colors"
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
      className="flex items-center justify-between overflow-scroll"
      style={{ height: 'var(--nav-height)' }}
    >
      <nav className="flex">
        {main.map((link) => {
          let current = link.link === path

          return (
            <div
              key={link.id}
              className={`px-3 py-2 text-lg font-bold uppercase ${
                current ? 'hidden md:block' : ''
              }`}
            >
              <Link href={'/' + link.link} locale={locale}>
                <a
                  className={
                    current ? 'text-accent2' : 'text-accent hover:text-accent2'
                  }
                >
                  {link.text}
                </a>
              </Link>
            </div>
          )
        })}
      </nav>
      <div className="flex px-3 py-2 text-2xl text-accent2">
        <div className="mr-2 cursor-pointer hover:text-accent">
          <ChangeThemeButton />
        </div>
        <a href="/donate" title="Donate" className="hover:text-accent">
          <FaCreditCard />
        </a>
      </div>
    </div>
  )
}

export default Nav

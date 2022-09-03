import useTheme from 'hooks/useTheme'
import { getJson, normalizeHref } from 'lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FaSpotify } from 'react-icons/fa'
import { FiCoffee } from 'react-icons/fi'
import { RiContactsFill, RiMoonClearLine, RiSunLine } from 'react-icons/ri'
import { animated, useSpring } from 'react-spring'
import useSWR from 'swr'
import { Button } from './Button'
import { useTranslation } from 'hooks/useTranslation'

const MAX_SONG = 21
const MAX_ARTIST = 15

type Song = {
  album: string
  albumImageUrl: string
  artist: string
  isPlaying: boolean
  songUrl: string
  title: string
}

const ChangeThemeButton = () => {
  const [mounted, mountedSet] = React.useState(false)
  const [theme, toggleTheme] = useTheme()

  React.useEffect(() => mountedSet(true), [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      onClick={toggleTheme}
      title={'Change theme'}
      rounded
      className="toggle-theme-button"
      size="lg"
    >
      {theme === 'dark' ? <RiMoonClearLine /> : <RiSunLine />}
    </Button>
  )
}

type Link = {
  href: string
  text: string
}
const LINKS = [
  { href: '/', text: 'Home' },
  {
    href: '/portfolio',
    text: 'Work',
  },
  {
    href: '/me',
    text: 'Bio',
  },
  {
    href: '/blog',
    text: 'Blog',
  },
  {
    href: 'https://cv.pablopunk.com',
    text: 'CV',
  },
]

export const Nav = () => {
  const { locale, asPath } = useRouter()
  const { data: nowPlaying, isValidating } = useSWR<Song>(
    '/api/now-playing',
    getJson,
  )
  const spotifyStyles = useSpring({
    y: nowPlaying == null || isValidating ? -100 : 0,
  })
  const boxStyles =
    'items-center hidden ml-2 text-xs transition-colors bg-primary-4 border border-primary-6 rounded-md opacity-70 md:flex hover:bg-bg'
  const { _ } = useTranslation()

  return (
    <div
      className="relative z-20 flex flex-col items-center justify-between px-1 md:flex-row no-scrollbar"
      style={{ height: 'var(--nav-height)' }}
    >
      <nav className="flex my-2 md:my-0">
        {LINKS.map((link) => {
          const url = normalizeHref(link.href)
          let current = asPath === '/' ? url === '/' : url.includes(asPath)

          return (
            <div key={url} className="px-2 py-1 text-xl font-bold uppercase">
              <Link href={url} locale={locale}>
                <a
                  className={
                    current
                      ? 'md:text-primary-10'
                      : 'text-fg md:hover:text-primary-8'
                  }
                >
                  {_(link.text)}
                </a>
              </Link>
            </div>
          )
        })}
        {nowPlaying?.isPlaying && (
          <animated.a
            className={boxStyles}
            href={nowPlaying.songUrl}
            style={spotifyStyles}
          >
            <FaSpotify className="mx-2 text-xl min-w-[1em]" />
            <div className="mr-1 whitespace-nowrap">{_('Now playing')}</div>
            <div
              className="mr-1 text-fg whitespace-nowrap"
              title={nowPlaying.title}
            >
              {nowPlaying.title.length > MAX_SONG
                ? nowPlaying.title.substring(0, MAX_SONG) + '...'
                : nowPlaying.title}
            </div>
            <div className="mr-1">
              <RiContactsFill />
            </div>
            <div className="mr-1 whitespace-nowrap">
              {nowPlaying.artist.length > MAX_ARTIST
                ? nowPlaying.artist.substring(0, MAX_ARTIST) + '...'
                : nowPlaying.artist}
            </div>
            <img
              src={nowPlaying.albumImageUrl}
              alt=""
              width="30"
              className="mr-1 transition-all filter group-hover:blur-sm"
            />
          </animated.a>
        )}
        {nowPlaying && !nowPlaying.isPlaying && (
          <animated.a
            className={boxStyles}
            href="https://open.spotify.com/user/pablovarela12"
            style={spotifyStyles}
          >
            <FaSpotify className="mx-2 text-xl" />
            <div className="mr-2">{_('Not playing anything')}</div>
          </animated.a>
        )}
      </nav>
      <div className="flex mb-0 text-xl md:mt-4 md:mr-3 gap-x-2">
        <ChangeThemeButton />
        <Button href="/donate" rounded size="lg" title={_('Buy me a coffee')}>
          <FiCoffee />
        </Button>
      </div>
    </div>
  )
}

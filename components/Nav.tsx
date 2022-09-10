import classNames from 'classnames'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'hooks/useTranslation'
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
      Icon={theme === 'dark' ? RiMoonClearLine : RiSunLine}
    />
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
      className="relative z-20 flex items-center justify-between px-1 no-scrollbar"
      style={{ height: 'var(--nav-height)' }}
    >
      <nav className="flex pl-2 my-2 md:my-0">
        {LINKS.map((link) => {
          const url = normalizeHref(link.href)
          const isCurrentPage =
            asPath === '/' ? url === '/' : url.includes(asPath)

          return (
            <div key={url} className="text-xl font-bold uppercase">
              <Link href={url} locale={locale}>
                <a
                  className={classNames('mx-1', {
                    'text-primary-10 hidden md:block ': isCurrentPage,
                    'text-fg md:hover:text-primary-8': !isCurrentPage,
                  })}
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
      <div className="flex flex-col md:flex-row mb-0 text-xl mt-2 mr-2 gap-2 absolute md:relative right-0 top-0">
        <ChangeThemeButton />
        <Button href="/donate" rounded title={_('Buy me a coffee')}>
          <FiCoffee />
        </Button>
      </div>
    </div>
  )
}

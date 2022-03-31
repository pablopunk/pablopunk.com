import React from 'react'
import Link from 'next/link'
import { RiMoonClearLine, RiSunLine, RiContactsFill } from 'react-icons/ri'
import { FaSpotify } from 'react-icons/fa'
import { FiCoffee } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { _ } from 'locales'
import { ButtonType, NavType } from 'cms/storyblok/types'
import useTheme from 'hooks/useTheme'
import useSWR from 'swr'
import { getJson, normalizeHref } from 'lib/utils'
import { useSpring, animated } from 'react-spring'
import { Button } from './Button'

const MAX_SONG = 21
const MAX_ARTIST = 15

const ChangeThemeButton = () => {
  const { locale } = useRouter()
  const [mounted, mountedSet] = React.useState(false)
  const [theme, toggleTheme] = useTheme()

  React.useEffect(() => mountedSet(true), [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      onClick={toggleTheme}
      title={_('Change theme', locale)}
      rounded
      className="toggle-theme-button"
      size="lg"
    >
      {theme === 'dark' ? <RiMoonClearLine /> : <RiSunLine />}
    </Button>
  )
}

export const Nav = (nav: NavType) => {
  if (!nav?.content) {
    return null
  }

  const { main } = nav?.content
  const { locale, asPath } = useRouter()
  const { data: nowPlaying, isValidating } = useSWR<{
    album: string
    albumImageUrl: string
    artist: string
    isPlaying: boolean
    songUrl: string
    title: string
  }>('/api/now-playing', getJson)
  const spotifyStyles = useSpring({
    y: nowPlaying == null || isValidating ? -100 : 0,
  })
  const boxStyles =
    'items-center hidden ml-2 text-xs transition-colors bg-primary-4 border border-primary-6 rounded-md opacity-70 md:flex hover:bg-bg'

  return (
    <div
      className="relative z-20 flex flex-col items-center justify-between px-1 md:flex-row no-scrollbar"
      style={{ height: 'var(--nav-height)' }}
    >
      <nav className="flex my-2 md:my-0">
        {main.map((button: ButtonType) => {
          const url = normalizeHref(button.link?.url || button.link?.cached_url)
          let current =
            asPath === '/' ? url.includes('/home') : url.includes(asPath)

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
                  {button.text}
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
            <div className="mr-1 whitespace-nowrap">
              {_('Now playing', locale)}
            </div>
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
            <div className="mr-2">{_('Not playing anything', locale)}</div>
          </animated.a>
        )}
      </nav>
      <div className="flex mb-0 text-xl md:mt-4 md:mr-3 gap-x-2">
        <ChangeThemeButton />
        <Button
          href="/donate"
          rounded
          size="lg"
          title={_('Give me money', locale)}
        >
          <FiCoffee />
        </Button>
      </div>
    </div>
  )
}

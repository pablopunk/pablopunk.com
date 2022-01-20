import React from 'react'
import Link from 'next/link'
import { RiMoonClearLine, RiSunLine, RiContactsFill } from 'react-icons/ri'
import { FaCreditCard, FaSpotify } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { _ } from 'locales'
import { ButtonType, NavType } from 'cms/storyblok/types'
import useTheme from 'hooks/useTheme'
import useSWR from 'swr'
import { getJson } from 'lib/utils'
import { useSpring, animated } from 'react-spring'

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
    <a
      onClick={toggleTheme}
      title={_('Change theme', locale)}
      className="text-current toggle-theme-button"
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

const Nav = (nav: NavType) => {
  const { main } = nav?.content
  if (!main) {
    return null
  }

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
        {nowPlaying?.isPlaying && (
          <animated.a
            className="items-center hidden ml-2 text-xs transition-colors border rounded-md md:flex bg-bg2 hover:bg-bg group max-w-[426px]"
            href={nowPlaying.songUrl}
            style={spotifyStyles}
          >
            <FaSpotify className="mx-2 text-xl min-w-[1em]" />
            <div className="mr-1">{_('Now playing', locale)}</div>
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
            className="items-center hidden ml-2 text-xs transition-colors border rounded-md opacity-70 md:flex bg-bg2 hover:bg-bg"
            href="https://open.spotify.com/user/pablovarela12"
            style={spotifyStyles}
          >
            <FaSpotify className="mx-2 text-xl" />
            <div className="mr-1">{_('Not playing anything', locale)}</div>
          </animated.a>
        )}
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

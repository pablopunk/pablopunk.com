import classNames from 'classnames'
import { Button } from '~/components/neon/Button'
import useTheme from '~/hooks/useTheme'
import { useTranslation } from '~/hooks/useTranslation'
import { getJson } from '~/lib/utils'
import { useRouter } from 'next/router'
import React from 'react'
import { FaSpotify } from 'react-icons/fa'
import { FiCoffee } from 'react-icons/fi'
import { MdHome } from 'react-icons/md'
import {
  RiContactsFill,
  RiLogoutBoxLine,
  RiMoonClearLine,
  RiSunLine,
  RiTerminalBoxLine,
} from 'react-icons/ri'
import { animated, useSpring } from 'react-spring'
import { useUser } from '@supabase/auth-helpers-react'
import useSWR from 'swr'

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
      title="Change theme"
      className="toggle-theme-button"
      RightIcon={theme === 'dark' ? RiMoonClearLine : RiSunLine}
    />
  )
}

// type Link = {
//   href: string
//   text: string
// }
// const LINKS = [
//   { href: '/', text: 'Home' },
//   {
//     href: '/portfolio',
//     text: 'Work',
//   },
//   {
//     href: '/me',
//     text: 'Bio',
//   },
//   {
//     href: '/blog',
//     text: 'Blog',
//   },
//   {
//     href: 'https://cv.pablopunk.com',
//     text: 'CV',
//   },
// ]

export const Nav = () => {
  const { data: nowPlaying, isValidating } = useSWR<Song>(
    '/api/now-playing',
    getJson,
  )
  const spotifyStyles = useSpring({
    y: nowPlaying == null || isValidating ? -100 : 0,
  })
  const spotifyBoxStyles =
    'items-center hidden text-xs transition-colors bg-primary-1 text-primary-7 border border-primary-2 rounded-md opacity-80 md:flex hover:bg-primary-3 min-h-[32px]'
  const { _ } = useTranslation()
  const { pathname } = useRouter()
  const locationIsHome = pathname === '/'
  const { user } = useUser()

  return (
    <nav
      className="relative z-20 flex items-center justify-between no-scrollbar w-full"
      style={{ height: 'var(--nav-height)' }}
    >
      <div className={classNames('flex justify-start gap-2 ml-2 w-[400px]')}>
        {!locationIsHome && (
          <Button href="/" LeftIcon={MdHome} title={_('Go home')} />
        )}
        {user && (
          <>
            <Button
              href="/api/auth/logout"
              title={_('Logout')}
              LeftIcon={RiLogoutBoxLine}
            />
            <Button
              href="/dev"
              title={_('God mode')}
              LeftIcon={RiTerminalBoxLine}
            />
          </>
        )}
      </div>
      {nowPlaying?.isPlaying && (
        <animated.a
          className={spotifyBoxStyles}
          href={nowPlaying.songUrl}
          style={spotifyStyles}
        >
          <FaSpotify className="mx-2 text-xl min-w-[1em]" />
          <div className="mr-1 whitespace-nowrap">{_('Now playing')}</div>
          <div
            className="mr-1 text-primary-9 whitespace-nowrap"
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
          className={spotifyBoxStyles}
          href="https://open.spotify.com/user/pablovarela12"
          style={spotifyStyles}
        >
          <FaSpotify className="mx-2 text-xl" />
          <div className="pr-2 whitespace-nowrap">{_('Not playing anything')}</div>
        </animated.a>
      )}
      <div className="flex justify-end gap-2 mr-2 w-[400px]">
        <ChangeThemeButton />
        <Button
          href="https://www.buymeacoffee.com/pablopunk"
          title={_('Buy me a coffee')}
          RightIcon={FiCoffee}
        />
      </div>
    </nav>
  )
}

import { T } from '~/components/T'
import { pageStaticProps } from '~/middleware'
import {
  FaArrowRight,
  FaGithub,
  FaGraduationCap,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa'
import { MdMail } from 'react-icons/md'
import { GetStaticProps } from 'next'
import { Post, getPost } from '~/models/post'
import classNames from 'classnames'
import Avatar, { AvatarProps } from 'boring-avatars'
import { Button } from 'components/boring/Button'
import Link from 'next/link'
import { useRandomFromArrayInterval } from 'hooks/useRandomFromArray'

type Props = {
  featuredPosts: Post[]
}

export default function Home({ featuredPosts }: Props) {
  const avatarVariant = useRandomFromArrayInterval<AvatarProps['variant']>(
    ['pixel', 'beam', 'marble', 'sunset', 'ring', 'bauhaus'],
    'sunset',
    3000,
  )

  return (
    <div className="flex flex-col gap-3 items-start justify-center fill-height max-w-sm mx-auto px-3">
      <div className="flex items-center gap-3 relative">
        <Avatar
          size={36}
          name="Pablo Varela"
          variant={avatarVariant}
          colors={['#FCCB7E', '#F7A399', '#F48FB1', '#A6A1E1', '#B8E1F9']}
        />
        <h1 className="text-4xl font-bold whitespace-nowrap">Pablo Varela</h1>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center justify-center">
            <Button
              href="https://instagram.com/pablopunk"
              RightIcon={FaInstagram}
              title="Instagram"
            />
            <Button
              href="https://twitter.com/pablopunk"
              RightIcon={FaTwitter}
              title="Twitter"
            />
            <Button
              href="mailto:pablo@pablopunk.com"
              RightIcon={MdMail}
              title="Email"
            />
          </div>
          <div className="flex gap-2 items-center justify-center">
            <Button
              href="https://github.com/pablopunk"
              RightIcon={FaGithub}
              title="GitHub"
            />
            <Button
              href="https://cv.pablopunk.com"
              RightIcon={FaGraduationCap}
              title="CV"
            />
            <Button
              href="https://linkedin.com/in/pablopunk"
              RightIcon={FaLinkedin}
              title="LinkedIn"
            />
          </div>
        </div>
      </div>

      <p className="text-sm">
        <T>Full-stack developer at</T> <a href="https://maze.co">Maze</a>{' '}
        <sup>
          <Link href="/timeline">
            <T>previous</T>
          </Link>
        </sup>
      </p>

      <p className="text-sm">
        Author of{' '}
        <a href="https://github.com/pablopunk/nextjs-redirects">
          nextjs-redirect
        </a>
        <sup className="ml-1">
          +500k{' '}
          <Link href="/code">
            <T>downloads</T>
          </Link>
        </sup>
        <br />
        and <a href="https://vimcolors.org">vimcolors.org</a>
      </p>

      <h3 className="border-b w-full max-w-sm mt-2">
        <Link href="/blog">Blog</Link>
      </h3>

      <div className="flex flex-col gap-1">
        {featuredPosts.map((post, index) => (
          <a
            href={`/posts/${post.slug}`}
            className={classNames('flex gap-1 items-start text-xs', {
              'text-secondary-8': index === 0,
            })}
            key={post.id}
          >
            <div className="pt-[2.5px]">
              <FaArrowRight />
            </div>
            <span>{post.title}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const pageProps = await pageStaticProps(ctx)
  const featuredPosts = await Promise.all([
    getPost({ id: 16 }),
    getPost({ id: 9 }),
    getPost({ id: 10 }),
  ])

  return {
    ...pageProps,
    props: {
      ...pageProps.props,
      featuredPosts,
    },
  }
}

import { Card } from '~/components/boring/Card'
import { T } from '~/components/T'
import { useTranslation } from '~/hooks/useTranslation'
import { pageStaticProps } from '~/middleware'
import {
  FaArrowRight,
  FaGithub,
  FaGraduationCap,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa'
import { HiOutlineStar, HiTerminal } from 'react-icons/hi'
import { MdFace, MdHomeWork, MdLibraryBooks, MdMail } from 'react-icons/md'
import { AiFillCalendar } from 'react-icons/ai'
import { GetStaticProps } from 'next'
import { getPost } from '~/db/supabase/tables/posts'
import { Post } from '~/db/supabase/types'

type Props = {
  featuredPosts: Post[]
}

export default function Home({ featuredPosts }: Props) {
  const { _ } = useTranslation()
  return (
    <div className='fill-height flex items-center'>
      <div className="max-w-md mx-auto px-4 py-2 flex flex-col gap-4 md:grid md:grid-cols-2 md:max-w-3xl justify-center">
        <Card
          title={_('Me')}
          className="order-first md:order-none"
          Icon={MdFace}
          CTA={[
            {
              LeftIcon: FaTwitter,
              title: '@pablopunk',
              href: 'https://twitter.com/pablopunk',
            },
            {
              LeftIcon: FaInstagram,
              title: '@pablopunk',
              href: 'https://instagram.com/pablopunk',
            },
            {
              LeftIcon: MdMail,
              href: 'mailto:pablo@pablopunk.com',
              title: "pablo@pablopunk.com"
            },
          ]}
        >
          <div className="mb-1">
            <T>
              My name is Pablo Varela and I live and work remotely from{' '}
              <a href="https://www.google.com/search?q=pontevedra&tbm=isch">
                Pontevedra, Galiza
              </a>
              .
            </T>
          </div>
        </Card>
        <Card
          title={_('Work')}
          Icon={MdHomeWork}
          CTA={[
            {
              title: 'LinkedIn',
              LeftIcon: FaLinkedin,
              href: 'https://linkedin.com/in/pablopunk',
            },
            {
              title: _('Timeline'),
              LeftIcon: AiFillCalendar,
              href: '/timeline',
            },
            {
              title: 'CV',
              LeftIcon: FaGraduationCap,
              href: 'https://cv.pablopunk.com',
            },
          ]}
        >
          <T>
            I work at <a href="https://maze.co">Maze</a> as full-stack
            developer.
          </T>
        </Card>
        <Card
          title="Blog"
          Icon={MdLibraryBooks}
          CTA={{
            text: _('Latest posts'),
            RightIcon: FaArrowRight,
            href: '/blog',
          }}
        >
          <div className="flex flex-col gap-1">
            {featuredPosts.map((post) => (
              <a
                href={`/posts/${post.slug}`}
                className="flex gap-1 items-start text-xs"
                key={post.id}
              >
                <div className="pt-[2.5px]">
                  <FaArrowRight />
                </div>
                <span>{post.title}</span>
              </a>
            ))}
          </div>
        </Card>
        <Card
          title={_('Code')}
          Icon={HiTerminal}
          CTA={[
            {
              title: 'Github',
              LeftIcon: FaGithub,
              href: 'https://github.com/pablopunk',
            },
            {
              title: _('Featured repos'),
              LeftIcon: HiOutlineStar,
              href: '/code',
            },
          ]}
        >
          <T>
            All of my personal projects and open-source contributions can be
            found on <b>Github</b>.
          </T>
        </Card>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const pageProps = await pageStaticProps(ctx)
  const featuredPosts = await Promise.all([
    getPost({ id: 9 }),
    getPost({ id: 10 }),
    getPost({ id: 11 }),
  ])

  return {
    ...pageProps,
    props: {
      ...pageProps.props,
      featuredPosts
    },
  }
}

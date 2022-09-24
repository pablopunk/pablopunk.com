import { T } from 'components/T'
import { pageStaticProps } from 'middleware'
import { MdHomeWork, MdFace, MdLibraryBooks, MdMail } from 'react-icons/md'
import { HiTerminal } from 'react-icons/hi'
import { FaArrowRight, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa'
import { HiOutlineStar } from 'react-icons/hi'
import { Card } from 'components/neon/Card'
import { useTranslation } from 'hooks/useTranslation'

export default function Home() {
  const { _ } = useTranslation()
  return (
    <div className="flex items-center justify-center fill-height">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title={_("Work")} Icon={MdHomeWork} CTA={{ text: 'CV', RightIcon: FaArrowRight, href: "https://cv.pablopunk.com" }}>
          <T>
            I work at <a href="https://maze.co">Maze</a> as full-stack developer.
          </T>
        </Card>
        <Card title={_("Code")} Icon={HiTerminal} secondary CTA={[{ title: 'Github', RightIcon: FaGithub, href: 'https://github.com/pablopunk' }, {
          text: 'Featured Repos',
          RightIcon: HiOutlineStar,
          href: '/code'
        }]}>
          <T>
            All of my personal projects and open-source contributions can be found
            on <b>Github</b>.
          </T>
        </Card>
        <Card title={_("Me")} Icon={MdFace} secondary CTA={[{
          RightIcon: FaTwitter,
          title: '@pablopunk'
        }, {
          RightIcon: FaInstagram,
          title: '@pablopunk'
        }, {
          RightIcon: MdMail,
          title: 'pablo@pablopunk.com'
        }]}>
          <div className='mb-1'>
            <T>
              My name is Pablo Varela and I live and work remotely from <a href="https://www.google.com/search?q=pontevedra&tbm=isch">Pontevedra, Galiza</a>.
            </T>
          </div>
        </Card>
        <Card
          title="Blog" Icon={MdLibraryBooks}
          CTA={{ text: _('Latest posts'), RightIcon: FaArrowRight, href: '/blog' }}
        >
          <div className="flex flex-col gap-1">
            <div className='flex gap-1 items-center'>
              <FaArrowRight />
              <span>How to create a real-time UI in NextJS</span>
            </div>
            <div className='flex gap-1 items-center'>
              <FaArrowRight />
              <span>How the M1 Macbook Air saved me money</span>
            </div>
            <div className='flex gap-1 items-start'>
              <FaArrowRight className='w-[25px] mt-1' />
              <span>The best camera that fits in your pocket is not your smartphone</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export const getStaticProps = pageStaticProps

import { T } from 'components/T'
import { pageStaticProps } from 'middleware'
import { MdHomeWork, MdFace, MdLibraryBooks, MdMail } from 'react-icons/md'
import { HiTerminal } from 'react-icons/hi'
import { FaArrowRight, FaInstagram, FaTwitter } from 'react-icons/fa'
import { Card } from 'components/neon/Card'


export default function Home() {
  return (
    <div className="flex items-center justify-center fill-height">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Work" buttonText="More" Icon={MdHomeWork}>
          I work at <b>Maze</b> as full-stack developer.
        </Card>
        <Card title="Code" buttonText="Go" Icon={HiTerminal} secondary>
          All of my personal projects and open-source contributions can be found
          on <b>Github</b>.
        </Card>
        <Card title="Me" buttonText="Bio" Icon={MdFace} secondary>
          <div className='mb-1'>
            I live and work remotely from <b>Pontevedra, Galiza</b>.
          </div>
          <div className='flex gap-1 items-center font-bold'>
            <FaTwitter />
            <span>@pablopunk</span>
          </div>
          <div className='flex gap-1 items-center font-bold'>
            <FaInstagram />
            <span>@pablopunk</span>
          </div>
          <div className='flex gap-1 items-center font-bold'>
            <MdMail />
            <span>pablo@pablopunk.com</span>
          </div>
        </Card>
        <Card title="Blog" buttonText="All posts" Icon={MdLibraryBooks}>
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
      </div >
    </div >
  )
}

export const getStaticProps = pageStaticProps

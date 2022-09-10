import { Button } from 'components/Button'
import { T } from 'components/T'
import { pageStaticProps } from 'middleware'
import { FaTwitter } from 'react-icons/fa'
import { MdMail } from 'react-icons/md'
import { AiFillInstagram } from 'react-icons/ai'
import { Tooltip } from 'components/Tooltip'

export default function Home() {
  return (
    <div className="fill-height flex flex-col items-center justify-center gap-3">
      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">Pablo P Varela</h1>
          <p className="opacity-80 italic text-sm">
            <T>
              Full Stack Developer at <a href="https://maze.co">Maze</a>
            </T>
          </p>
          <div className="flex gap-2 items-center justify-center mt-2">
            <Tooltip text="@pablopunk">
              <Button
                href="https://twitter.com/pablopunk"
                Icon={FaTwitter}
                secondary
                rounded
              />
            </Tooltip>
            <Tooltip text="pablo@pablopunk.com">
              <Button
                href="mailto:pablo@pablopunk.com"
                Icon={MdMail}
                secondary
                rounded
              />
            </Tooltip>
            <Tooltip text="@pablopunk">
              <Button
                href="https://instagram.com/pablopunk"
                Icon={AiFillInstagram}
                secondary
                rounded
              />
            </Tooltip>
          </div>
        </div>
        <img
          src="/images/yellow_small.jpg"
          alt="Picture of me"
          width={120}
          height={120}
          className="object-cover rounded-full w-[120px] h-[120px] shadow-lg border-2"
        />
      </div>
    </div>
  )
}

export const getStaticProps = pageStaticProps

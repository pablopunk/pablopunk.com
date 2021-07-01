import { FunctionComponent } from 'react'
import type { LinkType, ImageType } from 'storyblok/types'
import Image from 'next/image'
import Link from 'next/link'
import Markdown from 'components/pure/Markdown'
import classNames from 'classnames'

type Props = {
  blok: {
    title: string
    description: string
    image: ImageType
    link: LinkType
    tags?: string[]
    line_clamp?: number
  }
}

export const Card: FunctionComponent<Props> = ({ blok }) => {
  let lineClamp = ''

  switch (blok.line_clamp) {
    case 1:
      lineClamp = 'md:max-h-7 md:line-clamp-1'
      break
    case 2:
      lineClamp = 'md:max-h-7 md:line-clamp-2'
      break
    case 3:
      lineClamp = 'md:max-h-7 md:line-clamp-3'
      break
  }

  return (
    <div className="p-3 border rounded-lg shadow-lg bg-bg2">
      <Link href={blok.link?.url || ''}>
        <a className="relative flex items-center group hover:cursor-pointer">
          <div className="relative w-[90px] h-[90px] rounded-full">
            {blok.image?.filename && (
              <Image
                loading="lazy"
                src={blok.image.filename}
                alt={blok.title}
                layout="fill"
                className="object-cover transition-opacity border-2 rounded-full filter group-hover:grayscale group-hover:opacity-75"
              />
            )}
          </div>
          <div className="max-w-[65%] pl-3">
            <h4 className="font-semibold transition-colors text-md md:text-lg group-hover:text-accent2">
              {blok.title}
            </h4>
            <h5 id="job" className="text-sm italic font-semibold opacity-75">
              {blok.tags?.join(', ')}
            </h5>
          </div>
        </a>
      </Link>
      <div className="relative overflow-hidden italic md:mt-3">
        <Markdown className={classNames('hidden md:block', lineClamp)}>
          {blok.description}
        </Markdown>
      </div>
    </div>
  )
}

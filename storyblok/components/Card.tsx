import { FunctionComponent } from 'react'
import type { LinkType } from 'storyblok/types'
import Image from 'next/image'
import Link from 'next/link'
import Markdown from 'react-markdown'

type Props = {
  blok: {
    title: string
    description: string
    image: any
    link: LinkType
    tags?: string[]
  }
}

export const Card: FunctionComponent<Props> = ({ blok }) => (
  <div className="p-3 border rounded-lg shadow-lg bg-bg2">
    <Link href={blok.link?.url || ''}>
      <a className="relative flex items-center group hover:cursor-pointer">
        <div className="relative w-[90px] h-[90px] rounded-full">
          {blok.image?.filename && (
            <Image
              src={blok.image.filename}
              alt={blok.title}
              layout="fill"
              className="object-cover transition-opacity border-2 rounded-full filter group-hover:grayscale group-hover:opacity-75"
            />
          )}
        </div>
        <div className="max-w-[70%] pl-3">
          <h4 className="font-semibold transition-colors text-md md:text-xl group-hover:text-accent2">
            {blok.title}
          </h4>
          <h5 id="job" className="text-sm italic font-semibold opacity-75">
            {blok.tags?.join(', ')}
          </h5>
        </div>
      </a>
    </Link>
    <div className="italic md:mt-3">
      <Markdown className="hidden md:block md:line-clamp-2">
        {blok.description}
      </Markdown>
    </div>
  </div>
)

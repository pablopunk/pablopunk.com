import { FunctionComponent } from 'react'
import type { LinkType, ImageType } from 'storyblok/types'
import Image from 'next/image'
import Link from 'next/link'
import Markdown from 'components/Markdown'
import classNames from 'classnames'

type Props = {
  title: string
  subtitle?: string
  description: string
  image: ImageType
  link: LinkType
  line_clamp?: number
  preload?: boolean
}

export const Card: FunctionComponent<Props> = ({
  title,
  subtitle,
  description,
  image,
  link,
  line_clamp,
  preload,
}) => {
  let lineClamp = ''

  switch (line_clamp) {
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
    <div className="p-3 border rounded-lg shadow-md bg-bg2">
      <Link href={link?.url || ''}>
        <a className="relative flex items-center group hover:cursor-pointer">
          <div className="relative w-[90px] h-[90px] rounded-full">
            {image?.filename && (
              <Image
                loading={preload ? 'eager' : 'lazy'}
                priority={preload}
                src={image.filename}
                alt={title}
                layout="fill"
                className="object-cover transition-opacity border-2 rounded-full filter group-hover:grayscale group-hover:opacity-75"
              />
            )}
          </div>
          <div className="max-w-[65%] pl-3">
            <h4 className="font-semibold transition-colors text-md md:text-lg group-hover:text-accent2">
              {title}
            </h4>
            <h5
              id="job"
              className="text-sm italic font-semibold opacity-75 text-accent"
            >
              {subtitle}
            </h5>
          </div>
        </a>
      </Link>
      <div className="relative overflow-hidden italic md:mt-3">
        <Markdown className={classNames('hidden md:block', lineClamp)}>
          {description}
        </Markdown>
      </div>
    </div>
  )
}

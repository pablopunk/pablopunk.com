import { FunctionComponent } from 'react'
import type { LinkType, ImageType } from 'cms/storyblok/types'
import Link from 'next/link'
import Markdown from 'components/Markdown'
import classNames from 'classnames'

type Props = {
  title: string
  subtitle?: string
  description: string
  image?: ImageType
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
}) => (
  <div className="p-3 dark:border rounded-lg shadow-md bg-bg2">
    <Link href={link?.url || ''}>
      <a className="relative flex items-center group hover:cursor-pointer">
        {image?.filename && (
          <div className="relative w-[90px] h-[90px] rounded-full border-2">
            {image?.filename && (
              <img
                loading={preload ? 'eager' : 'lazy'}
                src={image.filename}
                alt={title}
                className="object-cover w-full h-full transition-opacity rounded-full filter group-hover:grayscale group-hover:opacity-75"
              />
            )}
          </div>
        )}
        <div
          className={classNames('flex items-start justify-between', {
            'w-full': !image?.filename,
            'max-w-[65%] pl-3 flex-col': !!image?.filename,
          })}
        >
          <h4 className="font-semibold transition-colors text-md md:text-lg group-hover:text-accent-alt">
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
    {description && (
      <div className="relative overflow-hidden italic md:mt-3">
        <Markdown
          className={classNames('hidden md:block', 'md:max-h-7', {
            'md:max-h-7 md:line-clamp-1': line_clamp === 1,
            'md:max-h-7 md:line-clamp-2': line_clamp === 2,
            'md:max-h-7 md:line-clamp-3': line_clamp === 3,
          })}
        >
          {description}
        </Markdown>
      </div>
    )}
  </div>
)

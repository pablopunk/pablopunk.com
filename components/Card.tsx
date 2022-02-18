import classNames from 'classnames'
import type { ImageType, LinkType } from 'cms/storyblok/types'
import { Markdown } from 'components/Markdown'
import { normalizeHref } from 'lib/utils'
import Link from 'next/link'
import { FunctionComponent } from 'react'

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
  <div className="p-3 transition-colors border-4 border-dashed rounded-lg group hover:cursor-pointer hover:border-accent">
    <Link href={normalizeHref(link?.url || link?.cached_url || '')}>
      <a className="relative flex items-center">
        {image?.filename && (
          <div className="relative w-[90px] h-[90px] rounded-full border-2 border-dashed">
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
          {title === 'Pablo Varela' ? (
            <h1 className="font-semibold transition-colors text-md md:text-lg group-hover:text-accent-alt">
              {title}
            </h1>
          ) : (
            <h4 className="font-semibold transition-colors text-md md:text-lg group-hover:text-accent-alt">
              {title}
            </h4>
          )}
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

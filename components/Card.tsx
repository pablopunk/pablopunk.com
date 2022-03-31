import classNames from 'classnames'
import type { ImageType, LinkType } from 'cms/storyblok/types'
import { Markdown } from 'components/Markdown'
import { normalizeHref } from 'lib/utils'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { BorderGradient } from './BorderGradient'

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
  <div
    className={classNames('p-3 border rounded-lg transition-colors shadow-lg', {
      'hover:bg-primary-3 hover:border-primary-3': !description,
    })}
  >
    <Link href={normalizeHref(link?.url || link?.cached_url || '')}>
      <a className="relative flex items-center group">
        {image?.filename && (
          <div className="relative w-[90px] h-[90px] rounded-full">
            {image?.filename && (
              <img
                loading={preload ? 'eager' : 'lazy'}
                width="90px"
                height="90px"
                src={image.filename + '/m/90x90'}
                alt={title}
                className="object-cover w-full h-full transition-all rounded-full filter group-hover:grayscale group-hover:opacity-75"
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
            <h1 className="font-semibold transition-colors text-md md:text-lg group-hover:text-primary-11">
              {title}
            </h1>
          ) : (
            <h4 className="font-semibold transition-colors text-md md:text-lg group-hover:text-primary-11">
              {title}
            </h4>
          )}
          <h5
            id="job"
            className="text-sm italic font-semibold opacity-75 text-primary"
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

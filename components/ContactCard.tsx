import { ImageType } from 'cms/storyblok/types'
import { FunctionComponent } from 'react'
import { BorderGradient } from './BorderGradient'
import { Markdown } from './Markdown'

type Props = {
  title: string
  subtitle: string
  description: string
  image: ImageType
}

export const ContactCard: FunctionComponent<Props> = ({
  title,
  subtitle,
  description,
  image,
}) => (
  <BorderGradient className="max-w-2xl">
    <div className="flex items-start justify-between gap-2 px-3 py-3 rounded-lg md:items-center">
      <div>
        <h1 className="text-2xl">{title}</h1>
        <h2 className="mb-2 text-md text-secondary-11">{subtitle}</h2>
        <div className="max-w-md">
          <Markdown>{description}</Markdown>
        </div>
      </div>
      <div>
        {image?.filename && (
          <img
            src={image?.filename + '/m/100x100'}
            alt={title}
            width="100px"
            height="100px"
            className="rounded-full"
          />
        )}
      </div>
    </div>
  </BorderGradient>
)

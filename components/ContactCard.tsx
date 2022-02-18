import { ImageType } from 'cms/storyblok/types'
import { FunctionComponent } from 'react'
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
  <div className="flex items-start justify-between max-w-2xl gap-2 px-3 py-3 border rounded-lg shadow-md md:items-center bg-bg2">
    <div>
      <h1 className="text-2xl">{title}</h1>
      <h2 className="mb-2 text-md text-accent-alt">{subtitle}</h2>
      <div className="max-w-md">
        <Markdown>{description}</Markdown>
      </div>
    </div>
    <div>
      {image?.filename && (
        <img
          src={image?.filename}
          alt={title}
          width="100px"
          className="border-2 rounded-full shadow-md"
        />
      )}
    </div>
  </div>
)

import { FunctionComponent } from 'react'
import { Card } from './Card'

type Props = {
  blok: {
    items: any[]
  }
}
export const Articles: FunctionComponent<Props> = ({ blok }) => {
  return (
    <div className="my-3">
      {blok.items.map((article) => (
        <Card
          blok={{
            title: article.name,
            description: article.content?.content,
            image: article.content?.image,
            link: { url: article.full_slug },
            tags: [new Date(article.first_published_at).toLocaleDateString()],
          }}
        />
      ))}
    </div>
  )
}

import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { Card } from './Card'

type Props = {
  blok: {
    items: any[]
  }
}
export const Articles: FunctionComponent<Props> = ({ blok }) => {
  const { locale } = useRouter()

  return (
    <div className="my-3">
      {blok.items.map((article) => {
        const translatedSlug = article.translated_slugs?.find(
          (slug) => slug.lang === locale,
        )

        return (
          <div key={article.full_slug} className="my-3">
            <Card
              blok={{
                title: translatedSlug?.name
                  ? translatedSlug.name
                  : article.name,
                description: article.content?.content,
                image: article.content?.image,
                link: {
                  url: translatedSlug?.path
                    ? translatedSlug.path
                    : article.full_slug,
                },
                tags: [new Date(article.created_at).toLocaleDateString()],
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

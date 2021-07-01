import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { Card } from './Card'
import type { PostType } from 'storyblok/types'

type Props = {
  blok: {
    items: PostType[]
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
                subtitle: new Date(article.created_at).toLocaleDateString(),
                description: article.content?.content,
                image: article.content?.image,
                link: {
                  url: translatedSlug?.path
                    ? translatedSlug.path
                    : article.full_slug,
                },
                line_clamp: 2,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

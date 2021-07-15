import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { Card } from './Card'
import type { PostType } from 'storyblok/types'
import { AnimatedCard } from './AnimatedCard'

type Props = {
  items: PostType[]
}
export const Articles: FunctionComponent<Props> = ({ items }) => {
  const { locale } = useRouter()

  return (
    <div className="my-3">
      {items.map((article, i) => {
        const translatedSlug = article.translated_slugs?.find(
          (slug) => slug.lang === locale,
        )

        return (
          <AnimatedCard key={article.full_slug} className="my-3" index={i}>
            <Card
              title={translatedSlug?.name ? translatedSlug.name : article.name}
              subtitle={new Date(article.created_at).toLocaleDateString()}
              description={article.content?.content}
              image={article.content?.image}
              link={{
                url: translatedSlug?.path
                  ? translatedSlug.path
                  : article.full_slug,
              }}
              line_clamp={2}
            />
          </AnimatedCard>
        )
      })}
    </div>
  )
}

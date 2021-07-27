import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { Card } from './Card'
import type { PostType } from 'cms/storyblok/types'
import { AnimatedCard } from './AnimatedCard'
import { getTranslatedSlug } from 'cms/storyblok/utils'

type Props = {
  items: PostType[]
}
export const Articles: FunctionComponent<Props> = ({ items }) => {
  const { locale } = useRouter()

  return (
    <div className="my-3">
      {items.map((article, i) => {
        const translatedSlug = getTranslatedSlug(article, locale)

        return (
          <AnimatedCard key={article.full_slug} className="my-3" index={i}>
            <Card
              title={translatedSlug?.name}
              subtitle={new Date(article.created_at).toLocaleDateString()}
              description={article.content?.subtitle}
              image={article.content?.image}
              link={{ url: translatedSlug?.path }}
            />
          </AnimatedCard>
        )
      })}
    </div>
  )
}

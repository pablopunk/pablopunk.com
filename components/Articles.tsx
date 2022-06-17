import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { Card } from './Card'
import type { PostType } from 'cms/storyblok/types'
import { getTranslatedSlug } from 'cms/storyblok/utils'
import { useVisitsCountMultiple } from 'hooks/useVisitsCount'

type Props = {
  items: PostType[]
}
export const Articles: FunctionComponent<Props> = ({ items }) => {
  const { locale } = useRouter()
  const visitsCounts = useVisitsCountMultiple(
    items.map((item) => '/' + item.default_full_slug),
  )

  return (
    <div className="my-3">
      {items.map((article, i) => {
        const translatedSlug = getTranslatedSlug(article, locale)

        return (
          <div key={article.full_slug} className="my-3">
            <Card
              title={translatedSlug?.name}
              subtitle={
                visitsCounts[i] &&
                `📅 ${new Date(article.created_at).toLocaleDateString()} 👁‍🗨 ${
                  visitsCounts[i]
                }`
              }
              description={article.content?.subtitle}
              image={article.content?.image}
              link={{ url: translatedSlug?.path }}
            />
          </div>
        )
      })}
    </div>
  )
}

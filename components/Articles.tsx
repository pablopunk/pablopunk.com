import { useRouter } from 'next/router'
import { FunctionComponent, useMemo } from 'react'
import { Card } from './Card'
import type { PostType } from 'cms/storyblok/types'
import { getTranslatedSlug } from 'cms/storyblok/utils'
import * as R from 'ramda'

const formatDate = R.concat(`📅 `)
const formatVisits = R.concat(`👁‍🗨 `)

const showDateAndVisits = (props: { date; visits }) => {
  const { date, visits } = props
  const dateString = formatDate(date)

  if (!visits) {
    return dateString
  }

  return `${dateString} ${formatVisits(visits.toString())}`
}

type Props = {
  items: PostType[]
  visits: number[]
}
export const Articles: FunctionComponent<Props> = ({ items, visits }) => {
  const { locale } = useRouter()
  // const visitsCounts = useVisitsCountMultiple(paths)

  return (
    <div className="my-3">
      {items.map((article, i) => {
        const translatedSlug = getTranslatedSlug(article, locale)

        return (
          <div key={article.full_slug} className="my-3">
            <Card
              title={translatedSlug?.name}
              subtitle={showDateAndVisits({
                date: new Date(article.created_at).toLocaleDateString(),
                visits: visits[i],
              })}
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

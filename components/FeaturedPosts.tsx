import { PostType } from 'cms/storyblok/types'
import { getTranslatedSlug } from 'cms/storyblok/utils'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { Cards } from './Cards'

type Props = {
  posts: PostType[]
}

export const FeaturedPosts: FunctionComponent<Props> = ({ posts }) => {
  const { locale } = useRouter()

  return (
    <div>
      <Cards
        items={posts?.map((post) => ({
          component: 'card',
          _uid: post.full_slug,
          title: getTranslatedSlug(post, locale)?.name,
          image: post.content?.image,
          link: { url: post.full_slug },
        }))}
      />
    </div>
  )
}

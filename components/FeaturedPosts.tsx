import { PostType } from 'cms/storyblok/types'
import { FunctionComponent } from 'react'
import { Cards } from './Cards'

type Props = {
  posts: PostType[]
}

export const FeaturedPosts: FunctionComponent<Props> = ({ posts }) => (
  <div>
    {console.log({ posts })}
    <Cards
      items={posts.map((post) => ({
        component: 'card',
        title: post.name,
        image: post.content?.image,
        link: { url: post.full_slug },
      }))}
    />
  </div>
)

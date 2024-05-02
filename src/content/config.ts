import { defineCollection, getCollection, z } from "astro:content"

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      url_dark: z.optional(z.string()),
      alt: z.string(),
    }),
    tags: z.array(z.string()),
    featured: z.optional(z.boolean()),
  }),
})

const projectsCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    href: z.string(),
    image: z.string(),
    icon: z.string(),
    tag: z.string(),
  }),
})

export const collections = {
  posts: postsCollection,
  projects: projectsCollection,
}

export const getPostUrl = ({ slug }: { slug: string }) => `/posts/${slug}`
export const getPostsTags = async () => {
  const posts = await getCollection("posts")
  const uniqueTags = [...new Set(posts.map((post) => post.data.tags).flat())]
  return uniqueTags
}

import { defineCollection, getCollection, z } from "astro:content"
import { glob } from "astro/loaders"

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
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
  loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
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

export const getPostUrl = ({ id }: { id: string }) => `/posts/${id}`
export const getPostsTags = async () => {
  const posts = await getCollection("posts")
  const uniqueTags = [...new Set(posts.flatMap((post) => post.data.tags))]
  return uniqueTags
}

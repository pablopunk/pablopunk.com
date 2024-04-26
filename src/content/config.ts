import { defineCollection, z } from "astro:content"

const postsCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		pubDate: z.date(),
		description: z.string(),
		author: z.string(),
		image: z.object({
			url: z.string(),
			alt: z.string(),
		}),
		tags: z.array(z.string()),
		featured: z.optional(z.boolean()),
	}),
})

export const collections = {
	posts: postsCollection,
}

export const getPostUrl = ({ slug }: { slug: string }) => `/posts/${slug}`

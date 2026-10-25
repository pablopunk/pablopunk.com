import { getCollection } from "astro:content"
import { getPostUrl } from "@/content.config"
import { mainUrl } from "@/site"
import site from "@/site"
import rss from "@astrojs/rss"

export const prerender = true

export async function GET(context) {
  const posts = (await getCollection("posts")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  )

  return rss({
    title: site.SITE_NAME,
    description: site.SITE_DESC,
    site: context.site ?? new URL(mainUrl),
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: getPostUrl(post),
    })),
    customData: "<language>en-us</language>",
  })
}

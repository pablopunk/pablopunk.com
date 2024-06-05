import { getCollection } from "astro:content"
import { getPostUrl } from "@/content/config"
import site from "@/site"
import rss from "@astrojs/rss"

export async function GET(context) {
  const posts = await getCollection("posts")
  return rss({
    title: site.SITE_NAME,
    description: site.SITE_DESC,
    site: context.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: getPostUrl(post),
    })),
    customData: "<language>en-us</language>",
  })
}

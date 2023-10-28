import { Post } from "~/data/posts";
import site from "~/site";

export const injectPostMetadata = (post: Post) => {
  const postUrl = site.SITE_URL + "/posts/" + post.slug;
  return {
    ...post,
    metadataBase: new URL(postUrl),
    openGraph: {
      type: "article",
      ...post,
      siteName: site.SITE_NAME,
      url: postUrl,
      locale: "en_US",
      images: [
        {
          url: post.image,
        },
      ],
    },
    twitter: {
      ...post,
      card: "summary_large_image",
      site: site.SITE_URL,
      images: [
        {
          url: post.image,
        },
      ],
    },
    alternates: {
      canonical: site.SITE_URL,
    },
  };
};

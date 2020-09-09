import React from "react";
import { staticPaths } from "components/data-fetch/withCMS";
import { getAllPostsWithSlug, getPostBySlug } from "lib/api";
import withLayout from "components/skeleton/withLayout";
import Link from "next/link";
import { t } from "lib/locales";
import { NextSeo } from "next-seo";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Article from "components/pure/Article";
import { IoMdArrowRoundBack } from "react-icons/io";

const formatDate = (d) => new Date(d).toLocaleDateString().replace(/-/g, "/");

const Page = ({ post, locale, ...rest }) => {
  return (
    <>
      <NextSeo
        title={post.title}
        description={post.description}
        openGraph={{
          title: post.title,
          description: post.description,
          images: [
            {
              url: post.image.url,
              alt: post.image.alt
            }
          ],
          site_name: "pablo.im"
        }}
      />
      <br />
      <Link as={`/${locale}/blog`} href="/[locale]/blog">
        <a>
          <IoMdArrowRoundBack />
          <span>{t("Go back", locale)}</span>
        </a>
      </Link>
      <Article>
        {post.image?.url ? (
          <figure>
            <LazyLoadImage
              src={post.image.url}
              alt={post.image.alt}
              title={post.image.title}
              placeholder={
                <img src={post.image.blurUpThumb} alt={post.image.alt} />
              }
            />
            <h1>{post.title}</h1>
          </figure>
        ) : (
          <h1>{post.title}</h1>
        )}
        <small>
          Pablo Varela - <time>{formatDate(post.date)}</time>
        </small>
        <div className="body" dangerouslySetInnerHTML={{ __html: post.body }} />
      </Article>
    </>
  );
};

export const getStaticProps = async ({ params, preview = false }) => {
  const data = await getPostBySlug(params.slug, params.locale, preview);

  return {
    props: {
      ...data,
      post: data.post,
      locale: params.locale
    }
  };
};

export const getStaticPaths = async () => {
  const localePaths = await staticPaths();
  const postsByLocale: any = {};

  for (const p of localePaths.paths) {
    const posts = await getAllPostsWithSlug(p.params.locale);
    postsByLocale[p.params.locale] = posts;
  }

  const allPaths = { fallback: false, paths: [] };

  for (const locale in postsByLocale) {
    const posts = postsByLocale[locale];
    for (const post of posts) {
      allPaths.paths.push({
        params: {
          locale,
          slug: post.slug
        }
      });
    }
  }

  return allPaths;
};

export default withLayout(Page, "blog");

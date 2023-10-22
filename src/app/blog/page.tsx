export const posts = [
  {
    "title": "I told ChatGPT to create a passive store and now I don't code anymore",
    "slug": "i-told-chatgpt-to-create-a-passive-store-and-now-i-don-t-code-anymore",
    "date": new Date("2023/03/25"),
    "description": "Yes, it's THAT good. Since I discovered ChatGPT I don't write boilerplate or stuff I wrote hundreds of times, I ask for it. Today I wanted to make it create a store to generate passive income."
  },
  {
    "title": "Developing NextJS + CMS is slow. Here's the fix",
    "slug": "developing-nextjs-cms-is-slow-here-s-the-fix",
    "date": new Date("2022/06/16"),
    "description": "NextJS is the framework that focuses on performance and developer experience. But it seems they have forgotten about developer performance."
  },
  {
    "title": "The best camera that fits in your pocket is not your smartphone",
    "slug": "the-best-camera-that-fits-in-your-pocket-is-not-your-smartphone",
    "date": new Date("2021/11/18"),
    "description": "...if you know how to use it. We all have a great camera in our pocket, but it doesn't have to be the best one."
  },
  {
    "title": "How to create a real-time UI with NextJS and Supabase",
    "slug": "how-to-create-a-real-time-ui-with-nextjs-and-supabase",
    "date": new Date("2021/08/02"),
    "description": "I made a simple UI that is synced in real-time with a database. Here's how"
  },
  {
    "title": "How buying an M1 Macbook Air saved me money",
    "slug": "how-buying-an-m1-macbook-air-saved-me-money",
    "date": new Date("2021/07/05"),
    "description": "I had a 2019 16\" MacBook Pro so I didn't have any expectations about the small cheap MBA being better than my beast. I was wrong."
  },
  {
    "title": "Yet another Next.js starter kit. My way.",
    "slug": "yet-another-next-js-starter-kit-my-way-",
    "date": new Date("2021/07/02"),
    "description": "But this one without all that boilerplate that you end up removing. Just replacing it."
  },
  {
    "title": "File finder and project search in Vim without any plugins",
    "slug": "file-finder-and-project-search-in-vim-without-any-plugins",
    "date": new Date("2021/06/29"),
    "description": "You don't need Ctrl-P"
  },
  {
    "title": "How to replace text in vim only inside a specific search",
    "slug": "how-to-replace-text-in-vim-only-inside-a-specific-search",
    "date": new Date("2021/06/28"),
    "description": "Vim is so powerful it is imposible to say I know all of vim. Nobody can learn all the features of this editor, you always learn something new (almost) every day."
  }
]

export default function BlogPage() {
  return (
    <>
      {
        posts.map(post => (
          <article key={post.slug} className="py-3">
            <h2 className="text-xl font-bold flex gap-2 justify-between items-start">
              <a href={`/posts/${post.slug}`}>{'->'} {post.title}</a>
              <p className="text-neutral-6 text-xs">{post.date.toLocaleDateString()}</p>
            </h2>
            <p className="text-neutral-7 mt-2">{post.description}</p>
          </article>
        ))
      }
    </>
  )
}
export const posts = [
  {
    title:
      "I told ChatGPT to create a passive store and now I don't code anymore",
    slug: "i-told-chatgpt-to-create-a-passive-store-and-now-i-don-t-code-anymore",
    date: new Date("2023-03-24"),
    description:
      "Yes, it's THAT good. Since I discovered ChatGPT I don't write boilerplate or stuff I wrote hundreds of times, I ask for it. Today I wanted to make it create a store to generate passive income.",
    image:
      "https://ik.imagekit.io/pablopunk/posts/i-told-chatgpt-to-create-a-passive-store-and-now-i-don-t-code-anymore.png?updatedAt=1698057162161",
  },
  {
    title: "Developing NextJS + CMS is slow. Here's the fix",
    slug: "developing-nextjs-cms-is-slow-here-s-the-fix",
    date: new Date("2022-06-15"),
    description:
      "NextJS is the framework that focuses on performance and developer experience. But it seems they have forgotten about developer performance.",
    image:
      "https://ik.imagekit.io/pablopunk/posts/developing-nextjs-cms-is-slow-here-s-the-fix.gif?updatedAt=1698057165875",
  },
  {
    title: "The best camera that fits in your pocket is not your smartphone",
    slug: "the-best-camera-that-fits-in-your-pocket-is-not-your-smartphone",
    date: new Date("2021-11-17"),
    description:
      "...if you know how to use it. We all have a great camera in our pocket, but it doesn't have to be the best one.",
    image:
      "https://ik.imagekit.io/pablopunk/posts/the-best-camera-that-fits-in-your-pocket-is-not-your-smartphone.jpg?updatedAt=1698057159111",
  },
  {
    title: "How to create a real-time UI with NextJS and Supabase",
    slug: "how-to-create-a-real-time-ui-with-nextjs-and-supabase",
    date: new Date("2021-08-01"),
    description:
      "I made a simple UI that is synced in real-time with a database. Here's how",
    image:
      "https://ik.imagekit.io/pablopunk/posts/how-to-create-a-real-time-ui-with-nextjs-and-supabase.gif?updatedAt=1698057154455",
  },
  {
    title: "How buying an M1 Macbook Air saved me money",
    slug: "how-buying-an-m1-macbook-air-saved-me-money",
    date: new Date("2021-07-04"),
    description:
      "I had a 2019 16\" MacBook Pro so I didn't have any expectations about the small cheap MBA being better than my beast. I was wrong.",
    image:
      "https://ik.imagekit.io/pablopunk/posts/how-buying-an-m1-macbook-air-saved-me-money.jpg?updatedAt=1698057164242",
  },
  {
    title: "Yet another Next.js starter kit. My way.",
    slug: "yet-another-next-js-starter-kit-my-way-",
    date: new Date("2021-07-01"),
    description:
      "But this one without all that boilerplate that you end up removing. Just replacing it.",
    image:
      "https://ik.imagekit.io/pablopunk/posts/yet-another-next-js-starter-kit-my-way-.png?updatedAt=1698057160491",
  },
  {
    title: "File finder and project search in Vim without any plugins",
    slug: "file-finder-and-project-search-in-vim-without-any-plugins",
    date: new Date("2021-06-28"),
    description: "You don't need Ctrl-P",
    image:
      "https://ik.imagekit.io/pablopunk/posts/file-finder-and-project-search-in-vim-without-any-plugins.jpg?updatedAt=1698057157506",
  },
  {
    title: "How to replace text in vim only inside a specific search",
    slug: "how-to-replace-text-in-vim-only-inside-a-specific-search",
    date: new Date("2021-06-27"),
    description:
      "Vim is so powerful it is imposible to say I know all of vim. Nobody can learn all the features of this editor, you always learn something new (almost) every day.",
    image:
      "https://ik.imagekit.io/pablopunk/posts/how-to-replace-text-in-vim-only-inside-a-specific-search.jpg?updatedAt=1698057155846",
  },
].map((post) => ({
  ...post,
  author: "Pablo Varela",
}));

export type Post = (typeof posts)[number];

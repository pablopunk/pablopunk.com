module.exports = {
  SITE_URL:
    process.env.NODE_ENV !== 'development'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` ||
        'https://pablopunk.com'
      : 'http://localhost:3000',
  SITE_NAME: 'Pablo Varela | Freelance Web Developer',
  SITE_DESC:
    'Pablo Varela. Remote Web Developer. Check out my work or contact me. You can also find me on popular social networks as @pablopunk.',
  SITE_IMAGE:
    'https://a.storyblok.com/f/113260/4108x3448/80929e8406/p1080612.jpg',
  SITE_COPYRIGHT: 'Pablo Varela',
  SITE_REPO: 'https://github.com/pablopunk/pablopunk.com',
}

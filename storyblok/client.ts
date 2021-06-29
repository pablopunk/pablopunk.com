import StoryblokClient from 'storyblok-js-client'

export const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  cache: {
    clear: 'auto',
    type: 'memory',
  },
})

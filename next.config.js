const { locales } = require('./locales')

const buildRewrite = ({ path, dest }) => ({
  source: `/(${locales.join('|')})+/${path}`,
  destination: dest,
  locale: false,
})

const buildRedirect = ({ path, dest }) => ({
  source: `/(${locales.join('|')})+/${path}`,
  destination: dest,
  locale: false,
  permanent: false,
})

const rw = [
  {
    path: 'count.js',
    dest: 'https://gc.zgo.at/count.js',
  },
  {
    path: 'goat',
    dest: 'https://pablopunk.goatcounter.com/count',
  },
]

const rd = [
  {
    path: 'cv',
    dest: 'https://cv.pablopunk.com',
  },
  {
    path: 'books',
    dest: 'https://www.notion.so/Books-9de297d7668e4498a9769421d29889b8',
  },
  {
    path: 'illustrations',
    dest: 'https://www.notion.so/pablopunk/Drawings-0c241704f0ea48d39591ca3bf1483966',
  },
  {
    path: 'drawings',
    dest: 'https://www.notion.so/pablopunk/Drawings-0c241704f0ea48d39591ca3bf1483966',
  },
  {
    path: 'photos',
    dest: 'https://www.pexels.com/@pablopunk',
  },
  {
    path: 'gear',
    dest: 'https://www.notion.so/pablopunk/Gear-I-use-11cee5aed9a349309ef30a72f6923f37',
  },
  {
    path: 'healthi-app',
    dest: 'https://pablopunk.github.io/healthi-app/',
  },
  {
    path: 'admin',
    dest: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    path: 'admin.php',
    dest: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    path: 'wp-admin/includes',
    dest: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
]

module.exports = {
  i18n: {
    locales,
    defaultLocale: 'en',
  },
  async rewrites() {
    return rw.map(buildRewrite)
  },
  async redirects() {
    return rd.map(buildRedirect)
  },
  images: {
    domains: ['www.datocms-assets.com', 'a.storyblok.com'],
  },
  webpack(config, { dev, isServer }) {
    // use Preact in production
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },
}

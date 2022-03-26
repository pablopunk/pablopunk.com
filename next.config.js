const { locales } = require('./locales')
const { withSentryConfig } = require('@sentry/nextjs')

const buildRewrite = ({ path, dest }) => ({
  source: `/(${locales.join('|')})+/${path}`,
  destination: dest,
  locale: false,
})

const buildRedirect = ({ path, dest }) => ({
  source: `/(${locales.join('|')})+/${path}`,
  destination: dest,
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
    path: 'iga',
    dest: 'https://github.com/pablopunk/iga',
  },
  {
    path: 'favicon.ico',
    dest: '/favicon/favicon.ico',
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
  {
    path: 'wp-content',
    dest: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    path: 'wp-login.php',
    dest: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
]

const moduleExports = {
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

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)

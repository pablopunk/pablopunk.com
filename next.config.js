const withTypescript = require('@zeit/next-typescript')
const withMDX = require('@zeit/next-mdx')()
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports =
  withTypescript(
    withMDX({
      webpack (config, options) {
        // Do not run type checking twice:
        if (options.isServer) {
          config.plugins.push(new ForkTsCheckerWebpackPlugin())
        }

        return config
      },
      pageExtensions: ['js', 'tsx', 'mdx']
    })
  )

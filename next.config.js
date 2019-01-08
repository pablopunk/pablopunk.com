const fs = require('fs')
const { join } = require('path')
const { promisify } = require('util')
const copyFile = promisify(fs.copyFile)

const staticFiles = [
  'keybase.txt'
]

module.exports = {
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir }) {
    if (dev) {
      return defaultPathMap
    }

    await Promise.all(staticFiles.map(async (file) => copyFile(join(dir, 'static', file), join(outDir, file))))

    return defaultPathMap
  }
}

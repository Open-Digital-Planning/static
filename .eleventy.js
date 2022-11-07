const fs = require('fs')
const path = require('path')

const Image = require('@11ty/eleventy-img')

module.exports = function (eleventyConfig) {
  require('dotenv').config()
  eleventyConfig.addGlobalData('env', process.env)

  // Copy the `img` and `css` folders to the output
  eleventyConfig.addWatchTarget('./src/sass/')
  eleventyConfig.addWatchTarget('./src/js/')
  eleventyConfig.addPassthroughCopy('./src/css')
  eleventyConfig.addPassthroughCopy('./src/images')
  eleventyConfig.addPassthroughCopy('./src/js')

  // Override Browsersync defaults (used only with --serve)
  eleventyConfig.setBrowserSyncConfig({
    ui: false,
    port: 8181,
    host: '0.0.0.0',
    ghostMode: false,
  })

  // --- START, eleventy-img
  function imageShortcode(
    src,
    alt,
    priority = false,
    sizes = '(min-width: 1024px) 100vw, 50vw'
  ) {
    src = `src${src}`
    console.log(`Generating image(s) from:  ${src}`)
    let options = {
      widths: [600, 900, 1500],
      formats: ['webp', 'jpeg'],
      urlPath: '/images/',
      outputDir: './public/images/',
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src)
        const name = path.basename(src, extension)
        return `${name}-${width}w.${format}`
      },
    }

    // generate images
    Image(src, options)

    let imageAttributes = {
      alt,
      sizes,
    }
    if (!priority) {
      imageAttributes = {
        ...imageAttributes,
        ...{ loading: 'lazy', decoding: 'async' },
      }
    } else {
      imageAttributes = {
        ...imageAttributes,
        ...{ fetchpriority: 'high' },
      }
    }
    // get metadata
    metadata = Image.statsSync(src, options)
    return Image.generateHTML(metadata, imageAttributes)
  }
  eleventyConfig.addShortcode('image', imageShortcode)
  // --- END, eleventy-img

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ['md', 'njk', 'html', 'liquid'],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: 'njk',

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: 'njk',

    // These are all optional (defaults are shown):
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: 'public',
    },
  }
}

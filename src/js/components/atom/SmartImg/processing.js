import isString from 'lodash-es/isString'

const PROCESSING_URI_LOCATION_REGEX = /(\w)(?:\/)([^/]+)$/

// opts = {
//   "width": 800,
//   "height": 600,
//   "maxWidth": 300,
//   "fit": "cover",
//   "format": "ORIGINAL"
//   "placeholder": true|false
//   "crop": "16x9"
// }
export function addProcessing(src, opts = {}) {
  if (!isString(src)) {
    return src
  }

  const parts = []

  if (opts.width && opts.height) {
    parts.push(`${opts.width}x${opts.height}`)
  }

  if (opts.maxWidth) {
    parts.push(`mw-${opts.maxWidth}`)
  }

  if (opts.fit) {
    parts.push(opts.fit)
  }

  if (opts.format) {
    parts.push('ff-' + opts.format.toLowerCase())
  }

  if (opts.placeholder) {
    parts.push('preview')
  }

  if (opts.crop) {
    parts.push(opts.crop)
  }

  if (!parts.length) {
    return src
  }

  return src.replace(
    PROCESSING_URI_LOCATION_REGEX,
    `$1/__processed/${parts.join('/')}/_/$2`,
  )
}

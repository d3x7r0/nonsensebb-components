import isString from 'lodash-es/isString'

import { addProcessing } from './processing'
import { guessContentType } from './utils'
import { calculateSizes } from './sizes'
import { FORMATS } from './constants'

export function buildSources(src, settings) {
  const processingOpts = {}

  if (settings.crop) {
    processingOpts.crop = isString(settings.crop) ?
      settings.crop :
      `${settings.crop.width}x${settings.crop.height}`
  }

  const sources = buildSourceSet(settings, src, processingOpts)
  const imgSrc = buildImageSrc(settings, src, processingOpts)

  return [imgSrc, sources]
}

function buildSourceSet(settings, src, processingOpts) {
  const contentType = guessContentType(src)

  const sizes = calculateSizes({
    min: settings.min,
    max: settings.max,
  })

  return FORMATS
    .filter(f => f.type === contentType || f.enabled(settings, contentType))
    .map(f => {
      const srcSet = sizes.map((size) => {
        const sizeSrc = addProcessing(src, {
          ...processingOpts,
          ...(f.type === contentType ? {} : { format: f.format }),
          maxWidth: size,
        })

        return `${sizeSrc} ${size}w`
      }).join(', ')

      return {
        format: f.format,
        type: f.type,
        sizes: sizes,
        srcSet,
      }
    })
}

function buildImageSrc(settings, src, processingOpts) {
  if (settings.placeholder === true) {
    return addProcessing(src, {
      ...processingOpts,
      placeholder: true,
    })
  }

  if (settings.placeholder) {
    return settings.placeholder
  }

  if (settings.maxWidth) {
    return addProcessing(src, {
      ...processingOpts,
      maxWidth: settings.maxWidth,
    })
  }

  return addProcessing(src, processingOpts)
}

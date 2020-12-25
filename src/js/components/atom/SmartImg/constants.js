export const SMART_IMG_PROPS = [
  'minSize',
  'maxSize',
  'defaultSize',
  'sizes',
  'lazy',
  'placeholder',
  'crop',
  'formats',
  'imgProps',
]

export const IMAGE_PROPS = [
  'width',
  'height',
  'alt',
  'sizes',
  'onLoad',
]

export const DEFAULT_FORMATS = [
  'png',
  'jpg',
  'webp',
  // TODO: enable when pulitzer supports it
  // 'avif',
]

export const FORMATS = [
  {
    format: 'avif',
    type: 'image/avif',
    enabled: (ctx) => ctx.formats.includes('avif'),
  },
  {
    format: 'webp',
    type: 'image/webp',
    enabled: (ctx) => ctx.formats.includes('webp'),
  },
  {
    format: 'png',
    type: 'image/png',
    enabled: (ctx, contentType) => ctx.formats.includes('png') && contentType === 'image/png',
  },
  {
    format: 'jpeg',
    type: 'image/jpeg',
    enabled: (ctx, contentType) => {
      // Enable JPEG if original image is JPEG or one of WebP/AVIF which have low browser support
      return (ctx.formats.includes('jpeg') || ctx.formats.includes('jpg')) && (
        contentType === 'image/jpeg' ||
        contentType === 'image/webp' ||
        contentType === 'image/avif'
      )
    },
  },
]

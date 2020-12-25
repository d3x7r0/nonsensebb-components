export function guessContentType(src) {
  if (!src || !src.toLowerCase) {
    return
  }

  if (src.toLowerCase().endsWith('.avif')) {
    return 'image/avif'
  }

  if (src.toLowerCase().endsWith('.webp')) {
    return 'image/webp'
  }

  if (src.toLowerCase().endsWith('.png')) {
    return 'image/png'
  }

  if (src.toLowerCase().endsWith('.jpeg') || src.toLowerCase().endsWith('.jpg')) {
    return 'image/jpeg'
  }
}

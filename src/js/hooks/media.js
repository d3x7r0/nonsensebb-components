import { useEffect, useState } from 'preact/hooks'
import throttle from 'lodash-es/throttle'

function getMatchMediaResult(query) {
  if (typeof matchMedia !== 'function') {
    return null
  }

  return matchMedia(query)
}

function mapMatchMediaResult(result) {
  if (!result) {
    return {}
  }

  return {
    matches: result.matches,
    media: result.media,
  }
}

const FALLBACK_THROTTLE_TIME = 100

function listenToChanges(mq, callback) {
  if ('onchange' in mq) {
    mq.addEventListener('change', callback)
    return () => mq.removeEventListener('change', callback)
  }

  // Fallback when change event doesn't exist
  let { matches } = mq

  const cb = throttle(() => {
    const res = getMatchMediaResult(mq.media)

    if (matches !== res.matches) {
      matches = res.matches
      callback(res)
    }
  }, FALLBACK_THROTTLE_TIME)

  window.addEventListener('resize', cb)
  return () => window.removeEventListener('resize', cb)
}

export function useMedia(query) {
  const [result, setResult] = useState(
    () => mapMatchMediaResult(
      getMatchMediaResult(query),
    ),
  )

  useEffect(() => {
    const mq = getMatchMediaResult(query)
    if (!mq) {
      return
    }

    const cb = (e) => setResult(
      mapMatchMediaResult(e),
    )

    cb(mq)
    return listenToChanges(mq, cb)
  }, [query])

  return result
}

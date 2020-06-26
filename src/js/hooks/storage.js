import { useEffect, useMemo, useState } from 'preact/hooks'

function storageAvailable(type) {
  if (typeof window === 'undefined') {
    return false
  }

  const storage = window[type]

  if (!storage) {
    return false
  }

  try {
    const x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return e instanceof DOMException && (
    // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0
  }
}

function safelyParseJson(parseString) {
  try {
    return JSON.parse(parseString)
  } catch (e) {
    return null
  }
}

// TODO: react to storage events
function useStorage(type = 'localStorage', key, defaultValue) {
  const isStorageAvailable = useMemo(
    () => storageAvailable(type),
    [type],
  )

  const [value, setValue] = useState(() => {
    if (!isStorageAvailable) {
      return defaultValue
    }

    return safelyParseJson(
      window[type].getItem(key) || JSON.stringify(defaultValue),
    )
  })

  useEffect(() => {
    const store = window[type]

    if (isStorageAvailable) {
      store.setItem(key, JSON.stringify(value))
    }
  }, [type, key, value, isStorageAvailable])

  return [value, setValue]
}

export function useLocalStorage(key, defaultValue = null) {
  return useStorage('localStorage', key, defaultValue)
}

export function useSessionStorage(key, defaultValue = null) {
  return useStorage('sessionStorage', key, defaultValue)
}

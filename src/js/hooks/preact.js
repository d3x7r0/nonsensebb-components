import { useEffect, useState } from 'preact/hooks'

export function useMounted() {
  const [isMounted, setMounted] = useState(false)

  useEffect(
    () => setMounted(true),
    [],
  )

  return isMounted
}

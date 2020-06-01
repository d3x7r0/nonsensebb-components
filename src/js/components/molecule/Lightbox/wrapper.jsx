/** @jsx h */
import { h } from 'preact'
import { useCallback, useLayoutEffect, useRef, useState } from 'preact/hooks'
import ReactImageLightbox from 'react-image-lightbox'

import { ensureGroup } from './utils'
import { LightboxProvider } from './context'

function LightboxWrapper(props) {
  const { children } = props

  const entriesRef = useRef({})
  const [isOpen, setOpen] = useState(false)
  const [currentGroup, setGroup] = useState(undefined)
  const [currentIdx, setCurrent] = useState(0)
  const [sort, triggerSort] = useState(0)

  const register = useCallback((id, data, group) => {
    group = ensureGroup(group)

    entriesRef.current[group] = entriesRef.current[group] || []
    entriesRef.current[group].push({
      id,
      data,
    })

    triggerSort(c => c + 1)
  }, [entriesRef, triggerSort])

  const unregister = useCallback((id, group) => {
    group = ensureGroup(group)

    if (entriesRef.current[group]) {
      const idx = entriesRef.current[group].findIndex(entry => entry.id === id)
      entriesRef.current[group].splice(idx, 1)
    }

  }, [entriesRef])

  const open = useCallback((id, group) => {
    group = ensureGroup(group)

    if (!entriesRef.current[group]) {
      return
    }

    const idx = entriesRef.current[group].findIndex(entry => entry.id === id)
    setGroup(group)
    setCurrent(idx)
    setOpen(true)
  }, [entriesRef, setGroup, setCurrent, setOpen])

  useLayoutEffect(() => {
    const order = []
    for (const node of document.querySelectorAll(`[data-lightbox]`)) {
      order.push(node.dataset.lightboxId)
    }

    for (const group of Object.values(entriesRef.current)) {
      group.sort((a, b) => {
        return order.indexOf(a.id) - order.indexOf(b.id)
      })
    }
  }, [sort])

  const entries = entriesRef.current[currentGroup] || []
  const { data: currentEntry } = entries[currentIdx] || {}
  const { data: nextEntry } = currentIdx < entries.length && entries[currentIdx + 1] || {}
  const { data: prevEntry } = currentIdx > 0 && entries[currentIdx - 1] || {}

  const close = () => setOpen(false)

  const ctxValue = {
    register,
    unregister,
    open,
    close,
  }

  return (
    <LightboxProvider value={ctxValue}>
      {children}

      {isOpen && <ReactImageLightbox
        mainSrc={currentEntry.src}
        nextSrc={nextEntry && nextEntry.src}
        prevSrc={prevEntry && prevEntry.src}
        imageCaption={currentEntry.caption}
        imagePadding={80}
        onCloseRequest={close}
        onMoveNextRequest={nextEntry && (() => setCurrent(current => current + 1))}
        onMovePrevRequest={prevEntry && (() => setCurrent(current => current - 1))}
      />}
    </LightboxProvider>
  )
}

export default LightboxWrapper

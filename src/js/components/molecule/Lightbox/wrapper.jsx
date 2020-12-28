import PropTypes from 'prop-types'
import { useCallback, useLayoutEffect, useMemo, useState } from 'preact/hooks'
import ReactImageLightbox from 'react-image-lightbox'

import { ensureGroup } from './utils'
import { LightboxProvider } from './context'

// TODO: control gallery by hash
function LightboxWrapper(props) {
  const {
    children,
    loop = false,
    onChange,
  } = props

  const [entries, setEntries] = useState({})
  const [sort, triggerSort] = useState(0)
  const [state, setCurrent] = useState({
    open: false,
    group: undefined,
    idx: undefined,
  })

  const register = useCallback((id, data, group) => {
    group = ensureGroup(group)

    setEntries(entries => ({
      ...entries,
      [group]: (entries[group] || []).concat({
        id,
        data,
      }),
    }))

    triggerSort(c => c + 1)
  }, [setEntries, triggerSort])

  const unregister = useCallback((id, group) => {
    group = ensureGroup(group)

    setEntries(entries => {
      if (!entries[group]) {
        return entries
      }

      return {
        ...entries,
        [group]: entries[group].filter(entry => entry.id !== id),
      }
    })
  }, [setEntries])

  const open = useCallback((id, group) => {
    group = ensureGroup(group)

    if (!entries[group]) {
      return
    }

    const idx = entries[group].findIndex(entry => entry.id === id)

    const newState = {
      open: true,
      group,
      idx,
    }

    setCurrent(newState)
    onChange && onChange(newState)
  }, [entries, setCurrent, onChange])

  useLayoutEffect(() => {
    const order = []
    for (const node of document.querySelectorAll(`[data-lightbox]`)) {
      order.push(node.dataset.lightboxId)
    }

    for (const group of Object.values(entries)) {
      group.sort((a, b) => {
        return order.indexOf(a.id) - order.indexOf(b.id)
      })
    }
  }, [entries, sort])

  const currentEntries = useMemo(() => entries[state.group] || [], [entries, state.group])
  const { data: currentEntry } = findCurrentEntry(currentEntries, state.idx)
  const { data: nextEntry } = findNextEntry(currentEntries, state.idx, loop)
  const { data: prevEntry } = findPreviousEntry(currentEntries, state.idx, loop)

  const close = useCallback(
    () => {
      const newState = { open: false }
      setCurrent(newState)
      onChange && onChange(newState)
    },
    [setCurrent, onChange],
  )

  const ctxValue = useMemo(
    () => ({
      register,
      unregister,
      open,
      close,
    }),
    [register, unregister, open, close],
  )

  const onMoveNextRequest = useCallback(
    () => setCurrent(state => {
      const newState = {
        ...state,
        idx: state.idx + 1 === currentEntries.length ? 0 : state.idx + 1,
      }
      onChange && onChange(newState)
      return newState
    }),
    [currentEntries, setCurrent, onChange],
  )

  const onMovePrevRequest = useCallback(
    () => setCurrent(state => {
      const newState = {
        ...state,
        idx: state.idx === 0 ? currentEntries.length - 1 : state.idx - 1,
      }
      onChange && onChange(newState)
      return newState
    }),
    [currentEntries, setCurrent, onChange],
  )

  return (
    <LightboxProvider value={ctxValue}>
      {children}

      {state.open && <ReactImageLightbox
        mainSrc={currentEntry.src}
        nextSrc={nextEntry && nextEntry.src}
        prevSrc={prevEntry && prevEntry.src}
        imageCaption={currentEntry.caption}
        imagePadding={80}
        onCloseRequest={close}
        onMoveNextRequest={nextEntry && onMoveNextRequest}
        onMovePrevRequest={prevEntry && onMovePrevRequest}
      />}
    </LightboxProvider>
  )
}

function findCurrentEntry(currentEntries = [], idx) {
  return currentEntries[idx] || {}
}

function findNextEntry(currentEntries = [], idx, loop) {
  if (idx < currentEntries.length - 1) {
    return currentEntries[idx + 1] || {}
  }

  if (loop && currentEntries.length > 1) {
    return currentEntries[0] || {}
  }

  return {}
}

function findPreviousEntry(currentEntries = [], idx, loop) {
  if (idx > 0) {
    return currentEntries[idx - 1] || {}
  }

  if (loop && currentEntries.length > 1) {
    return currentEntries[currentEntries.length - 1] || {}
  }

  return {}
}

LightboxWrapper.propTypes = {
  loop: PropTypes.bool,
  onChange: PropTypes.func,
}

export default LightboxWrapper

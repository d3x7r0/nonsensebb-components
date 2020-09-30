import { useContext, useEffect, useMemo } from 'preact/hooks'
import PropTypes from 'prop-types'

import LinkWrapper from '../../atom/LinkWrapper'

import { ensureID } from './utils'
import { LightboxContext } from './context'

function LightboxEntry(props) {
  const {
    src,
    caption,
    group,
    children,
    ...rest
  } = props

  const id = useMemo(
    () => ensureID(rest.id),
    [rest.id],
  )

  const { register, unregister, open } = useContext(LightboxContext) || {}

  useEffect(() => {
    if (!register) {
      return
    }

    register(
      id,
      {
        src,
        caption,
      },
      group,
    )

    return () => unregister(id, group)
  }, [id, src, caption, group, register, unregister])

  const onClick = open ? (
    (e) => {
      e.preventDefault()
      return open(id, group)
    }
  ) : undefined

  return (
    <LinkWrapper
      href={src}
      {...rest}
      data-lightbox-id={id}
      onClick={onClick}
    >
      {children}
    </LinkWrapper>
  )
}

LightboxEntry.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.node,
  group: PropTypes.string,
}

export default LightboxEntry

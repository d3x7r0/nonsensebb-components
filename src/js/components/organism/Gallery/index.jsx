import { useMemo } from 'preact/hooks'
import PropTypes from 'prop-types'

import Figure from '../../atom/Figure'
import LinkWrapper from '../../atom/LinkWrapper'
import GalleryList, { GalleryListEntry } from '../../molecule/GalleryList'
import LightboxEntry, { LightboxWrapper } from '../../molecule/Lightbox'

let COUNTER = 0

function Gallery(props) {
  const {
    lightbox = false,
    entries = [],
    ImgElement,
    ...rest
  } = props

  const lightboxGroup = useMemo(
    () => lightbox && `gallery_${COUNTER++}`,
    [lightbox],
  )

  const parsedEntries = useMemo(
    () => entries.map((entry) => {
      const href = lightbox ? (entry.href || entry.picture.src || undefined) : entry.href

      return ({
        ...entry,
        href,
        id: entry.id || `gallery_entry_${COUNTER++}`,
      })
    }),
    [entries, lightbox],
  )

  const inner = (
    <GalleryInner {...rest}>
      {parsedEntries.map((entry, idx) => (
        <GalleryListEntry key={entry.id || idx}>
          <GalleryEntry
            {...entry}
            lightbox={lightboxGroup}
            ImgElement={ImgElement}
          />
        </GalleryListEntry>
      ))}
    </GalleryInner>
  )

  if (lightbox) {
    return (
      <LightboxWrapper>
        {inner}
      </LightboxWrapper>
    )
  }

  return inner
}

function GalleryInner(props) {
  const {
    caption,
    children,
    alignBottom,
    colorMain,
    ...rest
  } = props

  if (caption) {
    return (
      <Figure caption={caption} {...rest}>
        <GalleryList
          noMargin
          alignBottom={alignBottom}
          colorMain={colorMain}
        >
          {children}
        </GalleryList>
      </Figure>
    )
  }

  return (
    <GalleryList
      alignBottom={alignBottom}
      colorMain={colorMain}
      {...rest}
    >
      {children}
    </GalleryList>
  )
}

const GalleryEntry = (props) => {
  const {
    picture,
    alt,
    href,
    lightbox,
    ImgElement = 'img',
    ...rest
  } = props

  const img = (
    <ImgElement alt={alt} {...picture} />
  )

  let inner = img

  if (lightbox) {
    inner = (
      <LightboxEntry
        src={href}
        group={lightbox}
        caption={picture.caption || rest.caption}
      >
        {img}
      </LightboxEntry>
    )
  } else if (href) {
    inner = (
      <LinkWrapper href={href}>
        {img}
      </LinkWrapper>
    )
  }

  return (
    <Figure {...rest}>
      {inner}
    </Figure>
  )
}

const picturePropTypes = PropTypes.shape({
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  caption: PropTypes.node,
})

const entryPropTypes = PropTypes.shape({
  id: PropTypes.string,
  href: PropTypes.string,
  caption: PropTypes.node,
  picture: picturePropTypes.isRequired,
})

Gallery.propTypes = {
  noMargin: PropTypes.bool,
  alignBottom: PropTypes.bool,
  colorMain: PropTypes.string,
  lightbox: PropTypes.bool,
  entries: PropTypes.arrayOf(entryPropTypes).isRequired,
  ImgElement: PropTypes.elementType,
}

export default Gallery

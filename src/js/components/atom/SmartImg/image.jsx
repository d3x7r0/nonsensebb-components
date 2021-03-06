import { useContext, useMemo } from 'preact/hooks'
import PropTypes from 'prop-types'
import isString from 'lodash-es/isString'
import omit from 'lodash-es/omit'
import pick from 'lodash-es/pick'
import isNil from 'lodash-es/isNil'

import { buildSources } from './sources'
import { Context, SmartImgPropTypes } from './context'
import { DEFAULT_FORMATS, IMAGE_PROPS, SMART_IMG_PROPS } from './constants'

function parseProps(ctx = {}, props = {}) {
  const settings = {
    min: props.minSize || ctx.minSize,
    max: props.maxSize || ctx.maxSize,
    maxWidth: props.defaultSize || ctx.defaultSize,
    sizes: props.sizes || ctx.sizes,
    lazy: isNil(props.lazy) ? ctx.lazy : props.lazy,
    placeholder: props.placeholder || ctx.placeholder,
    crop: props.crop || ctx.crop,
    formats: props.formats || ctx.formats,
  }

  if (typeof settings.formats === 'undefined') {
    settings.formats = [...DEFAULT_FORMATS]
  }

  const imgProps = {
    ...pick(props, IMAGE_PROPS),
    ...props.imgProps,
  }

  return {
    ...omit(props, IMAGE_PROPS.concat(SMART_IMG_PROPS)),
    settings,
    imgProps,
  }
}

const SmartImg = (props) => {
  const ctx = useContext(Context)

  const {
    src,
    settings,
    imgProps,
    ...rest
  } = useMemo(
    () => parseProps(ctx, props),
    [ctx, props],
  )

  const [imgSrc, sources] = useMemo(
    () => buildSources(src, settings),
    [src, settings],
  )

  if (settings.crop) {
    let w
    let h

    if (isString(settings.crop)) {
      const [width, height] = settings.crop.trim().toLowerCase().split('x')
      w = width || 1
      h = height || 1
    } else {
      w = settings.crop.width || 1
      h = settings.crop.height || 1
    }

    // Fix width and height when crop is enabled
    if (imgProps.width) {
      imgProps.height = Math.round(imgProps.width * h / w)
    } else if (imgProps.height) {
      imgProps.width = Math.round(imgProps.height * w / h)
    }
  }

  if (settings.lazy) {
    imgProps.loading = 'lazy'
  }

  return (
    <picture {...rest}>
      {sources.map(entry => (
        <source
          key={entry.format}
          srcSet={entry.srcSet}
          sizes={settings.sizes}
          type={entry.type}
        />
      ))}

      <img
        alt=""
        {...omit(imgProps, ['sizes'])}
        src={imgSrc}
      />
    </picture>
  )
}

SmartImg.propTypes = {
  ...SmartImgPropTypes,
  src: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  alt: PropTypes.string,
}

export default SmartImg

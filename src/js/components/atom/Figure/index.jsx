import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useCSSVariable, useDominantColor } from '../../../hooks'

import styles from './index.module.scss'

function Figure(props) {
  const {
    className,
    children,
    caption,
    ratio,
    style,
    border,
    contentClassName,
    ...rest
  } = props

  let computedStyle = useDominantColor(
    border && border !== true ? border : null,
    style,
  )

  computedStyle = useCSSVariable(
    'aspect-ratio',
    getRatio(ratio),
    computedStyle,
  )

  return (
    <figure
      {...rest}
      className={buildClassName({
        className,
        border,
      })}
      style={computedStyle}
    >
      <div className={buildContentClassName({
        className: contentClassName,
        ratio,
      })}>
        {children}
      </div>

      {caption && (
        <figcaption className={styles['a-figure__caption']}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function buildClassName({ className, border }) {
  return classNames(
    className,
    styles['a-figure'],
    { [styles['a-figure--border']]: border },
  )
}

function buildContentClassName({ className, ratio }) {
  return classNames(
    className,
    styles['a-figure__content'],
    { [styles['a-figure__content--with-ratio']]: ratio },
  )
}

function getRatio(ratio) {
  if (!ratio) {
    return null
  }

  if (ratio.width || ratio.height) {
    return `${ratio.height} / ${ratio.width || 1}`
  }

  return `1 / (${ratio})`
}

Figure.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  caption: PropTypes.node,
  border: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  ratio: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
  ]),
}

export default Figure

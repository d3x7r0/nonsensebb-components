import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useAltDominantColor } from '../../../hooks'

import styles from './index.module.scss'

function GalleryList(props) {
  const {
    children,
    className,
    noMargin,
    alignBottom,
    colorMain,
    style,
    ...rest
  } = props

  const computedStyle = useAltDominantColor(
    colorMain,
    style,
  )

  return (
    <ul
      {...rest}
      style={computedStyle}
      className={buildClassNames({
        className,
        noMargin,
        alignBottom,
      })}
    >
      {children}
    </ul>
  )
}

function buildClassNames({ className, noMargin, alignBottom }) {
  return classNames(
    className,
    styles['m-gallery-list'],
    {
      [styles['m-gallery-list--no-margin']]: noMargin,
      [styles['m-gallery-list--align-bottom']]: alignBottom
    },
  )
}

GalleryList.propTypes = {
  noMargin: PropTypes.bool,
  alignBottom: PropTypes.bool,
  colorMain: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
}

export default GalleryList

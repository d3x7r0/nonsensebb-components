/** @jsx h */
import { h } from 'preact'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useAltDominantColor, useBgColor, useBorderColor } from '../../../hooks'

import styles from './index.module.scss'

const DEFAULT_CLOSE_LABEL = 'Close'

function Toast(props) {
  const {
    class: c,
    className,
    children,
    closeLabel = DEFAULT_CLOSE_LABEL,
    onClose,
    closed,
    style,
    colorMain,
    colorBackground,
    colorBorder,
    ...rest
  } = props

  let computedStyle = useAltDominantColor(
    colorMain,
    style,
  )

  computedStyle = useBgColor(
    colorBackground,
    computedStyle,
  )

  computedStyle = useBorderColor(
    colorBorder,
    computedStyle,
  )

  if (closed) {
    return null
  }

  return (
    <div
      {...rest}
      style={computedStyle}
      className={buildClassName({
        className: c || className,
      })}
    >
      <div className={styles['m-toast__inner']}>
        <div className={styles['m-toast__content']}>
          {children}
        </div>

        <button
          type="button"
          className={styles['m-toast__close']}
          onClick={onClose}
        >
          {closeLabel}
        </button>
      </div>
    </div>
  )
}

function buildClassName({ className }) {
  return classNames(
    className,
    styles['m-toast'],
  )
}

Toast.propTypes = {
  closed: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  closeLabel: PropTypes.element,
  colorMain: PropTypes.string,
  colorBackground: PropTypes.string,
  colorBorder: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
}

export default Toast

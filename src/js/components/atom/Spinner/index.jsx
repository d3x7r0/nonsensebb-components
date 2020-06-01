/** @jsx h */
import { h } from 'preact'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useAltColor, useDominantColor } from '../../../hooks'

import styles from './index.module.scss'

function Spinner(props) {
  const {
    class: c,
    className,
    active,
    colorMain,
    colorAlt,
    style,
    ...rest
  } = props

  let computedStyle = useDominantColor(
    colorMain,
    style,
  )

  computedStyle = useAltColor(
    colorAlt,
    computedStyle,
  )

  return (
    <div
      {...rest}
      style={computedStyle}
      className={buildClassNames({
        className: c || className,
        active,
      })}
    >
      <div className={classNames(
        styles['a-spinner__block'],
        styles['a-spinner__block--four'],
      )} />

      <div className={classNames(
        styles['a-spinner__block'],
        styles['a-spinner__block--three'],
      )} />

      <div className={classNames(
        styles['a-spinner__block'],
        styles['a-spinner__block--two'],
      )} />

      <div className={classNames(
        styles['a-spinner__block'],
        styles['a-spinner__block--one'],
      )} />
    </div>
  )
}

Spinner.propTypes = {
  active: PropTypes.bool,
  colorMain: PropTypes.string,
  colorAlt: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
}

function buildClassNames(props) {
  const { className, active } = props

  return classNames(
    className,
    styles['a-spinner'],
    { [styles['a-spinner--active']]: active },
  )
}

export default Spinner

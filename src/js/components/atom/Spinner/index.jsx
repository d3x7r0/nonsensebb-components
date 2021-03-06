import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useCSSVariable } from '../../../hooks'

import styles from './index.module.scss'

function Spinner(props) {
  const {
    className,
    active,
    colorMain,
    colorAlt,
    style,
    ...rest
  } = props

  let computedStyle = useCSSVariable(
    'spinner-color',
    colorMain,
    style,
  )

  computedStyle = useCSSVariable(
    'spinner-alt-color',
    colorAlt,
    computedStyle,
  )

  return (
    <div
      {...rest}
      style={computedStyle}
      className={buildClassNames({
        className,
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

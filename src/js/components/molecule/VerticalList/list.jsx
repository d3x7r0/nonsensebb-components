/** @jsx h */
import { h } from 'preact'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { SIDE_LEFT, SIDE_RIGHT } from '../../../constants'

import styles from './index.module.scss'

function VerticalList(props) {
  const {
    children,
    class: c,
    className,
    side,
    grid,
    noMargin,
    ...rest
  } = props

  return (
    <ul
      {...rest}
      className={buildClassNames({
        className: c || className,
        side,
        noMargin,
        grid,
      })}
    >
      {children}
    </ul>
  )
}

function buildClassNames(props) {
  const {
    className,
    side = SIDE_LEFT,
    noMargin = false,
    grid = false,
  } = props

  return classNames(
    className,
    styles['m-vertical-list'],
    {
      [styles['m-vertical-list--right']]: side === SIDE_RIGHT,
      [styles['m-vertical-list--no-margin']]: noMargin,
      [styles['m-vertical-list--grid']]: grid,
    },
  )
}

VerticalList.propTypes = {
  className: PropTypes.string,
  side: PropTypes.oneOf([SIDE_LEFT, SIDE_RIGHT]),
  noMargin: PropTypes.bool,
  grid: PropTypes.bool,
}

export default VerticalList

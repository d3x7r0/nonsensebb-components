import classNames from 'classnames'
import PropTypes from 'prop-types'

import { getDisplayName } from '../../utils'
import { SIDE_LEFT, SIDE_RIGHT } from '../../../constants'

import styles from './index.module.scss'

export function AsHorizontalMenuEntry(Component, displayName) {
  const WrappedComponent = ({ className, side, ...props }) => (
    <Component
      {...props}
      className={buildClassNames({
        className,
        side
      })}
    />
  )

  WrappedComponent.displayName = displayName || `AsHorizontalMenuEntry(${getDisplayName(Component)})`

  WrappedComponent.propTypes = {
    ...(Component.propTypes || {}),
    side: PropTypes.oneOf([
      SIDE_LEFT,
      SIDE_RIGHT,
    ]),
  }

  return WrappedComponent
}

export function buildClassNames({ className, side } = {}) {
  return classNames(
    className,
    styles['a-horizontal-menu__entry'],
    {
      [styles['a-horizontal-menu__entry--left']]: side === SIDE_LEFT,
      [styles['a-horizontal-menu__entry--right']]: side === SIDE_RIGHT,
    },
  )
}

export const HorizontalMenuEntry = AsHorizontalMenuEntry('li', 'HorizontalMenuEntry')
export const HorizontalNavMenuEntry = AsHorizontalMenuEntry('p', 'HorizontalNavMenuEntry')

export default HorizontalMenuEntry

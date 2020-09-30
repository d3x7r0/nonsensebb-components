import classNames from 'classnames'
import PropTypes from 'prop-types'

import { getDisplayName } from '../../utils'

import styles from './index.module.scss'

export function AsHorizontalMenu(Component, displayName) {
  const WrappedComponent = ({ className, balanced, children, ...props }) => (
    <Component
      {...props}
      className={buildClassNames({
        className,
        balanced,
      })}
    >
      {children}
    </Component>
  )

  WrappedComponent.displayName = displayName || `AsHorizontalMenu(${getDisplayName(Component)})`

  WrappedComponent.propTypes = {
    ...(Component.propTypes || {}),
    className: PropTypes.string,
    balanced: PropTypes.bool,
  }

  return WrappedComponent
}

function buildClassNames({ className, balanced }) {
  return classNames(
    className,
    styles['a-horizontal-menu'],
    {
      [styles['a-horizontal-menu--balanced']]: balanced,
    },
  )
}

export const HorizontalMenu = AsHorizontalMenu('ul', 'HorizontalMenu')
export const HorizontalNavMenu = AsHorizontalMenu('nav', 'HorizontalNavMenu')

export default HorizontalMenu

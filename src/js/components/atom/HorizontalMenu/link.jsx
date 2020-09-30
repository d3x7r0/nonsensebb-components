import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useAltColor, useAltDominantColor } from '../../../hooks'
import LinkWrapper from '../LinkWrapper'

import styles from './index.module.scss'

function HorizontalMenuLink(props) {
  const {
    active,
    className,
    href,
    children,
    style,
    accentColor,
    hoverColor,
    ...rest
  } = props

  let computedStyle = useAltDominantColor(
    accentColor,
    style,
  )

  computedStyle = useAltColor(
    hoverColor,
    computedStyle,
  )

  return (
    <LinkWrapper
      {...rest}
      href={href}
      style={computedStyle}
      className={buildClassNames({
        className,
        active,
      })}
    >
      {children}
    </LinkWrapper>
  )
}

HorizontalMenuLink.propTypes = {
  className: PropTypes.string,
  style: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  active: PropTypes.bool,
  href: PropTypes.string.isRequired,
  accentColor: PropTypes.string,
  hoverColor: PropTypes.string,
}

function buildClassNames({ className, active = false }) {
  return classNames(
    className,
    styles['a-horizontal-menu__link'],
    { [styles['a-horizontal-menu__link--active']]: active },
  )
}

export default HorizontalMenuLink

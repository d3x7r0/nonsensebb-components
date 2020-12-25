import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useCSSVariable } from '../../../hooks'

import styles from './index.module.scss'

function RatioBox(props) {
  const {
    className,
    children,
    ratio,
    style,
    contentClassName,
    ...rest
  } = props

  const computedStyle = useCSSVariable(
    'aspect-ratio',
    getRatio(ratio),
    style,
  )

  return (
    <div
      {...rest}
      className={buildClassName({ className })}
      style={computedStyle}
    >
      <div className={buildContentClassName({
        className: contentClassName,
        ratio,
      })}>
        {children}
      </div>
    </div>
  )
}

function buildClassName({ className }) {
  return classNames(
    className,
    styles['a-ratio-box'],
  )
}

function buildContentClassName({
  className,
  ratio,
}) {
  return classNames(
    className,
    styles['a-ratio-box__content'],
    { [styles['a-ratio-box__content--with-ratio']]: ratio },
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

RatioBox.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  ratio: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
  ]),
}

export default RatioBox

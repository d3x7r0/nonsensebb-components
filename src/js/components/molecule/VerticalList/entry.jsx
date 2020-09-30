import classNames from 'classnames'

import styles from './index.module.scss'

function VerticalListEntry(props) {
  const {
    className,
    children,
    ...rest
  } = props

  return (
    <li
      {...rest}
      className={buildClassNames({ className })}
    >
      {children}
    </li>
  )
}

function buildClassNames({ className }) {
  return classNames(
    className,
    styles['m-vertical-list__entry'],
  )
}

export default VerticalListEntry

import classNames from 'classnames'

import styles from './index.module.scss'

function GalleryListEntry(props) {
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
    styles['m-gallery-list__entry'],
  )
}

export default GalleryListEntry

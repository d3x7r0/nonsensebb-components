/* eslint-disable react/jsx-no-literals */
/** @jsx h */
import { h } from 'preact'
import createPersistedState from 'use-persisted-state'
import PropTypes from 'prop-types'

import Toast from '../../molecule/Toast'
import LinkWrapper from '../../atom/LinkWrapper'

const usePopupSeen = createPersistedState('cookie-popup-seen')

function CookieDisclaimer(props) {
  const {
    text = 'This website uses cookies.',
    link,
    linkText = 'Learn more',
    linkProps = {},
    ...rest
  } = props

  const [seen, setSeen] = usePopupSeen(typeof window === 'undefined')

  if (seen) {
    return null
  }

  return (
    <Toast
      {...rest}
      closed={seen}
      onClose={() => setSeen(true)}
    >
      {text}<br />
      <LinkWrapper href={link} {...linkProps}>
        {linkText}
      </LinkWrapper>.
    </Toast>
  )
}

CookieDisclaimer.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  linkProps: LinkWrapper.propTypes,
  closeLabel: PropTypes.node,
  colorMain: PropTypes.string,
  colorBackground: PropTypes.string,
  colorBorder: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
}

export default CookieDisclaimer

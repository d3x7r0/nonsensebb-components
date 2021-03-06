/* eslint-disable react/jsx-no-literals */
import PropTypes from 'prop-types'

import Toast from '../../molecule/Toast'
import LinkWrapper from '../../atom/LinkWrapper'
import { useLocalStorage, useMounted } from '../../../hooks'

const COOKIE_SEEN_STORAGE_KEY = 'cookie-popup-seen'

function CookieDisclaimer(props) {
  const {
    text = 'This website uses cookies.',
    link,
    linkText = 'Learn more',
    linkProps = {},
    ...rest
  } = props

  const isMounted = useMounted()

  const [seen, setSeen] = useLocalStorage(
    COOKIE_SEEN_STORAGE_KEY,
    false,
  )

  if (!isMounted || seen) {
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
  linkProps: PropTypes.shape(LinkWrapper.propTypes),
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

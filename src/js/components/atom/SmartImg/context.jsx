import { createContext } from 'preact'
import PropTypes from 'prop-types'
import pick from 'lodash-es/pick'

import { FORMATS, SMART_IMG_PROPS } from './constants'

export const Context = createContext({})

const SmartImgSettingsProvider = (props) => {
  const { children } = props

  const ctx = pick(props, SMART_IMG_PROPS)

  ctx.formats = typeof ctx.formats === 'undefined' ?
    undefined :
    ctx.formats

  return (
    <Context.Provider value={ctx}>
      {children}
    </Context.Provider>
  )
}

export const SmartImgPropTypes = {
  minSize: PropTypes.number,
  maxSize: PropTypes.number,
  defaultSize: PropTypes.number,
  sizes: PropTypes.string,
  lazy: PropTypes.bool,
  placeholder: PropTypes.bool,
  crop: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
  ]),
  formats: PropTypes.arrayOf(
    PropTypes.oneOf(FORMATS.map(f => f.format)),
  ),
}

SmartImgSettingsProvider.propTypes = {
  ...SmartImgPropTypes,
  imgProps: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    alt: PropTypes.string,
    sizes: PropTypes.string,
  }),
}

export function withFormats(formats = []) {
  const WrappedComponent = (props) => (
    <SmartImgSettingsProvider
      formats={formats}
      {...props}
    />
  )

  WrappedComponent.displayName = `SmartImgSettingsProvider<${formats.join(',')}>`

  return WrappedComponent
}

export default SmartImgSettingsProvider

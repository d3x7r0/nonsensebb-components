/** @jsx h */
import { createContext, h } from 'preact'
import { useContext } from 'preact/hooks'

const LinkContext = createContext(null)

export const LinkProvider = LinkContext.Provider

export function LinkWrapper(props) {
  const Link = useContext(LinkContext) || 'a'

  return <Link {...props} />
}

export function OptionalLink(props) {
  if (props.href) {
    return (
      <LinkWrapper {...props} />
    )
  } else {
    return props.children
  }
}

export default LinkWrapper

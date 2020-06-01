import { options } from 'preact'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-preact-pure'

const oldHook = options.vnode

options.vnode = vnode => {
  // Remove __self and __source from attributes
  delete vnode.props['__self']
  delete vnode.props['__source']

  // Call previously defined hook if there was any
  if (oldHook) {
    oldHook(vnode)
  }
}

configure({
  adapter: new Adapter(),
})

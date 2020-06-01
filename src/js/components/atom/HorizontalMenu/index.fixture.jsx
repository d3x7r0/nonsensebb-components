/** @jsx h */
import { h } from 'preact'

import '../../../../css/reset.scss'

import { SIDE_LEFT, SIDE_RIGHT } from '../../../constants'

import HorizontalMenu, {
  HorizontalMenuEntry,
  HorizontalMenuLink,
  HorizontalNavMenu,
  HorizontalNavMenuEntry,
} from './index'

const ENTRY_LABEL = 'An Entry'
const LINK_ENTRY_LABEL = 'A Link'

export default {
  AsList: (
    <HorizontalMenu balanced={false}>
      <HorizontalMenuEntry side={SIDE_LEFT}>
        {ENTRY_LABEL}
      </HorizontalMenuEntry>

      <HorizontalMenuEntry side={SIDE_RIGHT}>
        <HorizontalMenuLink
          active
          accentColor="#DD972E"
          hoverColor="#E8E8E8"
          href="https://www.example.com"
        >
          {LINK_ENTRY_LABEL}
        </HorizontalMenuLink>
      </HorizontalMenuEntry>
    </HorizontalMenu>
  ),
  AsNav: (
    <HorizontalNavMenu balanced={false}>
      <HorizontalNavMenuEntry side={SIDE_LEFT}>
        {ENTRY_LABEL}
      </HorizontalNavMenuEntry>

      <HorizontalNavMenuEntry side={SIDE_RIGHT}>
        <HorizontalMenuLink
          active
          accentColor="#DD972E"
          hoverColor="#E8E8E8"
          href="https://www.example.com"
        >
          {LINK_ENTRY_LABEL}
        </HorizontalMenuLink>
      </HorizontalNavMenuEntry>
    </HorizontalNavMenu>
  ),
}

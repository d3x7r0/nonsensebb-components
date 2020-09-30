/* eslint-disable react/jsx-no-literals */
import { SIDE_LEFT } from '../../../constants'

import VerticalList, { VerticalListEntry } from './index'

import '../../../../css/reset.scss'

export default (
  <VerticalList
    side={SIDE_LEFT}
    noMargin={false}
    grid={false}
  >
    <VerticalListEntry>Entry 1</VerticalListEntry>
    <VerticalListEntry>Entry 2</VerticalListEntry>
    <VerticalListEntry>Entry 3</VerticalListEntry>
    <VerticalListEntry>Entry 4</VerticalListEntry>
    <VerticalListEntry>Entry 5</VerticalListEntry>
  </VerticalList>
)

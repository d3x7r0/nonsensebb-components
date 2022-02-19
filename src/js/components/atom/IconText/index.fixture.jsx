/* eslint import/namespace: ['error', { allowComputed: true }] */
import * as icons from 'react-feather'
import { useValue } from 'react-cosmos/fixture'

import { SIDE_LEFT } from '../../../constants'

import IconText from './index'

import '../../../../css/reset.scss'

const LABEL = 'Icon Link Label'

const IconTextFixture = () => {
  const [side] = useValue('side', {
    defaultValue: SIDE_LEFT,
  })

  const [color] = useValue('iconColor', {
    defaultValue: '#DD972E',
  })

  const [icon] = useValue('icon', {
    defaultValue: 'Heart',
  })

  const IconComponent = icon in icons ? icons[icon] : null

  return (
    <IconText
      iconColor={color}
      IconComponent={IconComponent}
      side={side}
    >
      {LABEL}
    </IconText>
  )
}

export default IconTextFixture
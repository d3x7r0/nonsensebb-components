import * as icons from 'react-feather'
import { useValue } from 'react-cosmos/fixture'

import { SIDE_LEFT } from '../../../constants'

import IconLink from './index'

import '../../../../css/reset.scss'

const LABEL = 'Icon Link Label'

export default () => {
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
    (
      <IconLink
        iconColor={color}
        IconComponent={IconComponent}
        side={side}
      >
        {LABEL}
      </IconLink>
    )

  )
}

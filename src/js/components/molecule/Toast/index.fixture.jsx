import { useValue } from 'react-cosmos/fixture'

import Toast from './index'

import '../../../../css/reset.scss'

const TOAST_TEXT = 'This is a simple toast'
const CLOSE_LABEL = 'Close'

const ToastFixture = () => {
  const [closeLabel] = useValue('closeLabel', {
    defaultValue: CLOSE_LABEL,
  })

  const [colorMain] = useValue('colorMain', {
    defaultValue: '#DD972E',
  })

  const [colorBackground] = useValue('colorBackground', {
    defaultValue: '#282828',
  })

  const [colorBorder] = useValue('colorBorder', {
    defaultValue: '#555753',
  })

  const [closed, setClosed] = useValue('closed', {
    defaultValue: false,
  })

  return (
    <Toast
      closed={closed}
      closeLabel={closeLabel}
      colorMain={colorMain}
      colorBackground={colorBackground}
      colorBorder={colorBorder}
      onClose={() => setClosed(true)}
    >
      <p>{TOAST_TEXT}</p>
    </Toast>
  )
}

export default ToastFixture
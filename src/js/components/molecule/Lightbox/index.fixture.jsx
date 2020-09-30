import LightboxEntry, { LightboxWrapper } from './index'

import '../../../../css/reset.scss'
import 'react-image-lightbox/style.css'

export default (
  <LightboxWrapper>
    <p>
      <LightboxEntry src="https://placekitten.com/1280/800" caption="A nice kitty">
        <img alt="Placekitten" src="https://placekitten.com/240/120" />
      </LightboxEntry>
    </p>

    <p>
      <LightboxEntry src="https://placekitten.com/1440/900" caption="A second nice kitty">
        <img alt="Placekitten" src="https://placekitten.com/240/120" />
      </LightboxEntry>
    </p>
  </LightboxWrapper>
)

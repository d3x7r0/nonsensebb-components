import '../../../../css/reset.scss'

import SmartImg, { SmartImgSettingsProvider } from './index'

// TODO: more examples
export default (
  <div>
    <SmartImgSettingsProvider
      minSize={320}
      maxSize={920}
      defaultSize={320}
      sizes="50vw"
      placeholder={false}
      crop="16x9"
      lazy
      formats={[
        'png',
        'jpg',
      ]}
    >
      <SmartImg
        width={890}
        height={880}
        src='https://images.nonsensebb.com/headers/background_0015.jpg'
      />
    </SmartImgSettingsProvider>
  </div>
)

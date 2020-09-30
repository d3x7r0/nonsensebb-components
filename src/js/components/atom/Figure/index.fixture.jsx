import '../../../../css/reset.scss'

import Figure from './index'

export default {
  Image: (
    <Figure
      ratio=""
      caption="A kitten"
      border='#DD972E'
    >
      <img alt="Placekitten" src="https://placekitten.com/640/360" />
    </Figure>
  ),
  YouTubeVideo: (
    <Figure
      ratio='16 / 9'
      caption='Never gonna give you up'
    >
      <iframe title="Never gonna give you up"
              width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen />
    </Figure>
  ),
}

/** @jsx h */
import { h } from 'preact'

import Gallery from './index'

import '../../../../css/reset.scss'

const ENTRIES = [
  {
    id: 'kitten_1',
    caption: 'A nice kitty',
    picture: {
      src: 'https://placekitten.com/240/180',
      alt: 'Placekitten',
    },
  },
  {
    id: 'kitten_2',
    caption: 'A second nice kitty',
    href: 'https://placekitten.com/1440/900',
    picture: {
      src: 'https://placekitten.com/240/180',
      caption: 'The caption for a second nice kitty',
      alt: 'Placekitten',
    },
  },
]

export default (
  <Gallery
    entries={ENTRIES}
    lightbox={true}
  />
)

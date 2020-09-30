import GalleryList, { GalleryListEntry } from './index'

import '../../../../css/reset.scss'

export default (
  <GalleryList
    noMargin={false}
    alignBottom={false}
    colorMain="#5388d3"
  >
    <GalleryListEntry>
      <a href="https://www.example.com">
        <img alt="Placekitten" src="https://placekitten.com/240/120" />
      </a>
    </GalleryListEntry>
    <GalleryListEntry>
      <a href="https://www.example.com">
        <img alt="Placekitten" src="https://placekitten.com/240/120" />
      </a>
    </GalleryListEntry>
    <GalleryListEntry>
      <img alt="Placekitten" src="https://placekitten.com/240/120" />
    </GalleryListEntry>
    <GalleryListEntry>
      <img alt="Placekitten" src="https://placekitten.com/240/120" />
    </GalleryListEntry>
    <GalleryListEntry>
      <img alt="Placekitten" src="https://placekitten.com/240/120" />
    </GalleryListEntry>
  </GalleryList>
)

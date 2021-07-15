import { FunctionComponent } from 'react'
import { SRLWrapper } from 'simple-react-lightbox'
import styled from 'styled-components'
import type { ImageType } from 'storyblok/types'
import dynamic from 'next/dynamic'

const GalleryComponent = dynamic(() => import('react-photo-gallery'), {
  ssr: false, // prevents ssr bug https://github.com/neptunian/react-photo-gallery/issues/144
})

const Section = styled.div`
  img:hover {
    cursor: zoom-in;
  }
`

type Props = {
  images: Array<ImageType>
}

export const Gallery: FunctionComponent<Props> = ({ images }) => {
  const photos = images.map((image) => {
    const width = parseInt(image.filename.split('/')[5].split('x')[0])
    const height = parseInt(image.filename.split('/')[5].split('x')[1])

    return {
      src: image.filename,
      width,
      height,
    }
  })

  return (
    <Section>
      <SRLWrapper>
        <GalleryComponent photos={photos} direction="column" />
      </SRLWrapper>
    </Section>
  )
}

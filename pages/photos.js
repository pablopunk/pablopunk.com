import React from 'react'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-images'
import Layout from '../components/layout'
import Fade from '../components/fade'

const {pexels} = require('../images')

const imageUrl = id => `/static/images/pexels/pexels-photo-${id}.jpg`
const pexelsUrl = id =>
  `https://static.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`

const thumbnails = pexels.map(p => ({
  ...p,
  src: imageUrl(p.id)
}))

const photos = pexels.map(p => ({
  ...p,
  src: pexelsUrl(p.id)
}))

export default class extends React.Component {
  constructor () {
    super()
    this.state = { currentImage: 0 }
    this.closeLightbox = this.closeLightbox.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
  }

  openLightbox (event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true
    })
  }

  closeLightbox () {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    })
  }

  gotoPrevious () {
    this.setState({
      currentImage: this.state.currentImage - 1
    })
  }

  gotoNext () {
    this.setState({
      currentImage: this.state.currentImage + 1
    })
  }

  render () {
    return (
      <Layout title='Photos' navLinks={[{title: 'Photos'}]}>
        <div>
          <Fade>
            More in{' '}
            <a href='https://pexels.com/u/pablopunk' alt='Pexels'>
              pexels.com/pablopunk
            </a>
          </Fade>
          <div>
            <Gallery photos={thumbnails} onClick={this.openLightbox} />
            <Lightbox images={photos}
              onClose={this.closeLightbox}
              onClickPrev={this.gotoPrevious}
              onClickNext={this.gotoNext}
              currentImage={this.state.currentImage}
              isOpen={this.state.lightboxIsOpen}
            />
          </div>
        </div>
        <style jsx>{`
          div {
            margin: 1em 2em;
            text-align: center;
          }
          .back {
            margin-bottom: 2em;
          }
          div:after {
            content: '';
            display: table;
            clear: both;
          }
        `}</style>
      </Layout>
    )
  }
}

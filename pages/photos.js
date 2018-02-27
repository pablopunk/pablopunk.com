import FadeIn from 'react-fade-in'
import Photos from 'react-photo-container'
import Layout from '../components/layout'
import Back from '../components/back'
import Fade from '../components/fade'

const {pexels} = require('../images')

const imageUrl = id => `/static/images/pexels/pexels-photo-${id}.jpg`
const pexelsUrl = id =>
  `https://static.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`

const photos = pexels.map(p =>
  Object.assign(p, {
    src: imageUrl(p.id),
    aspectRatio: p.width / p.height,
    lightboxImage: {
      src: pexelsUrl(p.id)
    }
  })
)

export default () => (
  <Layout title='Photos'>
    <div>
      <Fade delay={0.7}>
        <Back link='/' text='home' />
      </Fade>
      <br />
      <Fade delay={1}>
        More in {' '}
        <a href='https://pexels.com/u/pablopunk' alt='Pexels'>
          pexels.com/pablopunk
        </a>
      </Fade>
      <div>
        <FadeIn>
          <Photos photos={photos} />
        </FadeIn>
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

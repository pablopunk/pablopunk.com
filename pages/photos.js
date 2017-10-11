import FadeIn from 'react-fade-in'
import Photos from 'react-photo-container'
import Layout from '../components/layout'
import Back from '../components/back'

const imageUrl = id => `/static/images/pexels/pexels-photo-${id}.jpg`
const pexelsUrl = id =>
  `https://static.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`

const pexels = [
  { id: 103880, width: 461, height: 346 },
  { id: 108447, width: 464, height: 347 },
  { id: 120053, width: 464, height: 347 },
  { id: 311175, width: 438, height: 334 },
  { id: 325141, width: 437, height: 328 },
  { id: 339738, width: 455, height: 310 },
  { id: 364846, width: 221, height: 143 },
  { id: 375944, width: 450, height: 342 },
  { id: 568478, width: 442, height: 345 }
]

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
  <Layout centered={false}>
    <div>
      <div className='appear'>
        <Back link='/' text='go back' />
      </div>
      <div className='appear'>
        More in {' '}
        <a href='https://pexels.com/u/pablopunk' alt='Pexels'>
          pexels.com/pablopunk
        </a>
      </div>
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
      .appear {
        opacity: 0;
        animation: fadeIn 1s ease-out forwards;
        animation-delay: 1s;
      }
      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    `}</style>
  </Layout>
)

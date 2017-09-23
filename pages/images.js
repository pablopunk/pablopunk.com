import FadeIn from 'react-fade-in'
import Layout from '../components/layout'
import Pexels from '../components/pexels'
import Back from '../components/back'

const images = [
  { id: 103880 },
  { id: 108447 },
  { id: 120053 },
  { id: 311175 },
  { id: 325141 },
  { id: 339738 },
  { id: 364846 },
  { id: 375944 },
  { id: 568478 }
]
export default () => (
  <Layout>
    <div className="container">
      <p className="appear">
        More in {' '}
        <a href="https://pexels.com/u/pablopunk" alt="Pexels">
          pexels.com/pablopunk
        </a>
      </p>
      <FadeIn>
        <Pexels images={images} />
      </FadeIn>
      <br />
      <div className="appear" id="take-top">
        <Back link="/" text="go back" />
      </div>
      <br />
    </div>
    <style jsx>{`
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 90vh;
        width: 100%;
        max-width: 700px;
        margin: 0 auto;
      }
      .appear {
        opacity: 0;
        animation: fadeIn 1s ease-out forwards;
        animation-delay: 1s;
      }
      @media (max-width: 760px) {
        .container {
          height: inherit;
        }
        #take-top {
          order: -1;
        }
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

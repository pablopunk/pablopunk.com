import FadeIn from 'react-fade-in'
import Layout from '../components/layout'
import GearItem from '../components/gearItem'

const title = 'Gear'

const items = [
  {
    name: 'Gigabyte Aero 14k 1050Ti',
    id: 'gigabyte',
    description: 'Workstation/gaming laptop',
    link: 'https://amzn.to/2oMzSLK'
  },
  {
    name: 'Early 2015 MacBook Pro',
    id: 'macbook',
    description: 'All around laptop',
    link: 'https://amzn.to/2wXN7ht'
  },
  {
    name: 'Logitech G403',
    id: 'g403',
    description: 'Gaming mouse',
    link: 'https://amzn.to/2MWGAxi'
  },
  {
    name: 'Logitech K380',
    id: 'k380',
    description: 'Multidevice bluetooth keyboard',
    link: 'https://amzn.to/2Q9Ejgj'
  },
  {
    name: 'Samsung U28E570DS',
    id: '4k-monitor',
    description: '28" 4k monitor',
    link: 'https://amzn.to/2M5rIaD'
  },
  {
    name: 'Oneplus 5T',
    id: 'oneplus',
    description: 'Best battery on a smartphone',
    link: 'https://amzn.to/2wPUWon'
  },
  {
    name: 'Samson Meteor',
    id: 'meteor',
    description: 'USB microphone',
    link: 'https://amzn.to/2QbR3De'
  },
  {
    name: 'Audio-Technica M40x',
    id: 'technica',
    description: 'Most comfortable headphones ever',
    link: 'https://amzn.to/2CtM79Y'
  }
]

export default () => (
  <Layout title={title} navLinks={[ { title } ]}>
    <section>
      <FadeIn>
        {
          items.map((props) => (
            <GearItem {...props} />
          ))
        }
      </FadeIn>
    </section>
    <style jsx>{`
      section {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 50px;
      }
    `}</style>
  </Layout>
)

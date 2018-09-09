import React from 'react'
import FadeIn from 'react-fade-in'
import { ThreeBounce as Spinner } from 'better-react-spinkit'
import Layout from '../components/layout'
import GearItem from '../components/gearItem'
import { get } from '../utils/api'
import colors from '../components/styles/colors'

const title = 'Gear'

export default class extends React.Component {
  constructor (props) {
    super(props)

    this.state = { items: [] }
  }

  componentDidMount () {
    get('gear').then(items => {
      this.setState({ items })
    })
  }

  render () {
    return (
      <Layout title={title} navLinks={[ { title } ]}>
        <section>
          {
            (this.state.items.length > 0 &&
            <FadeIn>
              {
                this.state.items.map(item => (
                  <GearItem {...item} key={`item-${item.name}`} />
                ))
              }
            </FadeIn>) ||
            <Spinner color={colors.secondary} />
          }
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
  }
}

import React from 'react'

class Fade extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hidden: true }
  }
  componentWillMount () {
    setTimeout(() => this.setState({ hidden: false }), this.props.delay * 1000)
  }
  render () {
    if (this.state.hidden) {
      return <div />
    }
    return <div>
      <div>
        {this.props.children}
        <style jsx>{`
        div {
          opacity: 0;
          animation: fadeIn ${this.props.duration}s ease-in forwards;
          animation-delay: ${this.props.delay}s;
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
      </div>
    </div>
  }
}

Fade.defaultProps = {
  delay: 0,
  duration: 0.5
}

export default Fade

import React from 'react'

interface IProps {
  delay?: number;
  duration?: number;
}

interface IState {
  hidden: boolean;
}


class Fade extends React.Component<IProps, IState> {
  static defaultProps = {
    delay: 0,
    duration: 0.5
  }
  constructor (props) {
    super(props)
    this.state = { hidden: true }
  }
  componentWillMount () {
    this.delayRender()
  }
  delayRender () {
    setTimeout(() => {
      // If the ref doesn't exist, the
      // component hasn't been rendered yet
      if (this.refs.hidden) {
        this.setState({ hidden: false })
      } else {
        this.delayRender()
      }
    }, this.props.delay * 1000)
  }
  render () {
    if (this.state.hidden) {
      return <div ref='hidden' />
    }
    return (
      <div>
      <div>
      {this.props.children}
      <style jsx>{`
            div {
              opacity: 0;
              animation: fadeIn ${this.props.duration}s ease-in forwards;
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
    )
  }
}

export default Fade

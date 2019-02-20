import React from 'react'
import { toggleTheme } from './styles/colors'

export default class extends React.Component {
  render () {
    const buttonColor = (this.props.query.theme || 'dark') !== 'dark' ? '#0e141f' : 'white'

    return (
      <div>
        <button onClick={_ => toggleTheme(this.props.query.theme)}>
          <i className='fas fa-adjust' />
          <span>Switch to {(this.props.query.theme || 'dark') !== 'dark' ? 'dark' : 'light'} mode</span>
        </button>
        <style jsx>{`
      button {
        display: flex;
        justify-content: space-between;
        background-color: rgba(0,0,0,0);
        color: ${buttonColor};
        border: none;
        cursor: pointer;
      }
      button:focus {
        outline: none;
      }
      button * {
        padding: 1em;
      }
      span {
        transition: opacity .3s, margin-left .2s;
        opacity: 0;
        margin-left: -100px;
      }
      button:hover span {
        opacity: 1;
        transition: opacity .3s, margin-left .2s;
        margin-left: 0px;
      }
      `}</style>
      </div>
    )
  }
}

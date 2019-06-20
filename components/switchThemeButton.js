import React from 'react'
import { toggleTheme } from './styles/colors'

const iconSize = '15px'

const ContrastIcon = ({ width = '10px', color = 'white' }) => (
  <svg
    fill={color}
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width={width}
    height={width}
    viewBox="0 0 438.533 438.533"
  >
    <g>
      <path
        d="M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0
      c-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267
      c0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407
      s76.47-9.802,110.065-29.407c33.585-19.602,60.183-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062
      C438.533,179.485,428.732,142.795,409.133,109.203z M219.27,374.579c-28.171,0-54.152-6.943-77.943-20.844
      c-23.789-13.895-42.633-32.743-56.527-56.527c-13.897-23.791-20.843-49.772-20.843-77.945c0-28.171,6.949-54.152,20.843-77.943
      c13.891-23.791,32.738-42.637,56.527-56.531c23.791-13.894,49.772-20.841,77.943-20.841V374.579z"
      />
    </g>
  </svg>
)

export default class extends React.Component {
  render() {
    const { theme = 'dark' } = this.props.query

    const buttonColor = theme !== 'dark' ? '#555' : 'white'

    return (
      <div>
        <button onClick={_ => toggleTheme(this.props.query.theme)}>
          <ContrastIcon width={iconSize} color={buttonColor} />
          <span>
            Switch to{' '}
            {(this.props.query.theme || 'dark') !== 'dark' ? 'dark' : 'light'}{' '}
            mode
          </span>
        </button>
        <style jsx>{`
          button {
            display: flex;
            justify-content: space-between;
            background-color: rgba(0, 0, 0, 0);
            color: ${buttonColor};
            border: none;
            cursor: pointer;
            padding: 1em;
          }
          button:focus {
            outline: none;
          }
          button * {
            padding: 1rem;
          }
          span {
            margin-top: -1.1rem;
            font-size: ${iconSize};
            opacity: 0;
          }
          @media (min-width: 900px) {
            span {
              transition: opacity 0.3s, margin-left 0.2s;
              margin-left: -100px;
            }
            button:hover span {
              opacity: 1;
              transition: opacity 0.3s, margin-left 0.2s;
              margin-left: 0px;
            }
          }
        `}</style>
      </div>
    )
  }
}

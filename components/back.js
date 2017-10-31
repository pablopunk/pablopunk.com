import Link from 'next/link'
import colors from './colors'

export default ({ link = '/', text = 'back' }) => (
  <div>
    <div>
      <Link href={link} prefetch>
        <a>
          <span>{text}</span>
          <img className='back-button' src='../static/images/back.svg' />
        </a>
      </Link>
    </div>
    <style jsx>{`
      div {
        display: flex;
        justify-content: center;
      }
      span {
        color: ${colors.main};
        border: 1px solid ${colors.main};
        padding: .4em .7em;
        transition: background-color .2s, border .1s;
      }
      span:hover {
        color: white;
        background-color: ${colors.main};
        border: none;
      }
      img {
        width: 20px;
        height: 20px;
        background-color: whitesmoke;
        padding: 1em;
        border-radius: 50%;
        display: none;
        transition: padding 0.2s ease-in;
      }
      img:hover {
        background-color: #ccc;
        padding: 1.2em;
      }
      @media (max-width: 768px) {
        div span {
          visibility: hidden;
        }
        img {
          display: block;
        }
      }
    `}</style>
  </div>
)

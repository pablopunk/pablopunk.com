import Link from 'next/link'
import colors from './colors'

export default ({ link = '/', text = 'back' }) => (
  <div>
    <div className='go-back'>
      <Link href={link} prefetch>
        <a>
          <span>{text}</span>
          <img className='back-button' src='../static/images/back.svg' />
        </a>
      </Link>
    </div>
    <style jsx>{`
      .go-back {
        display: flex;
        justify-content: center;
      }
      .go-back span {
        color: ${colors.main};
        border-bottom: 1px solid ${colors.main};
      }
      .back-button {
        width: 20px;
        height: 20px;
        background-color: whitesmoke;
        padding: 1em;
        border-radius: 50%;
        display: none;
        transition: padding 0.2s ease-in;
      }
      .back-button:hover {
        background-color: #ccc;
        padding: 1.2em;
      }
      @media (max-width: 768px) {
        .go-back span {
          visibility: hidden;
        }
        .back-button {
          display: block;
        }
      }
    `}</style>
  </div>
)

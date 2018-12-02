import Link from 'next/link'
import colors from '../components/styles/colors'

export default () => (
  <div>
    <div className='container'>
      <header className='row'>
        <div className='col-3'>
          <div id='profile-image-container'>
            <img src='https://file-81hbt41i4.now.sh' alt='Me' />
          </div>
        </div>
        <div className='col-4'>
          <h1>Pablo Varela</h1>
        </div>
      </header>
      <div className='row'>
        <div className='col-2'>
          <ul>
            <li>
              <a target='_blank' href='https://twitter.com/pablopunk'>thoughts</a>
            </li>
          </ul>
          <ul>
            <li>
              <a target='_blank' href='https://ghuser.io/pablopunk'>projects</a>
            </li>
          </ul>
          <ul>
            <li> <a target='_blank' href='https://www.instagram.com/stories/pablopunk/'>daily</a>
            </li>
          </ul>
          <ul>
            <li>
              <a target='_blank' href='https://pexels.com/u/pablopunk'>pics</a>
            </li>
          </ul>
        </div>
        <div className='col-5'>
          <p>Hi there!</p>
          <p>I'm a web developer working remotely from <a target='_blank' href='https://goo.gl/maps/Z2uQtbEaDrR2'>Pontevedra, Spain.</a></p>
          <p>I'm currently helping building the best open source tool for journalists: <a target='_blank' href='https://github.com/superdesk/superdesk'>Superdesk</a>!</p>
          <p>I also contribute regularly to other projects and even my own, check them out on <a target='_blank' href='https://github.com/pablopunk'>GitHub.</a></p>
        </div>
      </div>
      <div className='row'>
        <p>
          <Link href='/more' prefetch>
            <a>More...</a>
          </Link>
        </p>
      </div>
    </div>
    <style jsx>{`
      .container {
        margin-top: 20px;
        margin-bottom: 10vh;
      }
      @media screen and (min-width: 900px) {
        .container {
          margin-top: 20vh;
        }
      }
      section {
        padding: 1em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      img {
        width: 100px;
        height: 100px;
        transform: translate(3px, 4px);
      }
      #profile-image-container {
        width: 100px;
        height: 100px;
        background-color: #d4d4d4;
        border: 4px solid #667885;
        border-radius: 50%;
        padding: 1em;
      }
      h1 {
        color: ${colors.bodyFont};
        font-size: 4em;
        font-family: 'Amatic SC';
        font-weight: lighter;
        margin: .3em;
      }
      li {
        margin: 1em;
        font-size: 1.5em;
      }
      li a {
        color: ${colors.primary};
      }
      li a:hover {
        color: ${colors.link};
      }
    `}</style>
  </div>
)

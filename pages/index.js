export default () => (
  <div>
    <main>
      <section>
        <article className='color1' />
        <article className='color2'><h1>Pablo Varela</h1></article>
        <article className='color3'>
          <ul>
            <li>
              <a target='_blank' href='https://twitter.com/pablopunk'>thoughts</a>
            </li>
            <li>
              <a target='_blank' href='https://ghuser.io/pablopunk'>projects</a>
            </li>
            <li> <a target='_blank' href='https://www.instagram.com/stories/pablopunk/'>daily</a>
            </li>
            <li>
              <a target='_blank' href='https://pexels.com/u/pablopunk'>pics</a>
            </li>
          </ul>
        </article>
        <article className='color4 bio'>
          <p>Hi there!</p>
          <p>I'm a web developer working remotely from <a target='_blank' href='https://goo.gl/maps/Z2uQtbEaDrR2'>Pontevedra, Spain.</a></p>
          <p>I'm currently helping building the best open source tool for journalists: <a target='_blank' href='https://github.com/superdesk/superdesk'>Superdesk</a>!</p>
          <p>I also contribute regularly to other projects and even my own, check them out on <a target='_blank' href='https://github.com/pablopunk'>GitHub.</a></p>
        </article>
      </section>
      <footer>
        <br />
        <a href='/more'>More...</a>
      </footer>
    </main>
    <style jsx>{`
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      width: 100vh;
      background-color: #22313F;
      font-family: Helvetica, Arial;
    }
    p a {
      color: gold;
    }
    li a {
      text-decoration: none;
      color: white;
      font-weight: bold;
    }
    footer a {
      color: white;
    }
    h1 {
      font-size: 3em;
      font-family: Helvetica, monospace;
    }
    section {
      display: grid;
      grid-template-columns: 150px 60vw;
    }
    .color1 {
      background-color: #2C3E50;
      color: white;
    }
    .color2 {
      background-color: #34495E;
      color: white;
    }
    .color3 {
      background-color: #3A539B;
      color: white;
    }
    .color4 {
      background-color: #2574A9;
      color: white;
    }
    article {
      margin: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    ul {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100%;
    }
    li {
      font-size: 1.5em;
    }
    .bio {
      display: block;
      padding: 1em;
    }
    `}</style>
  </div>
)

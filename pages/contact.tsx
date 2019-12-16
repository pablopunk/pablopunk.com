import Head from 'next/head'
import CenterFlex from '../components/CenterFlex'

export default () => (
  <CenterFlex>
    <Head>
      <title>Pablo Varela | Contact me</title>
    </Head>
    <div>
      <p>
        Send me an <a href="mailto:pablovarela182@gmail.com">email 📧</a>
      </p>
      <p>
        Send me a DM on <a href="https://twitter.com/pablopunk">twitter📱</a>
      </p>
      <p>
        Or check out my{' '}
        <a href="https://linkedin.com/in/pablopunk">LinkedIn👷</a>
      </p>
    </div>
  </CenterFlex>
)
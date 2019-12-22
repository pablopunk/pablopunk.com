import { NextSeo } from 'next-seo'
import CenterFlex from '../components/CenterFlex'
import styled from 'styled-components'

const StyledGrid = styled.div`
  max-width: 600px;
  display: grid;
  grid-template-columns: 1fr 15fr;
  align-items: flex-start;
  grid-gap: 20px;
`

const Emoji = styled.div`
  text-align: center;
`

export default () => (
  <CenterFlex>
    <NextSeo
      title="Pablo Varela | About me. Experience and Education"
      description="Some things about me. Where I worked, where I work, my education, etc."
    />
    <StyledGrid>
      <Emoji>📅</Emoji>
      <div>
        I'm{' '}
        <strong title="(new Date).getFullYear() - 1993 // :)">
          {new Date().getFullYear() - 1993}
        </strong>{' '}
        years old.
      </div>
      <Emoji>📍</Emoji>
      <div>
        I live in <strong>Pontevedra</strong>, a small town located in{' '}
        <strong>Galicia</strong>, a region of <strong>Spain</strong> (🇪🇸).
      </div>
      <Emoji>🎓</Emoji>
      <div>
        I studied <strong>Computer Science</strong> in Universidade de Santiago
        de Compostela between 2011 and 2015.
      </div>
      <Emoji>✈️</Emoji>
      <div>
        Then I moved to the Upper Penninsula of <strong>Michigan</strong> (🇺🇸)
        and worked there until 2018.
      </div>
      <Emoji>💻</Emoji>
      <div>
        Now I'm working remotely for{' '}
        <a href="https://sourcefabric.org">Sourcefabric</a> developing Open
        Source tools for journalists.
      </div>
      <Emoji>⌨️</Emoji>
      <div>
        I also did a bootcamp on <strong>Full Stack Javascript</strong>, you can
        read an{' '}
        <a href="https://keepcoding.io/es/blog/trabaja-desarrollador-web-desde-casa/">
          interview here
        </a>
        .
      </div>
    </StyledGrid>
  </CenterFlex>
)

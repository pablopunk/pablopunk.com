import styled from 'styled-components'
import CenterFlex from '../components/layout/CenterFlex'
import Link from 'next/link'
import { themes } from '../components/utils/themes'

const StyledImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid ${themes.light.color2};
  body.dark & {
    border: 5px solid ${themes.dark.color2};
  }
`
export default () => (
  <CenterFlex>
    <StyledImage
      src="/images/me.jpg"
      alt="Profile picture"
      title="Pablo Varela"
    />
    <div>
      <p>👋 Hello there! My name is Pablo and I'm a remote web developer.</p>
      <p>
        I build high quality websites with a focus on{' '}
        <strong>scalability</strong> and <strong>UI/UX</strong>.
      </p>
      <p />
      <p>
        If you're interested on my work, you can{' '}
        <Link href="/contact">
          <a>contact me</a>
        </Link>
        .
      </p>
    </div>
  </CenterFlex>
)

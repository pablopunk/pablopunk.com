import styled from 'styled-components'
import CenterFlex from '../components/CenterFlex'
import Link from 'next/link'

const StyledImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid ${props => props.theme.color2};
`
export default () => (
  <CenterFlex>
    <StyledImage src="/images/me.jpg" alt="Profile picture" style={{}} />
    <div>
      <p>👋 Hello there! My name is Pablo and I'm a remote web developer.</p>
      <p>
        I build high quality websites with a focus on{' '}
        <strong>scalability</strong> and <strong>UI/UX</strong>.
      </p>
      <p></p>
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

import SbEditable from 'storyblok-react'
import { Title } from './Title'
import { Paragraph } from './Paragraph'
import { Flex } from './Flex'
import { Button } from './Button'

// resolve Storyblok components to Next.js components
const Components = {
  title: Title,
  paragraph: Paragraph,
  flex: Flex,
  button: Button,
}

export const BlokComponent = ({ blok }) => {
  // check if component is defined above
  if (typeof Components[blok.component] !== 'undefined') {
    const Component = Components[blok.component]
    // wrap with SbEditable for visual editing
    return (
      <SbEditable content={blok}>
        <Component blok={blok} />
      </SbEditable>
    )
  }

  return (
    <p>
      The component <strong>{blok.component}</strong> has not been created yet.
    </p>
  )
}

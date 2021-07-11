import SbEditable from 'storyblok-react'
import { Title } from './Title'
import { Paragraph } from './Paragraph'
import { Flex } from './Flex'
import { Button } from './Button'
import { Cards } from './Cards'
import { Card } from './Card'
import { Grid } from './Grid'
import { Icon } from './Icon'
import { TechCard } from './TechCard'
import { JAMStack } from './JAMStack'
import { Gallery } from './Gallery'

// resolve Storyblok components to Next.js components
const Components = {
  title: Title,
  paragraph: Paragraph,
  flex: Flex,
  button: Button,
  cards: Cards,
  card: Card,
  grid: Grid,
  icon: Icon,
  tech_card: TechCard,
  JAMStack: JAMStack,
  gallery: Gallery,
}

export const BlokComponent = ({ blok }) => {
  // check if component is defined above
  if (typeof Components[blok.component] !== 'undefined') {
    const Component = Components[blok.component]
    // wrap with SbEditable for visual editing
    return (
      <SbEditable content={blok}>
        <Component {...blok} />
      </SbEditable>
    )
  }

  return (
    <p>
      The component <strong>{blok.component}</strong> has not been created yet.
    </p>
  )
}

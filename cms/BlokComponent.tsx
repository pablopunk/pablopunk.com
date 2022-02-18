import SbEditable from 'storyblok-react'
import { Title } from '../components/Title'
import { Paragraph } from '../components/Paragraph'
import { Flex } from '../components/Flex'
import { Button } from '../components/Button'
import { Cards } from '../components/Cards'
import { Card } from '../components/Card'
import { Grid } from '../components/Grid'
import { Icon } from '../components/Icon'
import { TechCard } from '../components/TechCard'
import { JAMStack } from '../components/JAMStack'
import { Gallery } from '../components/Gallery'
import { Footer } from '../components/Footer'
import { Separator } from 'components/Separator'
import { ContactCard } from 'components/ContactCard'
import { FeaturedPosts } from 'components/FeaturedPosts'

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
  footer: Footer,
  separator: Separator,
  contact_card: ContactCard,
  featured_posts: FeaturedPosts,
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

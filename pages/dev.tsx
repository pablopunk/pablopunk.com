import { Button } from 'components/neon/Button'
import { Section } from 'components/Section'
import { T } from 'components/T'
import { pageStaticProps } from 'middleware'
import { HiTranslate } from 'react-icons/hi'

export default function Dev() {
  return (
    <div className='py-4'>
      <h1 className="text-3xl text-center">
        <T>God mode</T>
      </h1>
      <Section className="flex items-center justify-center">
        <Button href="/dev/translations" LeftIcon={HiTranslate}>
          <T>Translations</T>
        </Button>
      </Section>
    </div>
  )
}

export const getStaticProps = pageStaticProps

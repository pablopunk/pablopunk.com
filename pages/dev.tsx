import { Button } from 'components/Button'
import { Section } from 'components/Section'
import { T } from 'components/T'
import { pageStaticProps } from 'middleware'
import { HiTranslate } from 'react-icons/hi'

export default function Dev() {
  return (
    <>
      <h1 className="text-3xl text-center mt-4">
        <T>God mode</T>
      </h1>
      <Section className="flex items-center justify-center">
        <Button href="/dev/translations" Icon={HiTranslate}>
          <T>Translations</T>
        </Button>
      </Section>
    </>
  )
}

export const getStaticProps = pageStaticProps

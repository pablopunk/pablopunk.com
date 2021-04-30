import { FunctionComponent } from 'react'

type Props = {
  blok: {
    text: string
  }
}

export const Title: FunctionComponent<Props> = ({ blok }) => (
  <span>{blok.text}</span>
)

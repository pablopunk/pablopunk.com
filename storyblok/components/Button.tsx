import { FunctionComponent } from 'react'
import { ButtonType } from 'storyblok/types'
import Link from 'next/link'
import { Icon } from './Icon'
import { Button as SupaButton } from '@supabase/ui'

type Props = {
  blok: ButtonType
}

export const Button: FunctionComponent<Props> = ({ blok }) => (
  <Link href={blok.link?.url || ''}>
    <SupaButton className="bg-bg2" icon={<Icon name={blok.icon} />}>
      {blok.text}
    </SupaButton>
  </Link>
)

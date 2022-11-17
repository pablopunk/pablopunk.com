import { Button } from './neon/Button'
import { useTranslation } from '@hooks/useTranslation'
import { BiLineChart } from 'react-icons/bi'

export const VisitsCount = (props: { count: number }) => {
  const { _ } = useTranslation()

  return (
    <Button
      title={_('Visits')}
      size="sm"
      RightIcon={BiLineChart}
      className="button-like"
      disabled
    >
      {props.count}
    </Button>
  )
}

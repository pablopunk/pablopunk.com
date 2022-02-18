import { FunctionComponent } from 'react'
import classNames from 'classnames'

type Props = {
  x: string
  y: string
  hide: boolean
}

export const Separator: FunctionComponent<Props> = ({ x, y, hide }) => (
  <div
    className={classNames('relative', {
      'border-b': !hide,
      'my-2': y === '1',
      'my-4': y === '2',
      'my-6': y === '3',
      'my-8': y === '4',
      'my-10': y === '5',
      'mx-2': x === '1',
      'mx-4': x === '2',
      'mx-6': x === '3',
      'mx-8': x === '4',
      'mx-10': x === '5',
    })}
  ></div>
)

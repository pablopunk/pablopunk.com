import React from 'react'
import { Options, Renderer } from '@prezly/slate-renderer'
import { ExtendedStory } from '@prezly/sdk/dist/types'
import {
  LIST_ITEM_TEXT_NODE_TYPE,
  PARAGRAPH_NODE_TYPE,
  QUOTE_NODE_TYPE,
} from '@prezly/slate-types'

const options: Options = {
  [LIST_ITEM_TEXT_NODE_TYPE]: ({ children }) => <>{children}</>,
  [PARAGRAPH_NODE_TYPE]: ({ children }) => {
    return <p>{children}</p>
  },
  [QUOTE_NODE_TYPE]: ({ children, node }) => {
    if (node && node.children[0].text) {
      const firstLine = node.children[0].text as string
      if (firstLine.startsWith('```')) {
        // const language = firstLine.split('`')?.filter(Boolean)?.[0] || null
        const code = node.children
          .map((x) => x.text)
          .join()
          .split('\n')
          .filter((x) => !x.startsWith('```'))
          .join('\n')

        return (
          <pre>
            <code>{code}</code>
          </pre>
        )
      }
    }
    return <p>{children}</p>
  },
}

interface Props {
  story: ExtendedStory
}
export default function ArticleContent({ story }: Props) {
  return <Renderer nodes={JSON.parse(story.content) || []} options={options} />
}

import { FunctionComponent, HTMLAttributes } from 'react'
import markdownIt from 'markdown-it'

const md = new markdownIt()

export function renderMarkdown(markdown: string) {
  return md.render(markdown)
}

// export const snarkdownEnhanced = (md: string) => {
//   const htmls = md
//     .replaceAll('~~~', '```') // storyblok code blocks suck
//     .split(/(?:\r?\n){2,}/)
//     .map((l) =>
//       [' ', '\t', '#', '-', '*'].some((ch) => l.startsWith(ch))
//         ? snarkdown(l)
//         : `<p>${snarkdown(l)}</p>`,
//     )

//   return htmls.join('\n\n')
// }

const Markdown: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  if (typeof children !== 'string') {
    return <div {...rest}>Markdown children must be a string</div>
  }

  return (
    <div
      {...rest}
      dangerouslySetInnerHTML={{ __html: renderMarkdown(children) }}
    />
  )
}

export default Markdown

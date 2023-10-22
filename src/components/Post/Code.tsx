import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github-dark.css'

hljs.registerLanguage('javascript', javascript);

export const Code = ({ children }: React.PropsWithChildren) => {
  const code = children?.toString() || '';

  const highlighted = hljs.highlight(code, { language: 'javascript' }).value;

  return (
    <code className='bg-neutral-2 whitespace-pre-wrap' dangerouslySetInnerHTML={{ __html: highlighted }} />
  );
}
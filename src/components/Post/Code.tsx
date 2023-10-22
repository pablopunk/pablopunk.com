import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';
import 'highlight.js/styles/github-dark.css'

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('bash', bash);

export const Code = ({ children, className }: React.PropsWithChildren<{ className: string }>) => {
  const code = children?.toString() || '';
  let highlighted = ''

  switch (className) {
    case 'language-js':
    case 'language-jsx':
    case 'language-javascript':
    case 'language-ts':
    case 'language-tsx':
    case 'language-typescript':
      highlighted = hljs.highlight(code, { language: 'typescript' }).value;
      break
    case 'language-bash':
    case 'language-sh':
      highlighted = hljs.highlight(code, { language: 'bash' }).value;
      break
    default:
      highlighted = hljs.highlight(code, { language: 'typescript' }).value;
      break
  }
  console.log(className)

  return (
    <code className='bg-neutral-2 whitespace-pre-wrap' dangerouslySetInnerHTML={{ __html: highlighted }} />
  );
}
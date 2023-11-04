import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import bash from "highlight.js/lib/languages/bash";
import vim from "highlight.js/lib/languages/vim";
import lua from "highlight.js/lib/languages/lua";
import "highlight.js/styles/atom-one-dark.css";
import { DetailedHTMLProps, HTMLAttributes } from "react";

hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("vim", vim);
hljs.registerLanguage("lua", lua);

export const Code = ({
  children,
  className,
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  const code = children?.toString() || "";
  let highlighted = "";

  switch (className) {
    case "language-js":
    case "language-jsx":
    case "language-javascript":
    case "language-ts":
    case "language-tsx":
    case "language-typescript":
      highlighted = hljs.highlight(code, { language: "typescript" }).value;
      break;
    case "language-bash":
    case "language-sh":
      highlighted = hljs.highlight(code, { language: "bash" }).value;
      break;
    case "language-vi":
    case "language-vim":
    case "language-vimscript":
      highlighted = hljs.highlight(code, { language: "vim" }).value;
      break;
    case "language-lua":
      highlighted = hljs.highlight(code, { language: "lua" }).value;
      break;
    default:
      highlighted = hljs.highlight(code, { language: "typescript" }).value;
      break;
  }

  return (
    <code
      className="bg-neutral-2 whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
};

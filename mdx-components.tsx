import type { MDXComponents } from "mdx/types";
import { Code } from "~/components/Post/Code";
import { Img } from "~/components/Post/Img";
import { Li } from "~/components/Post/Li";
import { Paragraph } from "~/components/Post/Paragraph";
import { Pre } from "~/components/Post/Pre";
import { Quote } from "~/components/Post/Quote";
import { H1, H2, H3, H4, H5, H6 } from "~/components/Post/Title";
import { Ul } from "~/components/Post/Ul";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    ul: Ul,
    li: Li,
    img: Img,
    p: Paragraph,
    blockquote: Quote,
    code: Code,
    pre: Pre,
    ...components,
  };
}

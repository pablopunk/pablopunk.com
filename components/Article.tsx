import styled from 'styled-components'
import { Markdown } from '~/components/Markdown'
import { SRLWrapper } from 'simple-react-lightbox'
import { FunctionComponent } from 'preact'
import { Post } from '~/models/post'
import { useTranslation } from '~/hooks/useTranslation'
import { Visits } from './Visits'
import { Button } from '~/components/boring/Button'
import { BiArrowBack } from 'react-icons/bi'
import LikeComponent from './Like'

const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  p {
    margin: 1rem 0;
    line-height: 1.7rem;
  }

  .body {
    width: 100%;
  }

  figure,
  img {
    max-width: 100%;
    border-radius: 1rem;
    position: relative;
    cursor: zoom-in:
  }

  h2 {
    font-size: 1.5rem;
    margin-top: 1rem;
  }

  h3 {
    font-weight: bold;
    font-size: 1.3rem;
    text-align: left;
    margin-top: 1rem;
  }

  h3:before {
    content: '# ';
  }

  pre {
    width: 100%;
    font-family: 'SF Mono', Menlo, monospace;
    background-color: var(--color-neutral-3);
    padding: 0.5rem 1rem;
    margin: 0.5rem 0;
    border-radius: 0.5rem;
    overflow-x: auto;
    --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }

  code {
    color: var(--color-secondary-9);
    font-family: 'SF Mono', Menlo, monospace;
    font-size: 85%;
  }

  small {
    opacity: 0.8;
    margin: 1rem 0;
    align-self: center;
  }

  ul {
    padding: 0.25rem 0 0.25rem 1rem;
  }

  ul > li {
    margin-bottom: 0.5rem;
  }

  ul > li:before {
    content: '☞';
    color: var(--color-primary-8);
    margin-right: 0.5rem;
    font-size: 1.25rem;
  }

  img {
    margin: 1rem auto;
  }

  blockquote {
    border-left: 3px solid var(--color-primary-2);
    padding: 0.25rem 0.5rem;
    background-color: var(--color-neutral-3);
  }

  blockquote p {
    margin: 0.5rem 0;
  }
`

type Props = {
  post: Post
}

export const Article: FunctionComponent<Props> = ({ post }) => {
  const { _ } = useTranslation()

  return (
    <>
      <Button href="/blog" LeftIcon={BiArrowBack}>
        {_('Go back')}
      </Button>
      <StyledArticle>
        <img src={post.image} alt={post.title} className="mt-4" />
        <div className="w-full my-2 italic font-thin text-center opacity-75">
          {new Date(post.date).toLocaleDateString()}
        </div>
        <div className="flex justify-center w-full">
          <Visits post={post} />
        </div>
        <h1 className="w-full my-4 text-3xl font-semibold text-center">
          {post.title}
        </h1>
        <div className="flex justify-end w-full">
          <LikeComponent slug={post.slug} />
        </div>
        <div className="max-w-full">
          <SRLWrapper>
            <Markdown>{post.body}</Markdown>
          </SRLWrapper>
        </div>
      </StyledArticle>
    </>
  )
}

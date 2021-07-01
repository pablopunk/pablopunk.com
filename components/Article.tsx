import styled from 'styled-components'
import Markdown from 'components/Markdown'
import { Button } from 'storyblok/components/Button'
import { _ } from 'lib/locales'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'preact'
import type { PostType } from 'storyblok/types'

const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  p {
    text-align: justify;
    margin: 1rem 0;
  }

  .body {
    width: 100%;
  }

  figure,
  img {
    max-width: 100%;
    border-radius: 1rem;
    position: relative;
  }

  h1 {
    text-align: center;
    font-size: 1.75rem;
    width: 100%;
    margin: 1rem 0;
    color: var(--color-accent2);
  }

  h2 {
    font-size: 1.5rem;
    margin-top: 1rem;
  }

  h3 {
    color: var(--color-fg);
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
    background-color: var(--color-bg2);
    padding: 0.5rem 1rem;
    margin: 0.5rem 0;
    border-radius: 0.5rem;
    overflow-x: scroll;
    --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }

  code {
    color: var(--color-accent2);
    font-family: 'SF Mono', Menlo, monospace;
    font-size: 85%;
  }

  strong {
    color: var(--color-accent);
  }

  em {
    color: var(--color-accent);
  }

  small {
    opacity: 0.8;
    margin: 1rem 0;
    align-self: center;
  }

  blockquote {
    position: relative;
    background-color: var(--color-bg2);
    padding: 0.4rem 1rem;
    margin: 1rem 0;
    border-left: 2px solid var(--color-accent);
    width: 100%;
  }
  blockquote:after {
    content: '🇪🇸';
    position: absolute;
    right: 2px;
    bottom: -8px;
    transform: rotate(-15deg);
    font-size: 2rem;
  }
`

type Props = {
  story: PostType
}

const Article: FunctionComponent<Props> = ({ story }) => {
  const { asPath, locale } = useRouter()
  const translatedSlug = story.translated_slugs.find(
    (slug) => slug.lang === locale,
  )

  return (
    <StyledArticle>
      {asPath.startsWith('/posts') && (
        <Button
          blok={{
            text: _('Go Back', locale),
            icon: 'back',
            link: { url: '/blog' },
          }}
        />
      )}
      {story.content.image?.filename && (
        <>
          <img
            src={story.content.image.filename}
            alt={story.name}
            className="mt-4"
          />
          <div className="w-full mt-3 italic font-thin text-center opacity-75">
            {new Date(story.created_at).toLocaleDateString()}
          </div>
        </>
      )}
      <h1>{translatedSlug?.name ? translatedSlug?.name : story.name}</h1>
      <Markdown>{story.content.content}</Markdown>
    </StyledArticle>
  )
}

export default Article

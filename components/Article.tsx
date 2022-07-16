import styled from 'styled-components'
import { Markdown } from 'components/Markdown'
import { Button } from 'components/Button'
import { DEFAULT_LOCALE, _ } from 'locales'
import { SRLWrapper } from 'simple-react-lightbox'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'preact'
import type { PostType } from 'cms/storyblok/types'
import TranslationRequestComponent from './TranslationRequest'
import LikeComponent from './Like'
import { VisitsCount } from './VisitsCount'
import useSWR from 'swr'
import { fetchNumberOfVisits } from 'db/goatcounter'

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
    background-color: var(--color-bg-2);
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
    color: var(--color-secondary-11);
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
    border-left: 3px solid var(--color-primary-8);
    padding: 0.25rem 0.5rem;
    background-color: var(--color-bg-2);
  }

  blockquote p {
    margin: 0.5rem 0;
  }
`

type Props = {
  story: PostType
  translated: boolean // true if content is translated
}

export const Article: FunctionComponent<Props> = ({
  story,
  translated = false,
}) => {
  const { asPath, locale } = useRouter()
  // "translated = false" means the content is not translated, but the title could still be translated
  const translatedSlug = story.translated_slugs.find(
    (slug) => slug.lang === locale,
  )
  const showTranslationRequest = locale !== DEFAULT_LOCALE && !translated
  const { data: visitsCount } = useSWR<number>([story], fetchNumberOfVisits, {
    initialData: 0,
  })

  return (
    <StyledArticle>
      {asPath.startsWith('/posts') && (
        <Button
          className="go-back-button"
          rounded
          secondary
          text={_('Go back', locale)}
          icon={'back'}
          link={{ url: '/blog' }}
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
      <h1 className="w-full my-4 text-3xl font-semibold text-center">
        {translatedSlug?.name ? translatedSlug?.name : story.name}
      </h1>
      <div className="flex items-center justify-center md:justify-end w-full gap-2">
        {showTranslationRequest && (
          <TranslationRequestComponent slug={story.slug} />
        )}
        {visitsCount && <VisitsCount count={visitsCount} />}
        <LikeComponent slug={story.slug} />
      </div>
      <div className="max-w-full">
        <SRLWrapper>
          <Markdown>{story.content.content}</Markdown>
        </SRLWrapper>
      </div>
      <div className="flex items-center justify-center w-full my-3 gap-2 md:justify-end ">
        {showTranslationRequest && (
          <TranslationRequestComponent slug={story.slug} />
        )}
        <LikeComponent slug={story.slug} />
      </div>
    </StyledArticle>
  )
}

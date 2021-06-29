import React from 'react'
import { RiExternalLinkLine, RiLinksLine } from 'react-icons/ri'
import Link from 'next/link'
import Image from 'next/image'
import Markdown from 'react-markdown'

const imageSize = '90px'

export default function HomeCard({
  title,
  description,
  img,
  link,
  // eslint-disable-next-line no-unused-vars
  tags,
}) {
  const LinkOrNot = ({ children }) =>
    link ? <Link href={link}>{children}</Link> : <div>{children}</div>
  const LinkIcon = link?.startsWith('/') ? RiExternalLinkLine : RiLinksLine

  return (
    <LinkOrNot>
      <a>
        <article
          className="relative flex items-stretch rounded-lg shadow-lg bg-bg2 group hover:bg-bg"
          style={{ maxHeight: imageSize }}
        >
          {img?.filename && (
            <div style={{ minWidth: imageSize, minHeight: imageSize }}>
              <Image
                src={img.filename}
                alt={img.alt}
                layout="fill"
                className="rounded-l-lg"
              />
            </div>
          )}
          <div className="flex flex-col justify-center w-full min-h-full ml-2">
            <h2 className="hidden font-bold text-md md:block">{title}</h2>
            <div
              className="text-sm leading-6 text-justify text-fg group-hover:text-accent"
              style={{ maxWidth: 'calc(100% - 22px)' }}
            >
              <Markdown>{description}</Markdown>
            </div>
            <div
              className="absolute top-0 right-0 flex items-center justify-center rounded-tr-lg text-bg bg-accent2 group-hover:bg-accent"
              style={{ width: '22px', height: '22px' }}
            >
              <LinkIcon />
            </div>
            <div className="absolute bottom-0 right-0 flex">
              {/* {tags.map(({ name, color }) => ( */}
              {/*   <span */}
              {/*     key={name + link} */}
              {/*     className="rounded-full" */}
              {/*     style={{ */}
              {/*       backgroundColor: color?.hex, */}
              {/*       width: '10px', */}
              {/*       height: '10px' */}
              {/*     }} */}
              {/*   /> */}
              {/* ))} */}
            </div>
          </div>
        </article>
      </a>
    </LinkOrNot>
  )
}

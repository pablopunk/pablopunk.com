import React from 'react'
import Tag from 'components/pure/Tag'
import { RiExternalLinkLine, RiLinksLine } from 'react-icons/ri'
import Link from 'next/link'
import Image from 'next/image'

const imgSize = '80px'

export default function HomeCard({ title, description, img, link, tags }) {
  const LinkIcon = link.startsWith('/') ? RiExternalLinkLine : RiLinksLine

  return (
    <Link href={link}>
      <a>
        <article
          className="relative flex items-stretch bg-bg2 shadow-lg rounded-lg group hover:bg-bg"
          style={{ maxHeight: imgSize }}
        >
          <div style={{ minWidth: imgSize, minHeight: imgSize }}>
            <Image
              src={img.url}
              alt={img.alt}
              height={imgSize}
              width={imgSize}
              className="rounded-l-lg"
            />
          </div>
          <div className="ml-2 flex flex-col justify-center min-h-full">
            <h2 className="text-md font-bold">{title}</h2>
            <div className="text-sm leading-6 text-fg group-hover:text-accent">
              {description}
            </div>
            <div
              className="absolute top-0 right-0 flex items-center justify-center text-bg bg-accent2 group-hover:bg-accent rounded-tr-lg"
              style={{ width: '22px', height: '22px' }}
            >
              <LinkIcon />
            </div>
            <div className="absolute bottom-0 right-0">
              {tags.map(({ name, color }, index) => {
                const isLast = index === tags.length - 1
                return (
                  <span key={title + name}>
                    <Tag
                      text={name}
                      color={color.hex}
                      className={isLast ? 'rounded-br-lg' : ''}
                    />
                  </span>
                )
              })}
            </div>
          </div>
        </article>
      </a>
    </Link>
  )
}

import React from 'react'
import Tag from 'components/pure/Tag'
import { RiExternalLinkLine } from 'react-icons/ri'
import { GrFormNextLink } from 'react-icons/gr'
import Link from 'next/link'
import Image from 'next/image'

const imgSize = '60px'

export default function HomeCard({ title, description, img, link, tags }) {
  const LinkIcon = link.startsWith('/') ? GrFormNextLink : RiExternalLinkLine

  return (
    <Link href={link}>
      <a>
        <article className="relative flex items-center px-3 py-4 border-2 shadow-lg rounded-md border-accent2 hover:border-accent group bg-bg2 hover:bg-bg">
          <div className="mr-2" style={{ minWidth: imgSize }}>
            <Image
              src={img.url}
              alt={img.alt}
              height={img.width}
              width={img.height}
            />
          </div>
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            <div className="text-lg leading-6 text-fg group-hover:text-accent">
              {description}
            </div>
            <div
              className="absolute top-0 right-0 flex items-center justify-center text-bg bg-accent2 group-hover:bg-accent"
              style={{ width: '22px', height: '22px' }}
            >
              <LinkIcon />
            </div>
            <div className="absolute -bottom-1 -right-1">
              {tags.map(({ name, color }) => (
                <span key={title + name}>
                  <Tag text={name} color={color.hex} />
                </span>
              ))}
            </div>
          </div>
        </article>
      </a>
    </Link>
  )
}

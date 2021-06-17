import React from 'react'
import { RiExternalLinkLine, RiLinksLine } from 'react-icons/ri'
import Link from 'next/link'
import Image from 'next/image'

const imgSize = '90px'

export default function HomeCard({ title, description, img, link, tags }) {
  const LinkIcon = link.startsWith('/') ? RiExternalLinkLine : RiLinksLine

  return (
    <Link href={link}>
      <a>
        <article
          className="relative flex items-stretch rounded-lg shadow-lg bg-bg2 group hover:bg-bg"
          style={{ maxHeight: imgSize }}
        >
          <div style={{ minWidth: imgSize, minHeight: imgSize }}>
            <Image
              src={img.url}
              alt={img.alt}
              height={imgSize}
              width={imgSize}
              className="rounded-l-lg"
              placeholder="blur"
              blurDataURL={img.blurUpThumb}
            />
          </div>
          <div className="flex flex-col justify-center w-full min-h-full ml-2">
            <h2 className="hidden font-bold text-md md:block">{title}</h2>
            <div
              className="text-sm leading-6 text-justify text-fg group-hover:text-accent"
              style={{ maxWidth: 'calc(100% - 22px)' }}
            >
              {description}
            </div>
            <div
              className="absolute top-0 right-0 flex items-center justify-center rounded-tr-lg text-bg bg-accent2 group-hover:bg-accent"
              style={{ width: '22px', height: '22px' }}
            >
              <LinkIcon />
            </div>
            <div className="absolute bottom-0 right-0 flex">
              {tags.map(({ name, color }) => (
                <span
                  key={name + link}
                  className="rounded-full"
                  style={{
                    backgroundColor: color.hex,
                    width: '10px',
                    height: '10px',
                  }}
                />
              ))}
            </div>
          </div>
        </article>
      </a>
    </Link>
  )
}

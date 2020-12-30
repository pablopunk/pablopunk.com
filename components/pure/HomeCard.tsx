import React from 'react'
import Tag from 'components/pure/Tag'
import { RiExternalLinkLine } from 'react-icons/ri'
import Link from 'next/link'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const imgSize = '60px'

export default function HomeCard({ title, description, img, link, tags }) {
  return (
    <Link href={link}>
      <a>
        <article className="relative flex items-center px-3 py-4 border-2 shadow-lg rounded-md border-accent2 hover:border-accent group bg-bg2 hover:bg-bg">
          <div className="mr-2" style={{ minWidth: imgSize }}>
            <LazyLoadImage
              src={img.url}
              alt={img.alt}
              height={imgSize}
              width={imgSize}
              placeholder={
                <img
                  src={img.blurUpThumb}
                  alt={img.alt}
                  width={imgSize}
                  height={imgSize}
                />
              }
            />
          </div>
          <div>
            <h4 className="text-xl font-bold">{title}</h4>
            <div className="text-lg leading-6 text-fg group-hover:text-accent">
              {description}
            </div>
            <div
              className="absolute top-0 right-0 flex items-center justify-center text-bg bg-accent2 group-hover:bg-accent"
              style={{ width: '22px', height: '22px' }}
            >
              <RiExternalLinkLine />
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

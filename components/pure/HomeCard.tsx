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
        <article className="relative flex items-center px-3 py-4 bg-white border-2 border-green-500 hover:border-indigo-500 group">
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
            <h4 className="text-xl font-bold text-indigo-600">{title}</h4>
            <div className="text-lg text-green-500 leading-6 group-hover:text-indigo-500">
              {description}
            </div>
            <div
              className="absolute top-0 right-0 flex items-center justify-center text-white bg-green-500 group-hover:bg-indigo-500"
              style={{ width: '22px', height: '22px' }}
            >
              <RiExternalLinkLine color="white" />
            </div>
            <div className="absolute bottom-0 right-0">
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

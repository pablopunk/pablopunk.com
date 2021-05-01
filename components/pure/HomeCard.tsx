import React from 'react'
import { RiExternalLinkLine, RiLinksLine } from 'react-icons/ri'
import Link from 'next/link'
import Image from 'next/image'

const imageSize = '90px'

export default function HomeCard({ title, description, img, link }) {
  const LinkIcon = link.startsWith('/') ? RiExternalLinkLine : RiLinksLine

  return (
    <Link href={link}>
      <a>
        <article
          className="relative flex items-stretch bg-bg2 shadow-lg rounded-lg group hover:bg-bg"
          style={{ maxHeight: imageSize }}
        >
          <div style={{ minWidth: imageSize, minHeight: imageSize }}>
            <Image
              src={img.filename}
              alt={img.alt}
              height={imageSize}
              width={imageSize}
              className="rounded-l-lg"
            />
          </div>
          <div className="ml-2 flex flex-col justify-center min-h-full w-full">
            <h2 className="text-md font-bold hidden md:block">{title}</h2>
            <div
              className="text-sm leading-6 text-fg group-hover:text-accent text-justify"
              style={{ maxWidth: 'calc(100% - 22px)' }}
            >
              {description}
            </div>
            <div
              className="absolute top-0 right-0 flex items-center justify-center text-bg bg-accent2 group-hover:bg-accent rounded-tr-lg"
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
    </Link>
  )
}

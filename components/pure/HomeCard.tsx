import React from 'react'
import Tag from 'components/pure/Tag'
import { RiExternalLinkLine } from 'react-icons/ri'
import Link from 'next/link'

export default function HomeCard({ title, description, img, link, tags }) {
  return (
    <Link href={link}>
      <a>
        <article>
          <div className="left">
            <img src={img.url} alt={img.alt} />
          </div>
          <div className="right">
            <h4>{title}</h4>
            <div>{description}</div>
            <div className="link-icon">
              <RiExternalLinkLine />
            </div>
            <div className="tags">
              {tags.map(({ name, color }) => (
                <span key={title + name}>
                  <Tag text={name} color={color.hex} />
                </span>
              ))}
            </div>
          </div>
          <style jsx>{`
            article {
              position: relative;
              display: flex;
              margin-bottom: var(--space-2);
              border: 2px solid var(--color-accent);
              padding: var(--space-3) var(--space-2);
              background-color: var(--color-bgDim);
              box-shadow: 5px 5px 20px 2px var(--color-bgDim);
            }
            article:hover {
              background-color: var(--color-bg);
              border-color: var(--color-accent2);
              cursor: pointer;
            }
            article:hover .link-icon {
              background-color: var(--color-accent);
            }
            h4 {
              margin: 0;
            }
            img {
              width: 60px;
              height: 60px;
              margin-right: var(--space-2);
            }
            .left {
              display: flex;
              align-items: center;
            }
            .right {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
            }
            .link-icon {
              position: absolute;
              right: -2px;
              top: 0px;
              background-color: var(--color-accent);
              color: var(--color-bg);
              width: 22px;
              height: 22px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            article:hover .link-icon {
              background-color: var(--color-accent2);
            }
            .tags {
              position: absolute;
              right: -2px;
              bottom: 0px;
            }
          `}</style>
        </article>
      </a>
    </Link>
  )
}

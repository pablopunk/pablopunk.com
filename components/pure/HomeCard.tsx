import React from 'react'

export default function HomeCard({ title, description, img, link, tags }) {
  return (
    <article>
      <div className="left">
        <img src={img.url} alt={img.alt} />
      </div>
      <div className="right">
        <h4>{title}</h4>
        <div>{description}</div>
        <div className="tags">
          {tags.map(({ name, color }) => (
            <span
              key={title + name}
              className="tag"
              style={{ backgroundColor: color.hex }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
      <style jsx>{`
        article {
          position: relative;
          width: 450px;
          display: flex;
          margin-bottom: var(--space-2);
          border: 2px solid var(--color-accent);
          padding: var(--space-3) var(--space-2);
        }
        h4 {
          margin: 0;
        }
        img {
          width: 60px;
          height: 100%;
          margin-right: var(--space-2);
        }
        .right {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
        .tags {
          position: absolute;
          right: -2px;
          bottom: 0px;
        }
        .tag {
          padding: 2px var(--space-1);
        }
      `}</style>
    </article>
  )
}

import colors from './styles/colors'

export default ({ theme = 'dark' }) => {
  const { bodyFont, link, bodyBg } = colors(theme)

  return (
    <div>
      <a href="/fund">
        <b>$</b>
      </a>
      <style jsx>{`
        a {
          position: absolute;
          top: 0;
          right: 0;
          margin: 1rem;
          font-family: monospace;
          color: ${bodyFont};
          padding: 4px 9px;
          border-radius: 50%;
          border: 2px solid ${bodyFont};
          font-size: 16px;
          transition: 0.3s;
        }
        a:hover {
          background-color: ${link};
          border-color: transparent;
          transition: 0.3s;
          color: ${bodyBg};
        }
      `}</style>
    </div>
  )
}

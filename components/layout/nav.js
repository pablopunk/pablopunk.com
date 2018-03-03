import Link from 'next/link'
import colors from '../styles/colors.js'

export default ({ links = [] }) => (
  <div>
    <div className='links'>
      {links.map(({ title, href }) =>
        <div>
          { href &&
            <Link href={href}><a>{title}</a></Link>
          }
          { !!href ||
            <a>{title}</a>
          }
        </div>
      )}
    </div>
    <style jsx>{`
      .links {
        display: flex;
      }
      .links > * {
        padding-right: 1em;
      }
      .links > *:after {
        content: "\f105";
        font-family: FontAwesome;
        padding-left: 1em;
        color: ${colors.secondary};
      }
      .links > *:last-child:after {
        content: "";
      }
    `}</style>
  </div>
)

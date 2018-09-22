import colors from '../styles/colors'
import fonts from '../styles/fonts'

export default ({ children }) => (
  <h1>
    {children}
    <style jsx>{`
      h1 {
        font-family: ${fonts.title};
        color: ${colors.main};
        margin: 1em 0;
        font-size: 3em;
        text-align: center;
      }
    `}</style>
  </h1>
)

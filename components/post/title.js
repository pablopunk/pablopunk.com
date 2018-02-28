import colors from '../styles/colors'
import fonts from '../styles/fonts'

export default ({ children }) =>
  <h1 style={{ fontFamily: fonts.title, color: colors.main, margin: '1em 0', fontSize: '3em', textAlign: 'center' }} >
    { children }
  </h1>

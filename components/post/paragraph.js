import fonts from '../styles/fonts'

export default ({ children }) => (
  <div style={{ fontFamily: fonts.read, color: '#777', margin: '1em 0' }}>
    {children}
  </div>
)

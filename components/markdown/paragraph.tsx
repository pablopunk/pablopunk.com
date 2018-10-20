import fonts from '../styles/fonts'

export default ({ children }) => (
  <p>
    {children}
    <style jsx>{`
      font-family: ${fonts.read};
      color: #777;
    `}</style>
  </p>
)

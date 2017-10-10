export default ({ height = 100, children }) => (
  <div>
    <div>
      { children }
    </div>
    <style jsx>{`
      div {
        display: flex;
        height: ${height}vh;
        justify-content: center;
        align-items: center;
      }
    `}</style>
  </div>
)

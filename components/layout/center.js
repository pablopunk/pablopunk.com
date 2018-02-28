export default ({ height = 100, cropTop = false, children }) => (
  <div>
    <div>
      { children }
    </div>
    <style jsx>{`
      div {
        display: flex;
        height: ${height}vh;
        flex-direction: column;
        justify-content: ${cropTop ? 'flex-start' : 'center'};
        align-items: center;
      }
    `}</style>
  </div>
)

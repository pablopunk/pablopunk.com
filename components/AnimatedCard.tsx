export const AnimatedCard = ({ index, children, ...props }) => {
  return (
    <div key={index} {...props}>
      {children}
    </div>
  )
}

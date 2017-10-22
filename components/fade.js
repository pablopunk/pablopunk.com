module.exports = ({ children, duration = 0.5, delay = 0 }) => (
  <div>
    {children}
    <style jsx>{`
      div {
        opacity: 0;
        animation: fadeIn ${duration}s ease-in forwards;
        animation-delay: ${delay}s;
      }
      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    `}</style>
  </div>
)

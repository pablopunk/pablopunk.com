import FadeIn from 'react-fade-in'

module.exports = ({ stories }) =>
  <div>
    <div className='wrapRelative'>
      <div className='stories'>
        <FadeIn>
          {stories.map((story, i) =>
            <div className='story' key={i}>
              <a href={story.link}><div className='title'>{story.title}</div></a>
              <div className='date'>{story.date}</div>
              <div className='subtitle'>{story.subtitle}</div>
            </div>)}
        </FadeIn>
      </div>
      <style jsx>{`
        .wrapRelative {
          position: relative;
        }
        .stories:after {
          content: "";
          position: absolute;
          z-index: -1;
          top: 0;
          bottom: 0;
          left: 50%;
          border-left: 1px solid #ddd;
          transform: translate(-50%);
        }
        .story {
          border: 1px solid #eee;
          border-radius: 5px;
          margin: .5em 0 2em 0;
          padding: 1em;
          width: 200px;
          background-color: white;
          z-index: 9;
        }
        .title {
          font-size: 1em;
        }
        .subtitle {
          font-size: .85em;
          color: #555;
        }
        .date {
          font-size: .85em;
          color: #888;
        }
        @media (max-width: 768px) {
          .story {
            width: 65vw;
          }
          .title {
            font-size: 1.2em;
          }
          .subtitle {
            font-size: 1em;
          }
          .date {
            font-size: 1em;
          }
      }
        `}</style>
    </div>
  </div>

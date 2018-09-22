import colors from '../components/styles/colors'

export default ({ name, description, link, image }) => (
  <a href={link} target='_blank'>
    <article>
      <div className='item-image'><img src={image} /></div>
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </article>
    <style jsx>{`
      article {
        height: 150px;
        display: flex;
        align-items: space-between;
        padding: 1em .5em;
        border-radius: 5px;
        transition: .3s;
      }
      h3 {
        color: ${colors.main}
      }
      a:hover > article {
        box-shadow: 7px 13px 88px 14px #e5e5e5;
        transition: .3s;
      }
      a p {
        color: #333;
      }
      div {
        width: 200px;
        margin: 0 .4em;
      }
      img {
        max-height: 130px;
      }
      .item-image {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `}</style>
  </a>
)

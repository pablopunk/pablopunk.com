export default ({ images }) => (
  <div>
    <div className='grid'>
      {images.map((image, i) => (
        <a key={i} href={`https://static.pexels.com/photos/${image.id}/pexels-photo-${image.id}.jpeg`}><img
          src={`/static/images/pexels/pexels-photo-${image.id}.jpg`}
          alt={image.id}
        /></a>
      ))}
    </div>
    <style jsx>{`
      img {
        width: 200px;
        margin: 1em;
        border-radius: 5px;
        box-shadow: 6px 6px 33px 8px #ccc;
        transition: box-shadow .2s;
        cursor: zoom-in;
      }
      img:hover {
        box-shadow: 6px 6px 33px 8px #999;
      }
      .grid {
        text-align: center;
      }
      @media (max-width: 768px) {
        img {
          width: 80%;
        }
      }
    `}</style>
  </div>
)

import gravatar from 'gravatar'

export default () => (
	<div>
		<img src={gravatar.url('pablovarela182@gmail.com', {s:'80'})} />
  <style jsx>{`
    img {
      border-radius: 50px;
    }
  `}</style>
	</div>
)

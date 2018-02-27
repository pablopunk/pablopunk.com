import md from 'markdown-in-js'
import Post from '../../components/post'

const markdownElements = require('../../components/markdownElements')

const Content = () => md(markdownElements)`

# Work from home as a web developer

![image](/static/images/posts/keepcoding-interview.jpg)

I was interviewed by **keepcoding.io** about how I
got a remote job as a web developer.

The interview is in Spanish, you can [read it here](https://keepcoding.io/es/blog/trabaja-desarrollador-web-desde-casa/)
`

export default () =>
  <Post title='Work from home as a web developer'>
    <Content />
  </Post>

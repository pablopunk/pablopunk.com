import {title} from './fonts'
import {main} from './colors'

export default ({ children }) =>
  <h1 style={{ fontFamily: title, color: main, margin: '1em 0', fontSize: '3em', textAlign: 'center' }} >
    { children }
  </h1>

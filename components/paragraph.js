import {read} from './fonts'

export default ({ children }) =>
  <div style={{ fontFamily: read, color: '#777', margin: '1em 0' }}>
    { children }
  </div>

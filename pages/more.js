import React from 'react'
import Link from 'next/link'

function myAge () {
  const now = new Date()
  const birthYear = 1993
  const birthDay = 9
  const birthMonth = 6 // July's index
  const todaysYear = now.getFullYear()
  const todaysDay = now.getDate()
  const todaysMonth = now.getMonth()
  const wasMyBirthdayAlready =
    todaysMonth > birthMonth ||
    (todaysMonth === birthMonth && todaysDay >= birthDay)

  return wasMyBirthdayAlready
    ? todaysYear - birthYear
    : todaysYear - birthYear - 1
}

export default class extends React.Component {
  render () {
    return (
      <div>
        <div className='container'>
          <p>
            <Link href={{ pathname: '/', query: this.props.query }} prefetch>
              <a>Go back...</a>
            </Link>
          </p>
          <div className='row'>
            <div className='col-4'>
              <p>I'm {myAge()} years old.</p>
              <p>I was born in Ourense, Galicia</p>
              <p>
            I studied CS at Santiago de Compostela (<a target='_blank' href='https://www.usc.es/'>USC</a>).
              </p>
              <p>
        I lived between 2016 and 2017 in Marquette, Michigan (USA).
                <br />
        There I got my first job as a full stack web developer at <a target='_blank' href='http://stangds.com'>StangDS</a>.
              </p>
              <p>
        I started to work remotely when I came back to Spain.
              </p>
              <p>
            I studied a full stack JavaScript bootcamp at <a target='_blank' href='https://keepcoding.io'>keepcoding</a> between 2017-18.
              </p>
              <p>
        Now I'm a full remote developer working at <a target='_blank' href='https://sourcefabric.org'>Sourcefabric</a>.
              </p>
            </div>
            <div className='col-5' style={{ textAlign: 'right' }}>
              <p>Oh, and <a target='_blank' href='https://www.youtube.com/watch?v=ysMFrMy_RKA'>I solve Rubik's cubes</a>.</p>
              <p>And I <a target='_blank' href='https://www.instagram.com/stories/highlights/18013136287075737/'>built an electric skateboard.</a></p>
              <p>
            And fell inmediately. Sad.
              </p>
            </div>
          </div>
        </div>
        <style jsx>{`
    @media screen and (min-width: 900px) {
      .container {
        margin-top: 10vh;
      }
    }
    `}</style>
      </div>
    )
  }
}

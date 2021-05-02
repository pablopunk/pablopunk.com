import { getPageStaticProps } from 'storyblok/middleware'

// function howOldAmI() {
//   const now = new Date()
//   const iHadABirthDayThisYear = now.getMonth() >= 6 && now.getDate() >= 9
//   const yearsSinceIWasBorn = now.getFullYear() - 1993

//   return iHadABirthDayThisYear ? yearsSinceIWasBorn : yearsSinceIWasBorn - 1
// }

const Me = () => {
  return (
    <div className="w-full text-lg flex flex-col items-center my-2">bio</div>
  )
}

export const getStaticProps = (ctx) => getPageStaticProps('me', ctx)

export default Me

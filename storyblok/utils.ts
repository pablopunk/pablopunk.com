const howOldAmI = () => {
  const now = new Date()
  const iHadABirthDayThisYear = now.getMonth() >= 6 && now.getDate() >= 9
  const yearsSinceIWasBorn = now.getFullYear() - 1993
  const yearsOld = iHadABirthDayThisYear
    ? yearsSinceIWasBorn
    : yearsSinceIWasBorn - 1

  return yearsOld.toString()
}

const YEARS_OLD = (text: string) => text.replace('%YEARS_OLD%', howOldAmI())

export const handlePlaceholders = (text: string) => {
  let newText = String(text)

  newText = YEARS_OLD(text)

  return newText
}

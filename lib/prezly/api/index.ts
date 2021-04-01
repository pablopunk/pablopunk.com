import PrezlyApi from './PrezlyApi'

export const getPrezlyApi = () => {
  return new PrezlyApi(
    process.env.PREZLY_ACCESS_TOKEN,
    process.env.PREZLY_NEWSROOM_UUID
  )
}

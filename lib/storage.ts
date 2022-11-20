import * as R from 'ramda'

const EVENTS_STORAGE = 'user_events'

const getStoredData = (key: string) => localStorage?.getItem(key) || '{}'
const setStoredData = (key: string, value: string) =>
  localStorage?.setItem(key, value)

const getEventsFromStorage = R.pipe(
  R.always(EVENTS_STORAGE),
  getStoredData,
  JSON.parse,
)
const setEventsInStorage = R.pipe(
  JSON.stringify,
  R.curry(setStoredData)(EVENTS_STORAGE),
)

export const checkIfUserDidSomething = (eventName) =>
  getEventsFromStorage()?.[eventName] === true

export const userDidSomething = (eventName: string) => {
  const events = getEventsFromStorage()

  return setEventsInStorage({
    ...events,
    [eventName]: true,
  })
}

const EVENTS_STORAGE = 'user_events'

export function checkIfUserDidSomething(eventName: string) {
  const events = JSON.parse(localStorage.getItem(EVENTS_STORAGE) || '{}')

  return events?.[eventName] === true
}

export function userDidSomething(eventName: string) {
  const events = JSON.parse(localStorage.getItem(EVENTS_STORAGE) || '{}')

  return localStorage.setItem(
    EVENTS_STORAGE,
    JSON.stringify({ ...events, [eventName]: true }),
  )
}

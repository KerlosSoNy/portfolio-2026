import { useCallback, useSyncExternalStore } from 'react'

function useIsDesktop(breakpoint = 1024, minHeight = 900) {
  const query = `(min-width: ${breakpoint}px), (min-height: ${minHeight}px)`

  const subscribe = useCallback(
    (callback: () => void) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', callback)
      return () => mq.removeEventListener('change', callback)
    },
    [query]
  )

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query]
  )

  const getServerSnapshot = () => false

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export default useIsDesktop

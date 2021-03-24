export const makeRandomString = () => {
  return Math.random().toString(16).slice(2, 8)
}

export const getNum = () => Math.round(Math.random() * 10)

export const setupAPIs = () => {
  const imTokenAPIs = {
    callAPI: (...args: unknown[]) => {
      const last = args.length < 1 ? null : args[args.length - 1]
      if (typeof last === 'function') {
        last(null, null)
      }
    },
    callPromisifyAPI: () => {
      return new Promise(resolve => {
        resolve(null)
      })
    },
  }

  ;(window as any).imToken = imTokenAPIs
  const userAgentGetter = jest.spyOn(window.navigator, 'userAgent', 'get')
  userAgentGetter.mockReturnValue(`${navigator.userAgent} ${makeRandomString()} imToken/2.4.0`)
}

export const resetAPIs = () => {
  ;(window as any).imToken = undefined
  jest.resetAllMocks()
  const userAgentGetter = jest.spyOn(window.navigator, 'userAgent', 'get')
  userAgentGetter.mockReturnValue('undefined')
}

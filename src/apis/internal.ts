import { callAPI, callPromisifyAPI } from './utils'

const internal = {
  getHeaders: (): Promise<string> => {
    return new Promise((resolve, reject) => {
      callAPI('private.getHeaders', (err: Error, result: string) => {
        if (err) return reject(err)
        resolve(result)
      })
    })
  },

  setLogo: (logo: string): void => {
    callAPI('private.setLogo', logo)
  },

  log: (...data: any[]): void => {
    callAPI('private.logo', data)
  },

  emitEvent: <T extends Record<string | number | symbol, any>>(
    eventName: string,
    params?: T,
  ): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      callAPI(
        'private.emitEvent',
        {
          eventName,
          params: params || {},
        },
        (err: Error, result: T) => {
          if (err) return reject(err)
          resolve(result)
        },
      )
    })
  },

  dangerouslyAPI: <T>(...args: unknown[]): T => {
    return callAPI<T>(...args)
  },

  dangerouslyPromisifyAPI: <T>(...args: unknown[]): Promise<T> => {
    return callPromisifyAPI<T>(...args)
  },
}

export default internal

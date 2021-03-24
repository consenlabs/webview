import { callAPI } from './utils'

const user = {
  getCurrentLanguage: (): Promise<string> => {
    return new Promise((resolve, reject) => {
      callAPI('device.getCurrentLanguage', (err: Error, language: string) => {
        if (err) return reject(err)
        resolve(language)
      })
    })
  },

  getCurrentCurrency: (): Promise<string> => {
    return new Promise((resolve, reject) => {
      callAPI('device.getCurrentCurrency', (err: Error, currency: string) => {
        if (err) return reject(err)
        resolve(currency)
      })
    })
  },
}

export default user

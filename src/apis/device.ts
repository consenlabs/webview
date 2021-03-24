import { callAPI } from './utils'

const user = {
  /**
   * Get the current language environment, e.g. "en-us".
   */
  getCurrentLanguage: (): Promise<string> => {
    return new Promise((resolve, reject) => {
      callAPI('device.getCurrentLanguage', (err: Error, language: string) => {
        if (err) return reject(err)
        resolve(language)
      })
    })
  },

  /**
   * Get currency from user settings, e.g. "CNY".
   */
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

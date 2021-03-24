import { callAPI } from './utils'

export type ConfirmParams = {
  title: string
  message: string
  cancelText: string
  confirmText: string
}

export type ShareParamsDefault = {
  title: string
  message: string
  url: string
}

export type ShareParamsImage = {
  title: string
  image: string
}

export type ShareParams = ShareParamsDefault & ShareParamsImage

export interface OpenReturn {
  app?: string
  dismissedAction?: boolean
}

const native = {
  /**
   * Call the native component, UI effects depend on the platform.
   */
  alert: (content: string): void => {
    callAPI('native.alert', content)
  },

  /**
   * Call the native component, UI effects depend on the platform.
   */
  confirm: (params: ConfirmParams): Promise<boolean> => {
    return new Promise(resolve => {
      callAPI('native.confirm', params, (err: Error) => {
        if (err) return resolve(false)
        resolve(true)
      })
    })
  },

  /**
   * Set loading status. the loading layer blocks all events from user.
   */
  setLoading: (visible: boolean): void => {
    const method = visible ? 'showLoading' : 'hideLoading'
    callAPI(`native.${method}`)
  },

  /**
   * Share image or url address.
   */
  share: (params: ShareParams): Promise<OpenReturn> => {
    const input = !params.image
      ? params
      : {
          title: params.title,
          url: params.image,
          type: 'image/png',
        }
    return new Promise((resolve, reject) => {
      callAPI('native.share', input, (err: Error, ret: OpenReturn) => {
        if (err) return reject(err)
        resolve(ret)
      })
    })
  },

  /**
   * Call the native component, UI effects depend on the platform.
   */
  scanQRCode: (): Promise<string> => {
    return new Promise((resolve, reject) => {
      callAPI('native.scanQRCode', (err: Error, text: string) => {
        if (err) return reject(err)
        resolve(text)
      })
    })
  },

  /**
   * Set the user's clipboard.
   */
  setClipboard: (text: string): void => {
    callAPI('native.setClipboard', text)
  },
}

export default native

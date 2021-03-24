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
  alert: (content: string): void => {
    callAPI('native.alert', content)
  },

  confirm: (params: ConfirmParams): Promise<boolean> => {
    return new Promise(resolve => {
      callAPI('native.confirm', params, (err: Error) => {
        if (err) return resolve(false)
        resolve(true)
      })
    })
  },

  setLoading: (visible: boolean): void => {
    const method = visible ? 'showLoading' : 'hideLoading'
    callAPI(`native.${method}`)
  },

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

  scanQRCode: (): Promise<string> => {
    return new Promise((resolve, reject) => {
      callAPI('native.scanQRCode', (err: Error, text: string) => {
        if (err) return reject(err)
        resolve(text)
      })
    })
  },

  setClipboard: (text: string): void => {
    callAPI('native.setClipboard', text)
  },
}

export default native

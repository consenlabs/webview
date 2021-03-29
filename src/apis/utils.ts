import { ERRORS } from '../constants'

/**
 * Identify if the error was cancelled by the user himself.
 */
export const isCancelError = (error: Error | string) => {
  if (typeof error === 'string') {
    return error === ERRORS.USER_CANCEL
  }

  if (error.message === ERRORS.USER_CANCEL) return true
  return (error as any).errorCode === 1001
}

export const isTokenWebView = (): boolean => {
  if (typeof window === 'undefined') return false
  const win = window as any
  if (typeof win['imToken'] === 'undefined') return false
  const token = win['imToken'] || {}
  if (token['isSimulated']) return false
  if (!token['callAPI']) return false
  return true
}

const getTokenApis = (): any => {
  if (!isTokenWebView()) {
    throw new Error(ERRORS.NOT_TOKEN_WEBVIEW)
  }
  const win = window as any
  return win['imToken']
}

export const callAPI = <T>(...args: unknown[]): T => {
  const token = getTokenApis()
  return token.callAPI(...args)
}

export const callPromisifyAPI = <T>(...args: unknown[]): Promise<T> => {
  const token = getTokenApis()
  return token.callPromisifyAPI.bind((window as any)['imToken'])(...args)
}

export const getVersion = (): string => {
  if (!isTokenWebView()) return ''

  const matchArr = `${navigator.userAgent}`.match(/imtoken\/(.*)/i)
  if (!matchArr || matchArr.length < 1) return ''
  if (!matchArr[1]) return ''
  return `${matchArr[1]}`.trim()
}

export const compareSemver = (a: string = '', b: string = ''): number => {
  const pa = a.split('.')
  const pb = b.split('.')
  for (let i = 0; i < 3; i++) {
    const na = Number(pa[i])
    const nb = Number(pb[i])
    if (na > nb) return 1
    if (nb > na) return -1
    if (!isNaN(na) && isNaN(nb)) return 1
    if (isNaN(na) && !isNaN(nb)) return -1
  }
  return 0
}

export const isGreaterThanOrEqualVersion = (version: string): boolean => {
  const currentVersion = getVersion()
  if (!currentVersion) return false
  const result = compareSemver(currentVersion, version)
  return !!(version && result >= 0)
}

export const removeHashPrefix = (val: any): string => {
  return `${val}`.replace(/^#/, '')
}

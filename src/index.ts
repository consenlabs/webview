import apis from './apis'
import { ERRORS } from './constants'
import {
  isGreaterThanOrEqualVersion,
  isTokenWebView,
  getVersion,
  compareSemver,
  isCancelError,
} from './apis/utils'

const isTokenEnv = (): boolean => isTokenWebView()

const TokenWebView = {
  ERRORS,

  isTokenEnv,

  isCancelError,

  compareSemver,

  isGreaterThanOrEqualVersion,

  getVersion,

  apis,
}

export {
  ERRORS,
  isTokenEnv,
  isCancelError,
  compareSemver,
  isGreaterThanOrEqualVersion,
  getVersion,
  apis,
}

export default TokenWebView

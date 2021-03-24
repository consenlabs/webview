import apis from './apis'
import { ERRORS } from './constants'
import {
  isGreaterThanOrEqualVersion,
  isTokenWebView,
  getVersion,
  compareSemver,
  isCancelError,
} from './apis/utils'

const TokenWebView = {
  ERRORS,

  isTokenEnv: (): boolean => isTokenWebView(),

  isCancelError,

  compareSemver,

  isGreaterThanOrEqualVersion,

  getVersion,

  apis,
}

export default TokenWebView

import { setupAPIs, resetAPIs, makeRandomString, getNum } from 'tests/utils'
import TokenWebView from 'src/index'

describe('utils', () => {
  beforeAll(() => {})

  it('should be work correctly without imToken env', () => {
    setupAPIs()
    expect(TokenWebView.isTokenEnv()).toBe(true)
    resetAPIs()
    expect(TokenWebView.isTokenEnv()).toBe(false)
  })

  it('should get the same version', () => {
    setupAPIs()
    const version = `${getNum()}.${getNum()}.${getNum()}`
    const userAgentGetter = jest.spyOn(window.navigator, 'userAgent', 'get')
    userAgentGetter.mockReturnValue(`${makeRandomString()}imToken/${version}`)
    expect(TokenWebView.getVersion()).toEqual(version)
    userAgentGetter.mockReset()
  })

  it('should be able to compare version with env', () => {
    const last = getNum()
    const version = `${getNum()}.${getNum()}`
    const lastVersion = `${version}.${last}`
    const nextVersion = `${version}.${last + 1}`
    const userAgentGetter = jest.spyOn(window.navigator, 'userAgent', 'get')
    userAgentGetter.mockReturnValue(`${makeRandomString()}imToken/${nextVersion}`)
    expect(TokenWebView.isGreaterThanOrEqualVersion(lastVersion)).toBe(true)
  })

  it('should be able to compare version sizes correctly', () => {
    const last = getNum()
    const version = `${getNum()}.${getNum()}`
    const lastVersion = `${version}.${last}`
    const nextVersion = `${version}.${last + 1}`
    expect(TokenWebView.compareSemver(lastVersion, nextVersion)).toBe(-1)
    expect(TokenWebView.compareSemver(nextVersion, lastVersion)).toBe(1)
    expect(TokenWebView.compareSemver(nextVersion, nextVersion)).toBe(0)
  })

  it('should be infer whether it is a cancellation error', () => {
    expect(TokenWebView.isCancelError(new Error(TokenWebView.ERRORS.USER_CANCEL))).toBe(true)

    const nonstandardError = {
      errorCode: 1001,
    }
    const isError = TokenWebView.isCancelError as any
    expect(isError(nonstandardError)).toBe(true)

    expect(TokenWebView.isCancelError(new Error(makeRandomString()))).toBe(false)
  })
})

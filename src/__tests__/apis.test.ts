import TokenWebView from 'src/index'
import { setupAPIs } from 'tests/utils'

describe('APIs', () => {
  it('all APIs should be forwarded', () => {
    setupAPIs()
    const fn = jest.fn()
    ;(window as any).imToken.callAPI = fn

    expect(() => TokenWebView.apis.internal.dangerouslyAPI('unknow')).not.toThrow()
    expect(fn).toBeCalled()
    fn.mockReset()
  })

  it('all promisify APIs should be forwarded', () => {
    setupAPIs()
    const fn = jest.fn()
    ;(window as any).imToken.callPromisifyAPI = fn

    expect(() => TokenWebView.apis.internal.dangerouslyPromisifyAPI('unknow')).not.toThrow()
    expect(fn).toBeCalled()
    fn.mockReset()
  })
})

import { callAPI } from './utils'

export type ScreenProps = {
  title: string
  url: string
}

export type Orientation = 'LANDSCAPE' | 'PORTRAIT'

/**
 * Change setting items such as route, title etc.
 */
const navigator = {
  /**
   * Close the current web app.
   */
  closeDapp: (): void => {
    callAPI('navigator.setTitle')
  },

  /**
   * Returns the previous level of routing, or closes the app if there is no routing stack.
   */
  goBack: (): void => {
    callAPI('navigator.goBack')
  },

  /**
   * Hide Navbar manually.
   */
  toggleNavbar: (): void => {
    callAPI('navigator.toggleNavbar')
  },

  routeTo: ({ screen, props }: { screen: string; props: ScreenProps }): void => {
    callAPI('navigator.routeTo', {
      screen: screen,
      passProps: props,
    })
  },

  getOrientation: (): Promise<Orientation> => {
    return new Promise((resolve, reject) => {
      callAPI('navigator.getOrientation', (err: Error, result: 'LANDSCAPE' | 'PORTRAIT') => {
        if (err) return reject(err)
        resolve(result)
      })
    })
  },

  setOrientation: (orientation: Orientation): void => {
    callAPI('navigator.setOrientation', `${orientation}`.toLowerCase())
  },

  setTitle: (title: string) => {
    callAPI('navigator.setTitle', title)
  },
}

export default navigator

import { callAPI, removeHashPrefix } from './utils'

type LayoutAPIOptions = {
  hbg?: string
  hfg?: string
  title?: string
  title_left?: boolean
  title_size?: number
  trans?: boolean
  trans_y?: number | null
  lbg?: string
  lfg?: string
  bbg?: string
  bfg?: string
}

export type HexColor = `#${string}`

export type WebViewLayoutOptions = {
  background?: HexColor
  foreground?: HexColor
  title?: string
  isTitleLeft?: boolean
  titleSize?: number
  isTransparent?: boolean
  transparentScrollY?: number
  loadingBackground?: HexColor
  loadingForeground?: HexColor
  bodyBackground?: HexColor
  bodyForeground?: HexColor
}

const headerMapKeys: Record<keyof WebViewLayoutOptions, keyof LayoutAPIOptions> = {
  background: 'hbg',
  foreground: 'hfg',
  title: 'title',
  isTitleLeft: 'title_left',
  titleSize: 'title_size',
  isTransparent: 'trans',
  transparentScrollY: 'trans_y',
  loadingBackground: 'lbg',
  loadingForeground: 'lfg',
  bodyBackground: 'bbg',
  bodyForeground: 'bfg',
}

type ColorKeys = Array<
  | string
  | keyof Pick<
      WebViewLayoutOptions,
      | 'background'
      | 'foreground'
      | 'loadingForeground'
      | 'loadingBackground'
      | 'bodyForeground'
      | 'bodyBackground'
    >
>

const colorKeys: ColorKeys = [
  'background',
  'foreground',
  'loadingForeground',
  'loadingBackground',
  'bodyBackground',
  'bodyForeground',
]
const hasColorKey = (key: string): boolean => colorKeys.includes(key)

const layout = {
  setOptions: (headerOptions: WebViewLayoutOptions): void => {
    const params = Object.keys(headerOptions).reduce<WebViewLayoutOptions>(
      (pre, next: keyof WebViewLayoutOptions) => {
        const apiKey = headerMapKeys[next]
        let val = headerOptions[next]
        if (hasColorKey(next)) {
          val = removeHashPrefix(val)
        }
        if (!apiKey) return pre
        return {
          ...pre,
          [apiKey]: val,
        }
      },
      {},
    )

    callAPI('layout.setOptions', params)
  },
}

export default layout

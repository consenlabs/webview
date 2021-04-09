import { callAPI, removeHashPrefix } from './utils'

type LayoutAPIOptions = {
  hbg?: string | string[]
  hfg?: string
  title_left?: boolean
  title_size?: number
  trans?: boolean
  trans_y?: number | null
  lbg?: string
  lfg?: string
  bbg?: string
  bfg?: string
  sfg?: number
}

export type HexColor = `#${string}`
export type StatusBarStyle = 0 | 1 | 2

export type WebViewLayoutOptions = {
  background?: HexColor | Array<HexColor>
  foreground?: HexColor
  isTitleLeft?: boolean
  titleSize?: number
  isTransparent?: boolean
  transparentScrollY?: number
  loadingBackground?: HexColor
  loadingForeground?: HexColor
  bodyBackground?: HexColor
  bodyForeground?: HexColor
  statusBarStyle?: StatusBarStyle
}

const headerMapKeys: Record<keyof WebViewLayoutOptions, keyof LayoutAPIOptions> = {
  background: 'hbg',
  foreground: 'hfg',
  isTitleLeft: 'title_left',
  titleSize: 'title_size',
  isTransparent: 'trans',
  transparentScrollY: 'trans_y',
  loadingBackground: 'lbg',
  loadingForeground: 'lfg',
  bodyBackground: 'bbg',
  bodyForeground: 'bfg',
  statusBarStyle: 'sfg',
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
  setOptions: (options: WebViewLayoutOptions): void => {
    const params = Object.keys(options).reduce<LayoutAPIOptions>(
      (pre, next: keyof WebViewLayoutOptions) => {
        const apiKey = headerMapKeys[next]
        const val = options[next]
        const valOrColor = hasColorKey(next) ? removeHashPrefix(val as string | string[]) : val
        if (!apiKey) return pre
        return {
          ...pre,
          [apiKey]: valOrColor,
        }
      },
      {},
    )

    callAPI('layout.setOptions', params)
  },
}

export default layout

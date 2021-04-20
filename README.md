## TokenWebView

WebView utils for imToken application v2.

You can use this utils to call the imToken App's public APIs,
including features such as modifying title, route navigation, and support for `TypeScript`, `cjs`, `esm`, `umd`.

Package size about `1kb` (gzipped), no external dependences and no side effects.

### Installing

Using NPM:

```bash
npm i @consenlabs-fe/webview
```

Or using Yarn:

```bash
yarn add @consenlabs-fe/webview
```

Or using jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@consenlabs-fe/webview/dist/index.min.js" />
```

### Guide

It is recommended that you determine the current environment before using the APIs:

```jsx
import TokenWebView from '@consenlabs-fe/webview'

if (TokenWebView.isTokenEnv()) {
  TokenWebView.apis.navigator.setTitle('hello world')
}
```

**Need help?**

- For a complete sample project, please refer to [examples](https://github.com/consenlabs/webview/tree/master/examples).
- For any questions about the APIs, please open an [issue](https://github.com/consenlabs/webview/issues/new).
- For any feature suggestions or for help, please open a [discussion](https://github.com/consenlabs/webview/discussions/new).

### Documention

- [Official API Documentation](https://imtoken.gitbook.io/developers/products/webview)

### License

[MIT](https://github.com/consenlabs/webview/tree/master/LICENSE)

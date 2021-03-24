import './style.css'


if (window.TokenWebView) {
  document.querySelector('#app').innerHTML = `
 In token env: ${window.TokenWebView.isTokenEnv()}
`
}


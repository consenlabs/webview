import React, { useEffect, useState } from 'react'
import TokenWebView from '@consenlabs-fe/webview'

const App = () => {
  const [state, setState] = useState<boolean>(false)
  const [version, setVersion] = useState<string>('')
  useEffect(() => {
    const isToken = TokenWebView.isTokenEnv()
    setState(isToken)
    if (isToken) {
      setVersion(TokenWebView.getVersion())
    }
  }, [])

  const setTitle = () => {
    if (!state) return alert('not imToken env')
    TokenWebView.apis.navigator.setTitle(Math.random().toString(16).slice(2, 8))
  }
  const popup = () => {
    if (!state) return alert('not imToken env')
    TokenWebView.apis.native.alert('hello')
  }

  const confirm = async () => {
    if (!state) return alert('not imToken env')
    const result = await TokenWebView.apis.native.confirm({
      title: 'hello',
      cancelText: 'cancel',
      confirmText: 'ok',
      message: 'message',
    })
    alert(`confirm API result: ${result}`)
  }

  return (
    <div className="container max-w-screen-md mx-auto flex flex-col justify-center items-center bg-white pt-5">
      <div className="p-6 mb-3 w-5/6 rounded bg-gray-100 row-auto shadow-md">
        <div className="flex text-sm text-gray-800 bg">
          <span>In the imToken env: </span>
          <span className="text-red-400 pl-4">{state ? 'Yes' : 'No'}</span>
        </div>
      </div>
      <div className="p-6 mb-3 w-5/6 rounded bg-gray-100 row-auto shadow-md">
        <div className="flex text-sm text-gray-800 bg">
          <span>Current version: </span>
          <span className="text-red-400 pl-4">{version}</span>
        </div>
      </div>
      <div className="p-6 w-5/6 rounded bg-white bg-gray-100 row-auto flex justify-center items-center shadow-md">
        <button
          className="pt-2 pb-2 pl-2 pr-2 rounded bg-blue-500 text-white text-sm mr-4"
          onClick={setTitle}>
          set title
        </button>
        <button
          className="pt-2 pb-2 pl-2 pr-2 rounded bg-blue-500 text-white text-sm mr-4"
          onClick={popup}>
          popup
        </button>
        <button
          className="pt-2 pb-2 pl-2 pr-2 rounded bg-blue-500 text-white text-sm"
          onClick={confirm}>
          confirm
        </button>
      </div>
    </div>
  )
}

export default App

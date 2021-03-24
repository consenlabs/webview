import { callAPI } from './utils'

export type ChainType =
  | 'ETHEREUM'
  | 'BITCOIN'
  | 'LITECOIN'
  | 'EOS'
  | 'COSMOS'
  | 'TRON'
  | 'BITCOINCASH'
  | 'NERVOS'
  | 'KUSAMA'
  | 'POLKADOT'
  | 'FILECOIN'

const user = {
  showAccountSwitch: (chainType: ChainType | null = null): Promise<string> => {
    return new Promise((resolve, reject) => {
      callAPI('user.showAccountSwitch', { chainType }, (err: Error, address: string) => {
        if (err) return reject(err)
        resolve(address)
      })
    })
  },
}

export default user

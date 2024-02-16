import { ethers, getNetworkId, getNetworkProviderUrl } from '@ensdomains/ui'
import getENS, { getRegistrar } from 'apollo/mutations/ens'

const ChainLinkABI = [
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "description",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint80",
        "name": "_roundId",
        "type": "uint80"
      }
    ],
    "name": "getRoundData",
    "outputs": [
      {
        "internalType": "uint80",
        "name": "roundId",
        "type": "uint80"
      },
      {
        "internalType": "int256",
        "name": "answer",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "startedAt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "updatedAt",
        "type": "uint256"
      },
      {
        "internalType": "uint80",
        "name": "answeredInRound",
        "type": "uint80"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "latestRoundData",
    "outputs": [
      {
        "internalType": "uint80",
        "name": "roundId",
        "type": "uint80"
      },
      {
        "internalType": "int256",
        "name": "answer",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "startedAt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "updatedAt",
        "type": "uint256"
      },
      {
        "internalType": "uint80",
        "name": "answeredInRound",
        "type": "uint80"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "version",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] 

async function getContract() {
  let contractAddress = '0xf4766552d15ae4d256ad41b6cf2933482b0680dc'
  /*try {
    const ens = getENS()
    contractAddress = await ens.getAddress('eth-usd.data.eth')
  } catch {
    //return mainnet if it does not exist
    contractAddress = '0xf4766552d15ae4d256ad41b6cf2933482b0680dc'
  }*/
  return contractAddress
}

export default async function getEtherPrice() {
  try {
    const network = await getNetworkId()
    const networkProvider = getNetworkProviderUrl(`${network}`)
    const provider = new ethers.providers.JsonRpcProvider(networkProvider)

    const ethUsdContract = new ethers.Contract(
      await getContract(),
      ChainLinkABI,
      provider
    )
    //const price = (await ethUsdContract.latestAnswer()).toNumber() / 100000000
    let price_temp = await ethUsdContract.latestRoundData();

    const price = (price_temp[1].toNumber())/100000000
    return price
  } catch (e) {
    console.log(e, 'error getting usd price oracle')
  }
}

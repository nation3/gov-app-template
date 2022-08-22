import { useEffect, useState } from 'react'

const fetchTokenInfo = async (address: string) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/ethereum/contract/${address}`
  )
  const token = await res.json()
  return {
    symbol: token.symbol.toUpperCase(),
    icon: token.image.small,
    link: `https://www.coingecko.com/en/coins/${token.id}`,
  }
}

const useTokenInfo = (address: string) => {
  const [tokenInfo, setTokenInfo] = useState({})
  useEffect(() => {
    fetchTokenInfo(address).then((tokenRes) => {
      setTokenInfo(tokenRes)
    })
  }, [address])
  return tokenInfo
}

export { fetchTokenInfo, useTokenInfo }

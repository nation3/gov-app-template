import '../styles/globals.css'
import { getDefaultProvider } from 'ethers'
import type { AppProps } from 'next/app'
import { createClient, WagmiConfig } from 'wagmi'
import Nation3Wrapper from '../components/Nation3Wrapper'
import { Flowbite } from 'flowbite-react'

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})

function Nation3({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Nation3Wrapper>
        <Flowbite
          theme={{
            theme: {
              button: {
                color: {
                  info: 'text-white bg-n3blue border border-transparent hover:bg-sky-500 disabled:hover:bg-sky-300 transition',
                },
              },
              badge: {
                color: {
                  info: 'bg-sky-100 text-sky-800 group-hover:bg-sky-200',
                },
              },
            },
          }}
        >
          <Component {...pageProps} />
        </Flowbite>
      </Nation3Wrapper>
    </WagmiConfig>
  )
}

export default Nation3

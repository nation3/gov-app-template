import {
  UserAddIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  HomeIcon,
  NewspaperIcon,
  LockClosedIcon,
  PlusIcon,
  ViewGridIcon,
} from '@heroicons/react/outline'

import { Nation3App, DefaultLayout, DefaultSidebar } from '@nation3/components'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

const navigation = [
  {
    name: 'Proposals',
    route: '/',
    icon: <ViewGridIcon className="h-5 w-5" />,
  },
  {
    name: 'Create a proposal',
    route: '/proposals/create',
    icon: <UserAddIcon className="h-5 w-5" />,
  },
  {
    name: 'Governance process',
    route: '/proposals/process',
    icon: <SparklesIcon className="h-5 w-5" />,
  },
  {
    name: 'Citizen app',
    route: 'https://app.nation3.org',
    icon: <ViewGridIcon className="h-5 w-5" />,
  },
  {
    name: 'Homepage',
    route: 'https://nation3.org',
    icon: <HomeIcon className="h-5 w-5" />,
  },
]

function Nation3Wrapper({
  children,
}: {
  children: React.ReactElement | React.ReactElement[]
}) {
  const { address, connector } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <Nation3App>
      <DefaultLayout
        sidebar={
          <DefaultSidebar
            onConnect={(connector) => {
              connect({
                connector: connectors.find((i) => i.name === connector.name),
              })
            }}
            logo={<img src="/logo.svg" alt="Nation3 Logo" />}
            onRoute={console.log}
            navLinks={navigation}
            connectors={connectors.map((connector) => ({
              ...connector,
            }))}
            account={
              address && connector
                ? {
                    address,
                    connector,
                  }
                : undefined
            }
            onDisconnect={disconnect}
          />
        }
      >
        {children}
      </DefaultLayout>
    </Nation3App>
  )
}

export default Nation3Wrapper

import type { NextPage } from 'next'
import Link from 'next/link'

import { fetchProposals } from '../../lib/proposals'

import { Button, Card, Badge } from 'flowbite-react'
import ProposalBadges from '../../components/ProposalBadges'

const Proposals: NextPage = ({ proposals }: any) => {
  return (
    <div className="m-auto max-w-3xl xl:max-w-6xl p-4 md:p-0 mb-4">
      <div className="flex flex-col">
        <div className="flex-1 flex flex-row justify-between w-full mb-8">
          <h1 className="text-3xl text-left font-display dark:text-white">
            Proposals
          </h1>
          <Link href="/proposals/create">
            <Button>
              <span className="font-display">Create a proposal</span>
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
          {proposals.map((proposal: any) => (
            <Link href={`/proposals/${proposal.id}`} key={proposal.id}>
              <div className="cursor-pointer h-full flex">
                <Card href="#" horizontal={true} key={proposal.id}>
                  <div className="h-full">
                    <div className="mb-2">
                      <ProposalBadges proposal={proposal} />
                    </div>
                    <h2 className="text-xl font-bold line-clamp-2">
                      #{proposal.id} {proposal.discussionMetadata.title}
                    </h2>

                    <p className="line-clamp-4">
                      {proposal.discussionMetadata.description}
                    </p>
                  </div>
                </Card>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const proposals = await fetchProposals(0, true)

  return {
    props: { proposals: proposals.reverse() },
    revalidate: 60 * 5,
  }
}

export default Proposals

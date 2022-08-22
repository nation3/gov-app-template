import { Badge } from 'flowbite-react'

const ProposalBadges = ({ proposal }: any) => {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      <Badge color="info">#{proposal.content.kind}</Badge>
      {proposal.approved === true ? (
        <Badge color="success">Approved</Badge>
      ) : (
        proposal.approved === false && <Badge color="failure">Rejected</Badge>
      )}

      {proposal.enacted === true ? (
        <Badge color="success">Enacted</Badge>
      ) : (
        proposal.enacted === false && (
          <Badge color="warning">Pending enactment</Badge>
        )
      )}
    </div>
  )
}

export default ProposalBadges

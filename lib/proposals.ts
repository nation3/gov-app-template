// @ts-ignore
import fetchMeta from 'fetch-meta-tags'

const fetchProposal = async (id: number, retrieveMetadata?: boolean) => {
  const res = await fetch(
    `https://api.gitrows.com/@github/nation3/gov-proposals/proposals/N3GOV-${id}.json`
  )

  const proposal = await res.json()
  if (!proposal) return

  if (retrieveMetadata) {
    const meta = await fetchMeta(proposal.discussion)
    proposal.discussionMetadata = meta
  }
  if (proposal.votes) {
    if (proposal.votes[0]) {
      proposal.approved = proposal.votes[0].passed || null
      if (proposal.approved === null) {
        proposal.activeVote = true
      }
    }
    if (
      proposal.content.kind !== 'meta' &&
      proposal.content.kind !== 'proclamation' &&
      proposal.approved
    ) {
      proposal.enacted = proposal.votes[1]?.passed || false
    }
  }
  return proposal
}

const fetchProposals = async (
  startingIndex: number,
  retrieveMetadata?: boolean
) => {
  const proposals = []

  let noMoreProposals
  let id = startingIndex | 0
  do {
    const proposal = await fetchProposal(id, retrieveMetadata)
    if (proposal) {
      proposals.push(proposal)
      id++
    } else {
      noMoreProposals = !proposal
    }
  } while (!noMoreProposals)

  return proposals
}

export { fetchProposal, fetchProposals }


import { retrieveVotes } from "./helpers"

const voteStats = votes => {
  votes = retrieveVotes(votes)

  const total = votes.length
  const upVotes = votes.filter((vote) => vote.percent > 0).length
  const downVotes = votes.filter((vote) => vote.percent < 0).length
  const removedVotes = votes.filter((vote) => vote.percent === 0).length

  return {
    total, upVotes, downVotes, removedVotes
  }
}

const stats = { voteStats }

export {
  stats as default, voteStats
}

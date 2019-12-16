
import { retrieveVotes } from "./helpers"

/**
 *  Returns stats about a Steem votes object
 *  @param {(object|array)} votes Steem post data object or active_votes array
 *  @returns {object} Return stats object
 *
 *  @example
 *  let stats = voteStats(postData || postData.active_votes)
 *  console.log(stats)
 *  `
 *    {total: "...", upVotes: "...", downVotes: "...", removedVotes: "..."}
 *  `
 */
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

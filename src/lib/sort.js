
import { retrieveVotes } from "./helpers"

/**
 *  Returns an object of sorted Steem votes by upvotes, downvotes and removedvotes
 *  @param {(object|array)} votes Steem post data object or active_votes array
 *  @returns {object} Return sorted arrays in object
 *
 *  @example
 *  let sort = sortVotes(postData || postData.active_votes)
 *  console.log(sort)
 *  `
 *    {upVotes: [...], downVotes: [...], removedVotes: [...]}
 *  `
 */
const sortVotes = votes => {
  votes = retrieveVotes(votes)

  const upVotes = votes.filter((vote) => vote.percent > 0)
  const downVotes = votes.filter((vote) => vote.percent < 0)
  const removedVotes = votes.filter((vote) => vote.percent === 0)

  return {
    upVotes, downVotes, removedVotes
  }
}

const sort = { sortVotes }

export {
  sort as default, sortVotes
}

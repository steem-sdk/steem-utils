
import { retrieveVotes } from "./helpers"

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

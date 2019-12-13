
import { voterCount } from "./constants"

/**
 * @ignore
*/
function log10 (str) {
  const leadingDigits = parseInt(str.substring(0, 4))
  const log = Math.log(leadingDigits) / Math.LN10 + 0.00000001
  const n = str.length - 1
  return n + (log - parseInt(log))
}

const formatRep = rep2 => {
  if (rep2 == null) return rep2
  let rep = String(rep2)
  const neg = rep.charAt(0) === "-"
  rep = neg ? rep.substring(1) : rep

  let out = log10(rep)
  if (isNaN(out)) out = 0
  out = Math.max(out - 9, 0) // @ -9, $0.50 earned is approx magnitude 1
  out = (neg ? -1 : 1) * out
  out = out * 9 + 25 // 9 points per magnitude. center at 25
  // base-line 0 to darken and < 0 to auto hide (grep rephide)
  out = parseInt(out)
  return out
}

const formatVotes = (raw = [], count = voterCount, downvoted = false) => {
  if (!raw.length) return { votes: raw, len: 0 }

  // remove 0 percent votes, which means user removed vote
  const activeVotes = raw.filter(({ percent }) => Math.sign(percent) !== 0)

  // get count
  const len = activeVotes.length

  // now sort by vote weight
  const sortedVotes = activeVotes.sort((a, b) => Math.abs(parseInt(a.rshares)) > Math.abs(parseInt(b.rshares)) ? -1 : 1)

  // return only names with vote type: upvote/downvote
  let votes = sortedVotes.map(({ voter, percent }) => Math.sign(percent) > 0 ? `+ ${voter}` : `- ${voter}`)

  // trim according to length
  if (count < len) {
    votes = votes.slice(0, count)
    votes.push(`...and ${len - count} others`)
    // return { votes, len }
    return { votes, len: downvoted ? -len : len }
  } else {
    // return { votes, len }
    return { votes, len: downvoted ? -len : len }
  }
}

const formatPayout = (post, fix = 0) => {
  const pendingPayout = parseFloat(post.pending_payout_value)
  const totalPayout = parseFloat(post.total_payout_value)
  const curatorPayout = parseFloat(post.curator_payout_value)
  return +(totalPayout + pendingPayout + curatorPayout).toFixed(fix)
}

const format = { formatRep, formatPayout, formatVotes }

export {
  format as default, formatRep, formatPayout, formatVotes
}


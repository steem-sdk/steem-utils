
import { catchPostImage } from "@esteemapp/esteem-render-helpers"
import { voterCount } from "./constants"
import { argType } from "./helpers"

/**
 * @ignore
*/
function log10 (str) {
  const leadingDigits = parseInt(str.substring(0, 4))
  const log = Math.log(leadingDigits) / Math.LN10 + 0.00000001
  const n = str.length - 1
  return n + (log - parseInt(log))
}

/**
 *  Formats a Steem account's reputation
 *  @param {string} reputation Steem reputation value
 *  @returns {number} Formatted reputation value
 *
 *  @example
 *  let rep = formatRep(accountData.reputation)
 *  let rep = formatRep(post.author_reputation)
 *  console.log(accountData.reputation, rep)
 *  `"23049917997434", 64`
 */
const formatRep = reputation => {
  if (reputation == null) return reputation
  let rep = String(reputation)
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

/**
 *  Formats a Steem post's active votes
 *  Will sort out removed votes, and order by weight
 *  Will trim return array to specified or default `count` {@link voterCount}
 *  @param {(string[]|object)} raw Post's active_votes,
 *  @param {string} count The number of returned account names
 *  @param {string} downvoted ?
 *  @returns {object} {votes, len}: `votes` is the array of votes, length is length of the votes
 *
 *  @example
 *  let votes = formatVotes(postData.active_votes || postData)
 *  console.log(votes.votes)
 *  `
 *  ["+ therising", "+ upmewhale", "+ appreciator", "+ smartsteem", "+ rocky1", "+ buildawhale",
 *  "+ promobot", "+ jerrybanfield", "+ upmyvote""+ postpromoter", "...and 1741 others"]
 *  `
 */
const formatVotes = (raw = [], count = voterCount, downvoted = false) => {
  if (!raw.length && !raw.active_votes.length) return { votes: raw, len: 0 }

  const type = argType(raw)
  if (type === "object" && raw.active_votes) {
    raw = raw.active_votes
  } else if (type !== "array") {
    return { votes: raw, len: 0 }
  }

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

/**
 *  Formats a Steem post's payout, does not discriminate for pending or completed posts. Values are for SBD
 *  @param {object} post object
 *  @param {number} fix Number of decimal places to fix it to
 *  @returns {number} Post earned value in SBD
 *
 *  @example
 *  let payout = formatPayout(postData)
 */
const formatPayout = (post, fix = 2) => {
  if (argType(post) !== "object") return false

  const pendingPayout = parseFloat(post.pending_payout_value)
  const totalPayout = parseFloat(post.total_payout_value)
  const curatorPayout = parseFloat(post.curator_payout_value)

  return +((totalPayout + pendingPayout + curatorPayout).toFixed(fix))
}

/**
 *  Formats a Steem account's voting power using the manarbar data
 *  @param {object} account Steem account data, not account username
 *  @returns {number} Formatted voting power in percentage
 *
 *  @example
 *  let votingPower = formatVotingPower(accountData)
 */
function formatVotingPower (account) {
  if (argType(account) !== "object") return false

  const maxMana = formatVests(account) * 1000000

  const lastMana = parseInt(account.voting_manabar.current_mana)
  const lastUpdateTime = account.voting_manabar.last_update_time
  const lastUpdate = new Date(lastUpdateTime * 1000)
  const elapsed = (new Date().getTime() - lastUpdate.getTime()) / 1000

  let currentMana = lastMana + elapsed * (maxMana / 432000)

  if (currentMana > maxMana) {
    currentMana = maxMana
  }

  let currentManaPct = 0

  if (maxMana > 0) {
    currentManaPct = (currentMana / maxMana) * 100
  }

  return Math.round(currentManaPct)
}

/**
 *  Formats a Steem account's vests
 *  @param {object} account - Steem account's data, not username
 *  @returns {number} Formatted account vests value
 *
 *  @example
 *  let vests = formatVests(accountData)
 */
function formatVests (account) {
  if (argType(account) !== "object") return false

  return (parseFloat(account.vesting_shares) + parseFloat(account.received_vesting_shares)) -
   (parseFloat(account.delegated_vesting_shares) + parseFloat(account.vesting_withdraw_rate))
}

/**
 *  Extract the first image or potentially featured image for a post
 *  @param {(string|object)} data Post data object or post body string
 *  @returns {string} Returns the URL of first image for a post, meant to be used to extract featured images
 *
 *  @example
 *  let post_featured_image_url = formatImage(postData.body || postData)
 */
function formatImage (data) {
  const dataType = argType(data)
  if (dataType !== "object") {
    const jsonMetadata = JSON.parse(data.json_metadata || "{}")

    const image = jsonMetadata.image || jsonMetadata.images

    if (image) {
      const type = argType(image)
      if (type === "string") {
        return image
      } else if (type === "array") {
        return image[0]
      } else if (type === "object") {
        return image.url || image.featured || image.featured_image || image.featuredImage
      } else {
        return null
      }
    } else {
      const img = jsonMetadata.img || jsonMetadata.featured_image || jsonMetadata.featuredImage
      if (img && argType(img) === "string") {
        return img
      } else {
        return catchPostImage(data)
      }
    }
  } else if (dataType === "string") {
    return catchPostImage(data)
  }
}

const format = { formatRep, formatPayout, formatVotes, formatImage, formatVotingPower, formatVests }

export {
  format as default, formatRep, formatPayout, formatVotes, formatImage, formatVotingPower, formatVests
}


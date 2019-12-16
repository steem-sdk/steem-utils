
import { postBodySummary, renderPostBody } from "@esteemapp/esteem-render-helpers"

import { summaryCount } from "./constants"
import { formatPayout, formatRep, formatImage, formatVotingPower } from "./format"

/**
 *  Returns meta data from Steem post or account data
 *  @param {object} data Steem account or post data
 *  @param {object} config config for meta
 *  @returns {object} Returns object which contains meta data about the input account or post data.
 *  For `meta(accountData)` see {@link accountMeta} and for `meta(postData)` see {@link postMeta}
 *
 *  @example
 *  let metaData = meta(accountData || postData)
 *  console.log(metaData)
 */
const meta = (data, config = {}) => data.author ? postMeta(data, config) : accountMeta(data, config)

/**
 *  Returns meta data from Steem account data
 *  @param {object} data Steem account data
 *  @param {object} config config for meta
 *  @returns {object} Returns object which contains meta data about the input account data
 *
 *  @example
 *  let accountMetaData = accountMeta(accountData)
 *  console.log(accountMetaData)
 *  `
 *    // profile
 *    name: "...",
 *    about: "...",
 *    avatar: "..."
 *    username: "...",
 *    location: "...",
 *    reputation: "...",
 *
 *    // details
 *    id: "...",
 *    created: "...",
 *    proxy: "...",
 *    post_count: "...",
 *    voting_power: "...",
 *    can_vote: "...",
 *    mined: "...",
 *    recovery_account: "...",
 *    last_account_recovery: "...",
 *    reset_account: "...",
 *    comment_count: "...",
 *    lifetime_vote_count: "..."
 *    blockstack: "...",
 *    pending_claimed_accounts: "...",
 *
 *    // wallet
 *    steem: "...",
 *    sbd: "...",
 *    savings: "..."
 *  `
 */
const accountMeta = (data, config) => {
  const metadata = JSON.parse(data.json_metadata || "{}")
  const profile = metadata.profile || {}

  return {
    // profile
    name: profile.name,
    about: profile.about || profile.description || profile.bio,
    avatar: profile.profile_image,
    username: data.name,
    location: profile.location,
    reputation: formatRep(data.reputation),

    // details
    id: data.id,
    created: data.created,
    proxy: data.proxy,
    post_count: data.post_count,
    voting_power: formatVotingPower(data),
    can_vote: data.can_vote,
    mined: data.mined,
    recovery_account: data.recovery_account,
    last_account_recovery: data.last_account_recovery,
    reset_account: data.reset_account,
    comment_count: data.comment_count,
    lifetime_vote_count: data.lifetime_vote_count,
    blockstack: profile.blockstack,
    pending_claimed_accounts: data.pending_claimed_accounts,

    // wallet
    steem: data.balance,
    sbd: data.sbd_balance,
    savings: data.savings_balance
  }
}

/**
 *  Returns meta data from Steem post data
 *  @param {object} data Steem post data
 *  @param {object} config config for meta
 *  @returns {object} Returns object which contains meta data about the input post data
 *
 *  @example
 *  let postMetaData = postMeta(postData)
 *  console.log(postMetaData)
 *  `
 *    title: "...",
 *    summary: "..."
 *    payout: "...",
 *    image: "...",
 *    created: "...",
 *    comments_count: "...",
 *    votes_count: "..."
 *  `
 */
const postMeta = (data, config) => {
  data.body = renderPostBody(data)

  return {
    title: data.title,
    summary: postBodySummary(data, config.summaryCount || summaryCount),
    payout: formatPayout(data),
    image: formatImage(data.body),
    created: data.created,
    comments_count: data.children,
    votes_count: data.active_votes.length
  }
}

export {
  meta as default, accountMeta, postMeta
}

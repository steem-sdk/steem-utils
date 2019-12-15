
import { postBodySummary, renderPostBody } from "@esteemapp/esteem-render-helpers"

import { summaryCount } from "./constants"
import { formatPayout, formatRep, formatImage, formatVotingPower } from "./format"

const meta = (data, config = {}) => data.author ? post(data, config) : account(data, config)

const account = (acc, config) => {
  const metadata = JSON.parse(acc.json_metadata || "{}")
  const profile = metadata.profile || {}

  return {
    // profile
    name: profile.name,
    about: profile.about || profile.description || profile.bio,
    avatar: profile.profile_image,
    username: acc.name,
    location: profile.location,
    reputation: formatRep(acc.reputation),

    // details
    id: acc.id,
    created: acc.created,
    proxy: acc.proxy,
    post_count: acc.post_count,
    voting_power: formatVotingPower(acc),
    can_vote: acc.can_vote,
    mined: acc.mined,
    recovery_account: acc.recovery_account,
    last_account_recovery: acc.last_account_recovery,
    reset_account: acc.reset_account,
    comment_count: acc.comment_count,
    lifetime_vote_count: acc.lifetime_vote_count,
    blockstack: profile.blockstack,
    pending_claimed_accounts: acc.pending_claimed_accounts,

    // wallet
    steem: acc.balance,
    sbd: acc.sbd_balance,
    savings: acc.savings_balance
  }
}

const post = (data, config) => {
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
  meta as default, account, post
}

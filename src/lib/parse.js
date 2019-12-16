import { DefaultRenderer } from "steem-content-renderer"
import { postBodySummary, renderPostBody } from "@esteemapp/esteem-render-helpers"
import { rendererDefaults, summaryCount } from "./constants"
import { argType } from "./helpers"
import { formatRep, formatPayout, formatVotes, formatImage } from "./format"

/**
 *  Parses a Steem post object or array of Steem post body strings or objects
 *  @param {content} content Steem post data
 *  @param {object} config config for meta. The default is {@link rendererDefaults}
 *  @returns {object} Returns object which contains meta data about the input post data
 *  See {@link parsePost} for how single items are handled
 *  See {@link parsePosts} for how items in array are handled
 */
const parse = (content, config = {}) =>
  argType(content) === "array" ? parsePosts(content, config)
    : argType(content) === "object" && content.body ? parsePost(content, config) : null

/**
 *  Parses a Steem post object or body string
 *  @param {(object|string)} content Steem post data object or body string
 *  @param {object} options config for meta. The default is {@link rendererDefaults}
 *  @returns {(object|string)} Returns object or string of parsed body based on config options
 *
 *  @example
 *  let parsed = parse(postData, {meta: {all: true}})
 *  console.log(parsed)
 *  `
 *    image: "...",
 *    summary: "...",
 *    rep: "...",
 *    votes: "...",
 *    payout: "...",
 *    paid: "...",
 *    html: "...",
 *    ... // all other post object data variables remain untouched
 *  ` *

 *  @example
 *  let parsed = parse(postData)
 *  console.log(parsed)
 *  `
 *    html: "...",
 *    ... // all other post object data variables remain untouched
 *
 *  `
 *
 *  @example
 *  let parsed = parse(postData.body)
 *  console.log(parsed)
 *  `
 *    "...",
 *  `
 */
const parsePost = (content, options) => {
  const config = rendererDefaults(options)
  const renderer = new DefaultRenderer(config)

  const type = argType(content)

  if (type === "string") {
    return renderer.render(content)
  } else if (type === "object") {
    if (!options.meta) {
      if (content.body) return { ...content, html: renderer.render(content.body) }
      return null
    } else {
      const metaType = argType(options.meta)
      const meta = metaType === "object" ? options.meta : {}

      const sevenDays = 7 * 24 * 60 * 60 * 1000

      let body
      const defaultBody = content.body
      if (meta.summary) content.body = renderPostBody(content)

      if (meta.all || meta.image) content.image = formatImage(content.body)
      if (meta.all || meta.summary) content.summary = postBodySummary(content, config.summaryCount || summaryCount)
      if (meta.all || meta.rep) content.rep = formatRep(content.author_reputation)
      if (meta.all || meta.votes) content.votes = formatVotes(content)
      if (meta.all || meta.payout) content.payout = formatPayout(content)
      if (meta.all || meta.paid) content.paid = ((new Date()) - new Date(content.created)) > sevenDays

      content.body = defaultBody
      content.html = renderer.render(content.body)

      return content
    }
  } else {
    return null
  }
}

/**
 *  Parses multiple Steem post objects or body strings
 *  @param {array} content Array of Steem post data objects or body strings
 *  @param {object} options config for meta. The default is {@link rendererDefaults}
 *  @returns {array} Returns array of objects or strings of parsed body based on config options.
 *  See {@link parsePost} for how each single item in the array in handled
 *
 *  @example
 *  let parsed = await parse(postsData)
 */
const parsePosts = async (content, options) => {
  const promises = content.map(async post => {
    return parsePost(post, options)
  })

  const posts = await Promise.all(promises)
  return posts
}

export {
  parse as default, parsePost, parsePosts
}

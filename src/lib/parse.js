import { DefaultRenderer } from "steem-content-renderer"
import { rendererDefaults } from "./constants"
import { argType } from "./helpers"

const parsePost = (content, options) => {
  const config = rendererDefaults(options)
  const renderer = new DefaultRenderer(config)

  const type = argType(content)

  if (type === "string") {
    return renderer.render(content)
  } else if (type === "object") {
    if (content.body) return renderer.render(content.body)
  }
  return false
}

const parsePosts = async (content, options) => {
  const config = rendererDefaults(options)
  const renderer = new DefaultRenderer(config)

  const promises = content.map(async post => {
    const type = argType(post)

    if (type === "string") {
      return renderer.render(post)
    } else if (type === "object") {
      return renderer.render(content.body)
    }
  })

  const posts = await Promise.all(promises)
  return posts
}

const parse = { parsePost, parsePosts }

export {
  parse as default, parsePost, parsePosts
}

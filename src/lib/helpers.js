/**
 * @ignore
*/
export const argType = arg => {
  if (Array.isArray(arg)) {
    return "array"
  } else if (Object.prototype.toString.call(arg) === "[object Object]") {
    return "object"
  } else if (typeof arg.valueOf() === "string") {
    return "string"
  } else if (typeof arg.valueOf() === "number") {
    return "number"
  } else if (typeof arg.valueOf() === "boolean") {
    return "boolean"
  }
}

/**
 * @ignore
*/
export const retrieveVotes = votes => {
  if (!Array.isArray(votes) && !Object.prototype.toString.call(votes) === "[object Object]") {
    throw new Error("Invalid parameter")
  } else if (Object.prototype.toString.call(votes) === "[object Object]") {
    votes = votes.active_votes
    if (!Array.isArray(votes)) {
      throw new Error("Invalid parameter")
    }
  }
  return votes
}

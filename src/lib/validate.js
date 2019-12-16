
/**
 *  Validates a Steem account username
 *  @param {string} username Steem account username
 *  @returns {(string|boolean)} Returns error message if account is invalid or `true` if valid
 *
 *  @example
 *  let valid = validateAccount('la$tkiller')
 *  console.log(valid)
 *  `
 *    Invalid account
 *  `
 *  let valid = validateAccount('lastkiller')
 *  console.log(valid)
 *  `
 *    true
 *  `
 */
const validateAccount = username => {
  let i, label, len

  if (!username) {
    return "Account name should not be empty"
  }

  const length = username.length

  if (length < 3) {
    return "Account name should be at least 3 characters long"
  }
  if (length > 16) {
    return "Account name should be not be more than 16 characters"
  }

  const ref = username.split(".")

  for (i = 0, len = ref.length; i < len; i++) {
    label = ref[i]
    if (!/^[a-z]/.test(label)) {
      return "Invalid account"
    }
    if (!/^[a-z0-9-]*$/.test(label)) {
      return "Invalid account"
    }
    if (/--/.test(label)) {
      return "Invalid account"
    }
    if (!/[a-z0-9]$/.test(label)) {
      return "Invalid account"
    }
    if (!(label.length >= 3)) {
      return "Invalid account"
    }
  }
  return true
}

const validate = { validateAccount }

export {
  validate as default, validateAccount
}

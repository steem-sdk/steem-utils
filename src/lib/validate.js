
/**
* This validates account name
*/
const validateAccount = value => {
  let i, label, len

  if (!value) {
    return "Account name should not be empty"
  }

  const length = value.length

  if (length < 3) {
    return "Account name should be at least 3 characters long"
  }
  if (length > 16) {
    return "Account name should be not be more than 16 characters"
  }

  const ref = value.split(".")

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

function isPhone(value) {
  return /^[1][0-9]{10}$/.test(value)
}

function isNullOrUndef(value) {
  return Boolean(value) === false || JSON.stringify(value) === '{}' || JSON.stringify(value) === '[]'
}

function isNumeric(value) {
  return !Number.isNaN(Number(value))
}

function isJSON(jsonString) {
  try {
    jsonString = JSON.parse(jsonString)
  } catch (e) {
    return false
  }

  return typeof jsonString === 'object' && jsonString !== null
}

function isFunction(obj) {
  // Support: Chrome <=57, Firefox <=52
  // In some browsers, typeof returns "function" for HTML <object> elements
  // (i.e., `typeof document.createElement( "object" ) === "function"`).
  // We don't want to classify *any* DOM node as a function.
  return typeof obj === "function" && typeof obj.nodeType !== "number"
}

export default {
  isPhone,
  isNullOrUndef,
  isNumeric,
  isJSON,
  isFunction,
}

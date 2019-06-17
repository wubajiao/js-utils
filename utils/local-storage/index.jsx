import _ from 'lodash'

/**
   * [isJson description]
   * @param  {[type]}  str [description]
   * @return {Boolean}     [description]
   */
export function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

/**
   * [getLocalStorage description]
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
export function getLocalStorage(name) {
  let value;
  try {
    value = localStorage.getItem(name);
    if (isJson(value)) {
      value = JSON.parse(value)
    }
  } catch (e) {
    console.error(e.message);
    return false;
  }

  return value;
}

/**
 * [setLocalStorage description]
 * @param  {[type]} name  [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
export function setLocalStorage(name, value) {
  if (['undefined', 'object', 'string'].includes(typeof value) && _.isEmpty(value)) {
    deleteLocalStorage(name);
    return false;
  }

  if (typeof value == 'object') {
    value = JSON.stringify(value);
  }
  try {
    localStorage.setItem(name, value);
  } catch (e) {
    console.error(e.message);
    return false;
  }
  return true;
}

/**
   * [deleteLocalStorage description]
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
export function deleteLocalStorage(name) {
  try {
    localStorage.removeItem(name);
  } catch (e) {
    console.error(e.message);
    return false;
  }
  return true;
}

export default {
  getLocalStorage,
  setLocalStorage,
  deleteLocalStorage,
}

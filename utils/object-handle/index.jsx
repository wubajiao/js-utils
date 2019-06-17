/**
 * 获取对象key
 * @param  {list}  json 对象
 */
const getObjectKey = (list) => {
  let keys = [];
  for (let p in list) {
    if (list.hasOwnProperty(p))
      keys.push(p);
  }
  return keys
}

export default {
  getObjectKey,
}

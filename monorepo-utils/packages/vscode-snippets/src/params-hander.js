const { existsSync } = require('fs')
const { resolve } = require('path')
const handleParams = (snippetName, ...args) => {
  const map = {}
  const regName = /^--.*/g
  if (!snippetName || regName.test(snippetName)) {
    throw new Error('snippetName is required')
  }
  map.name = snippetName
  args.forEach(keyVal => {
    const [key, val] = keyVal.split('=')
    map[key.substring(2)] = val
    const reg = /^\//g
    // 如果路径是相对路径，则转换为绝对路径
    if (key && val && key === '--file' && !reg.test(val)) {
      map[key.substring(2)] = resolve(__dirname, val)
    }
  })
  if (!map.file) {
    throw new Error('file is required')
  }
  if (!existsSync(map.file)) {
    throw new Error('file is not exists')
  }
  return map
}

module.exports = handleParams

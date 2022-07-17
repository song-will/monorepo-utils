
const fs = require('fs')
const { resolve } = require('path')
const getVscodeDir = require('./path-hander')
const createSnippet = require('./create-snippets')


/**
 * 生成、写入文件
 * @param {*} params 
 */
module.exports = function (params) {
  const { name, isGlobal = false } = params
  const snippet = createSnippet(params)
  const vscodeDir = getVscodeDir(isGlobal)
  if (!fs.existsSync(vscodeDir)) {
    throw new Error(`目录${vscodeDir}不存在，请先创建`)
  }
  fs.writeFile(resolve(vscodeDir, `${name}.code-snippets`), snippet, (err) => { if (err) throw new Error(err) })
}



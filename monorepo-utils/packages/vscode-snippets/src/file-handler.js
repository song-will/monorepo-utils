
const fs = require('fs')
const { resolve } = require('path')
const getVscodeDir = require('./path-hander')

/**
 * 处理模版
 * @param {*} file 文件路径
 * @returns 字符串处理后的模版
 */
const tempalteHander = (file) => {
  let template = fs.readFileSync(file, {
    encoding: 'utf-8'
  }, err => {
    if (err) {
      throw new Error(err)
    }
  })
  templateArr = template.split('\n').map(item => `\t\t\t\"${item}\",\n`)
  template = `\[\n${templateArr.join('')}\t\t\]`
  return template
}
/**
 * 生成模板字符串
 * @param {*} paramsMap 
 */
const createSnippet = (params) => {
  let data = fs.readFileSync(resolve(__dirname, '..', 'base/source.json'), {
    encoding: 'utf-8'
  }, (err) => {
    if (err) {
      throw new Error(err)
    }
  })
  // 读取基本配置
  const baseConfig = fs.readFileSync(resolve(__dirname, '..', 'base/config.json'), { encoding: 'utf-8' }, err => {
    if (err) {
      throw new Error(err)
    }
  })
  const baseConfigObj = JSON.parse(baseConfig)
  const repalceArr = ['$scope', '$prefix', '$description']
  repalceArr.forEach(item => {
    const fieldName = item.replace('$', '')
    data = data.replace(item, params[fieldName] ? params[fieldName] : baseConfigObj[fieldName])
  })
  data = data.replace('[]', tempalteHander(params.file))
  return data
}

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



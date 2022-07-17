const fs = require('fs')
const { resolve } = require('path')
const tempalteHander = require('./template-hander')

/**
 * 生成模板字符串
 * @param {*} paramsMap 
 */
module.exports = (params) => {
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



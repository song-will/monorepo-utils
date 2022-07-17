const fs = require('fs')
/**
 * 处理模版
 * @param {*} file 文件路径
 * @returns 字符串处理后的模版
 */
module.exports = (file) => {
  let template = fs.readFileSync(file, {
    encoding: 'utf-8'
  }, err => {
    if (err) {
      throw new Error(err)
    }
  })
  template = template.replace(/"/g, '\\"')
  templateArr = template.split('\n').map(item => `\t\t\t\"${item}\",\n`)
  template = `\[\n${templateArr.join('')}\t\t\]`
  return template
}


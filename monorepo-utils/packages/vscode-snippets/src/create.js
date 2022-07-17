const handleParams = require('./params-hander')
const operateFile = require('./file-handler')

const create = (paramsMap) => {
  operateFile(paramsMap)
}


module.exports = (...args) => {
  const paramsMap = handleParams(...args)
  create(paramsMap)
}

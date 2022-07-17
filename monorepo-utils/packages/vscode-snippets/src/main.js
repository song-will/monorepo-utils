const program = require('commander')
const create = require('./create')
const { version } = require('../package.json')

program.command('create')
  .description('create a new snippet')
  .option('-s, --scope <scope>', '$scope of the snippet')
  .option('-p, --prefix <prefix>', '$prefix of the snippet')
  .option('-f, --file <file>', '$file of the snippet')
  .option('-d, --description <description>', '$discription of the snippet')
  .action(() => {
    create(...process.argv.slice(3))
  })
program.version(version).parse(process.argv)

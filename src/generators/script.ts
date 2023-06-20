import { GluegunToolbox } from 'gluegun'
import { Generator } from '../types'

export default (toolbox: GluegunToolbox) => <Generator>({
  async run () {
    toolbox.print.info('TESTINGZ')
  },
  description: 'Generate files for a script module.',
  help: 'You can use this however you want.',
})

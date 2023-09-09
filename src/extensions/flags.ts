import { GluegunToolbox } from 'gluegun'
import { FlagsExtension } from '../types'

module.exports = (toolbox: GluegunToolbox) => {
  const {
    parameters: { options }
  } = toolbox

  toolbox.flags = <FlagsExtension>{
    verbose: Boolean(options.V || options.verbose)
    // debug: Boolean(options.debug)
  }
}

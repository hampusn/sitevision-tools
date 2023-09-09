import { system, filesystem } from 'gluegun'
import { version } from '../package.json'

const src = filesystem.path(__dirname, '..')

const cli = async (cmd) =>
  system.run(
    'node ' + filesystem.path(src, 'bin', 'sitevision-tools') + ` ${cmd}`
  )

test('outputs version', async () => {
  const output = await cli('--version')
  expect(output).toContain(version)
})

test('outputs help', async () => {
  const output = await cli('--help')
  expect(output).toContain(version)
})

/* test('generates file', async () => {
  const output = await cli('generate foo')

  expect(output).toContain('Generated file at models/foo-model.ts')
  const foomodel = filesystem.read('models/foo-model.ts')

  expect(foomodel).toContain(`module.exports = {`)
  expect(foomodel).toContain(`name: 'foo'`)

  // cleanup artifact
  filesystem.remove('models')
})
 */

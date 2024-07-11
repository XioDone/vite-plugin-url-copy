import linter from '@antfu/eslint-config'
import xiodone from '@xiodone/eslint-config'

const config = linter(
  ...xiodone(),
)

export default config

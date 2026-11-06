import antfu from '@antfu/eslint-config'

export default antfu({
  // The Hairline kernel is vendored unchanged, and the figures follow the skill's own style.
  ignores: ['components/homelab/hairline/**'],
})

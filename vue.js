const { transform } = require('@babel/core');
const jestPreset = require('babel-preset-jest');
const { parse, compileTemplate, compileStyle } = require('@vue/compiler-sfc')

module.exports.process = function process(source) {
  const parsed = parse(source)
  const scriptTagContent = parsed.descriptor.script.content

  const templateTagContent = compileTemplate({
    source: parsed.descriptor.template.content,
    filename: 'hello.vue'
  })
  const babelify = (code) => transform(code, {
    filename: 'hello.vue',
    presets: [jestPreset]
  })

  const babelTemplate = babelify(templateTagContent.code).code
  const babelScript = babelify(scriptTagContent).code
  const code = babelScript + '\n' + babelTemplate
  console.log(code)
  return code
}

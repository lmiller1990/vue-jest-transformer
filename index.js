const { transform } = require('@babel/core')
const jestPreset = require('babel-preset-jest')
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

  let scriptTag = ''
  if (parsed.descriptor.script.lang === 'ts') {
    const typescript = require('typescript')
    scriptTag = typescript.transpileModule(scriptTagContent, {}).outputText
  } else {
    scriptTag = babelify(scriptTagContent).code
  }

  console.log(scriptTag)

  const code = babelify(
    templateTagContent.code + '\n' + scriptTag
  ).code + '\nexports.default = {..._default, render};'

  return code
}

const { parse, compileTemplate, compileStyle } = require('@vue/compiler-sfc')
const { transform } = require('@babel/core')
const jestPreset = require('babel-preset-jest')

module.exports.process = function process(source, filename) {
  const parsed = parse(source)
  const scriptTagContent = parsed.descriptor.script.content

  const templateTagContent = compileTemplate({
    source: parsed.descriptor.template.content,
    filename,
  })
  const babelify = (code) => transform(code, {
    filename,
    presets: [jestPreset]
  })

  if (parsed.descriptor.script.lang === 'ts') {
    const typescript = require('typescript')
    const scriptTag = typescript.transpileModule(scriptTagContent, {}).outputText
    // TODO: We should perform the transpile using the user's tsconfig.json
    const babeled = babelify(templateTagContent.code + scriptTag).code
    // ensure that the default export is the component with a render function 
    return babeled + ';exports.default = {...exports.default, render};'
  } 

  // if lang is undefined, assume it is regular ES6
  // TODO: use the user's babel.config.js?
  const babeled = babelify(templateTagContent.code + ';' + scriptTagContent).code
  // ensure that the default export is the component with a render function 
  return babeled + ';exports.default = {..._default, render};'
}

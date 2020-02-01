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
    const babeled = babelify(templateTagContent.code + scriptTag).code
    return babeled + ';exports.default = {...exports.default, render};'
  } 
  
  // if lang is undefined, assume it is regular ES6
  const scriptTag = babelify(scriptTagContent).code
  const babeled = babelify(templateTagContent.code + ';' + scriptTag.code).code
  return babeled + ';exports.default = {...exports.default, render};'
}

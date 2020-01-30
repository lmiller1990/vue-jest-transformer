module.exports.process = function process(source) {
  const lines = source.split('\n').filter(x => x.length > 1)
  console.log(lines)

  const result = lines.reduce((acc, curr) => {
    acc = acc += `"${curr}", `
    return acc
  }, '[')

  return result + ']'
}

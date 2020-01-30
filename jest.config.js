module.exports = {
  transform: {
    "^.+\\.vue$": "./vue.js",
    "^.+\\.txt$": "./transform.js",
    "^.+\\js$": "babel-jest"
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node']
}

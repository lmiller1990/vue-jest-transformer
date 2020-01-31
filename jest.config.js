module.exports = {
  transform: {
    "^.+\\.vue$": "./index.js",
    "^.+\\js$": "babel-jest"
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node']
}

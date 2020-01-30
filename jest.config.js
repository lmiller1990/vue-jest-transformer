module.exports = {
  transform: {
    "^.+\\.txt$": "./transform.js",
    "^.+\\js$": "babel-jest"
  }
}

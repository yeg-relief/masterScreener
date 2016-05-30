/*
  fairly brittle webpack configuration, but it get's the job done.
*/
module.exports = {
  context: __dirname + "/frontend",
  entry: "./app",
  output: {
    path: __dirname + "/static" +"/js",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['babel?cacheDirectory'],
        include: __dirname + "/app"
      }
    ]
  }
}

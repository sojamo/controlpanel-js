module.exports = {
  entry: {
    'dist/controlpanel':'./js/main.js',
    'test/libraries/controlpanel':'./js/main.js'
  }, /* './js/main.js', */
  output: {
    path: '../',
    filename: '[name].js'
    /* filename: '../dist/controlpanel.js', */
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ],
  },
  watch: true
};

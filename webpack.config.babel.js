const path = require("path");
module.exports = {
  entry: {
    index: './UI/resources/js/index.js',
    signUp: './UI/resources/js/signUP.js',
    addEntry: './UI/resources/js/addEntry.js',
    edit: './UI/resources/js/edit.js',
    login: './UI/resources/js/login.js',
    profile: './UI/resources/js/profile.js',
    view: './UI/resources/js/view.js',
    allEntries: './UI/resources/js/allEntries.js'
  },
  output: {
		path: path.join(__dirname, "UI/public/js"),
		filename: "[name].entry.js"
	},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env"]
          }
        }
      }
    ]
  }
};
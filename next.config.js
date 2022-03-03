const withPlugins = require("next-compose-plugins");
// const webpack = require("webpack");

module.exports = withPlugins([], {
  // webpack: (config) => {
  //   config.plugins.push(
  //     new webpack.ProvidePlugin({
  //       $: "jquery",
  //       jQuery: "jquery",
  //     })
  //   );
  //   return config;
  // },
});

// from: https://gist.github.com/Bjvanminnen/595d9fef3b1320d1f94632f8c2d323ef
const { edit, getPaths } = require("@rescripts/utilities");
const webpack = require("webpack");

const predicate = (valueToTest) => {
  return valueToTest.oneOf;
};

const transform = (match) => ({
  ...match,
  oneOf: [
    // Need to add as second-to-last to avoid being intercepted by the file-loader in CRA
    ...match.oneOf.slice(0, -1),
    {
      test: /\.(glsl|frag|vert)$/,
      exclude: [/node_modules/],
      use: ["raw-loader", "glslify-loader"],
    },
    ...match.oneOf.slice(-1),
  ],
});

function rescriptGlslifyPlugin() {
  return (config) => {
    const matchingPaths = getPaths(predicate, config);
    return edit(transform, matchingPaths, config);
  };
}

module.exports = [
  [rescriptGlslifyPlugin],
  (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          crypto: false,
          stream: require.resolve("stream-browserify"),
          assert: false,
          util: false,
          url: false,
          http: false,
          https: false,
          os: false,
          buffer: require.resolve("buffer/"),
        },
      },
      plugins: [
        ...config.plugins,
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
        }),
      ],
    };
  },
];

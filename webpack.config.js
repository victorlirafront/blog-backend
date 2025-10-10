module.exports = function (options) {
  return {
    ...options,
    watchOptions: {
      poll: 1000, // Check for changes every second
      aggregateTimeout: 300, // Delay before rebuilding
      ignored: /node_modules/,
    },
  };
};

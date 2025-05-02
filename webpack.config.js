import path from "path";
import webpack from 'webpack';

module.exports = {
    // ... other webpack configurations
    resolve: {
      fallback: {
        "crypto": require.resolve("crypto-browserify"),
        "buffer": require.resolve({"buffer": false})
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      })
    ]
    // ... other webpack configurations
  };
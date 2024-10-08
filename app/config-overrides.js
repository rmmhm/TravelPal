// const { override, overrideDevServer } = require('customize-cra');

// const devServerConfig = () => config => {
//   config.allowedHosts = ['localhost'];
//   config.proxy = {
//     '/api': {
//       target: 'http://localhost:8080',
//       changeOrigin: true,
//     },
//   };
//   return config;
// };

// module.exports = {
//   webpack: override(),
//   devServer: overrideDevServer(devServerConfig())
// };
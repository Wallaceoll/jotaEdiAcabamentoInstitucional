const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyPlugin = require('copy-webpack-plugin');

const notGitkeep = (file) => !file.endsWith('.gitkeep');

// Site estático multipágina: o build apenas copia os arquivos para /dist.
module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: '*.html', to: '[name][ext]' },
        { from: 'img', to: 'img', filter: notGitkeep },
        { from: 'css', to: 'css' },
        { from: 'js', to: 'js', filter: (file) => notGitkeep(file) && !file.endsWith('app.js') },
        { from: 'favicon.ico', to: 'favicon.ico' },
        { from: 'icon.png', to: 'icon.png' },
        { from: 'icon-512.png', to: 'icon-512.png' },
        { from: 'apple-touch-icon.png', to: 'apple-touch-icon.png' },
        { from: 'robots.txt', to: 'robots.txt' },
        { from: 'site.webmanifest', to: 'site.webmanifest' },
      ],
    }),
  ],
});

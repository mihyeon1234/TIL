const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#FFDA4F',
              '@text-selection-bg': '#ffeba1',
              '@text-color-inverse': '#000000',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

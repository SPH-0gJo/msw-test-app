const { CracoAliasPlugin } = require("react-app-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {},
    },
  ],
  jest: {
    configure: (jestConfig, { env, paths, resolve, rootDir }) => {
      return {
        ...jestConfig,
        setupFiles: [`${rootDir}/src/jest.polyfills.ts`], //TextEncoder 문제... 
      };
    },
  },
};

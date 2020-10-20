module.exports = function ({ env }) {
  return {
    webpack: {
      configure: (webpackConfig, { env, paths }) => {
        webpackConfig.target = "electron-renderer";
        webpackConfig.externals = {
          sqlite3: "commonjs sqlite3",
          knex: "commonjs knex",
          bcryptjs: "commonjs bcryptjs",
          serialport: "commonjs serialport",
          "puppeteer-core": "commonjs puppeteer-core",
        };
        return webpackConfig;
      },
    },
  };
};

/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1585656466354_1215';

    // add your middleware config here
    config.middleware = [];

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };
    config.jwt = {
        secret: "ylw"//自定义 token 的加密条件字符串
    };
    config.mongoose = {
        client: {
            url: 'mongodb://root:123456@127.0.0.1:27017/admin',
            options: {},
        }

    };
    exports.security = {
        csrf: {
            enable: false,
        },
        domainWhiteList: ['http://localhost:8080']
    };
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };
    return {
        ...config,
        ...userConfig,
    };
};

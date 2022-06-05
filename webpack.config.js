const path = require("path");
const BundleTracker = require('webpack-bundle-tracker');

module.exports = (config, options, targetOptions) => 
{
    let isDevMode = (config.mode === "development");
    let isDevServerMode = config.watch;
    let _path = path.resolve("./bundles/");
    let _publicPath = "/public/web/angular-app" + (isDevMode ? "/bundles/" : "/dist/");
    let pathToConfig = '../scada/public/web/angular-app/config/';

    if(!isDevServerMode)
    {
        if(isDevMode) // Если компиляция в режиме dev
        {
            config.plugins.push(new BundleTracker({filename: `${ pathToConfig }webpack-stats.json`}));
        } else
            if(!isDevMode) // Если компиляция в режиме prod
            {
                config.plugins.push(new BundleTracker({filename: `${ pathToConfig }webpack-stats-prod.json`}));
                _path = require('path').resolve("./dist/");
            }
        config.context = __dirname;
        config.output = {
            path: _path,
            filename: "[name]-[fullhash].js",
            publicPath: _publicPath
        }
    }
    return config;
};
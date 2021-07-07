const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const BUILD_DIR = 'src';
const OUTPUT_PATH = path.resolve(__dirname, BUILD_DIR);

module.exports = (env, options) => {
    const PROD = ((env && env.NODE_ENV) || options.mode) === 'production';
    const mode = PROD ? 'production' : 'development';

    const entry = {
        react_hot_loader: 'react-hot-loader/patch',
        react_app: './src/index.tsx',
    };

    const devTool = PROD
        ? {}
        : {
              // https://webpack.js.org/plugins/source-map-dev-tool-plugin/
              devtool: false,
          };

    const watchOptions = PROD
        ? {}
        : {
              watchOptions: {
                  poll: 1000,
              },
          };

    const customScriptPath = !!process.env.QUERYBOOK_PLUGIN
        ? path.resolve(
              process.env.QUERYBOOK_PLUGIN,
              './webpage_plugin/custom_script.ts'
          )
        : null;
    if (customScriptPath != null && fs.existsSync(customScriptPath)) {
        entry.custom = customScriptPath;
    }

    const appName = process.env.QUERYBOOK_APPNAME || 'Querybook';
    const devServer = {};

    return {
        entry,
        mode,

        devServer,

        output: {
            filename: '[name].[fullhash].js',
            path: OUTPUT_PATH,
            publicPath: '/build/',
            clean: true,
        },

        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.

            extensions: ['.ts', '.tsx', '.js', '.json', '.scss`'],

            // emulate baseUrl + paths behavior in tsConfig until tsconfig path plugin is fixed
            modules: [
                path.resolve(__dirname, './src/'),
                'node_modules',
            ],
            alias: {
                config: path.resolve(__dirname, './src/config/'),
                ...(PROD
                    ? {}
                    : {
                          'react-dom': '@hot-loader/react-dom',
                      }),
            },
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            envName: mode,
                        },
                    },
                    exclude: [/[\\/]node_modules[\\/]/],
                },
                {
                    test: /\.(css|sass|scss)$/,
                    use: [
                        PROD ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    ident: 'postcss',
                                    plugins: [
                                        [
                                            'postcss-preset-env',
                                            {
                                                // Options for Postcss-Present-env
                                            },
                                        ],
                                    ],
                                },
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    includePaths: ['node_modules'],
                                },
                            },
                        },
                    ],
                },

                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                {
                    test: /\.tsx?$/,
                    enforce: 'pre',
                    loader: 'source-map-loader',
                    exclude: [/[\\/]node_modules[\\/]/],
                },

                {
                    test: /\.ya?ml$/,
                    include: path.resolve(__dirname, 'src/config'),
                    use: ['json-loader', 'yaml-loader'],
                },
            ],
        },

        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
            },
        },

        ...devTool,
        ...watchOptions,

        plugins: [
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({
                __VERSION__: JSON.stringify(require('./package.json').version),
                __APPNAME__: JSON.stringify(appName),
            }),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash:4].css',
            }),
            new HtmlWebpackPlugin({
                title: appName,
                template: './public/index.html',
                chunks: ['react_hot_loader']
                    .concat(entry.custom ? ['custom'] : [])
                    .concat(['react_app']),
                chunksSortMode: 'manual',
            }),
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map[query]',
                exclude: [/vendor/],
            }),
        ],
    };
};

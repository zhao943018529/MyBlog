const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

module.exports = {
	context: __dirname,
	devtool: 'source-map',
	entry: {
		app: './src/index'
	},
	output: {
		publicPath: '/',
		path: path.join(__dirname + '/dist'),
		filename: 'js/[name].[hash].js',
		chunkFilename: 'js/[name].[chunkhash].js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				query: {
					presets: [
						['env', {
							"modules": false
						}], 'react', 'stage-0'
					],
					plugins: ['transform-runtime']
				}
			}
		}, {
			test: /\.(css|sass|scss|less)$/,
			use: [{
				loader: "style-loader"
			}, {
				loader: "css-loader"
			}, {
				loader: 'postcss-loader',
				options: {
					plugins: function() {
						return [
							require('precss'),
							require('autoprefixer')
						];
					}
				}
			}, {
				loader: "sass-loader"
			}]
		}, {
			test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'css/fonts/'
				}
			}]
		}]
	},
	resolve:{
		alias:{
			root:path.resolve(__dirname,'src'),
			mydraft:path.resolve(__dirname,'src/components/MyDraft'),
			controls:path.resolve(__dirname,'src/components'),
			reducers:path.resolve(__dirname,'src/reducers'),
		}
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'commons',
			filename: 'commons.js'
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src/index.html'),
			hash: false,
			filename: './index.html',
			inject: 'body'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 3000,
		inline: true,
		hot: true,
		publicPath: 'dist',
		historyApiFallback: true
	}
}
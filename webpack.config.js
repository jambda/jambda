const path = require('path')
const nodeExternals = require('webpack-node-externals')
const slsw = require('serverless-webpack')

module.exports = {
	entry: slsw.lib.entries,
	target: 'node',
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					'imports-loader?graphql',
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015']
						}
					},
					{
						test: /\.js$/,
						exclude: /node_modules/,
						use: ['eslint-loader']
					}
				]
			}
		]
	},
	output: {
		libraryTarget: 'commonjs',
		path: path.join(__dirname, 'dist'),
		filename: '[name].js'
	}
}

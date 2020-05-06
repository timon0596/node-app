const gulp = require('gulp')
const sass = require('gulp-sass')
const conc = require('gulp-concat')
const pref = require('gulp-autoprefixer')
const wpkstr = require('webpack-stream')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const WebpackConfig = {
	entry: {
		"client": ['babel-polyfill', './app/client/client.js']
	},
		output: {
			filename: '[name].bundle.js'
		},
		mode: 'development',
		devtool: 'eval-source-map',
		module:{
			rules: [
				{
			        test: /\.css$/,
			        use: [
			          'vue-style-loader',
			          'css-loader'
			        ]
			    },
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				},
				{
					test: /\.vue$/,
					exclude: /node_modules/,
					loader: 'vue-loader',
					options: {
						loaders: {
						            css: ExtractTextPlugin.extract({
						              use: 'css-loader'
						            })
						          }
					}
				},
		       	{
				  test: /\.(jpe?g|png|svg)$/i,
				  use:[ {
				    loader: "file-loader",
				    options: {
				      name: "[name].[ext]",
				      outputPath: '../imgs/',
				      useRelativePath: true
				  }}],
				}
			]
		},
		optimization: {
			splitChunks:{
				cacheGroups:{
					vendor: {
						name: 'vendor',
						test: /node_modules/,
						chunks: 'all',
						enforce: true
					}
				}
			}
		},
		plugins: [
		    new webpack.ProvidePlugin({
		      $: 'jquery',
		      jQuery: 'jquery'
		    }),
		    new VueLoaderPlugin(),
		    new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        })
  		]
	}
gulp.task('sass',()=>{
	return gulp.src('./sass/*.sass')
		.pipe(conc('all.sass'))
		.pipe(sass())
		.pipe(pref())
        .pipe(gulp.dest('app'))
})
gulp.task('js',()=>{
	return gulp.src('./app/**/*.js').pipe(wpkstr(WebpackConfig,webpack)).pipe(gulp.dest('app'))
})
gulp.task('watch',gulp.series('js',()=>{
	gulp.watch(['./sass/**/*.sass'],gulp.series('sass'))
	gulp.watch(['./app/all.js','./app/**/*.js','./app/**/*.vue'],gulp.series('js'))
}))


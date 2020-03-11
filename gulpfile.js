const gulp = require('gulp')
const sass = require('gulp-sass')
const conc = require('gulp-concat')
const pref = require('gulp-autoprefixer')
const wpkstr = require('webpack-stream')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
gulp.task('sass',()=>{
	return gulp.src('./sass/*.sass')
		.pipe(conc('all.sass'))
		.pipe(sass())
		.pipe(pref())
        .pipe(gulp.dest('app'))
})
gulp.task('js',()=>{
	return gulp.src('./app/all.js').pipe(wpkstr({
		output: {
			filename: 'bundle.js'
		},
		mode: 'production',
		module:{
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modeles/,
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				},
				{
					test: /\.vue$/,
					exclude: /node_modeles/,
					loader: 'vue-loader'
				}
			]
		},
		plugins: [
		    new webpack.ProvidePlugin({
		      $: 'jquery',
		      jQuery: 'jquery'
		    }),
		    new VueLoaderPlugin()
  		]
	})).pipe(gulp.dest('app'))
})
gulp.task('watch',gulp.series('js',()=>{
	gulp.watch(['./sass/**/*.sass'],gulp.series('sass'))
	gulp.watch(['./app/all.js','./app/js/**/*.js','./app/**/*.vue'],gulp.series('js'))
}))


const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const wpk = require('webpack-stream');
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

gulp.task('sass', function() {
	return gulp.src("dev/sass/*.sass")
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest("dist/css"))
});
gulp.task('concat', function() {
	return gulp.src("dist/css/*.css")
	.pipe(concat("all.css"))
	.pipe(gulp.dest("dist/"))
});
gulp.task('wpk', function() {
	return gulp.src("dist/vue.js")
	.pipe(wpk({
		output: {
			filename: 'bundle.js'
		},
		module:{
			rules:[
				{
					test:/\.js$/,
					loader: 'babel-loader',
					exclude: '/node_modules/'
				},
				{
					test:/\.html$/,
					loader: 'html-loader',
					exclude: '/node_modules/'
				},
				{
					test:/\.vue$/,
					loader: 'vue-loader',
					options: {
						loaders: {}
					}
				}
			]
		},
		mode: 'production',
	plugins:[
	new VueLoaderPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		})	
	]
	}))
	.pipe(gulp.dest("dist/"))
});
gulp.task('pref', function() {
	return gulp.src('dist/all.css')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
});
gulp.task('watch', () => {
  gulp.watch(['dev/sass/*.sass'], gulp.series('sass','concat','pref'));
  gulp.watch(['dev/js/*.js','dist/vue.js'], gulp.series('wpk'));
});

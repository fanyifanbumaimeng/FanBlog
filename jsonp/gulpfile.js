/**
 * Created by fanyifan1 on 2016/7/7.
 */

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('concat', function () {
	gulp.src('jsonp/jsonp.js')
		.pipe($.concat('jsonp.js'))//指定合并后的文件名
		.pipe(gulp.dest('./jsonp/js'))
		.pipe($.uglify())
		.pipe($.rename(function (path) {//是原来的路径
			//path.dirname += "/ciao";//表示文件所在的目录
			path.basename += ".min";//文件名
			//path.extname = ".md"//文件扩展名
		}))
		.pipe(gulp.dest('./jsonp/js'))
});

gulp.task('concatcss', function () {
	gulp.src('')
		.pipe($.concat('index.css'))//指定合并后的文件名
		.pipe(gulp.dest('./blog/css'))
		.pipe($.minifyCss())
		.pipe($.rename(function (path) {//是原来的路径
			//path.dirname += "/ciao";//表示文件所在的目录
			path.basename += ".min";//文件名
			//path.extname = ".md"//文件扩展名
		}))
		.pipe(gulp.dest('./blog/css'))
});


gulp.task('minifyHtml', function () {
	gulp.src('index.html')
		.pipe($.minifyHtml())
		.pipe(gulp.dest('./blog'));
});


gulp.task('copyimages', function () {
	return gulp.src('img/*.jpg')//指定要压缩的图片
		.pipe($.imagemin()) //进行图片压缩
		.pipe(gulp.dest('blog/img'));//输出目的地
});

gulp.task('copyimages2', function () {
	return gulp.src('img/projectImages/*{.jpg,.png}')//指定要压缩的图片
		.pipe($.imagemin()) //进行图片压缩
		.pipe(gulp.dest('blog/img/projectImages'));//输出目的地
});

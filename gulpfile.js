var gulp = require('gulp')
var runSequence = require('run-sequence')
var connect = require('gulp-connect') //构建本地web服务器
var less = require('gulp-less') //less编译
var sourcemaps = require('gulp-sourcemaps')
var cssmin = require('gulp-clean-css') //css压缩
var uglify = require('gulp-uglify') //js压缩
var concat = require('gulp-concat') //文件合并
var rename = require('gulp-rename') //文件更名
var webpack = require("gulp-webpack")

var dir = './admin/'

var webpackConfig = require(dir + 'webpack.config.js')

gulp.task("webpack", function () {
    return gulp.src(dir + 'app.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(dir + 'dist/'))
        .pipe(connect.reload())
})

gulp.task('min-css', function () {
    gulp.src(dir + 'dist/style.css')
        .pipe(cssmin({
            compatibility: 'ie7' //兼容IE7及以下需设置compatibility属性
        }))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(dir + 'dist/'))
})

gulp.task('min-js', function () {
    return gulp.src([dir + 'dist/app.js'])
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(dir + 'dist'))
})

gulp.task('less', function () {
    gulp.src(dir + 'less/style.less')
        // .pipe(sourcemaps.init())
        .pipe(less())
        // .pipe(sourcemaps.write())
        .pipe(rename('style.map.css'))
        .pipe(gulp.dest(dir + 'dist/'))
        .pipe(cssmin({
            compatibility: 'ie7' //兼容IE7及以下需设置compatibility属性
        }))
        .pipe(rename('style.map.min.css'))
        .pipe(gulp.dest(dir + 'dist/'))
        .pipe(connect.reload())
})

gulp.task('web', function (cb) {
    runSequence('webpack', 'less', ['min-css', 'min-js'], cb);
});

gulp.task('connect', function () {
    connect.server({
        port: 8887,
        livereload: true
    })
})

gulp.task('watch', function () {
    gulp.watch([dir + 'less/*.less'], ['less'])
    gulp.watch([dir + 'app.js', dir + 'pages/*.js', dir + 'components/**/*.js'], ['webpack'])
})

gulp.task('default', ['connect', 'watch'])

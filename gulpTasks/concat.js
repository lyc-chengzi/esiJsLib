/**
 * Created by liuyc14 on 2016/6/7.
 * concat任务，将公共组件打包成一个文件
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var pathConfig = myGulpConfig.pathConfig;
gulp.task('concat', ['clean'], function () {
    var stream =
        gulp
            .src([
                pathConfig.srcPath + '/esijs/core/esiCore.js',
                pathConfig.srcPath + '/esijs/plugins/esiPluginBase.js',
                pathConfig.srcPath + '/esijs/plugins/**/jquery.esi.plugins*.js',
            ])
            .pipe(concat('esi.js'))
            .pipe(gulp.dest(pathConfig.distPath + '/commonjs/'));
    if (global.runENV === myGulpConfig.__env__.product) {
        stream
            .pipe(uglify())
            .pipe(rename('esi.min.js'))
            .pipe(gulp.dest(pathConfig.distPath + '/commonjs/'));
    }
    return stream;
});
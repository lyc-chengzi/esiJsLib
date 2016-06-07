/**
 * Created by liuyc14 on 2016/6/7.
 * clean任务，清空发布文件夹下的内容
 */
var gulp = require('gulp');
var rimraf = require('rimraf');

gulp.task('clean', function (cb) {
    rimraf(myGulpConfig.pathConfig.distPath, cb);
});
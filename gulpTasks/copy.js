/**
 * Created by liuyc14 on 2016/6/7.
 * copy common js lib to lib folder
 * copy任务，将第三方利库拷贝到相应的文件夹下=> lib文件夹
 */

var gulp = require('gulp');
var copyConfig = myGulpConfig.copyConfig;
var pathConfig = myGulpConfig.pathConfig;

gulp.task('copy', ['clean'], function () {
    for (libName in copyConfig) {
        gulp
            .src(copyConfig[libName])
            .pipe(gulp.dest(pathConfig.distPath + "/lib/" + libName));
    }
});
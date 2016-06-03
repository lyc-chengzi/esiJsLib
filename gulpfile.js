/**
 * Created by liuyc14 on 2016/6/3.
 */
var gulp = require('gulp');
var pathConfig = {
    distPath: 'gulpdist',
    srcPath: 'JavascriptLibrary/Scripts'
};

gulp.task('oneee', function () {
    console.log('run the task: one');
    var s = 10;
    setTimeout(function () {
        for(var i = 0; i < 1000000000; i++){
            s = (s + i) * 2;
        }
        console.log('task one is end:' + s);
    }, 1);
});

/* 保证执行顺序方法一：使用回调函数cb
gulp.task('one', function (cb) {
    console.log('run the task: one');
    var s = 10;
    setTimeout(function () {
        for(var i = 0; i < 1000000000; i++){
            s = (s + i) * 2;
        }
        console.log('task one is end:' + s);
        cb();
    }, 1);
});
*/


/* 保证执行顺序方法二：如果是访问文件时，返回stream
 gulp.task('oneee', function () {
 var stream = gulp.src('client*.js')
    .pipe(minify())
    .pipe(gulp.dest('build'));
    return stream;
 });
 */

/*
*
*方法三， 返回promise对象
*
* var Q = require('q');

 gulp.task('somename', function() {
 var deferred = Q.defer();

 // 执行异步的操作
 setTimeout(function() {
 deferred.resolve();
 }, 1);

 return deferred.promise;
 });
* */

gulp.task('two',['one'], function (cb) {
    console.log('run the task: two');
    gulp
        .src(pathConfig.srcPath + '/esijs/**/*.js')
        .pipe(gulp.dest(pathConfig.distPath + '/alljs'));
    cb();
})

gulp.task('default', ['one', 'two']);//会按照one、two的顺序执行task

/*
因为oneee没有cb回调函数，所以会同时执行两个任务，
所以如果有异步任务的时候要注意使用毁掉函数来保证执行顺序
gulp.task('default', ['oneee', 'two']);*/

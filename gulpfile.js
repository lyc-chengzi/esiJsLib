/**
 * Created by liuyc14 on 2016/6/3.
 */
var gulp = require('gulp');
var argv = require('yargs').argv;
var rdir = require('require-dir');

/**
 * gulp配置
 */
global.myGulpConfig = {
    //当前运行环境
    __env__:{
        dev: 'dev',
        product: 'product'
    },
    pathConfig: {
        distPath: 'gulpdist',
        srcPath: 'JavascriptLibrary/Scripts'
    }
};
myGulpConfig.copyConfig = {
    jquery: myGulpConfig.pathConfig.srcPath + '/esijs/jquery-*.min.js'
};
var env = myGulpConfig.__env__;
/**
 * 获取当前输入的参数
 */
global.runENV = argv.env || process.env.NODE_ENV || env.dev;

//获取任务列表
var dir = rdir("./gulpTasks");

gulp.task(env.dev, ['clean', 'copy', 'concat']);
gulp.task(env.product, ['clean', 'copy', 'concat']);

var watcher = gulp.watch(myGulpConfig.pathConfig.srcPath + "/**/*.js", ['default']);
watcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

if (global.runENV === env.dev) {
    gulp.task('default', [env.dev]);
} else {
    gulp.task('default', [env.product]);
}


/*
gulp.task('oneee', function () {
    console.log('run the task: one');
    var s = 10;
    setTimeout(function () {
        for (var i = 0; i < 1000000000; i++) {
            s = (s + i) * 2;
        }
        console.log('task one is end:' + s);
    }, 1);
});
*/

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

gulp.task('two', ['one'], function (cb) {
    console.log('run the task: two');
    gulp
        .src(pathConfig.srcPath + '/esijs/**/*.js')
        .pipe(gulp.dest(pathConfig.distPath + '/alljs'));
    cb();
})

//gulp.task('default', ['one', 'two']);//会按照one、two的顺序执行task

/*
 因为oneee没有cb回调函数，所以会同时执行两个任务，
 所以如果有异步任务的时候要注意使用毁掉函数来保证执行顺序
 gulp.task('default', ['oneee', 'two']);*/


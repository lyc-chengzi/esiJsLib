/**
 * Created by liuyc14 on 2016/6/3.
 */
var gulp = require('gulp');
var argv = require('yargs').argv;
var rimraf = require('rimraf');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename')

/**
 * 当前运行环境
 */
var env = {
    dev: 'dev',
    product: 'product'
};
/**
 * 路径配置
 */
var pathConfig = {
    distPath: 'gulpdist',
    srcPath: 'JavascriptLibrary/Scripts'
};

var copyConfig = {
    jquery: pathConfig.srcPath + '/esijs/jquery-*.min.js'
};


global.runENV = argv.env || process.env.NODE_ENV || env.dev;

/**
 * clean任务，清空发布文件夹下的内容
 */
gulp.task('clean', function (cb) {
    rimraf(pathConfig.distPath, cb);
});

/**
 * copy任务，将第三方利库拷贝到相应的文件夹下
 */
gulp.task('copy', ['clean'], function () {
    for (libName in copyConfig) {
        gulp
            .src(copyConfig[libName])
            .pipe(gulp.dest(pathConfig.distPath + "/lib/" + libName));
    }
});

/**
 * concat任务，将公共组件打包成一个文件
 */
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
    if(global.runENV === env.product) {
        stream
            .pipe(uglify())
            .pipe(rename('esi.min.js'))
            .pipe(gulp.dest(pathConfig.distPath + '/commonjs/'));
    }
    return stream;
});

gulp.task(env.dev, function () {
    gulp.run(['clean', 'copy', 'concat']);
});

gulp.task(env.product, function () {
    global.runENV = env.product;
    gulp.run(['clean', 'copy', 'concat']);
});

if (global.runENV === env.dev) {
    gulp.task('default', [env.dev]);
} else {
    gulp.task('default', [env.product]);
}


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


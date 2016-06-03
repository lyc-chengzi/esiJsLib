/**
 * Created by liuyc14 on 2016/6/3.
 */
module.exports = function (grunt) {
    grunt.log.ok('this grunt argv has:[env, product, module]');
    grunt.log.ok('env default is \'dev\']');
    grunt.log.ok('product default is \'lenovo\']');
    grunt.log.ok('module default is \'home\']');


    var env = grunt.option('env');
    if(!env){
        grunt.log.error('the argument -> env , must be input!');
        return;
    }
    grunt.log.ok(env);

    var product = grunt.option('product') || 'lenovo';
    grunt.log.ok(product);

    var module = grunt.option('module') || 'productList';
    grunt.log.ok(module);
    grunt.initConfig({
        pathConfig: {
            distPath: 'dist',
            srcPath: 'JavascriptLibrary/Scripts'
        },
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: {
                src: ['<%= pathConfig.distPath %>/lib', '<%= pathConfig.distPath %>/pagejs']
            }
        },
        concat: {
            options: {
                //文件内容的分隔符
                separator: ';'
            },
            dist: {
                src: ['<%= pathConfig.srcPath %>/esijs/core/esiCore.js', '<%= pathConfig.srcPath %>/esijs/plugins/esiPluginBase.js', '<%= pathConfig.srcPath %>/esijs/plugins/**/jquery.esi.plugins.*.js'],
                dest: '<%= pathConfig.distPath %>/pagejs/esi-plugin.js'
            }
        },
        copy: {
            main: {
                files: [
                    {
                        src: ['<%= pathConfig.srcPath %>/esijs/jquery-*.min.js'],
                        dest: '<%= pathConfig.distPath %>/lib/'
                    }
                ]
            }
        },
        uglify: {
            options: {
                banner: '/*! lyc <%= grunt.template.today("yyyy-mm-dd") %> */\n'//添加banner
            },
            builda: {//任务一：压缩a.js，不混淆变量名，保留注释，添加banner和footer
                options: {
                    mangle: false, //不混淆变量名
                    preserveComments: 'all', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                    footer: '\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'//添加footer
                },
                files: {
                    '<%= pathConfig.distPath %>/pagejs/esi-plugin.min.js': ['<%= pathConfig.distPath %>/pagejs/esi-plugin.js']
                }
            },
            buildb: {//任务二：压缩b.js，输出压缩信息
                options: {
                    report: "min"//输出压缩率，可选的值有 false(不输出信息)，gzip
                },
                files: {
                    '<%= pathConfig.distPath %>/pagejs/esi-pluginb.min.js': ['<%= pathConfig.distPath %>/pagejs/esi-plugin.js']
                }
            },
            buildall: {//任务三：按原文件结构压缩js文件夹内所有JS文件
                files: [{
                    expand: true,
                    cwd: '<%= pathConfig.distPath %>/pagejs',//js目录下
                    src: '**/*.js',//所有js文件
                    dest: '<%= pathConfig.distPath %>/pagejs/dist'//输出到此目录下
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['clean', 'copy', 'concat', 'uglify:buildall']);
};
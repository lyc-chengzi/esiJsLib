
/*
 *title:        示例
 *description:  esi模块定义模板
 *author:       lyc
 *create date:  2015-12-16 14:51:28

 *dependencies: [esiCore.js, esiPluginBase.js]
 **/
(function (root, $jquery, factory) {
    //如果使用requirejs
    if (typeof define === "function" && define.amd) {
        define("esiCore", ['jquery'], function ($) {
            return factory($);
        });
    }
    else {
        root.templete = factory($jquery);
    }
})(window, window.jQuery, function ($) {
    var templete = {};

    return templete;
});



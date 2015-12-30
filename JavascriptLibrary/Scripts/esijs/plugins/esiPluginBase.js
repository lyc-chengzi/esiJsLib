/*
 *description:  esi插件父类
 *author:       lyc
 *create date:  2015-12-16 14:51:28

 *dependencies: [jquery, esiCore.js, ]
 **/
(function ($, $esi, factory) {
    if (typeof define === "function" && define.amd) {
        define(['jquery', 'esijs/core/esiCore'], function (jq, esi) {
            return factory(jq, esi);
        });
    } else {
        factory($, $esi);
    }

}(window.jQuery, window.ESIObject, function ($, $esi) {
    function esiPluginBase() {
        //插件id键
        this.pluginIDKey = "";
        //插件ID
        this.pluginID = 0;
        //初始化时对应的jquery对象
        this.jQueryObj = null;
    }


    esiPluginBase.prototype = {
        constructor: esiPluginBase,
        //初始化函数
        __init: function (jqueryElemet, options, __instanceObj, callback) {
            var $thisElement = jqueryElemet;
            //获取该元素是否已经是esi控件
            var esiPluginID = $thisElement.attr(this.pluginIDKey);
            //获取已初始化过,返回之前的对象
            if (esiPluginID && !options) {
                //获取对象
                return __instanceObj[esiPluginID];
            }
            if (esiPluginID && typeof (options) == "object") {
                //重新设置对象
                delete __instanceObj[esiPluginID];
            }

            //新对象，执行初始化
            //如果不存在，则初始化对象
            esiPluginID = new Date() - 0;
            $thisElement.attr(this.pluginIDKey, esiPluginID);

            this.pluginID = esiPluginID;
            this.jQueryObj = $thisElement;

            //子类的init函数
            if (callback && typeof (callback) == "function") {
                callback.call(this);
            }

            __instanceObj[esiPluginID] = this;
            return this;
        },
        //释放实例
        __dispose: function (__instanceObj) {
            delete __instanceObj[this.ESITabID];
        }
    };

    $esi.plugins.esiPluginBase = esiPluginBase;
    return esiPluginBase;
}));
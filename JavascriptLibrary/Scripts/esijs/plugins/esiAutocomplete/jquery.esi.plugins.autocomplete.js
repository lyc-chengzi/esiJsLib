/*
 *description:  esi自动提示插件
 *author:       lyc
 *create date:  2015-12-16 14:51:28
 **/
(function ($, $esi) {
    function ESIAutocomplete() {
        //继承基类实例属性
        $esi.plugins.esiPluginBase.call(this);
        this.pluginIDKey = "esi_autocompleteid";

        //控件实例属性        
        this.$target = null;//target对象
        this.targetKeyDownIndex = null;//事件延迟处理
        this.localData = null;//本地数据
        this.remoteURL = ""; //远程url
        this.loadDataType = 0;//加载数据的方式: 1--本地加载; 2--远程url加载
    }
    //对象集合定义
    var _instance = {};
    //获得原型属性，并扩展
    var subPlugins = $.extend($esi.plugins.esiPluginBase.prototype, {
        constructor: ESIAutocomplete,
        //控件的公共特性
        attributes: {
            //总体样式
            className: "esiAutocomplete"

        },
        //控件实例化函数
        init: function (jqueryElemet, options) {
            //调用父类__init函数，并实现此控件的初始化逻辑
            this.__init(jqueryElemet, options, _instance, function () {
                var op = $.extend(ESIAutocomplete.defaultOptions, options || {});
                var _self = this;
                //给控件添加样式，并隐藏
                jqueryElemet
                    .append('<div class="content"></div>')
                    .append('<div class="tools"><a class="close">关闭</a></div>')
                    .addClass(this.attributes.className)
                    .width(op.width)
                    .height(op.height)
                    .hide();
                jqueryElemet.find("div.content").height(jqueryElemet.outerHeight() - 40);
                jqueryElemet.find("div.tools a.close").on('click', function () {
                    _self.onClosingHandler(this);
                    _self.close();
                    return false;
                });

                //获得target对象(jquery对象)
                this.$target = op.target;
                if (!this.$target) {
                    console.warn('未设置option.target对象，esi自动完成控件不能正常工作');
                    return false;
                }
                var _targetOffset = this.$target.offset();
                //设置提示框的位置偏移量
                jqueryElemet
                    .css("top", _targetOffset.top + this.$target.outerHeight() + op.pTop)
                    .css("left", _targetOffset.left + op.pLeft);

                //添加event事件
                this.$target.on(op.eventType, function (e) {
                    _self.targetKeyDownIndex && clearTimeout(_self.targetKeyDownIndex);
                    if ($(this).val() == "") {
                        jqueryElemet.find(".content").empty();
                        return false;
                    }
                    _self.targetKeyDownIndex = setTimeout(__targetEventHandler, op.eventDelay, _self);
                }).on('click', function (e) {
                    //添加click事件
                    if ($(this).val() != "") {
                        jqueryElemet.show();
                        return false;
                    }
                });
            });
        },
        //销毁指定实例
        dispose: function () {
            this.__dispose(_instance);
        },
        //默认填充方法
        Render: function (filterData) {
            for (var i = 0; i < filterData.length; i++) {
                var _data = filterData[i];
                this.jQueryObj.find(".content").append('<div class="zb-info">' +
                                      '    <div class="title">' + _data.title + '</div>' +
                                      '    <div class="des">' + _data.fixDes + '</div>' +
                                      '</div>');
            }
        },
        //过滤方法
        filterFunc: function (text, compareData) {
            if (compareData.fixDes && compareData.fixDes.indexOf(text) >= 0) {
                return true;
            } else {
                return false;
            }
        },
        //执行搜索操作
        search: function () {
            __targetEventHandler(this);
        },
        //下拉框关闭前执行的回调函数;$target=>关闭按钮的Dom对象;
        onClosingHandler: function ($target) {

        },
        close: function () {
            this.jQueryObj.hide();
        }
    });

    ESIAutocomplete.prototype = subPlugins;

    ESIAutocomplete.defaultOptions = {
        //控件宽度
        width: 300,
        //控件高度
        height: 400,
        //控件相对于target的top偏移量
        pTop: 0,
        //控件相对于target的left偏移量
        pLeft: 0,
        //事件延迟
        eventDelay: 500,
        //事件类型
        eventType: 'keyup'
    };


    /*********************private function**********************/

    //获得过滤后的数据
    var __getFilterData = function (text, callback) {
        if (this.loadDataType !== 1 && this.loadDataType !== 2) {
            console.warn('请先设置控件的loadDataType属性，1代表加载本地数据;2代表ajax加载远程数据');
            return false;
        }
        if (this.loadDataType === 1 && !this.localData) {
            console.warn('加载本地数据, 请先设置控件的localData属性');
            return false;
        }
        if (this.loadDataType === 2 && !this.remoteURL) {
            console.warn('ajax加载远程数据, 请先设置控件的remoteURL属性');
            return false;
        }

        var filteredData = [];
        //如果是加载本地数据
        if (this.loadDataType === 1) {
            for (var i = 0; i < this.localData.length; i++) {
                if (this.filterFunc(text, this.localData[i]) == true) {
                    filteredData.push(this.localData[i]);
                }
            }
            this.jQueryObj.find(".content").empty();
            //调用回调函数渲染视图
            callback.call(this, filteredData);
        }
            //如果是加载远程数据
        else {

        }
    }

    //target对象事件处理函数;_self参数为当前实例对象
    var __targetEventHandler = function (_self) {
        _self.jQueryObj.show();
        __getFilterData.call(_self, _self.$target.val(), _self.Render);
    }
    

    $esi.plugins.esiAutocomplete = ESIAutocomplete;

})(jQuery, ESIObject);
(function (root, $jquery, factory) {
    //如果使用requirejs
    if (typeof define === "function" && define.amd) {
        define("esiCore", ['jquery'], function ($) {
            return factory($);
        });
    }
    else {
        root.ESIObject = root.$esi = factory($jquery);
    }
})(window, window.jQuery, function ($) {
    var ESIObject = {
        version: "1.0.0",
        isDebug: true,
        alert: function (msg) {
            if (this.isDebug) {
                alert(msg);
            }
        },
        easyAlert: function (txt) {
            if ($.messager && $.messager.alert) {
                $.messager.alert('提示', txt, 'info');
            }
        },
        log: function (o) {
            if (this.isDebug) {
                console.log(o);
            }
        },
        supportHTML5: function (id) {
            return typeof (document.getElementById(id).style.transition) != "undefined";
        },
        coreFn: {
            countSubstr: function (str, substr) {
                var count;
                var reg = new RegExp(substr, "g", "i");    //查找时忽略大小写
                if (!str.match(reg)) {
                    count = 0;
                } else {
                    count = str.match(reg).length;
                }
                //返回找到的次数
                return count;
            },
            isNumber: function (text) {//判断是否是纯数字
                var pattern = /^[0-9]+$/;
                return pattern.test(text);
            },
            //判断是否是小数
            //text:要判断的文本
            //number:要验证的小数位数，可选参数，不设置此参数则不验证小数位数，是小数即可
            isFloatNumber: function (text, number) {
                var pattern;
                if (number == undefined || number == null) {
                    pattern = /^[0-9]+(\.[0-9]+)?$/;
                    //pattern = /^[0-9]+\.[0-9]+$/;
                }
                else if (number <= 0) {
                    //number必须大于0
                    return false;
                }
                else {
                    pattern = new RegExp("^[0-9]+\.[0-9]{" + number + "}$");
                }

                return pattern.test(text);
            },
            isMobilePhoneNubmer: function (number) {//判断手机号
                var pattern = /^1(3|5|8)[0-9]{9}$/;
                return pattern.test(number);
            }
        },
        //加载提示框
        loading: {
            container: "body",
            loadingDivID: "_esiLoadingDiv",
            _defaultTxt: "正在加载...",
            loadingBox: document,
            _create: function () {
                $(this.container).append('<div id="' + this.loadingDivID + '" class="loadingdiv">' +
                                    '<div class="loading">' +
                                    '</div>' +
                                    '<div class="txt">' +
                                        '<span style="color:#000000;">正在加载...</span>' +
                                    '</div>' +
                                    '</div>');
            },
            //显示loading
            show: function (txt) {
                var $loading = this.jqueryObj();
                if (!$loading || !$loading.length) {
                    this._create();
                }
                $loading = this.jqueryObj();
                if (txt) {
                    $loading.find("div.txt span").html(txt);
                } else {
                    $loading.find("div.txt span").html(this._defaultTxt);
                }
                $loading.show();
            },
            //隐藏loading
            hide: function (containerBox) {
                var $loading = this.jqueryObj(containerBox);
                $loading.hide();
            },
            jqueryObj: function (containerBox) {
                return $("#" + this.loadingDivID, containerBox || this.loadingBox);
            },
            reCreate: function () {
                var $loading = this.jqueryObj();
                $loading.remove();
                this._create();
            }
        },
        plugins: {},
        //处理全局ajax请求
        //ajaxStart:ajax请求开始时执行
        //ajaxStop:ajax请求结束时执行
        initGlobalAjaxHandler: function (ajaxStart, ajaxStop) {
            $(document).ajaxStart(ajaxStart || function () {
                ESIObject.loading.show();
            });

            $(document).ajaxStop(ajaxStop || function () {
                ESIObject.loading.hide();
            });
        },
        baseController: {
            config: {
                httpMethod: { "POST": "post", "GET": "get" },//请求类型：post或者get
                isAjax: true, //是否ajax请求
                ajaxDataType: "json",//ajax返回数据类型

                //数据访问返回类型
                serviceResult: function () {
                    this.status = false;//请求是否执行成功
                    this.data = null;//如果成功，可能返回的json数据
                    this.info = "请求失败，请稍后再试";//错误信息
                }
            },
            //封装ajax参数
            //options:{error: error};
            getJQueryAjaxOptions: function (options) {
                return {
                    async: this.isAjax,
                    data: {},
                    dataType: this.ajaxDataType,
                    method: this.config.httpMethod.POST,
                    timeout: 15000,
                    error: (options && options.error) || this.ajaxErrorCallBack
                };
            },
            ajaxErrorCallBack: function () {
                alert('服务器连接失败，请稍后再试');
            }
        }
    };
    
    return ESIObject;
});



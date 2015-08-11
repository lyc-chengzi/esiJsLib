(function ($) {
    var _instance = {};
    var showStateList = { "show": "show", "hide": "hide" };
    var showTypeList = { "normal": "normal", "push": "push" };

    //page父类-----------------------------------------------------------------------------
    function pageBase() {
        this.jqueryObj = null;
    }

    pageBase.prototype = {
        ///获取高度
        getHeight: function () {
            return this.jqueryObj && this.jqueryObj.height();
        },
        ///设置高度
        setHeight: function (height) {
            if (this.jqueryObj) {
                this.jqueryObj.height(height);
            }
        },
        ///获取宽度
        getWidth: function () {
            return this.jqueryObj && this.jqueryObj.width();
        },
        ///设置宽度
        setWidth: function (width) {
            if (this.jqueryObj) {
                this.jqueryObj.width(width);
            }
        }
    };


    //pagebody对象-----------------------------------------------------------------------------
    function pageBodyObj() {
        //继承属性：jqueryObj
        pageBase.call(this);
    }

    pageBodyObj.prototype = new pageBase();
    pageBodyObj.prototype.constructor = pageBodyObj;

    //侧边菜单父类
    function broadSideMenuBase(jobj, pobj) {
        this.jqueryObj = null;
        this.pageBodyObj = null;
    }
    broadSideMenuBase.prototype = new pageBase();
    ///是否显示key
    broadSideMenuBase.prototype.isShowKey = "data-showstate";
    ///显示方式key
    broadSideMenuBase.prototype.showTypeKey = "data-showtype";
    ///获取左侧菜单是否显示
    broadSideMenuBase.prototype.isShow = function () {
        var showState = this.jqueryObj.attr(this.isShowKey);
        if (!showState) {
            return false;
        }
        if (showState == showStateList.show) {
            return true;
        } else {
            return false;
        }
    };
    ///显示
    broadSideMenuBase.prototype.show = function (callback) {
        var isShow = this.isShow();
        if (!isShow) {
            var _self = this;
            var $sideMenu = this.jqueryObj;

            var animateProperty = {};
            //如果是左侧菜单
            if (_self instanceof leftMenuObj) {
                animateProperty = { "left": "0px" }
                //如果是右侧菜单
            } else if (_self instanceof rightMenuObj) {
                animateProperty = { "right": "0px" }
            } else {
                return false;
            }
            $sideMenu.animate(animateProperty, function () {
                $sideMenu.attr(_self.showTypeKey, showTypeList.normal);
                $sideMenu.attr(_self.isShowKey, showStateList.show);
                if (callback && typeof callback == "function") {
                    callback.call($sideMenu);//调用回调函数，并传回sideMenu的jquery对象
                }
            });
        }
    };
    ///push方式显示
    broadSideMenuBase.prototype.showWithPush = function (callback) {
        var isShow = this.isShow();
        if (!isShow) {
            var _self = this;
            var $sideMenu = this.jqueryObj;
            var animateProperty = {};
            var paddingType = "";
            //如果是左侧菜单
            if (_self instanceof leftMenuObj) {
                animateProperty = { "left": "0px" }
                paddingType = "paddingLeft";
                //如果是右侧菜单
            } else if (_self instanceof rightMenuObj) {
                animateProperty = { "right": "0px" }
                paddingType = "paddingRight";
            } else {
                return false;
            }
            $sideMenu.animate(animateProperty, {
                step: function (n, t) {
                    _self.pageBodyObj.css(paddingType, (300 + n) + "px");
                },
                complete: function () {
                    $sideMenu.attr(_self.showTypeKey, showTypeList.push);
                    $sideMenu.attr(_self.isShowKey, showStateList.show);
                    if (callback && typeof callback == "function") {
                        callback.call($sideMenu);//调用回调函数，并传回sideMenu的jquery对象
                    }
                }
            });
        }
    };
    ///隐藏
    broadSideMenuBase.prototype.hide = function (callback) {
        var isShow = this.isShow();
        if (isShow) {
            var _self = this;
            var $sideMenu = this.jqueryObj;
            //获取显示方式
            var showType = $sideMenu.attr(this.showTypeKey);
            if (!showType) {
                return false;
            }
            var movePX = (0 - $sideMenu.width()) + "px";


            var animateProperty = {};
            var paddingType = "";
            //如果是左侧菜单
            if (_self instanceof leftMenuObj) {
                animateProperty = { "left": movePX }
                paddingType = "paddingLeft";
                //如果是右侧菜单
            } else if (_self instanceof rightMenuObj) {
                animateProperty = { "right": movePX }
                paddingType = "paddingRight";
            } else {
                return false;
            }

            if (showType == showTypeList.normal) {
                $sideMenu.animate(animateProperty, function () {
                    $sideMenu.attr(_self.isShowKey, showStateList.hide);
                    if (callback && typeof callback == "function") {
                        callback.call($sideMenu);//调用回调函数，并传回sideMenu的jquery对象
                    }
                });
            } else if (showType == showTypeList.push) {
                $sideMenu.animate(animateProperty, {
                    step: function (n, t) {
                        _self.pageBodyObj.css(paddingType, (300 + n) + "px");
                    },
                    complete: function () {
                        $sideMenu.attr(_self.isShowKey, showStateList.hide);
                        if (callback && typeof callback == "function") {
                            callback.call($sideMenu);//调用回调函数，并传回sideMenu的jquery对象
                        }
                    }
                });
            } else {
                return false;
            }

        }
    };


    //左侧菜单-----------------------------------------------------------------------------
    function leftMenuObj(jobj, pobj) {
        //继承属性：jqueryObj;pageBodyObj
        broadSideMenuBase.call(this, jobj, pobj);
    }

    leftMenuObj.prototype = new broadSideMenuBase();
    leftMenuObj.prototype.constructor = leftMenuObj;

    //右侧菜单-----------------------------------------------------------------------------
    function rightMenuObj(jobj, pobj) {
        //继承属性：jqueryObj;pageBodyObj
        broadSideMenuBase.call(this, jobj, pobj);
    }

    rightMenuObj.prototype = new broadSideMenuBase();
    rightMenuObj.prototype.constructor = rightMenuObj;

    //内容对象-----------------------------------------------------------------------------
    function pageContentObj() {
        this.jqueryObj = null;
    }

    pageContentObj.prototype = new pageBase();
    pageContentObj.prototype.constructor = pageContentObj;

    //pad端页面对象
    function jmPadPage() {
        this.jqueryObj = null;
        this.topMenuJqueryObj = null;
        this.pageBody = null;
        this.leftMenu = null;
        this.rightMenu = null;
        this.pageContent = null;
    }

    jmPadPage.prototype = {
        constructor: jmPadPage,
        tabIdKey: "data-jmpadpageid",
        topMenuClass: "jmpad_topMenu",
        pageBodyClass: "jmpad_pageBody",
        leftMenuClass: "jmpad_leftMenu",
        rightMenuClass: "jmpad_rightMenu",
        pageContentClass: "jmpad_pageContent",
        init: function (jqueryElement, options) {
            var self = this;
            var $thisElement = jqueryElement;
            //获取该元素是否已经是esiMessage控件
            var jmPadPageID = $thisElement.attr(self.tabIdKey);
            //获取已初始化过,返回之前的对象
            if (jmPadPageID && !options) {
                console.log("获取esiMessage对象");
                return _instance[jmPadPageID];
            }
            if (jmPadPage && typeof (options) == "object") {
                console.log("重新设置对象");
                self.dispose(jmPadPageID);//释放原来的对象
            }

            console.log("新对象，执行初始化");
            //如果不存在，则初始化对象
            jmPadPageID = new Date() - 0;
            $thisElement.attr(self.tabIdKey, jmPadPageID);
            //根据用户传入的参数配置
            $.extend(this, options || {});


            //**********************设置初始状态************************             
            self.jqueryObj = $thisElement;//缓存page的jquery对象
            self.topMenuJqueryObj = $("div." + self.topMenuClass, self.jqueryObj);//缓存topMenu的jquery对象
            //缓存pageBody对象
            self.pageBody = new pageBodyObj();
            self.pageBody.jqueryObj = $("div." + self.pageBodyClass, self.jqueryObj);
            //缓存leftMenu对象
            self.leftMenu = new leftMenuObj($("div." + self.leftMenuClass, self.jqueryObj), self.pageBody.jqueryObj);
            //缓存rightMenu对象
            var $rightMenuJqueryObj = $("div." + self.rightMenuClass, self.jqueryObj);
            if ($rightMenuJqueryObj.length == 1) {
                self.rightMenu = new rightMenuObj($rightMenuJqueryObj, self.pageBody.jqueryObj);
            }
            //缓存pageContent对象
            self.pageContent = new pageContentObj();
            self.pageContent.jqueryObj = $("div." + self.pageContentClass, self.jqueryObj);

            self.resetPageBodyHeight();

            //**********************设置初始状态************************


            _instance[jmPadPageID] = self;
            return self;
        },
        dispose: function (jmPadPageID) {
            delete _instance[jmPadPageID];
        },
        //设定pageBody的高度
        resetPageBodyHeight: function () {
            this.pageBody.setHeight(this.jqueryObj.height() - this.topMenuJqueryObj.height());
        },
        ///左侧菜单显示
        ///ispush=>true则pageContent右移，否则覆盖
        showLeftMenu: function (isPush, callback) {
            if (arguments.length == 1 && typeof(isPush) == "function") {
                callback = isPush;
                isPush = false;
            }
            if (isPush === true) {
                this.leftMenu.showWithPush(callback);
            } else {
                this.leftMenu.show(callback);
            }
        },
        ///左侧菜单隐藏
        hideLeftMenu: function (callback) {
            this.leftMenu.hide(callback);
        },
        ///右侧菜单显示
        ///ispush=>true则pageContent右移，否则覆盖
        showRightMenu: function (isPush, callback) {
            if (arguments.length == 1 && typeof (isPush) == "function") {
                callback = isPush;
                isPush = false;
            }
            if (isPush === true) {
                this.rightMenu.showWithPush(callback);
            } else {
                this.rightMenu.show(callback);
            }
        },
        ///右侧菜单隐藏
        hideRightMenu: function (callback) {
            this.rightMenu.hide(callback);
        }
    };

    $.fn.extend({
        jmPage: function (options) {
            return new jmPadPage().init(this, options);
        }
    });

})(jQuery);
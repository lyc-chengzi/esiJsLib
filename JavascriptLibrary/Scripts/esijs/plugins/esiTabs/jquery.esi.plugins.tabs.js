/*
 *选项卡插件
 *创建时间：2015年4月21日16:13:09
 *author:lyc
 *
*/

(function ($, $esi) {
    //标签页插件相关对象定义
    var _instance = {};

    function ESITab() {
        this.ESITabID = 0;
        this.autoHeight = false;
        this.otherHeight = 0;
        this.otherWidth = 0;
        this.tabClickHandler = null;
        this.selectedIndex = 1;
        this.tabBarItemWidth = 0;
        this.contentDivHeight = 0;
        this.jQueryObj = null;
        this.tabBarItems = [];//标签页
    }

    ESITab.prototype = {
        constructor: ESITab,
        tabIdKey:"data-esitabid",
        init: function (jqueryElemet, options) {
            /*参数列表
            var tempOptions = {
                autoHeight: false,                  //是否自动计算高度，使内容页高度充满整个屏幕
                otherHeight: 0,                     //除插件外其他标签所占用的高度
                tabClickHandler: null,                      //单击标签页回调函数
            }*/
            var self = this;
            var $thisElement = jqueryElemet;
            //获取该元素是否已经是esiTab控件
            var esiTabID = $thisElement.attr(self.tabIdKey);
            //获取已初始化过,返回之前的对象
            if (esiTabID && !options) {
                console.log("获取esitab对象");
                return _instance[esiTabID];                
            }
            if (esiTabID && typeof(options) == "object") {
                console.log("重新设置对象");
                delete _instance[esiTabID];
            }

            console.log("新对象，执行初始化");
            //如果不存在，则初始化对象
            esiTabID = new Date() - 0;
            $thisElement.attr(self.tabIdKey, esiTabID);
            //根据用户传入的参数配置
            $.extend(this, options || {});
            self.ESITabID = esiTabID;
            self.jQueryObj = $thisElement;           
            this.jQueryObj.find("div:first").find(" > ul > li").each(function () {
                self.tabBarItems.push(this);
            });
            if (self.autoHeight == true && self.otherHeight > 0) {
                self.setContentHeight();
            }
            self.setTabBarItemWidth();
            

            //tab标签单击事件
            $thisElement.find("div.esi_tabControlBar > ul > li").on("click", function () {
                var $this = $(this);
                var selectIndex = parseInt($this.attr("data-barindex"));
                self.selectedIndex = selectIndex;
                $this.siblings(".current").removeClass("current");
                $this.addClass("current");
                var $contentDivs = $this.parents("div.esi_tabControl").find("div.esi_tabControlItem");
                $contentDivs.hide();
                $contentDivs.eq(selectIndex - 1).show();
                //用户附加事件....
                if (self.tabClickHandler != undefined && typeof (self.tabClickHandler) == "function") {
                    self.tabClickHandler.call($this, selectIndex);
                }
            });
            
            //窗口大小改变时自动调整大小
            $(window).on("resize", function () {
                self.resize();
                console.log(self.ESITabID + ":" + self.contentDivHeight);
            });

            _instance[esiTabID] = self;
            return self;
        },
        setTabBarItemWidth:function (width) {
            //设置标签宽度
            var $tabBar = this.jQueryObj.find("div:first");
            var tabBarItemCount = this.tabBarItems.length;
            var _otherWidth = width || this.otherWidth;

            this.tabBarItemWidth = parseInt((this.jQueryObj.width() - _otherWidth) / tabBarItemCount);
            $tabBar.find(" > ul > li").width(this.tabBarItemWidth);
            return this;
        },
        setContentHeight: function () {
            if (this.autoHeight) {
                //重新计算高度  
                var $tabBar = this.jQueryObj.find("div:first");
                this.contentDivHeight = $(window).height() - $tabBar.height() - this.otherHeight - 12;//-12减去内容页上填充
                this.jQueryObj.find("div.esi_tabControlItem").height(this.contentDivHeight);
            }
            
            return this;
        },
        setCheckIndex:function (sIndex) {
            //设置选中项，从1开始
            this.selectedIndex = sIndex;
            this.jQueryObj.find("div:first > ul > li").eq(sIndex - 1).trigger("click");
            return this;
        },
        resize: function () {
            this.setTabBarItemWidth();
            this.setContentHeight();
            return this;
        },
        dispose: function () {
            delete _instance[this.ESITabID];
        }
    };


    //添加到jQuery对象中
    $.fn.extend({        
        esiTab: function (options) {
            var et = new ESITab().init(this, options);
            return et;
        }        
    });
})(jQuery, ESIObject);
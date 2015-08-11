(function ($) {
    var showStateList = { "show": "show", "hide": "hide" };

    function pageObj() {
        this.jqueryObj = null;//
        this.leftMenu = null;
        this.rightMenu = null;
    }

    pageObj.prototype = {
        constructor: pageObj,
        init:function (jqueryElement) {
            this.jqueryObj = jqueryElement;

            //init leftMenu
            this.leftMenu = new leftMenu();
            this.leftMenu.jqueryObj = $("div.jmpad_leftMenu");
            this.leftMenu.pageBodyObj = $("div.jmpad_pageBody");
            //end init leftMenu

            this.rightMenu = new rightMenu();
            this.rightMenu.jqueryObj = $("div.jmpad_rightMenu");
            this.rightMenu.pageBodyObj = $("div.jmpad_pageBody");

            return this;
        },
        showLeftMenu: function () {
            this.leftMenu.show();
        },
        hideLeftMenu: function () {
            this.leftMenu.hide();
        },
        showRightMenu: function () {
            this.leftMenu.show();
        },
        hideRightMenu: function () {
            this.leftMenu.hide();
        }
    
    };

    function broadMenuBase() {
        this.jqueryObj = null;
        this.pageBodyObj = null;
    }

    broadMenuBase.prototype = {
        showStateKey:"data-showstate",
        showState: showStateList.hide,
        isShow:function () {
            var isShow = this.jqueryObj.attr(this.showStateKey);
            if (!isShow) {
                return false;
            }

            if (isShow == showStateList.show) {
                return true;
            }
            else {
                return false;
            }
        },
        show: function () {
            var _leftMenu = this.jqueryObj;
            this.jqueryObj.animate({ "left": "0px" }, function () {
                _leftMenu.attr("data-showstate", showStateList.show);
            });
        },
        hide: function () {
            var _leftMenu = this.jqueryObj;
            this.jqueryObj.animate({ "left": "-300px" }, function () {
                _leftMenu.attr("data-showstate", showStateList.hide);
            });
        }
    };

    //leftMenu
    function leftMenu() {

    }
    leftMenu.prototype = new broadMenuBase();
    leftMenu.prototype.constructor = leftMenu;

    //rightMenu
    function rightMenu() {

    }
    rightMenu.prototype = new broadMenuBase();
    rightMenu.prototype.constructor = rightMenu;


    $.fn.pageDemo = function () {
        return new pageObj().init(this);
    };
})(jQuery);
/*
 *消息提示插件
 *创建时间：2015年7月7日09:47:10
 *author:lyc
 *
*/

(function ($) {
	//标签页插件相关对象定义
	var _instance = {};

	function ESIMessage() {
		this.ESITabID = 0;
		this.hideHeight = 70;
		this.autoClose = false;
		this.autoCloseMS = 0;//自动关闭间隔的毫秒数
		this.closeFunc = null;
		this.contentHtml = "";
		this.jQueryObj = null;
	}

	ESIMessage.prototype = {
		constructor: ESIMessage,
		tabIdKey: "data-esimessageid",
		showStateID: "data-isshow",
		init: function (jqueryElemet, options) {
			/*参数列表
            var tempOptions = {
                hideHeight: 70,                  //隐藏时的top值
                autoClose: true,                     //是否自动关闭
                autoCloseMS: 2000,                      //单击标签页回调函数
            }*/
			var self = this;
			var $thisElement = jqueryElemet;
			//获取该元素是否已经是esiMessage控件
			var esiMessageID = $thisElement.attr(self.tabIdKey);
			//获取已初始化过,返回之前的对象
			if (esiMessageID && !options) {
				console.log("获取esiMessage对象");
				return _instance[esiMessageID];
			}
			if (esiMessageID && typeof (options) == "object") {
				console.log("重新设置对象");
				delete _instance[esiMessageID];
			}

			console.log("新对象，执行初始化");
			//如果不存在，则初始化对象
			esiMessageID = new Date() - 0;
			$thisElement.attr(self.tabIdKey, esiMessageID);
			//根据用户传入的参数配置
			$.extend(this, options || {});
			self.ESITabID = esiMessageID;
			//设置初始状态
			$thisElement.attr(this.showStateID, "false");
			$thisElement.css("top", (0 - this.hideHeight) + "px");
			self.jQueryObj = $thisElement;

			_instance[esiMessageID] = self;
			return self;
		},
		showMessage: function (msg) {
			var self = this;
			if (self.isShow() == false) {
				if (msg) {
					this.jQueryObj.html(msg);
				}
				this.jQueryObj.attr(this.showStateID, "true");
				this.jQueryObj.css("top", "0px");
				if (this.autoClose && this.autoCloseMS > 0) {
					clearTimeout(this.closeFunc);
					this.closeFunc = window.setTimeout(function () {
						self.hideMessage();
					}, self.autoCloseMS);
				}
			}
			
		},
		hideMessage: function () {
			this.jQueryObj.attr(this.showStateID, "false");
			this.jQueryObj.css("top", (0-this.hideHeight) + "px");
		},
		isShow:function () {
			return this.jQueryObj.attr(this.showStateID) === "true";
		},
		dispose: function () {
			delete _instance[this.ESITabID];
		}
	};


	//添加到jQuery对象中
	$.fn.extend({
		esiMessage: function (options) {
			var em = new ESIMessage().init(this, options);
			return em;
		}
	});
})(jQuery);
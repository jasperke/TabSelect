function TAB_SELECT(tabClass, options) { // 以 <div class="tabLayer" data-title="藥物資料"> 格式作為tab分頁
										// new TAB_SELECT時, 須傳入用來做為tab分頁的div的class name
	'use strict';
	this.tabs = [];	// tab標籤名稱array
	this.divs = [];
	this.currentIdx = 0;
	this.options = $.extend({
		elementPaddingTop: '10px',	// tab標籤上方空間
		elementBackgroundColor: '#408080',	// tab標籤上方空間的底色
		borderColor: '#000000',	// tab標籤border color
		divPadding: '15px',	// 每個標籤頁內容的padding
		activeBgColor: '#ffffff',
		activeFontColor: '#0000FF',
		inactiveBgColor: '#9D9D9D',
		inactiveFontColor: '#000000'
	}, options || {});

	this.init = function (tabClass) {
		var that = this;
		$('.' + tabClass).each(function (idx) {
			that.tabs.push({label: $(this).data('title') || 'TAB ' + idx}); // 無data-title屬性的話, 預設用'TAB '+idx當檢籤名
			var div = $(this).css({padding: that.options.divPadding});
			if (idx > 0) {
				div.hide();
			}
			that.divs.push(div);
		});
		if (this.tabs.length) {
			this.element = $('<div/>').prependTo($(document.body)).css({paddingTop: this.options.elementPaddingTop, backgroundColor: this.options.elementBackgroundColor});
			$(document.body).css({padding: '0px', margin: '0px'});
			this.render();
		}
	};
	this.preventDefault = function (event) {
		event.preventDefault();
	};
	this.render = function () {
		var _table = $('<table/>', {width: '100%', cellSpacing: 0, cellPadding: 2, border: 0}).css({borderCollapse:'separate'}).appendTo(this.element),
			_tbody = $('<tbody/>').appendTo(_table),
			_tr = $('<tr/>').appendTo(_tbody).css({background:this.options.elementBackgroundColor}),
			_nobr,
			i;
		for (i = 0; i < this.tabs.length; i++) {
			$('<td/>', {width: 10}).css({fontSize: '4px', borderBottom: '1px solid ' + this.options.borderColor, padding: '0px'})
				.text(i === 0 ? '\u00a0\u00a0\u00a0\u00a0\u00a0' : '\u00a0').appendTo(_tr); // 間隙

			this.tabs[i].td = $('<td/>').css(this.getTabStyle(i === this.currentIdx)).appendTo(_tr)
				.bind('click', {obj: this, idx:i}, this.changeTab)
				.bind('selectstart', this.preventDefault);

			_nobr = $('<nobr/>').text('\u00a0\u00a0\u00a0' + this.tabs[i].label + '\u00a0\u00a0\u00a0')
				.appendTo(this.tabs[i].td);
		}
		$('<td/>', {width: '99%'}).css({borderBottom: '1px solid ' + this.options.borderColor}).text('\u00a0').appendTo(_tr);
	};
	this.getTabStyle = function (active) {
		if (active) {
			return {MozUserSelect: 'none',
				borderLeft: '1px solid ' + this.options.borderColor,
				borderTop: '1px solid ' + this.options.borderColor,
				borderRight: '1px solid ' + this.options.borderColor,
				borderRadius: '12px 12px 0px 0px',
				borderBottom: '',
				backgroundColor: this.options.activeBgColor,
				cursor: 'default',
				color: this.options.activeFontColor};
		} else {
			return {MozUserSelect: 'none',
				border: '1px solid ' + this.options.borderColor,
				borderRadius: '12px 12px 0px 0px',
				backgroundColor: this.options.inactiveBgColor,
				cursor: 'pointer',
				color: this.options.inactiveFontColor};
		}
	};
	this.changeTab = function (event) {
		var that = event.data.obj,
			i = event.data.idx;
		that.divs[that.currentIdx].hide();
		that.divs[i].show();
		if (i !== that.currentIdx) {
			that.tabs[that.currentIdx].td.css(that.getTabStyle(false));
			that.tabs[i].td.css(that.getTabStyle(true));
			that.currentIdx = i;
		}
	};
	this.init(tabClass);
}
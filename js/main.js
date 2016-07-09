/**
 * Created by fanyifan1 on 2016/6/28.
 */




function waterFall(element, space, children) {
	if (!element) return;
	space = space || 10;
	children = children || element.getElementsByTagName('div');
	var wrap = element;
	var water = children;
	var spaceWidth = water[0].offsetWidth;
	var wrapWidth = wrap.offsetWidth;
	var colNum = Math.floor(wrapWidth / spaceWidth);

	var padding = Math.floor((wrapWidth - colNum * spaceWidth) / (colNum+1));
	var column = new Array();
	var length = water.length;
	var maxHeight = 0;
	for (var i = 0; i < colNum; i++) {
		column[i] = new Array();
		column[i].top = space;
		column[i].left = (spaceWidth * i) + padding * (i + 1);
	}
	for (var i = 0; i < length; i++) {
		var index = i + 1;
		if (index % colNum == 0) {
			sub = colNum;
		} else {
			sub = index % colNum;
		}
		_this = water;
		_this[i].style.position = "absolute";
		_this[i].style.top = column[sub - 1].top + "px";
		_this[i].style.left = column[sub - 1].left + "px";
		column[sub - 1].top += _this[i].offsetHeight + space;
	}
	for (var i = 0; i < colNum; i++) {
		if (column[i].top > maxHeight) maxHeight = column[i].top;
	}
	wrap.style.height = maxHeight + "px";
}
var projectGallary=document.getElementById('projectGallary');
var projectItems=utils.getElementsByClass('projectItems',projectGallary);
window.onload=function(){
	waterFall(projectGallary,20,projectItems);
}
window.onresize=function(){
	console.log()
	waterFall(projectGallary, 20, projectItems);
}
function tranMatrix(){
	for (var i = 0; i < projectItems.length; i++) {
		~function (i) {
			var winH = document.documentElement.clientHeight || document.body.clientHeight;
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			var boxT = utils.offset(projectItems[i]).top;
			var boxHeight = projectItems[i].offsetHeight;
			var ratio = 3*(boxHeight + boxT - winH - scrollTop) / boxHeight;

			var boxChangeHeight = (winH + scrollTop - boxT) / boxHeight > 1 ? 1 : (winH + scrollTop - boxT) / boxHeight;
			var valMatrix = 'matrix(' + boxChangeHeight + ",0,0," + boxChangeHeight + ",0,0)";
			if (boxT-2*boxHeight<= winH + scrollTop) {
				ratio*=-1;
				ratio = ratio >= 1 ? 1 : ratio;
				if(boxHeight>=ratio&&ratio>=0){
					var valMatrix = 'matrix(' + ratio + ",0,0," + ratio + ",0,0)";
					utils.setCss(projectItems[i], 'transform', valMatrix);
					utils.setCss(projectItems[i],'opacity',ratio)
				}
			} else {
				utils.setCss(projectItems[i], 'transform', "matrix(1,0,0,1,0,0)");
			}
		}(i);
	}
}
window.onscroll=tranMatrix;
/*--遮罩层效果---*/
~function () {

	var oDiv = projectItems;
	var img = projectGallary.getElementsByTagName('img');
	var oMark = document.getElementsByClassName('projectMark');
	var len = oDiv.length;

	function getMousePos(obj, e) {
		var w = obj.offsetWidth;
		var h = obj.offsetHeight;
		var x = utils.offset(obj).left + w / 2 - e.pageX;
		var y = utils.offset(obj).top + h / 2 - e.pageY;
		return Math.round((Math.atan2(y, x) * 180 / Math.PI + 180) / 90) % 4;
	};
	for (var i = 0; i < len; i++) {
		~function (i) {
			oDiv[i].onmouseenter = function (e) {
				var e = e || window.event;
				var q = getMousePos(this, e);
				switch (q) {
					case 0:
						oMark[i].style.left = oDiv[i].offsetWidth + "px";
						oMark[i].style.top = '0';
						break;
					case 1:
						oMark[i].style.left = '0'
						oMark[i].style.top = oDiv[i].offsetHeight + "px";
						break;
					case 2:
						oMark[i].style.left = -oDiv[i].offsetWidth + "px";
						oMark[i].style.top = '0';
						break;
					case 3:
						oMark[i].style.left = '0'
						oMark[i].style.top = -oDiv[i].offsetHeight + "px";
						break;
				}
				fanAnimate(oMark[i], {left: 0, top: 0}, 200);
			}

		}(i);
		~function (i) {
			oDiv[i].onmouseleave = function (e) {
				var e = e || window.event;
				var q = getMousePos(this, e);
				switch (q) {
					case 0:
						fanAnimate(oMark[i], {left: oDiv[i].offsetWidth, top: 0}, 200)
						break;
					case 1:
						fanAnimate(oMark[i], {left: 0, top: oDiv[i].offsetHeight}, 200)
						break;
					case 2:
						fanAnimate(oMark[i], {left: -oDiv[i].offsetWidth, top: 0}, 200)
						break;
					case 3:
						fanAnimate(oMark[i], {left: 0, top: -oDiv[i].offsetHeight}, 200)
						break;
				}
			}
		}(i);
	}
}();

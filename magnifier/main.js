/**
 * Created by fanyifan1 on 2016/5/13.
 */
var box = document.getElementById('box');
var mark = document.getElementById('mark');
var rightBox = document.getElementById('rightBox');
var oImg = rightBox.getElementsByTagName('img')[0];


box.onmouseenter = function (e) {
	e = e || window.event;
	mark.style.display = 'block';
	rightBox.style.display = 'block';

}
box.onmousemove = function (e) {
	e = e || window.event;
	var mTop = e.clientY - box.offsetTop - mark.offsetHeight / 2;
	var mLeft = e.clientX - box.offsetLeft - mark.offsetHeight / 2;
	var maxL = box.offsetWidth - mark.offsetWidth;
	var maxT = box.offsetHeight - mark.offsetHeight;
	var tempL, tempT;
	if (mLeft < 0) {
		mark.style.left = 0;
		tempL = 0;
	} else if (mLeft > maxL) {
		mark.style.left = maxL + 'px';
		tempL = maxL
	} else {
		mark.style.left = mLeft + 'px';
		tempL = mLeft;
	}
	if (mTop < 0) {
		mark.style.top = 0;
		tempT = 0;
	} else if (mTop > maxT) {
		mark.style.top = maxT + 'px';
		tempT = maxT;
	} else {
		mark.style.top = mTop + 'px';
		tempT = mTop;
	}
	oImg.style.left = -tempL * 3 + 'px';
	oImg.style.top = -tempT * 3 + 'px';

}
box.onmouseleave = function (e) {
	e = e || window.event;
	mark.style.display = 'none';
	rightBox.style.display = 'none';
}
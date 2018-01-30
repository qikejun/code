官方提供的注释法：
<!--[if gte IE 8]>这个内容只有在ie8及以上浏览器看到<![endif]-->
注释中的参数：
lt 小于 ，gt 大于，lte 小于， gte 不小于,! 不等于

透明度：
filter: alpha(opacity=80);ie8以上
opacity:0.6; 通用写法

IE下，even不存在target属性
srcObj = event.srcElement ? event.srcElement : event.target;

坐标

var page = {};
page.x = event.x ? event.x : event.pageX;
page.y = event.y ? event.y:event.pageY;

事件监听

function addEvent(elem, eventName, handler) {
　　if (elem.attachEvent) {
　　　　elem.attachEvent("on" + eventName,function(){
　　　　　　handler.call(elem)}); 　 //此处使用回调函数call()，让this指向elem　　
  } else if (elem.addEventListener) {
　　    elem.addEventListener(eventName, handler, false);　　
  }
}
function removeEvent(elem, eventName, handler) {
  if (elem.detachEvent) {
  　　elem.detachEvent("on" + eventName,function(){
  　　　	handler.call(elem)}); 　　　　//此处使用回调函数call()，让this指向elem　　
  } else if (elem.removeEventListener) {
  　　elem.removeEventListener(eventName, handler, false);　　
  }
}
//IE提供了attachEvent和detachEvent两个接口，而Firefox提供的是addEventListener和removeEventListener。

键盘事件 keyCode

function getKeyCode(e){
  //兼容IE和Firefox获得keyBoardEvent对象
  e = e ? e : (window.event ? window.event : "")  
  //兼容IE和Firefox获得keyBoardEvent对象的键值
  return e.keyCode ? e.keyCode : e.which;
}
//IE：e.keyCode
//fireFox: e.which
移除节点

removeNode();
//firebox不支持
removeChild();
//通用，取上一层父节点再移除子节点
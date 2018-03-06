### DOCTYPE

首先需要确保你的HTML页面开始部分要有DOCTYPE声明。DOCTYPE告诉浏览器使用什么样的HTML或XHTML规范来解析HTML文档，具体会影响：

- 对标记、attributes 、properties的约束规则
- 对浏览器的渲染模式产生影响，不同的渲染模式会影响到浏览器对于CSS 代码甚至 JavaScript 脚本的解析

DOCTYPE是非常关键的，目前的最佳实践就是在HTML文档的首行键入：

```
<!DOCTYPE html>

```

对于DOCTYPE的具体阐述就不展开了，可以参考：《[正确使用DOCTYPE](http://www.cnblogs.com/shishm/archive/2012/02/29/2373080.html)》、《[CS002: DOCTYPE 与浏览器模式分析](http://www.w3help.org/zh-cn/casestudies/002)》。

### 使用meta标签调节浏览器的渲染方式

IE8中有一个“兼容性视图”的概念，当初IE8发布时，相对于IE6/7已经做出了非常大的改进，但是很多老站点仅针对IE6/7进行了优化，使用IE8渲染反而会一团糟。为了照顾这些苦逼的前端工程师，IE8加入了“兼容性视图”功能，这样的话就可以在IE8中使用IE6或IE7的内核渲染页面。这个当然不是我们想要的，所以需要使用meta标签来强制IE8使用最新的内核渲染页面，代码如下：

```
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

```

`IE=edge`表示强制使用IE最新内核，`chrome=1`表示如果安装了针对IE6/7/8等版本的浏览器插件Google Chrome Frame（可以让用户的浏览器外观依然是IE的菜单和界面，但用户在浏览网页时，实际上使用的是Chrome浏览器内核），那么就用Chrome内核来渲染。关于此meta标签的具体说明，可参见StackOverflow上的[精彩回答](http://stackoverflow.com/questions/6771258/whats-the-difference-if-meta-http-equiv-x-ua-compatible-content-ie-edge-e)。

国内存在很多双核浏览器比如360浏览器、搜狗浏览器，它们是怎么决定某页面到底使用哪种内核渲染？下面引用一段360浏览器v6新特性的[官方说明](http://se.360.cn/v6/help/meta.html)：

> 由于众所周知的情况，国内的主流浏览器都是双核浏览器：基于Webkit内核用于常用网站的高速浏览。基于IE的内核用于兼容网银、旧版网站。以360的几款浏览器为例，我们优先通过Webkit内核渲染主流的网站，只有小量的网站通过IE内核渲染，以保证页面兼容。在过去很长一段时间里，我们主要的控制手段是一个几百k大小网址库，一个通过长期人工运营收集的网址库。
>
> 尽管我们努力通过用户反馈、代码标签智能判断技术提高浏览器的自动切核准确率。但是在很多情况下，我们仍然无法达到百份百正确。因此，我们新增加了一个控制手段：内核控制Meta标签。只要你在自己的网站里增加一个Meta标签，告诉360浏览器这个网址应该用哪个内核渲染，那么360浏览器就会在读取到这个标签后，立即切换对应的内核。并将这个行为应用于这个二级域名下所有网址。

解决方法360已经告诉我们了，通过meta标签的方式建议其使用Webkit，代码如下：

```
<meta name="renderer" content="webkit">

```

我没有做细致的调查，不知道其他的双核浏览器是否支持此特性。

### Media Query

IE8似乎无法识别Media Query，所以需要hack一下啦！推荐采用[Respond.js](https://github.com/scottjehl/Respond)解决此问题，具体方法参见它的文档即可。

### 实现CSS3的某些特性

IE8不支持CSS3的很多新特性，不过我们可以使用一些比较成熟的hack方法，我采用的是[CSS3 PIE](http://css3pie.com/)，它支持的特性有这些：border-radius、box-shadow、border-image、multiple background images、linear-gradient等。

**特别注意**：请一定阅读CSS PIE给出的[Know Issues](http://css3pie.com/documentation/known-issues/)。

### 识别HTML5元素

如果你在前端代码中使用了HTML5的新标签（nav/footer等），那么在IE中这些标签可能无法正常显示。我使用[html5shiv](https://github.com/aFarkas/html5shiv)，具体使用方法见文档。

### 关于max-width

还有一个在IE8中经常遇到的问题就是max-width，网页中图片的尺寸可能比较宽，我会给它设置`max-width: 100%`来限制其宽度最大为父容器的宽度，但是有时候却不奏效，慢慢摸索才得知IE解析max-width所遵循的规则：严格要求直接父元素的宽度是固定的。经实验发现Chrome所遵守的规则比IE松一些，所以这个问题应该不归属为IE兼容性问题，不过我还是提一下吧。分享两个我遇到的场景：

（1）td中的max-width

如果针对td中的img元素设置`max-width: 100%`，在IE和Firefox你会发现不奏效，而在Chrome中却是可以的。经查询发现需要给table设置`table-layout: fixed`，对此属性的具体解释见[W3School](http://www.w3school.com.cn/css/pr_tab_table-layout.asp)。

（2）嵌套标签中的max-width

如下的HTML结构：

```
<div class="work-item">
    <a href="#" class="work-link">
        <img src="sample.jpg" class="work-image img-responsive">
    </a>
</div>

```

最外层元素`.work-item`设置了固定宽度，但是对img设置max-width为100%却无效，后来才发现需要再对a标签设置`width: 100%`，这样才能使最内层的img标签充满整个div。

### 嵌套inline-block下padding元素重叠

HTML代码：

```
<ul>
    <li><a>1</a></li>
    <li><a>2</a></li>
    <li><a>3</a></li>
</ul>

```

CSS代码：

```
ul li{
    display: inline-block;
}
ul li a{
    display: inline-block;
    padding: 10px 15px;
}

```

按理来说a标签之间的距离应该是30px，但在IE8中出现了重叠，只有15px。[这里](http://forums.devshed.com/css-help-116/overlapping-text-list-ie-8-a-936017.html)和[这里](http://stackoverflow.com/questions/11783084/menu-items-overlapping-in-ie8)也提到了同样的问题。我的解决方法是使用`float: left`替代`display: inline-block`实现水平布局。

### placeholder

IE8下不支持HTML5属性placeholder，不过为解决此问题的js插件挺多的，比如：[jquery-placeholder](https://github.com/mathiasbynens/jquery-placeholder)。

### last-child

first-child是CSS2的内容，但是last-child就不是了，所以IE8不买账。推荐的做法不是使用last-child，而是给最后一个元素设置一个`.last`的class，然后对此进行样式设置，这样就全部兼容了。

### background-size: cover

如果你想使用`background-size: cover`设置全屏背景，很遗憾IE8办不到...但可以使用IE独有的AlphaImageLoader滤镜来实现，添加一条如下的CSS样式：

```
filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=Enabled, sizingMethod=Size , src=URL)
```

将sizingMethod设置为scale就OK了。

还没完，如果你在此背景之上放置了链接，那这个链接是无法点击的。一般情况下的解决办法是为链接或按钮添加`position:relative`使其相对浮动。

### filter blur

CSS3中提供支持滤镜效果的属性filter，比如支持高斯模糊效果的blur（类似iOS7的效果）：

```
filter: blur(10px);
-webkit-filter: blur(10px);
-moz-filter: blur(10px);

```

IE8对`filter: blur(10px)`的显示效果是对HTML元素进行小范围的模糊处理，这个效果并不是高斯模糊，要想支持高斯模糊，需要如下设置：

```
filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius='10');

```

在实践中发现一个坑就是，所有`position: relative`的元素都不会生效。

其他的发现是，IE9对`filter: blur(10px)`无效，而对`filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius='10');`是针对元素小范围的模糊效果。
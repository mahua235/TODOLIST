var log = function() {
    console.log.apply(console, arguments)
}

var e = function(selector) {
    return document.querySelector(selector)
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

var bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

var closestClass = function(element, className) {
    var e = element
    while (e != null) {
        if (e.classList.contains(className)) {
            return e
        } else {
            e = e.parentElement
        }
    }
}

var closestId = function(element, idName){
    var e = element
    while (e != null) {
        // 判断 e 是否包含 idName 这个 id
        if (e.id == idName) {
            return e
        } else {
            e = e.parentElement
        }
    }
}

var closest = function(element, selector){
    var flag = selector[0]
    if (flag == '.') {
        var className = selector.slice(1)
        return closestClass(element, className)
    } else if (flag == '#') {
        var idName = selector.slice(1)
        return closestId(element, idName)
    } else {
        var tag = selector
        return closestId(element, tag)
    }
}

var showImageAtIndex = function(slide, index) {
    var nextIndex = index
    // 设置父节点的 data-active
    slide.dataset.active = nextIndex
    // 删除当前图片的 class 给下一张图片加上 class
    var className = 'active'
    removeClassAll(className)
    // 得到下一张图片的选择器
    var nextSelector = '#id-image-' + String(nextIndex)
    var img = e(nextSelector)
    img.classList.add(className)
    // 切换小圆点
    // 1, 删除当前的小圆点的 class
    removeClassAll('white')
    // 2, 得到下一个小圆点的选择器
    var indiSelector = '#id-indi-' + String(nextIndex)
    var indi = e(indiSelector)
    indi.classList.add('white')
}

var nextIndex = function(slide, offset) {
    var numberOfImgs = parseInt(slide.dataset.imgs)
    var activeIndex = parseInt(slide.dataset.active)
    // 求出下一张图片的 id
    var i = (numberOfImgs + activeIndex + offset) % numberOfImgs
    return i
}

var bindEventSlide = function() {
    var selector = '.slide-button'
    bindAll(selector, 'click', function(event){
        console.log('click next')
        var button = event.target
        var slide = button.parentElement
        var offset = parseInt(button.dataset.offset)
        var index = nextIndex(slide, offset)
        showImageAtIndex(slide, index)
    })
}

var bindEventIndicator = function() {
    var selector = '.slide-indi'
    bindAll(selector, 'mouseover', function(event){
        log('indi 小圆点')
        var self = event.target
        var index = parseInt(self.dataset.index)
        log('index', index)
        // 得到 slide
        var slide = self.closest('.slide')
        // 直接播放第 n 张图片
        showImageAtIndex(slide, index)
    })
}


var playNextImage = function() {
    var slide = e('.slide')
    var index = nextIndex(slide, 1)
    showImageAtIndex(slide, index)
}
//自动播放
var autoPlay = function() {
    var interval = 7000
    setInterval(function(){
        playNextImage()
    }, interval)
}

bindEventSlide()
bindEventIndicator()
autoPlay()

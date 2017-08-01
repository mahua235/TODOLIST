
var log = console.log.bind(console)

var e = function(selector) {
    return document.querySelector(selector)
}
var today = e('.todays')
//以下函数显示时间
var startTime = function() {
    var d = new Date()
    var td = d.getDay()
    var h = d.getHours()
    var m = d.getMinutes()
    var s = d.getSeconds()
    // 如果分钟或小时的值小于10，则在其值前加0，比如如果时间是下午3点20分9秒的话，则显示15：20：09
    m=checkTime(m)
    s=checkTime(s)

    var time = e('.times')
    var dd = day(td)
    time.innerHTML= `
                     ${dd}
                     ${h}:${m}:${s}
                      `
    var wenhou = function(h) {    // 根据h的数值判断上下午
        if (h>6 && h<12) {
            return '早上好,'
        }
        if (h>12 && h<18) {
            return '下午好,'
        }
        return '晚上好,'
     }

    var ss = wenhou(h)
    today.innerHTML = `
                    ${ss}   今日准备做些什么呢?
                    `
    setTimeout('startTime()',1000);//每一秒中加载一次
}

let a =[1, 2, 3, 4, 5, 6, 7]
let b =['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
var day = function (t) {
    for ( i = 0; i < 7; i++) {
        let m = a[i]
        if (m == t) {
            return b[i]
        }
    }
}

var checkTime = function(i) {
    if (i < 10){
        i = "0" + i
    }
        return i
}
startTime()

var templateTodo = function(todo) {
    var t = `
        <div class='todo-cell'>
            <button class='todo-done'>√</button>
            <span contenteditable='true'>${todo}</span>
            <button class='todo-delete'>×</button>

        </div>
    `
    return t
}

// 载入所有存储在 localStorage 里面的 todo
var loadTodos = function() {
    var s = localStorage.savedTodos
    if (s == undefined) {  // 第一次打开的时候, 还没有存储这个数据, s 是 undefined
        return []
    } else {
        var ts = JSON.parse(s)
        return ts
    }
}

// 把所有 todo 插入页面中
var insertTodos = function(todos) {
    var todoContainer = e('#id-div-container')
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        var html = templateTodo(todo)
        todoContainer.insertAdjacentHTML('beforeend', html)
    }
}

// 把一个 todo 参数添加并保存在 localStorage 中
var saveTodo = function(todo) {
    // 添加到 todos 数组
    var todos = loadTodos()
    todos.push(todo)
    var s = JSON.stringify(todos)
    localStorage.savedTodos = s
}

var deleteTodo = function(container, todoCell) {
    // 1, 找到这个 todo 在 container 里面的下标
    for (var i = 0; i < container.children.length; i++) {
        var cell = container.children[i]
        if (todoCell == cell) {
            log('删除 cell, 找到下标', i)
            // 1, 删除这个 cell DOM
            todoCell.remove()
            // 2, 删除保存在 localStorage 里面的对应下标的数据
            var todos = loadTodos()
            todos.splice(i, 1)
            // 删除后, 保存到 localStorage
            var s = JSON.stringify(todos)
            localStorage.savedTodos = s
        }
    }
}


var todos = loadTodos()   // 页面载入时, 把存储的 todos 数据插入到页面中
insertTodos(todos)       // 把 todos 显示在页面中

//给addButton绑定点击事件
var addButton = e('#id-button-add')
addButton.addEventListener('click', function(){
    var todoInput = e('#id-input-todo')
    var todo = todoInput.value
    saveTodo(todo)
    var todoContainer = e('#id-div-container')
    var html = templateTodo(todo)
    todoContainer.insertAdjacentHTML('beforeend', html)
})

var todoContainer = e('#id-div-container')

todoContainer.addEventListener('click', function(event){
    log('container click', event, event.target)
    var target = event.target
    if(target.classList.contains('todo-done')) {
        log('done')
        var todoDiv = target.parentElement
        todoDiv.classList.toggle('done')
    } else if (target.classList.contains('todo-delete')) {
        log('delete')
        var todoDiv = target.parentElement
        var container = todoDiv.parentElement
        deleteTodo(container, todoDiv)
    }
})

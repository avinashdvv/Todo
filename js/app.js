(function() {
    'use strict'

    function Todo(name, root) {
        this.name = name;
        this.root = root;
        this.template = new app.Template();
        this.controller = new app.Controller(this.root, this.template);
    }

    window.setView = function setView(name, input, todoList){
        var todo = new Todo(name, todoList);
        input.onchange = function(e) {
            todo.controller.createTodo(e.target.value);
            e.target.value = "";
        }
    }
})()
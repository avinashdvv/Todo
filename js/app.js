(function() {
    'use strict'

    function Todo(name, root) {
        this.name = name;
        this.root = root;
        this.model = new app.Model(name);
        this.View = new app.View();
        this.controller = new app.Controller(this.root, this.View, this.model);
    }

    window.setView = function setView(name, input, todoList){
        var todo = new Todo(name, todoList);
        // debugger;
        if (todo.model.todolist.length > 0 ) {
            todo.controller.renderTodoList();
        }
        input.onchange = function(e) {
            todo.controller.createTodo(e.target.value);
            e.target.value = "";
        }
    }
})()
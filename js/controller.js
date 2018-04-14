(function(window) {
    function Controller(root,view, model) {
        var self = this;
        this.root = root;
        this.view = view;
        this.model = model;
        this.todoList = model.todolist;
        this.updateTodo = function(index, value, checked) {
            self.model.updateTodo(index, value, checked);
        }
        this.removeTodo = function(id) {
            self.model.removeTodo(id);
        }
        this.todoList.addEventListener("itemremoved", function(e) {
            self.renderTodoList();
        });
    }
    Controller.prototype.createTodo = function(value) {
        var todoView = this.view.createTodo(
                value, 
                this.todoList.length,
                this.removeTodo,
                this.updateTodo,
            );
        this.root.appendChild(todoView);
        this.model.createTodo(value, false);
    }
    
    Controller.prototype.renderTodoList = function() {
        var self = this;
        this.root.innerHTML = "";
        this.todoList.forEach(function(e, index) {
            var ele = self.view.createTodo(
                    e.text, 
                    index,
                    self.removeTodo,
                    self.updateTodo,
                );
            self.root.appendChild(ele);
        })
    }
    window.app = window.app || {};
    window.app.Controller = Controller;
})(window)
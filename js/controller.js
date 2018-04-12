(function(window) {
    function Controller(root,view) {
        this.root = root;
        this.view = view;
    }
    Controller.prototype.createTodo = function(value) {
        this.view.create(this.root, value);
    }
    Controller.prototype.updateTodo = function() {
        this.view.update();
    }
    Controller.prototype.removeTodo = function() {
        this.view.remove();
    }
    window.app = window.app || {};
    window.app.Controller = Controller;
})(window)
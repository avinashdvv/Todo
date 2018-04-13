(function (window) {
    function updateStorage(name, data) {
        localStorage.setItem(name, JSON.stringify(data))
    }
    function Model(name){
        this.name = name;
        this.todolist = JSON.parse(localStorage.getItem(name)) || [];
    }
    Model.prototype.createTodo = function(data, checked) {
        this.todolist.push({
           text: data,
           checked: checked
        })
        updateStorage(this.name, this.todolist);
    }
    Model.prototype.updateTodo = function(index, checked) {
        this.todolist[index].checked = checked
        updateStorage(this.name, this.todolist);
    }
    Model.prototype.removeTodo = function(index) {
        this.todolist.splice(index, 1);
        console.log(this.todolist);
        updateStorage(this.name, this.todolist);
    }
    window.app = window.app || {}
    window.app.Model = Model; 
})(window)
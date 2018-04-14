(function (window) {
    
    function updateStorage(name, data) {
        localStorage.setItem(name, JSON.stringify(data))
    }
    function Model(name){
        this.name = name;
        this.todolist = JSON.parse(localStorage.getItem(name)) || [];
        this.todolist = new ArrayOberverble(this.todolist);
        this.todolist.addEventListener("itemadded", function(e) {
            console.log("Added %o at index %d.", e.item, e.index);
        });
    
        this.todolist.addEventListener("itemset", function(e) {
            console.log("Set index %d to %o.", e.index, e.item);
        });
    
        // this.todolist.addEventListener("itemremoved", function(e) {
        //     console.log("Removed %o at index %d.", e.item, e.index);
        // });
         
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
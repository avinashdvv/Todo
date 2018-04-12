(function (window) {
    var elementsList = {
        TODO_ROOT : 'li',
        TODO : 'div',
        CHECKBOX: 'input',
        LABEL: 'label',
        CLOSE: 'button',
    }
    var getProperties = {
        li: {
            class: "completed",
        },
        div: {
            class: "view",
        },
        input: {
            class: "toggle",
            type: "checkbox",
            checked: false
        },
        button: {
            class: "destroy",
        },
    }
  
    var element = {
        clearElement: function(id) {
            document.getElementById(id).innerHTML = '';
        },
        createElement: function(type) {
            return document.createElement(type)
        },
        addPropertiesToElement: function(ele, properties) {
            Object.keys(properties).forEach(function(key) {
                ele[key] = properties[key];
            })
            return ele;
        },
        createElementWithProperties: function(type, key) {
            var ele = element.createElement(type);
            var properties = getProperties[type];
            return element.addPropertiesToElement(ele, properties);
        },
        createTextNode: function(value) {
            return document.createTextNode(value);
        }
    }
    

    function Template(key) {
        this.Todo = function() {
            self = this;
            this.li = element.createElementWithProperties(elementsList.TODO_ROOT, key);
            this.div = element.createElementWithProperties(elementsList.TODO, key);
            this.input = element.createElementWithProperties(elementsList.CHECKBOX, key);
            this.label = "";
            this.button = element.createElementWithProperties(elementsList.CLOSE, key);
            this.button.innerHTML = "X";
            this.button.onclick = function() {
                self.li.remove();
            }
            this.input.onclick = function(e) {
                self.input.checked = e.target.checked;
            }
        }
        
    }

    Template.prototype.create = function(root, value) {
        var todo = new this.Todo();
        todo.label = element.createTextNode(value);
        todo.div.appendChild(todo.input);
        todo.div.appendChild(todo.label);
        todo.div.appendChild(todo.button);
        todo.li.appendChild(todo.div);
        root.appendChild(todo.li);
    }
    Template.prototype.update = function() {
        self = this;
        
    }
    Template.prototype.remove = function() {
        
    }
    window.app = window.app || {};
    window.app.Template = Template;
})(window)
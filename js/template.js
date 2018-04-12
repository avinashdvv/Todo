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
            self.li = element.createElementWithProperties(elementsList.TODO_ROOT);
            self.div = element.createElementWithProperties(elementsList.TODO);
            self.input = element.createElementWithProperties(elementsList.CHECKBOX);
            self.label = "";
            self.button = element.createElementWithProperties(elementsList.CLOSE);
            self.button.innerHTML = "X";
            self.button.onclick = function(e) {
                console.log(self.li.innerHTML);
                self.li.remove();
            }
            self.input.onclick = function(e) {
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
    window.app = window.app || {};
    window.app.Template = Template;
})(window)
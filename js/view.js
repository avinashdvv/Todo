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
    function Todo(value, index, remove, update) {
        var li = element.createElementWithProperties(elementsList.TODO_ROOT);
        var div = element.createElementWithProperties(elementsList.TODO);
        var input = element.createElementWithProperties(elementsList.CHECKBOX);
        var label = element.createTextNode(value);
        var button = element.createElementWithProperties(elementsList.CLOSE);
        button.innerHTML = "X";
        button.onclick = function(e) {
            remove(index);
        }
        input.onclick = function(e) {
            input.checked = e.target.checked;
            update(index, e.target.checked);
        }
        div.appendChild(input);
        div.appendChild(label);
        div.appendChild(button);
        li.appendChild(div);
        return li;
    }

    function View(key) {
    }

    View.prototype.createTodo = function(value, index, remove, update) {
        return new Todo(value, index, remove, update);
    }
    View.prototype.render = function() {

    }
    window.app = window.app || {};
    window.app.View = View;
})(window)
var model = function() {
	this.todoList = {};
	this.filterdTodo = {};
	this.storage = function(key) {
		this.data = {};
		this.initilisize = function(key) {
			this.data = localStorage.getItem(key) || {};
		}
		this.update = function(data) {
			localStorage.setItem(key, data);
		}
		this.clear = function(key) {
			localStorage.removeItem(key);
			this.data = {}
		}
	}
	this.todo = function(key) {

		this.add = function() {

		}
		this.update = function() {

		}
		this.remove = function() {

		}
	}
}

var views = function() {
	this.clearElement =  function(id) {
		document.getElementById(id).innerHTML = '';
	};
	this.createElement =  function(type) {
		return document.createElement(type)
	},
	this.addPropertiesToElement = function(ele, properties) {
		Object.keys(properties).forEach(function(key) {
			ele[key] = properties[key];
		})
		return ele;
	},
	this.createElementWithProperties = function(type, key) {
		var ele = element.createElement(type);
		var properties = getProperties(type, key);
		return element.addPropertiesToElement(ele, properties);
	}
	this.createTodoElement = function(value, key, updateLocalStorageOrNot) {
		var valueNode = document.createTextNode(value);

		var li = element.createElementWithProperties(elementsList.TODO_ROOT, key);
		var div = element.createElementWithProperties(elementsList.TODO, key);
		var input = element.createElementWithProperties(elementsList.CHECKBOX, key);
		var closeBtn = element.createElementWithProperties(elementsList.CLOSE, key);
		

		input.onchange = function(e) {
			todo.updateTodo(key, e.target);
		}
		
		closeBtn.onclick = function(e) {
			todo.removeTodo(key);
		}

		if (updateLocalStorageOrNot) {
			var id = nextId;
			todoList[id] = {
				id: id,
				text: value,
				status: false
			}
			updateLocalStorage();
			nextId += 1;
		}

		div.appendChild(input);
		div.appendChild(valueNode);
		div.appendChild(closeBtn);
		root.appendChild(div);
	}
	this.render = function() {

	}
}

(function () = {
	var app = function() {
		this.model = new model();
		this.views = new views();
	}
	window.app = app;
})
	

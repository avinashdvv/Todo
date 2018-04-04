var ROOT_ID = 'todo';


var root = document.getElementById(ROOT_ID);
var todoList = {};
var nextId = 0;
var todoLength = function() {
	return Object.keys(todoList).length;
};
var elementsList = {
	TODO_ROOT : 'li',
	TODO : 'div',
	CHECKBOX: 'input',
	CLOSE: 'button',
}
var idsList = {
	todo : function(id) { 
		return "todo_"+id;
	},
	checkbox: function(id) { 
		return "checkbox_"+id;
	},
	closeBtn: function(id) { 
		return "close_"+id;
	}
};
var getProperties = function(type, key) {
	return {
		[elementsList.TODO_ROOT]: {},
		[elementsList.TODO] : {
			id: idsList.todo(key),
		},
		[elementsList.CHECKBOX]: {
			id: idsList.todo(key),
			type: 'checkbox',
			checked: (todoList[key] && todoList[key].status) || false,
		},
		[elementsList.CLOSE]: {
			id: idsList.closeBtn(key),
			type: 'button',
			value: 'X',
			innerHTML: 'X'
		},
	}[type];
}





window.onload = function(){
	todoList = JSON.parse(localStorage.getItem("todo")) || {};
	app.loadTodos();
};

function updateLocalStorage() {
	localStorage.setItem("todo", JSON.stringify(todoList));
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
		return element;
	},
	createElementWithProperties: function(type, key) {
		var ele = document.createElement(type);
		var properties = getProperties(type, key);
		Object.keys(properties).forEach(function(key) {
			ele[key] = properties[key];
		})
		return ele;
	}
}

var todo = {
	removeTodo: function(id) {
		delete todoList[id];
		document.getElementById("todo_"+id).remove();
		updateLocalStorage();
	},
	updateTodo: function(id, target) {
		todoList[id].status = target.checked;
		updateLocalStorage();
	},
	createTodo: function(value, key, updateLocalStorageOrNot) {
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
}




var app = {
	add: function(e) {
		todo.createTodo(e.value, nextId, true);
		e.value = "";
	},
	completed: function() {
		element.clearElement(ROOT_ID);
		Object.keys(todoList).forEach(function(key) {
			var todo = todoList[key];
			if(todo.status) {
				todo.createTodo(todo.text, key, false);
			}
		})
	},
	active: function(){
		element.clearElement(ROOT_ID);
		Object.keys(todoList).forEach(function(key) {
			var todo = todoList[key];
			if(!todo.status) {
				todo.createTodo(todo.text, key, false);
			}
		})
	},
	loadTodos: function() {
		element.clearElement(ROOT_ID);
		Object.keys(todoList).forEach(function(key) {
			todo.createTodo(todoList[key].text, key, false);
			nextId = parseInt(key)+1;
		})
	},
}



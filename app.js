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
	loadTodos();
};

var element = {
	clearElement: function(id) {
		document.getElementById(id).innerHTML = '';
	},
	createElement: function(type) {
		return document.createElement(type)
	},
	addPropertiesToElement: function(element, properties) {
		Object.keys(properties).forEach(function(key) {
			element[key] = properties[key];
		})
		return element;
	},
	createElementWithProperties: function(type, key) {
		var element = document.createElement(type);
		var properties = getProperties(type, key);
		Object.keys(properties).forEach(function(key) {
			element[key] = properties[key];
		})
		return element;
	}
}

var todo = {
	loadTodos: function() {
		element.clearElement(ROOT_ID);
		Object.keys(todoList).forEach(function(key) {
			createTodo(todoList[key].text, key, false);
			nextId = parseInt(key)+1;
		})
	}
}


function loadTodos() {
	element.clearElement(ROOT_ID);
	Object.keys(todoList).forEach(function(key) {
		createTodo(todoList[key].text, key, false);
		nextId = parseInt(key)+1;
	})
}
function updateLocalStorage() {
	localStorage.setItem("todo", JSON.stringify(todoList));
}

function removeTodo(id) {
	delete todoList[id];
	document.getElementById("todo_"+id).remove();
	updateLocalStorage();
}

function updateTodo(id, target) {
	todoList[id].status = target.checked;
	updateLocalStorage();
}

function createTodo(value, key, updateLocalStorageOrNot) {
	var valueNode = document.createTextNode(value);

	var li = element.createElementWithProperties(elementsList.TODO_ROOT, key);
	var div = element.createElementWithProperties(elementsList.TODO, key);
	var input = element.createElementWithProperties(elementsList.CHECKBOX, key);
	var closeBtn = element.createElementWithProperties(elementsList.CLOSE, key);
	

	input.onchange = function(e) {
		updateTodo(key, e.target);
	}
	
	closeBtn.onclick = function(e) {
		removeTodo(key);
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

function add(e) {
	createTodo(e.value, nextId, true);
	e.value = "";
}

function completed() {
	element.clearElement(ROOT_ID);
	Object.keys(todoList).forEach(function(key) {
		var todo = todoList[key];
		if(todo.status) {
			createTodo(todo.text, key, false);
		}
	})
}

function active() {
	element.clearElement(ROOT_ID);
	Object.keys(todoList).forEach(function(key) {
		var todo = todoList[key];
		if(!todo.status) {
			createTodo(todo.text, key, false);
		}
	})
}
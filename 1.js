//get the checkbox by class check
var check = document.getElementsByClassName("check");
//get the textlist by class textlist
var textlist = document.getElementsByClassName("textlist");
//get the obj by class obj
var obj = document.getElementsByClassName("obj");
var items = document.querySelector(".toDo-items");
var x = 0;

//selet function
function select(box, id) {
  var check = box;
  //get the element by id
  var obj = document.getElementById(id);
  console.log("select");
  if (box.checked) {
    updateTodoById(id, true);
    //box.nextElementSibling.style.textDecoration = "line-through";
    //change the obj border color
    //obj.style.borderColor = "green";
  } else {
    updateTodoById(id, false);
    //box.nextElementSibling.style.textDecoration = "none";
    //change the obj border color
    //obj.style.borderColor = "red";
  }
  //get the todo by id
  setTimeout(function () {
    //get the data
    getData();
  }, 200);
}

//get the input by class inputbox
var inputbox = document.querySelector(".inputbox");
//get the button by class add-but
var addbut = document.querySelector(".add-but");
inputbox.addEventListener("keyup", () => {
  if (inputbox.value.length > 0) {
    //make the button gray
    addbut.style.backgroundColor = "green";
  } else {
    //make the button white
    addbut.style.backgroundColor = "gray";
  }
});

addbut.addEventListener("click", () => {
  if (inputbox.value.length > 0) {
    //get the input value
    var inputvalue = inputbox.value;
    postData(inputvalue);
    inputbox.value = "";
  } else {
    alert("Please enter the value");
  }
  setTimeout(function () {
    //get the data
    getData();
  }, 300);
});

//get the changebut by class change-but
var change = document.querySelector(".change");
var changebut = document.querySelector(".change-but");
var textchange = document.querySelector(".edittext");
var currentId = 0;
changebut.addEventListener("click", () => {
  console.log(currentId);
  if (textchange.value.length > 0) {
    //get the input value
    var inputvalue = textchange.value;
    updateTodoTextById(currentId, inputvalue);
    textchange.value = "";
  } else {
    alert("Please enter the value");
  }
  setTimeout(function () {
    //get the data
    getData();
  }, 300);
  change.style.display = "none";
});

function edit(id) {
  currentId = id;
}

items.addEventListener("click", (e) => {
  //get the id of the obj
  var id = e.target.parentElement.getAttribute("id");
  //if the but is clicked
  if (e.target.classList.contains("deleteb")) {
    //get the id
    //delete the todo
    deleteTodoById(id);
    //wait 0.5s
    setTimeout(function () {
      //get the data
      getData();
    }, 300);
  }
  if (e.target.classList.contains("check")) {
    //check the box is checked or not
    select(e.target, id);
  }
  if (e.target.classList.contains("editb")) {
    //get the div by class change
    //display the div
    change.style.display = "block";
    edit(id);
  }
});

//Api key is 963b51-06e3ce-eb5539-555d01-2e13b7

function deleteallchild() {
  var items = document.querySelector(".toDo-items");
  while (items.firstChild) {
    items.removeChild(items.firstChild);
  }
}

function getData() {
  // initialize a list
  console.log("getData");
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var todos = JSON.parse(this.responseText);
      console.log(todos);
      deleteallchild();
      for (var i = 0; i < todos.length; i++) {
        var id = todos[i].id;
        var text = todos[i].text;
        var completed = todos[i].completed;
        let newTodo = document.createElement("div");
        newTodo.classList.add("obj");
        newTodo.setAttribute("id", id);
        newTodo.innerHTML = `<input type="checkbox" class="check" />
        <p class="textlist">${text}</p>
        <!--edit button-->
        <button class="editb">Edit</button>
        <button class="deleteb">Delete</button>`;
        items.appendChild(newTodo);
        if (completed) {
          newTodo.children[0].checked = true;
          newTodo.children[1].style.textDecoration = "line-through";
          newTodo.style.borderColor = "green";
        } else {
          newTodo.children[0].checked = false;
          newTodo.children[1].style.textDecoration = "none";
          newTodo.style.borderColor = "red";
        }
      }
    }
  };

  xhttp.open("GET", "https://cse204.work/todos", true);
  xhttp.setRequestHeader("x-api-key", "963b51-06e3ce-eb5539-555d01-2e13b7");
  xhttp.send();
}
//post the data to api
function postData(text) {
  console.log("postData");
  var data = {
    text: text,
  };

  var xhttp2 = new XMLHttpRequest();
  xhttp2.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var todo = JSON.parse(this.responseText);
      console.log(todo);
    } else if (this.readyState == 4) {
      console.log(this.responseText);
    }
  };
  xhttp2.open("POST", "https://cse204.work/todos", true);
  xhttp2.setRequestHeader("Content-type", "application/json");
  xhttp2.setRequestHeader("x-api-key", "963b51-06e3ce-eb5539-555d01-2e13b7");
  xhttp2.send(JSON.stringify(data));
}
//get a todo by id
function getTodoById(id) {
  console.log("getTodoById");
  var id = id;
  console.log(id);
  var data = {};

  // Initalize AJAX Request
  var xhttp2 = new XMLHttpRequest();

  // Response handler
  xhttp2.onreadystatechange = function () {
    // Wait for readyState = 4 & 200 response
    if (this.readyState == 4 && this.status == 200) {
      // parse JSON response
      var todo = JSON.parse(this.responseText);
      //if the todo is completed
      console.log(todo);
    } else if (this.readyState == 4) {
      // this.status !== 200, error from server
      console.log(this.responseText);
    }
  };

  xhttp2.open("GET", "https://cse204.work/todos/" + id, true);

  xhttp2.setRequestHeader("Content-type", "application/json");
  xhttp2.setRequestHeader("x-api-key", "963b51-06e3ce-eb5539-555d01-2e13b7");
  xhttp2.send(JSON.stringify(data));
}

//delete a todo by id
function deleteTodoById(id) {
  console.log("deleteTodoById");
  var id = id;
  var data = {};

  // Initalize AJAX Request
  var xhttp2 = new XMLHttpRequest();

  // Response handler
  xhttp2.onreadystatechange = function () {
    // Wait for readyState = 4 & 200 response
    if (this.readyState == 4 && this.status == 200) {
      // parse JSON response
      var todo = JSON.parse(this.responseText);

      console.log(todo);
    } else if (this.readyState == 4) {
      // this.status !== 200, error from server
      console.log(this.responseText);
    }
  };

  xhttp2.open("DELETE", "https://cse204.work/todos/" + id, true);

  xhttp2.setRequestHeader("Content-type", "application/json");
  xhttp2.setRequestHeader("x-api-key", "963b51-06e3ce-eb5539-555d01-2e13b7");
  xhttp2.send(JSON.stringify(data));
}

//update a todo by id
function updateTodoById(id, completed) {
  console.log("updateTodoById");
  var id = id;
  var data = {
    completed: completed,
  };

  // Initalize AJAX Request
  var xhttp2 = new XMLHttpRequest();

  // Response handler
  xhttp2.onreadystatechange = function () {
    // Wait for readyState = 4 & 200 response
    if (this.readyState == 4 && this.status == 200) {
      // parse JSON response
      var todo = JSON.parse(this.responseText);

      console.log(todo);
    } else if (this.readyState == 4) {
      // this.status !== 200, error from server
      console.log(this.responseText);
    }
  };

  xhttp2.open("PUT", "https://cse204.work/todos/" + id, true);

  xhttp2.setRequestHeader("Content-type", "application/json");
  xhttp2.setRequestHeader("x-api-key", "963b51-06e3ce-eb5539-555d01-2e13b7");
  xhttp2.send(JSON.stringify(data));
}

//update a todo text by id
function updateTodoTextById(id, text) {
  console.log("updateTodoTextById");
  var id = id;
  var data = {
    text: text,
  };

  // Initalize AJAX Request
  var xhttp2 = new XMLHttpRequest();

  // Response handler
  xhttp2.onreadystatechange = function () {
    // Wait for readyState = 4 & 200 response
    if (this.readyState == 4 && this.status == 200) {
      // parse JSON response
      var todo = JSON.parse(this.responseText);

      console.log(todo);
    } else if (this.readyState == 4) {
      // this.status !== 200, error from server
      console.log(this.responseText);
    }
  };

  xhttp2.open("PUT", "https://cse204.work/todos/" + id, true);

  xhttp2.setRequestHeader("Content-type", "application/json");
  xhttp2.setRequestHeader("x-api-key", "963b51-06e3ce-eb5539-555d01-2e13b7");
  xhttp2.send(JSON.stringify(data));
}

getData();

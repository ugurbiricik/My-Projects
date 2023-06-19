const inputTodo = document.querySelector("#inputTodo");
const btnTodo = document.querySelector("#btnTodo");
const ulTodo = document.querySelector("#ulTodo");
const containerInput = document.querySelector(".containerInput");

let todos = JSON.parse(localStorage.getItem("TODOS")) || [];

todos.forEach((todo) => {
    createNewList(todo);
});

btnTodo.addEventListener("click", () => {
    if (inputTodo.value.trim() === "") {
        const alertContent = document.createElement("span");
        alertContent.classList.add("alertContent");
        containerInput.appendChild(alertContent);
        alertContent.innerHTML = "Please Enter New Todo";

        setTimeout(() => {
            alertContent.remove();
        }, 2000);
    } else {
        const newTodo = {
            id: new Date().getTime(),
            completed: false,
            text: inputTodo.value,
        };

        createNewList(newTodo);
        todos.push(newTodo);
        localStorage.setItem("TODOS", JSON.stringify(todos));
        inputTodo.value = "";
    }
});

function createNewList(newList) {
    const { id, completed, text } = newList;
    const li = document.createElement("li");
    li.setAttribute("id", id);
    completed && li.classList.add("checked");

    const iconCheck = document.createElement("i");
    iconCheck.setAttribute("class", "fas fa-check");

    const paragraph = document.createElement("p");
    const pContent = document.createTextNode(text);

    const iconDelete = document.createElement("i");
    iconDelete.setAttribute("class", "fas fa-trash");

    ulTodo.appendChild(li);
    li.appendChild(iconCheck);
    li.appendChild(paragraph);
    li.appendChild(iconDelete);
    paragraph.appendChild(pContent);
}

ulTodo.addEventListener("click", (e) => {
    let id = e.target.parentElement.getAttribute("id");
    if (e.target.classList.contains("fa-trash")) {
        e.target.parentElement.remove();
        todos = todos.filter((todo) => todo.id !== Number(id));
        localStorage.setItem("TODOS", JSON.stringify(todos));
    } else if (e.target.classList.contains("fa-check"))
        e.target.parentElement.classList.toggle("checked");
    todos.map((todo, index) => {
        if (todo.id == id) {
            todos[index].completed = !todos[index].completed;
        }
        localStorage.setItem("TODOS", JSON.stringify(todos));
    });
});

inputTodo.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        btnTodo.click();
    }
});

window.onload = () => {
    inputTodo.focus();
};
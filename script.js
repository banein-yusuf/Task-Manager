function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

const toggleBtn = document.getElementById("toggleDarkMode");
const body = document.body;

if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark");
    toggleBtn.textContent = "Light Mode";
}

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        localStorage.setItem("darkMode", "enabled");
        toggleBtn.textContent = "Light Mode";
    } else {
        localStorage.setItem("darkMode", "disabled");
        toggleBtn.textContent = "Dark Mode";
    }
});
let taskInput = document.querySelector("#nt");
let taskList = document.querySelector("#tl");
let errorMsg = document.querySelector("#errorMsg");

window.addEventListener("load", function () {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        createTaskElement(task);
    });
});

document.querySelector("#add").addEventListener("click", function () {
    let taskText = taskInput.value.trim();
    errorMsg.innerText = "";

    if (taskText !== "") {
        createTaskElement(taskText);
        saveTask(taskText);
        taskInput.value = "";
        showToast("Task added!");
    } else {
        errorMsg.innerText = "Please enter a task!";
    }
});

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.unshift(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(oldText, newText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let index = tasks.indexOf(oldText);
    if (index !== -1) {
        tasks[index] = newText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function createTaskElement(taskText) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.innerText = taskText;
    li.appendChild(span);

    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.addEventListener("click", function () {
        if (editBtn.innerText === "Edit") {
            let input = document.createElement("input");
            input.type = "text";
            input.value = span.innerText;
            li.replaceChild(input, span);
            editBtn.innerText = "Save";
        } else {
            let input = li.querySelector("input");
            let newText = input.value.trim();
            if (newText !== "") {
                updateTask(span.innerText, newText);
                span.innerText = newText;
                li.replaceChild(span, input);
                editBtn.innerText = "Edit";
                showToast("Task updated.");
            }
        }
    });
    li.appendChild(editBtn);

    let delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.addEventListener("click", function () {
        showConfirm("Are you sure you want to delete this task?", function () {
            li.remove();
            deleteTask(span.innerText);
            showToast("Task deleted.");
        });

    });
    li.appendChild(delBtn);



    taskList.appendChild(li);
}
function showConfirm(message, onConfirm) {
    const box = document.getElementById("confirmBox");
    const msg = document.getElementById("confirmMessage");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    msg.innerText = message;
    box.style.display = "flex";

    yesBtn.onclick = function () {
        box.style.display = "none";
        onConfirm();
    };

    noBtn.onclick = function () {
        box.style.display = "none";
    };
}
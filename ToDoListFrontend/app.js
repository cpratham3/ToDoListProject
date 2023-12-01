// app.js
document.addEventListener("DOMContentLoaded", function () {
    fetchTasks();
});

console.log(newTask);

function fetchTasks() {
    fetch("http://localhost:8080/api/tasks")
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = "";
            tasks.forEach(task => {
                const li = document.createElement("li");
                li.innerHTML = `${task.description} <button onclick="deleteTask(${task.id})">Delete</button>`;
                taskList.appendChild(li);
            });
        });
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDateInput");
    const newTask = {
        description: taskInput.value,
        dueDate: formatDate(dueDateInput.value)
    };

    fetch("http://localhost:8080/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(() => {
        taskInput.value = "";
        dueDateInput.value = "";
        fetchTasks();
    })
    .catch(error => console.error("Error:", error));
}
function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('en-US').format(date);
    return formattedDate;
}

function deleteTask(id) {
    fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: "DELETE"
    })
        .then(() => fetchTasks());
}

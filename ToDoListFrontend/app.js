// app.js
document.addEventListener("DOMContentLoaded", function () {
    fetchTasks();
});



function fetchTasks() {
    fetch("http://localhost:8080/api/tasks")
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = "";

            tasks.forEach(task => {
                const li = document.createElement("li");
                li.className = "task-item";
                li.innerHTML = `
                <input type="checkbox" id="task_${task.id}" ${task.completed ? 'checked' : ''} 
                       onchange="updateTaskCompleted(${task.id}, this.checked)">
                <label for="task_${task.id}">${task.description}</label>
                <button onclick="deleteTask(${task.id})">Delete</button>
            `;
                taskList.appendChild(li);
            });
        });
}
function updateTaskCompleted(id, completed) {
    fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            completed: completed
        })
    })
    .then(() => fetchTasks());
    console.log("updateTaskCompleted");//added this to console so that we know this function was actually called
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDateInput");
    const newTask = {
        description: taskInput.value,
        dueDate: formatDate(dueDateInput.value),
        completed: false // Assuming a new task is initially not completed
    };
    console.log(newTask);
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
// Helper function to format the date
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



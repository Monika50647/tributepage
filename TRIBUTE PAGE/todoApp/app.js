document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Display tasks on the page
    function displayTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function (task, index) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task}</span>
                <button class="edit" data-index="${index}">Edit</button>
                <button class="delete" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(li);
        });
        saveTasks();
    }

    // Add a new task
    addTaskButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push(taskText);
            displayTasks();
            taskInput.value = '';
        }
    });

    // Edit or Delete tasks
    taskList.addEventListener('click', function (e) {
        if (e.target.classList.contains('edit')) {
            const index = e.target.getAttribute('data-index');
            const editedTask = prompt('Edit task:', tasks[index]);
            if (editedTask !== null) {
                tasks[index] = editedTask;
                displayTasks();
            }
        } else if (e.target.classList.contains('delete')) {
            const index = e.target.getAttribute('data-index');
            tasks.splice(index, 1);
            displayTasks();
        }
    });

    // Save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Initial display of tasks
    displayTasks();
});

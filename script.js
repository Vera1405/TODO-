document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const taskList = document.getElementById('taskList');

    // Получаем сохраненные задачи из localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Отображаем сохраненные задачи
    savedTasks.forEach(task => {
        addTaskToList(task.text, task.completed);
    });

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTaskToList(taskText, false);
            taskInput.value = '';
            saveTasks();
        }
    });

    clearAllBtn.addEventListener('click', () => {
        taskList.innerHTML = '';
        localStorage.removeItem('tasks'); // Очистка localStorage
    });

    clearCompletedBtn.addEventListener('click', () => {
        const completedTasks = document.querySelectorAll('.completed');
        completedTasks.forEach(task => task.remove());
        saveTasks();
    });

    function addTaskToList(text, completed) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${completed ? 'checked' : ''}>
            <span>${text}</span>
            <button class="deleteButton">Удалить</button>
        `;

        // Обработчик для удаления задачи
        li.querySelector('.deleteButton').addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });

        // Обработчик для отметки задачи как выполненной
        li.querySelector('input[type="checkbox"]').addEventListener('change', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        taskList.appendChild(li);
    }

    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => {
            return {
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            };
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});

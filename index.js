
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    createTaskElement(task.text, task.state, task.id);
  });
}

function saveTasks() {
  const taskElements = document.querySelectorAll('.task');
  const tasks = [];
  taskElements.forEach((task, index) => {
    tasks.push({
      id: index,
      text: task.querySelector('.task-text').innerText,
      state: task.parentElement.id
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskElement(text, state, id) {
  const li = document.createElement('li');
  li.className = 'task';
  li.setAttribute('data-id', id);
    
  const textNode = document.createElement('span');
  textNode.className = 'task-text';
  textNode.innerText = text;
  li.appendChild(textNode);

  const upButton = document.createElement('button1');
  upButton.innerText = '';
  upButton.addEventListener('click', function() {
    moveTask(this, 'up');
  });
  li.appendChild(upButton);

  const downButton = document.createElement('button2');
  downButton.innerText = '';
  downButton.addEventListener('click', function() {
    moveTask(this, 'down');
  });
  li.appendChild(downButton);

  const deleteButton = document.createElement('button3');
  deleteButton.innerText = '✕';
  deleteButton.addEventListener('click', function() {
    deleteTask(this);
  });
  li.appendChild(deleteButton);

  document.getElementById(state).appendChild(li);
}

function moveTask(button, direction) {
  const task = button.parentElement;
  const currentList = task.parentElement;
  const targetList = direction === 'up' ? currentList.previousElementSibling : currentList.nextElementSibling;

  if (targetList) {
    targetList.appendChild(task);
    saveTasks();
  }
}
function deleteTask(button) {
  const task = button.parentElement;
  task.remove();
  saveTasks();
}

// Create a new task
document.getElementById('btn-crear').addEventListener('click', function() {
  const text = document.getElementById('texto-tarjeta').value.trim();
  if (text !== '') {
    createTaskElement(text, 'to-do', document.querySelectorAll('.task').length);
    saveTasks();
    document.getElementById('texto-tarjeta').value = '';
  }
});

// Load tasks on page load
loadTasks();
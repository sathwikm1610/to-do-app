 
const loginButton = document.getElementById('login-btn');
const registerButton = document.getElementById('register-btn');
const authSection = document.getElementById('auth-section');
const todoSection = document.getElementById('todo-section');
const taskForm = document.getElementById('todo-form');
const taskList = document.getElementById('task-list');

loginButton.addEventListener('click', () => {
  const username = prompt('Enter your username:');
  const password = prompt('Enter your password:');
  fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert('Login successful!');
        authSection.classList.add('hidden');
        todoSection.classList.remove('hidden');
        loadTasks();
      } else {
        alert(data.message);
      }
    });
});

registerButton.addEventListener('click', () => {
  const username = prompt('Enter a username:');
  const password = prompt('Enter a password:');
  fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => alert(data.message));
});

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = document.getElementById('task-input').value;
  fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task }),
  })
    .then((res) => res.json())
    .then((data) => {
      loadTasks();
      taskForm.reset();
    });
});

function loadTasks() {
  fetch('/api/tasks')
    .then((res) => res.json())
    .then((data) => {
      taskList.innerHTML = '';
      data.forEach((task) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        taskList.appendChild(li);
      });
    });
}

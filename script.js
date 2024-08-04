const form = document.querySelector('#todo-form');
const taskTitleInput = document.querySelector('#task-title-input');
const todoListUl = document.querySelector('#todo-list');

let tasks = [];

function renderTaskOnHTML(taskTitle, done = false) {
  const li = document.createElement('li');

  const input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.addEventListener('change', (event) => {
    const liToToggle = event.target.parentElement;

    const spanToToggle = liToToggle.querySelector('span');

    const done = event.target.checked;
    if (done) {
      spanToToggle.style.textDecoration = 'line-through';
    } else {
      spanToToggle.style.textDecoration = 'none';
    }

    tasks = tasks.map((t) => {
      if (t.title === spanToToggle.textContent) {
        return {
          title: t.title,
          done: !t.done,
        };
      }
      return t;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
  input.checked = done;

  const span = document.createElement('span');
  span.textContent = taskTitle;
  if (done) {
    span.style.textDecoration = 'line-through';
  }

  const button = document.createElement('button');
  button.textContent = 'Remover';
  button.addEventListener('click', (event) => {
    const liToRemove = event.target.parentElement;

    const titleToRemove = liToRemove.querySelector('span').textContent;
    tasks = tasks.filter((t) => t.title !== titleToRemove);

    todoListUl.removeChild(liToRemove);

    localStorage.setItem('tasks', JSON.stringify(tasks));
  });

  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(button);

  todoListUl.appendChild(li);
}

window.onload = () => {
  const tasksOnLocalStorage = localStorage.getItem('tasks');

  if (!tasksOnLocalStorage) return;

  tasks = JSON.parse(tasksOnLocalStorage);

  tasks.forEach((t) => {
    renderTaskOnHTML(t.title, t.done);
  });
};

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita o comportamento padrão de recarregar a página ao submeter o formulário

  const taskTitle = taskTitleInput.value;

  if (taskTitle.length < 3) {
    alert('Sua tarefa precisa ter, pelo menos, 3 caracteres.');
    return;
  }

  // Add nova tarefa no array de tasks
  tasks.push({
    title: taskTitle,
    done: false,
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Add nova tarefa no html
  renderTaskOnHTML(taskTitle);

  taskTitleInput.value = '';
});

function showValues() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
  let list = document.getElementById('todo-list');
  list.innerHTML = '';
  for (let i = 0; i < values.length; i++) {
    list.innerHTML += `<li>${values[i]['name']}<button id='btn-ok' onclick='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
      </svg></button></li>`;
  }
}

function removeItem(data) {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
  let index = values.findIndex((x) => x.name == data);
  values.splice(index, 1);
  localStorage.setItem(localStorageKey, JSON.stringify(values));
  showValues();
}

showValues();

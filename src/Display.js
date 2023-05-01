import { addTask, removeTask } from './addAndRemoveTask.js';

const toDoList = document.getElementById('to-do-list');
toDoList.classList.add('list');

export const display = () => {
  const lists = localStorage.getItem('toDoList');
  const get = JSON.parse(lists);
  let tasks = [];
  if (get) {
    toDoList.innerHTML = '';
    tasks = get;
    toDoList.style.display = 'block';
    tasks.forEach((item, indexNo) => {
      item.index = indexNo;
      const listItem = document.createElement('li');
      listItem.className = 'list-item';

      const completed = document.createElement('button');
      completed.className = 'todo';

      const description = document.createElement('span');
      description.className = 'task-item';
      description.textContent = item.description;

      const deleteItem = document.createElement('button');
      deleteItem.className = 'delete-item';
      deleteItem.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"></path></svg>';
      deleteItem.addEventListener('click', (e) => {
        removeTask(indexNo);
        display();
      });

      const move = document.createElement('button');
      move.className = 'move-item';
      move.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clip-rule="evenodd"></path></svg>';
      listItem.appendChild(completed);
      listItem.appendChild(description);

      listItem.appendChild(deleteItem);
      listItem.appendChild(move);
      toDoList.appendChild(listItem);
    });
    localStorage.setItem('toDoList', JSON.stringify(tasks));
  }
};

window.addEventListener('DOMContentLoaded', (e) => {
  display();
  const form = document.getElementById('add-task-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskInput = document.getElementById('add-task');
    const description = taskInput.value;
    addTask(description);
    taskInput.value = '';
    display();
  });

  const enter = document.querySelector('#submit-task');
  enter.addEventListener('click', (e) => {
    e.preventDefault();
    const taskInput = document.getElementById('add-task');
    const description = taskInput.value;
    addTask(description);
    taskInput.value = '';
    display();
  });
});

import { editItem, saveEdit } from './Edits.js';
import { addTask, removeTask } from './AddRemoveTask.js';
import { checkTaskDone } from './CheckAndClear.js';

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
      completed.addEventListener('click', (e) => {
        checkTaskDone(e, indexNo);
      });

      const description = document.createElement('span');
      description.className = 'task-item';
      description.textContent = item.description;

      if (item.completed === true) {
        listItem.classList.add('completed');
        completed.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L8 9.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M1.5 13A1.5 1.5 0 003 14.5h10a1.5 1.5 0 001.5-1.5V8a.5.5 0 00-1 0v5a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5V3a.5.5 0 01.5-.5h8a.5.5 0 000-1H3A1.5 1.5 0 001.5 3v10z" clip-rule="evenodd"></path></svg>';
        description.style.textDecoration = 'line-through';
      }
      if (item.completed === false) {
        listItem.classList.add('uncompleted');
        completed.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M7,5C5.897,5,5,5.897,5,7v10c0,1.103,0.897,2,2,2h10c1.103,0,2-0.897,2-2V7c0-1.103-0.897-2-2-2H7z M7,17V7h10l0.002,10H7z"></path></svg>';
        description.style.textDecoration = 'none';
      }
      // Edit Buttons
      const saveBtn = document.createElement('button');
      saveBtn.className = 'edit-btn-save';
      saveBtn.innerHTML = '<p>Save</p>';
      saveBtn.style.display = 'none';

      const editBtn = document.createElement('button');
      editBtn.className = 'edit-btn';
      editBtn.style.marginLeft = 'auto';
      editBtn.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z"></path></svg>';

      editBtn.addEventListener('click', (e) => {
        const item = e.currentTarget.parentNode.children[1];
        editBtn.style.display = 'none';
        saveBtn.style.display = '';
        editItem(item);
      });

      saveBtn.addEventListener('click', (e) => {
        saveBtn.style.display = 'none';
        editBtn.style.display = '';
        saveEdit(item);
        display();
      });

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
      listItem.appendChild(saveBtn);
      listItem.appendChild(editBtn);
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

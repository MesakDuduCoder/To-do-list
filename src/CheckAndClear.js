import { display } from './Display.js';

export const checkTaskDone = (e, indexNo) => {
  const lists = localStorage.getItem('toDoList');
  const get = JSON.parse(lists);
  let tasks = [];
  if (get) {
    tasks = get;
  }

  const todoList = e.currentTarget.parentNode;

  if (todoList.classList.contains('completed')) {
    tasks.forEach((taskItem) => {
      if (taskItem.index === indexNo) {
        taskItem.completed = false;
        localStorage.setItem('toDoList', JSON.stringify(tasks));
      }
    });
    display();
  }

  if (todoList.classList.contains('uncompleted')) {
    tasks.forEach((taskItem) => {
      if (taskItem.index === indexNo) {
        taskItem.completed = true;
        localStorage.setItem('toDoList', JSON.stringify(tasks));
      }
    });
    display();
  }
};

export const clearTasks = (e) => {
  const lists = localStorage.getItem('toDoList');
  const get = JSON.parse(lists);
  let tasks = [];
  if (get) {
    tasks = get;
  }

  const newTasks = tasks.filter((item) => item.completed === false);
  localStorage.setItem('toDoList', JSON.stringify(newTasks));

  display();
};
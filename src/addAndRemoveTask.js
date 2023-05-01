const lists = localStorage.getItem('toDoList');
const get = JSON.parse(lists);
let tasks = [];
if (get) {
  tasks = get;
}

export const addTask = (description) => {
  tasks.push({
    description,
    completed: false,
    index: tasks.length,
  });
  localStorage.setItem('toDoList', JSON.stringify(tasks));
};

export const removeTask = (indexNo) => {
  tasks.splice(indexNo, 1);
  localStorage.setItem('toDoList', JSON.stringify(tasks));
};

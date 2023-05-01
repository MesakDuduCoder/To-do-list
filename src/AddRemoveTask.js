export const addTask = (description) => {
  const lists = localStorage.getItem('toDoList');
  const get = JSON.parse(lists);
  let tasks = [];
  if (get) {
    tasks = get;
  }

  tasks.push({
    description,
    completed: false,
    index: tasks.length,
  });
  localStorage.setItem('toDoList', JSON.stringify(tasks));
};

export const removeTask = (indexNo) => {
  const lists = localStorage.getItem('toDoList');
  const get = JSON.parse(lists);
  let tasks = [];
  if (get) {
    tasks = get;
  }

  tasks.splice(indexNo, 1);
  localStorage.setItem('toDoList', JSON.stringify(tasks));
};

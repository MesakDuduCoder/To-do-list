export const editItem = (item) => {
  const writeEdit = document.createElement('input');
  writeEdit.id = 'edit';
  writeEdit.type = 'text';
  writeEdit.value = item.innerHTML;
  item.innerHTML = '';
  item.parentNode.insertBefore(writeEdit, item.nextSibling);
};

export const saveEdit = (item) => {
  const lists = localStorage.getItem('toDoList');
  const get = JSON.parse(lists);
  let tasks = [];
  if (get) {
    tasks = get;
  }

  const newValue = document.querySelector('#edit');
  tasks.forEach((taskItem) => {
    if (item.description === taskItem.description) {
      taskItem.description = newValue.value;
    }
  });
  localStorage.setItem('toDoList', JSON.stringify(tasks));
};

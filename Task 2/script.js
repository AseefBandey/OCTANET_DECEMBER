const todoList = document.getElementById('todo-list');
let savedItems = JSON.parse(localStorage.getItem('todoItems')) || [];

//Render the saved items on the screen
function renderTodoList() {
  //Clear the todoList element
  todoList.innerHTML = '';
  
  //Render each item in the savedItems array
  savedItems.forEach((item, index) => {
    //Create a new list item for the item
    const li = document.createElement('li');
    li.innerText = item;
    
    //Create buttons for crossing out, editing, and deleting the item
    const crossOutButton = document.createElement('button');
    crossOutButton.classList.add("buttons");
    crossOutButton.innerHTML = '<i id="cross-button" class="fa-solid fa-circle-check"></i>';
    crossOutButton.addEventListener('click', () => {
      li.classList.toggle('crossed-out');
      const itemID = document.getElementById('cross-button');
      localStorage.setItem(itemID, 'crossed-out');
      updateSavedItems();
      renderTodoList();
    });
    
    const editButton = document.createElement('button');
    editButton.classList.add("buttons");
    editButton.innerHTML = '<i id="edit-button" class="fa-solid fa-pen"></i>';
    editButton.addEventListener('click', () => {
      const newTitle = prompt('Enter the new title for this item:', item);
      if (newTitle) {
        savedItems[index] = newTitle;
        updateSavedItems();
        renderTodoList();
      }
    });
    
    const deleteButton = document.createElement('button');
    deleteButton.classList.add("buttons");
    deleteButton.innerHTML = '<i id="delete-button" class="fa-solid fa-trash-can"></i>';
    deleteButton.addEventListener('click', () => {
      savedItems.splice(index, 1);
      updateSavedItems();
      renderTodoList();
    });
    
    //Add the buttons to the list item, and add the list item to the todoList element
    li.appendChild(crossOutButton);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
}

//Add an event listener to the form to save new items to local storage
const form = document.getElementById('todo-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.getElementById('todo-input');
  const newItem = input.value;
  savedItems.push(newItem);
  updateSavedItems();
  renderTodoList();
  input.value = '';
});

//Update the saved items in local storage
function updateSavedItems() {
  localStorage.setItem('todoItems', JSON.stringify(savedItems));
}

//Render the initial todo list when the page loads
renderTodoList();
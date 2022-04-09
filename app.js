// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

// Load all event listeners
function loadEventListeners(){
    // DOM load event
    document.addEventListener('DOMContentLoaded', displayTasksInLocalStorage);
    // Add task event
    form.addEventListener('submit',addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearButton.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get tasks from local storage
function displayTasksInLocalStorage(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach( (task) =>{
        // Else Create a new li element to display on task-list
    const li = document.createElement('li');
    // Add class
    li.className='collection-item';
    // Create a text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element for deleting
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // Add icon for delete link
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Add link to current li
    li.appendChild(link);
    // Add li to ul -> append list item to task list
    taskList.appendChild(li);
    })
}

// Add task
function addTask(e){
    if(taskInput.value === '')
        alert('Add a valid task')

    // Else Create a new li element to display on task-list
    const li = document.createElement('li');
    // Add class
    li.className='collection-item';
    // Create a text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element for deleting
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // Add icon for delete link
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Add link to current li
    li.appendChild(link);
    // Add li to ul -> append list item to task list
    taskList.appendChild(li);

    // Store task in Local storage
    storeTaskInLocalStorage(taskInput.value);


    // Clear input
    taskInput.value="";

    e.preventDefault();
}

// Store task in LS
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e){
    // Remove from DOM
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();
    }

    // Remove from local storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

// Remove single task from local storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach( (task, index) => {
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear task list
function clearTasks(){
    if(confirm("Are you sure?")){
        while(taskList.firstChild)
        taskList.removeChild(taskList.firstChild);

    // Delete all tasks from local storage
    localStorage.clear();
    }
}

// Filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        (task) => {
            const item = task.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display='block';
            } else{
                task.style.display='none';
            }
        }
    )
}
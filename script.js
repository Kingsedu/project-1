const taskInput = document.querySelector(".task-input input");
const filters = document.querySelectorAll(".filter span")
const taskBox = document.querySelector('.task-box');


let editId;
let isEditedTask = false;



//checking if the todos is available;
let todos = JSON.parse(localStorage.getItem('todo-list'));

filters.forEach(btn =>{
  btn.addEventListener("click", ()=>{
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id)
  })
})

function showTodo(filters){
    let li = ""
       if(todos){
        todos.forEach((todo, id) =>{
          //if todo status is completed, set the isCompleted value 
         let isCompleted = todo.status == 'completed' ? 'checked' : ''
         if(filters == todo.status || filters == "all"){
          li +=`<li class="task">
          <label for="${id}">
            <input onclick="upatedStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
            <p class="${isCompleted}">${todo.name}</p>
          </label>
          <div class="settings">
            <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
               <ul class="task-menu">
                   <li onclick="editTask(${id}, '${todo.name}')"><i class="fa-solid fa-pen"></i>Edit</li>
                   <li onclick="deleteTask(${id})"><i class="fa-solid fa-trash"></i>Delete</li>
               </ul>
           </div> 
       </li>`
     }
 })
 }
 taskBox.innerHTML = li;
       }
  showTodo("all")



  function showMenu(selectedTask){
  
     let taskMenu = selectedTask.parentElement.lastElementChild;
     taskMenu.classList.add('show');
     document.addEventListener('click', e=>{
      //removing the show Class from the task menu
      if(e.target.tagName != 'I' || e.target != selectedTask){
        taskMenu.classList.remove('show')
      }
     })
  }

  function editTask(taskId, taskName){
    console.log(taskId, taskName);
     editId = taskId;
     isEditedTask = true
     taskInput.value = taskName;
  }
  function deleteTask(deleteId){
     todos.splice(deleteId, 1);
     localStorage.setItem("todo-list", JSON.stringify(todos));
     showTodo();
  }
function upatedStatus(selectedTask){
    //getting paragraph that contains task name;
    let taskName = selectedTask.parentElement.lastElementChild;
      if(selectedTask.checked){
        //updating the status of selected task to completed
            taskName.classList.add('checked');
            todos[selectedTask.id].status = "completed"
         }
         else{
           //updating the status of selected task to pending
             taskName.classList.remove("checked");
             todos[selectedTask.id].status = "pending"
     }
     localStorage.setItem('todo-list', JSON.stringify(todos))
}


taskInput.addEventListener('keyup', (evt)=>{
    let userTask = taskInput.value.trim();
    if (evt.key == 'Enter' && userTask){
      //getting the localStorage todo-list if they exist in the localStorage;//
      if(!isEditedTask){  //if isEditedTask isn't true
          if(!todos){  //if todos isn't exist, pass an empty array to todos;
          todos = [];
         }
         let taskInfo = {name: userTask, status: 'pending'};
         todos.push(taskInfo); //adding nw Task to todos;
      } else{
        isEditedTask = false;
        todos[editId].name = userTask;
      }
        taskInput.value = '';
        localStorage.setItem('todo-list', JSON.stringify(todos))
      showTodo();
    }
})


  
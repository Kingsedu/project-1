const taskInput = document.querySelector(".task-input input");

const taskBox = document.querySelector('.task-box');




//checking if the todos is available;
let todos = JSON.parse(localStorage.getItem('todo-list'));

function showTodo(){
    let li = ""
       if(todos){
        todos.forEach((todo, id) =>{
          //if todo status is completed, set the isCompleted value to checked
          let isCompleted = todo.status == 'completed' ? 'checked' : ''
            li +=`<li class="task">
                     <label for="${id}">
                       <input onclick="upatedStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                       <p class="${isCompleted}">${todo.name}</p>
                     </label>
                     <div class="settings">
                       <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                          <ul class="task-menu">
                              <li><i class="fa-solid fa-pen"></i>Edit</li>
                              <li onclick="deleteTask(${id})"><i class="fa-solid fa-trash"></i>Delete</li>
                          </ul>
                      </div> 
                      
                  </li>`
         })
         taskBox.innerHTML = li;
       }
       }
  showTodo()



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


  function deleteTask(deleteId){
    console.log(deleteId)
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
       if(!todos){
        todos =[]
       }
    
      taskInput.value = '';
      let taskInfo = {name: userTask, status: 'pending'};
      todos.push(taskInfo); //adding nw Task to todos;
      localStorage.setItem('todo-list', JSON.stringify(todos))
      showTodo();
    }
})


  
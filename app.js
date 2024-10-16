
//selectors
const  todoInput = document.querySelector('.todo-input')
const  todoButton = document.querySelector('.todo-button')
const  todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos)
todoButton.addEventListener('click',addTo)
todoList.addEventListener('click',deleteCheck)
filterOption.addEventListener('click',filterTodo)


//function
function addTo(event){
    event.preventDefault()
    //create div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    //add todo to localstorage
    saveLocalTodos(todoInput.value)
    //check mark button

    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)

    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)

    //apend to todolist
    todoList.appendChild(todoDiv)


    //clear todo input value
    todoInput.value=""

}

function deleteCheck(e){
    console.log(e.target)

    const item = e.target
    //delete
    if(item.classList[0]=='trash-btn'){
        const todo = item.parentElement;
        //Add animation
        todo.classList.add('fall')
        removeLocalTodos(todo)
        todo.addEventListener('transitionend',function(){
            todo.remove()
        })
    }


    //checkmark
    if(item.classList[0]=='complete-btn'){
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}

function filterTodo(e){
    const todos = Array.from(todoList.childNodes).filter(node => node.nodeType === 1); 
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display="flex"
                console.log(todo, "displaying all");
                break
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex"
                    console.log(todo, "displaying completed");
                }else{
                    todo.style.display = "none"
                }
                break
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display='flex'
                }else{
                    todo.style.display = "none"
                }
                break

        }
    })
}

function saveLocalTodos(todo){
    //check whether i already have thing in there?
    let todos
    if(localStorage.getItem('todos') == null){
        todos=[]
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos',JSON.stringify(todos))
}

function getTodos(){
    let todos
    if(localStorage.getItem('todos') == null){
        todos=[]
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach(function(todo){
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)

        
        
        //check mark button

        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)

        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)

        //apend to todolist
        todoList.appendChild(todoDiv)
    })
}

function removeLocalTodos(todo){
    let todos
    if(localStorage.getItem('todos') == null){
        todos=[]
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    // console.log(todo.children[0].innerText)
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex),1)
    localStorage.setItem("todos",JSON.stringify(todos))
}




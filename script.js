import { createStore } from "redux";
import taskReducer from "./taskReducer";
import { addTask, removeTask, toggleTask, calculateTotalTasks } from "./actions";

const store = createStore(taskReducer)

store.subscribe(() => {
   renderTasks()
})

const addTaskBtn = document.querySelector("#addTaskBtn")
const taskList = document.querySelector("#taskList")
const totalTasks = document.querySelector("#totalTasks")

window.addTaskHandler = () => {
    const taskOne = document.querySelector("#taskOne").value
const taskTwo = document.querySelector("#taskTwo").value
    if(taskOne || taskTwo){
        store.dispatch(addTask({id: Date.now(), name: taskOne + ": " + taskTwo, completed: false}))
    }
    
    store.dispatch(calculateTotalTasks())
}

const renderTasks = () => {
    const state = store.getState()

    taskList.innerHTML = ""
   const taskItems = state.tasks.map(task => `
   <div>
   <li>
   <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskHandler(${task.id})">${task.id}.${task.name}${task.completed ? ": Completed" : ""}
   </li>
   </div>
   `).join("")
    taskList.innerHTML = taskItems     

totalTasks.innerHTML = `Total Tasks: ${state.totalTasks}`
}

window.toggleTaskHandler = (taskId) => {
    store.dispatch(toggleTask(taskId));
    store.dispatch(calculateTotalTasks());
}

window.removeTaskHandler = () => {
    const taskId = parseInt(document.querySelector("#removeBtnId").value)
    store.dispatch(removeTask(taskId))
    store.dispatch(calculateTotalTasks())
}

addTaskBtn.addEventListener("click", addTaskHandler)
renderTasks() 
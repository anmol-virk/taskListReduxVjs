import { ADD_TASK, REMOVE_TASK, TOGGLE_TASK, CALCULATE_TOTAL_TASKS } from "./actions"

const initialState = {tasks: [], totalTasks: 0,  nextId: 1}

const taskReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TASK:
            return {...state, tasks: [...state.tasks, {...action.payload, id: state.nextId}], nextId: state.nextId + 1}
        case REMOVE_TASK:
            return {...state, tasks: state.tasks.filter(task => task.id !== action.payload)} 
            case TOGGLE_TASK:
                return {...state, tasks: state.tasks.map(task => task.id === action.payload ? {...task, completed: !task.completed} : task)}
            case CALCULATE_TOTAL_TASKS:
                //const total = state.tasks.reduce((acc, curr) => acc + curr, 0)
                return {...state, totalTasks: state.tasks.length }
                default:
                    return state
    }
}

export default taskReducer
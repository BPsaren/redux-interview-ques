/*  //Note that- old state can not be update(mutable)

import {createStore} from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';

//ki mi taks hote pare
const ADD_TASK="task/add";
const DELETE_TASK="task/delete";

const initialState={
    //task means akhane vivinno dhoroner task hote pare, may be filter kora, update kora, delete etc
    task:[],
   // isLoading :false
};

const taskReducer=(state=initialState,action)=>{
    //users ki dhoRoner case find out korte chaiche
  switch (action.type) {
    case ADD_TASK:
      return {
        //sate k sprade korbo mane old state update kora jabe na 
        ...state,
        //. dilam karon previous data same ai thakuk but natun data ami end a add korbo
        task:[...state.task,action.payload],
      }



      case DELETE_TASK:


        const updateTask=state.task.filter((currIndex,index)=>{
                 return index!== action.payload;
        })
        return {
            ...state,
              task:updateTask,
        }
  
    default:
    return state;
  }
}
//export default taskReducer;

 export const store=createStore(taskReducer,
  composeWithDevTools());
//console.log(store);


//console.log("initial state ",store.getState());



//dispatch a add task
//old Strategies--------------------------------1
 store.dispatch({type:ADD_TASK,payload:"buy a pen from amazon India "})
console.log("updated task:", store.getState());


 //old dispatch a delete task
store.dispatch({type:DELETE_TASK,payload:1})
console.log("deleted task:", store.getState());
 


//New Strategies for add task function--------------------1

 export const addTask=(data)=>{
   return  {type:ADD_TASK,payload:data}
}

//new  Strategies add data--------------------------------1
store.dispatch(addTask("buy a new rulex watch"));
console.log("updated task:", store.getState());

store.dispatch(addTask("buy a new rulex watchiopp"));
console.log("updated task:", store.getState()); 

//New Strategies for delete task function-----------------2
 export const deleteTask=(id)=>{
    return  {type:DELETE_TASK,payload:id};
 }
//new  Strategies delete data-----------------------------2
/*  store.dispatch(deleteTask(0));
console.log("Deleted task:", store.getState()); */ 

 











 //Note that- old state can not be update(mutable)

/*  import {createStore,applyMiddleware } from "redux";
 import {thunk} from 'redux-thunk'
 import { composeWithDevTools } from '@redux-devtools/extension'; */

 import {configureStore} from "@reduxjs/toolkit";
 
 //ki mi taks hote pare
 const ADD_TASK="task/add";
 const DELETE_TASK="task/delete";
 const Fetch_Tasks="task/fetch"
 
 const initialState={
     //task means akhane vivinno dhoroner task hote pare, may be filter kora, update kora, delete etc
     task:[],
    // isLoading :false
 };
 
 export const taskReducer=(state=initialState,action)=>{
     //users ki dhoRoner case find out korte chaiche
   switch (action.type) {
     case ADD_TASK:
       return {
         //sate k sprade korbo mane old state update kora jabe na 
         ...state,
         //. dilam karon previous data same ai thakuk but natun data ami end a add korbo
         task:[...state.task,action.payload],
       }
 
 
 
       case DELETE_TASK:
 
 
         const updateTask=state.task.filter((currIndex,index)=>{
                  return index!== action.payload;
         })
         return {
             ...state,
               task:updateTask,
         }


         case Fetch_Tasks:
          return {
            ...state,
            task:[...state.task,...action.payload]
          }
   
     default:
     return state;
   }
 }
 //export default taskReducer;
 
 // old Style
  /* export const store=createStore(taskReducer,
   composeWithDevTools(applyMiddleware(thunk))); */
 //console.log(store);

 export const store=configureStore({
  reducer:{
    taskReducer,
  }
 });

 
 
 //console.log("initial state ",store.getState());
 
 
 
 //dispatch a add task
 //old Strategies--------------------------------1
  store.dispatch({type:ADD_TASK,payload:"buy a pen from amazon India "})
 console.log("updated task:", store.getState());
 
 
  //old dispatch a delete task
 store.dispatch({type:DELETE_TASK,payload:1})
 console.log("deleted task:", store.getState());
  
 
 
 //New Strategies for add task function--------------------1
 
  export const addTask=(data)=>{
    return  {type:ADD_TASK,payload:data}
 }
 
 //new  Strategies add data--------------------------------1
 store.dispatch(addTask("buy a new rulex watch"));
 console.log("updated task:", store.getState());
 
 store.dispatch(addTask("buy a new rulex watchiopp"));
 console.log("updated task:", store.getState()); 
 
 //New Strategies for delete task function-----------------2
  export const deleteTask=(id)=>{
     return  {type:DELETE_TASK,payload:id};
  }
 //new  Strategies delete data-----------------------------2
 /*  store.dispatch(deleteTask(0));
 console.log("Deleted task:", store.getState()); */
 
  
 //Redux thunk middleware (that are always return the function)
 export const fetchTasks=()=>{
     return async(dispatch)=>{
      try {
        const res=await fetch("https://jsonplaceholder.typicode.com/todos?_limit=3");
        const task= await res.json();
            console.log(task)
        dispatch({type:Fetch_Tasks, payload:task.map((curTask)=> curTask.title
        ),
        })
      } catch (error) {
        console.log(error)
      }

     }
 }
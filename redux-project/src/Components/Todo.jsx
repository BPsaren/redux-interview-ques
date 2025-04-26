import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux";
import {MdDeleteForever} from "react-icons/md";
import { addTask, deleteTask, fetchTasks, taskReducer } from '../store';

const Todo = () => {

 const tasks = useSelector((state) => state.taskReducer.task)
 //console.log("new todo ",tasks);


 const [task,setTask]= useState("");
const dispatch= useDispatch();



const handleInputForm=(e)=>{
    setTask(e.target.value);
}

  const handleSubmitForm=(e)=>{
   e.preventDefault()
    dispatch(addTask(task));
   return setTask("");
  }




  const handleDeleteIndex =(id)=>{
    return dispatch(deleteTask(id));
  }




  const handleFetchTasks=()=>{
    dispatch(fetchTasks(task));
  }
  return (
    <div className='container '>
        <div className='todo-app'>
        <h1>
            <i className='fa-regular fa-pen-to-square'></i>To-do List
        </h1>
        <div className='row'>
              <form onSubmit={handleSubmitForm}>
                <input type="text" id="input-box" placeholder='Add a new task ' value={task} onChange={handleInputForm}></input>
                <button>Add task</button>
              </form>
        </div>
        <button onClick={handleFetchTasks}>Fetch Api</button>
        <ul id="list-container" >
          {
            tasks.map((currData,index)=>{
             return  <li key={index}>
                   <p>{index}:{currData}</p>
                   <div>
                    <MdDeleteForever className="icon-style"
                    onClick={()=>handleDeleteIndex(index)} />
                   </div>
              </li>
            }
          )
          }
        </ul>
        </div>
      
    </div>
  )
}

export default Todo;

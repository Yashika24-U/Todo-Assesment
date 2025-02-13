import React, { useState } from 'react'
import Layout from './components/Layout'
import Todolist from './components/Todolist';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  const[deletedTasks,setdeletedTasks] = useState([]);
  const[tasks,setTasks] = useState([])
  

  
  return (
    <>
    <DndProvider backend={HTML5Backend}>
        <Layout tasks={tasks} setTasks={setTasks}deletedTasks={deletedTasks} setdeletedTasks={setdeletedTasks}>
          <Todolist  tasks={tasks} setTasks={setTasks} setdeletedTasks={setdeletedTasks} deletedTasks={deletedTasks}  />
        </Layout>
      </DndProvider>
    </>

    
  )
}

export default App

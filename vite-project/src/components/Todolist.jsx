import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Todolist = ({ tasks, setTasks, deletedTasks, setdeletedTasks }) => {
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput("");
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks([...updatedTasks.sort((a, b) => a.completed - b.completed)]);
  };

  const deleteTask = (index) => {
    const removedTask = tasks[index];
    setdeletedTasks([...deletedTasks, removedTask]);
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const moveTask = (fromIndex, toIndex) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  const TaskItem = ({ task, index }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "TASK",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    const [, drop] = useDrop(() => ({
      accept: "TASK",
      hover: (item) => {
        if (item.index !== index) {
          moveTask(item.index, index);
          item.index = index; // Update index after moving
        }
      },
    }));

    return (
      <li
        ref={(node) => drag(drop(node))}
        key={index}
        className="p-2 border flex justify-between items-center rounded-md shadow-sm"
        style={{
          backgroundColor: task.completed ? "var(--completed)" : "white",
          color: task.completed ? "var(--text-dark)" : "var(--primary)",
          textDecoration: task.completed ? "line-through" : "none",
          opacity: isDragging ? 0.5 : 1, // Make the dragged item semi-transparent
        }}
      >
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(index)}
            className="w-4 h-4"
          />
          <span>{task.text}</span>
        </div>

        <button
          onClick={() => deleteTask(index)}
          className="bg-red-500 text-white px-2 py-1 rounded"
          style={{ backgroundColor: "var(--secondary)" }}
        >
          Delete
        </button>
      </li>
    );
  };

  return (
    <div
      className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md sm:w-full"
      style={{ backgroundColor: "var(--background)", color: "var(--text-dark)" }}
    >
      <h2
        className="text-blue-500 text-xl font-bold mb-4"
        style={{ color: "var(--primary)" }}
      >
        To-Do List
      </h2>

      {/* Input Section */}
      <div className="flex flex-col sm:flex-row mb-4">
        <input
          type="text"
          value={taskInput}
          className="border p-2 flex-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2 sm:mb-0"
          placeholder="Enter a new task"
          style={{
            backgroundColor: "var(--background)",
            color: "var(--text-dark)",
            borderColor: "var(--border-shade)",
          }}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-primary text-white px-4 py-2 sm:ml-4"
          style={{ backgroundColor: "var(--primary)", color: "var(--text-dark)" }}
        >
          Add
        </button>
      </div>

      {/* Display Task List */}
      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <TaskItem key={index} task={task} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default Todolist;


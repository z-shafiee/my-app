
import { useEffect, useState } from 'react';
import App from '../App'
import axios from 'axios';  

const Todo = () => {  
  const [tasks, setTasks] = useState([]);  
  const [input, setInput] = useState('');  
  const apiUrl = 'http://localhost:5000/tasks';  

  
  const fetchTasks = async () => {  
    try {  
      const response = await axios.get(apiUrl);  
      setTasks(response.data);  
    } catch (error) {  
      console.error('Error fetching tasks:', error);  
    }  
  };  

  
  
  useEffect(() => {  
    fetchTasks();  
  }, []);  
  const addTask = async (e) => {  
    e.preventDefault();  
    if (input) {  
      const newTask = { text: input };  
      try {  
        const response = await axios.post(apiUrl, newTask);  
        setTasks([...tasks, response.data]);  
        setInput('');
      } catch (error) {  
        console.error('Error adding task:', error);  
      }  
    }  
  };  
  
  const removeTask = async (id) => {  
    try {  
      await axios.delete(`${apiUrl}/${id}`);  
      const newTasks = tasks.filter((task) => task.id !== id);  
      setTasks(newTasks);  
    } catch (error) {  
      console.error('Error removing task:', error);  
    }  
  };  

  return (  
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">  
      <h2 className="text-2xl font-bold mb-4 text-center">To Do List</h2>  
      <form onSubmit={addTask} className="mb-4">  
        <input  
          type="text"  
          value={input}  
          onChange={(e) => setInput(e.target.value)}  
          placeholder="Enter a new task"  
          className="border border-gray-300 rounded-lg py-2 px-3 w-full mb-2"  
        />  
        <button  
          type="submit"  
          className="bg-purple-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition"  
        >  
          Add  
        </button>  
      </form>  
      <ul>  
        {tasks.map((task) => (  
          <li key={task.id} className="flex justify-between items-center py-2">  
            <span className="text-black">{task.text}</span>  
            <button  
              onClick={() => removeTask(task.id)}  
              className="text-red-500 hover:text-red-700"  
            >  
              Delete  
            </button>  
          </li>  
        ))}  
      </ul>  
    </div>  
  );  
};  

export default Todo; 



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserTodos.css'; 

const UserTodos = () => {
  const [todos, setTodos] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [userId]);

  return (
    <div className="user-todos-container">
      <h2 id="user-todos-header">Todos</h2>
      <ul className="user-todos-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`user-todos-item ${todo.completed ? 'completed' : ''}`}>
            <label>{todo.title}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTodos;

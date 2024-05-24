import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from 'react';
import api from "./utils/api"

function App() {
  const [todoList, setTodoList] = useState([])
  const [todoValue, setTodoValue] = useState("")

  const getTasks = async () => {
    const response = await api.get('/tasks')
    setTodoList(response.data.data)
  }

  const addTask = async () => {
    try {
      const response = await api.post('/tasks', {
        task: todoValue,
        isComplete: false,
      });
      if (response.status === 200) {
        console.log("Task added successfully");
        //1. 입력한 값이 안사라짐
        setTodoValue("");
        //2. 추가한 값이 안보임
        getTasks();
      } else {
        throw new Error("Task can not be added");
      }
    } catch (err) {
      console.log("error", err)
    }
  }

  const updateComplete = async (id) => {
    try {
      const task = todoList.find((item) => item._id === id);
      const response = await api.put(`/tasks/${id}`, {
        isComplete: !task.isComplete,
      })
      if (response.status === 200) { 
        getTasks();
      }
    } catch (err) {
      console.log("error", err)
    }
  }

  const deleteTask = async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) { 
        getTasks();
      }
    } catch (err) {
      console.log("error", err)
    }
  } 

  useEffect(() => {
    getTasks();
  }, [])
  
  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={9}>
          <input
            type="text"
            placeholder="Please enter your task"
            className="input-box"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={3}>
          <button className="button-add" onClick={addTask}>Add Task</button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} updateComplete={updateComplete} deleteTask={deleteTask} />
    </Container>
  );
}

export default App;

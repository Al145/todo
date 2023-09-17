import { Button, ButtonGroup, IconButton, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { v1 } from 'uuid';
import './App.css';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

interface Task {
  id: string;
  text: string;
  done: boolean;
}

const Test: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [taskText, setTaskText] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskText, setEditingTaskText] = useState<string>('');
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskText.trim() !== '') {
      const newTask: Task = {
        id: v1(),
        text: taskText.trim(),
        done: false,
      };
      const newTaskList = [newTask, ...tasks];
      setTasks(newTaskList);
      setTaskText('');
      localStorage.setItem('tasks', JSON.stringify(newTaskList));
    }
  };

  const removeTask = (id: string) => {
    const confirmDelete = window.confirm('Вы уверены, что хотите удалить эту задачу?');
  
  if (confirmDelete) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }
  };

  const startEditingTask = (id: string, text: string) => {
    setEditingTaskId(id);
    setEditingTaskText(text);
  };

  const handleEditingTaskTextChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditingTaskText(e.target.value);
  };

  const finishEditingTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: editingTaskText } : task
      )
    );
    setEditingTaskId(null);
    setEditingTaskText('');
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (editingTaskId !== null) {
        finishEditingTask(editingTaskId);
      } else {
        addTask();
      }
    }
  };

  const handleCheckboxClick = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const handleTaskMouseDown = (id: string) => {
    setDraggedTaskId(id);
  };

  const handleTaskMouseUp = () => {
    setDraggedTaskId(null);
  };

  const handleTaskDragOver = (
    id: string,
    e: React.DragEvent<HTMLLIElement>
  ) => {
    e.preventDefault();

    if (draggedTaskId !== null && draggedTaskId !== id) {
      const draggedTaskIndex = tasks.findIndex(
        (task) => task.id === draggedTaskId
      );
      const targetTaskIndex = tasks.findIndex((task) => task.id === id);

      const updatedTasks = [...tasks];
      updatedTasks.splice(
        targetTaskIndex,
        0,
        updatedTasks.splice(draggedTaskIndex, 1)[0]
      );

      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'active') {
      return !task.done;
    } else if (filter === 'completed') {
      return task.done;
    }
    return true;
  });

  return (
    <div className="test">
      <div className="todoMain">
        <div className="sendTodoMain">
          <TextField
            id="outlined-basic"
            label="Бродяга, какие планы?"
            variant="outlined"
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            id="sendBtn"
            onClick={addTask}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </div>
        <div className="filters">
          <ButtonGroup size="small" variant="outlined" aria-label="outlined button group">
            <Button variant={filter === 'all' ? 'contained' : 'outlined'} onClick={() => setFilter('all')}>All</Button>
            <Button variant={filter === 'active' ? 'contained' : 'outlined'} onClick={() => setFilter('active')}>Active</Button>
            <Button variant={filter === 'completed' ? 'contained' : 'outlined'} onClick={() => setFilter('completed')}>Completed</Button>
          </ButtonGroup>
        </div>
        <ul className="ulTodo">
          {filteredTasks.map((task) => (
            <li
              className={task.done ? 'done' : ''}
              key={task.id}
              draggable
              onMouseDown={() => handleTaskMouseDown(task.id)}
              onMouseUp={handleTaskMouseUp}
              onDragOver={(e) => handleTaskDragOver(task.id, e)}
            >
              {editingTaskId === task.id ? (
                <div className="liTodo">
                  <TextField
                    type="text"
                    value={editingTaskText}
                    onChange={handleEditingTaskTextChange}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        finishEditingTask(task.id);
                      }
                    }}
                    id="outlined-basic"
                    variant="outlined"
                  />
                  <Button
                    onClick={() => finishEditingTask(task.id)}
                    variant="contained"
                    endIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <>
                  <input
                  className='inpCheck'
                    checked={task.done}
                    type="checkbox"
                    onChange={() => handleCheckboxClick(task.id)}
                  />
                  {task.text}
                  <IconButton
                    size="small"
                    onClick={() => removeTask(task.id)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => startEditingTask(task.id, task.text)}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Test;
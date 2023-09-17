// import React, { useState } from 'react';
// import { v1 } from 'uuid';
// import './App.css';
// import Todos, { TasksType } from './Todos';

// export type FilterValuesTypes = 'all' | 'completed' | 'active';

// function App() {
//   const initialTask: Array<TasksType> = [
//     { id: v1(), title: 'html', isDone: true },
//     { id: v1(), title: 'css', isDone: false },
//     { id: v1(), title: 'react', isDone: true },
//     { id: v1(), title: 'js', isDone: true },
//   ];
  

//   const [task, setTask] = useState(initialTask);
//   const [filter, setFilter] = useState<FilterValuesTypes>('all');

//   const removeTask = (id: string) => {
//     let filterTask = task.filter((t) => t.id !== id);
//     setTask(filterTask);
//   };

//   const addTask = (title: string) => {
//     let listTask = {id: v1(), title: title, isDone: false}
//     let newTask = [listTask, ...task];
//     setTask(newTask);
//   }

//   const changeFilter = (value: FilterValuesTypes) => {
//     setFilter(value);
//   };

//   const changeStatus = (taskId: string, isDone: boolean) => {
//     let tasks = task.find(t => t.id === taskId)
//     if (tasks) {
//       tasks.isDone = isDone;
//     }
//     setTask([...task])
//    }

//   let taskForTodoList = task;
//   if (filter === 'completed') {
//     taskForTodoList = task.filter((t) => t.isDone === true);
//   }
//   if (filter === 'active') {
//     taskForTodoList = task.filter((t) => t.isDone === false);
//   }

//   return (
//     <div className="App">
//       <div className="h1">
//         <h1>Todos</h1>
//       </div>
//       <div className="todo">
//         <Todos
//           title={"Progs"}
//           tasks={taskForTodoList}
//           removeTask={removeTask}
//           changeFilter={changeFilter}
//           addTask={addTask}
//           changeTaskStatus={changeStatus}
//           filter={filter}
//         />
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import CustomizableTaskBlock from './CustomizableTaskBlock';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Задача 1', completed: false },
    { id: 2, title: 'Задача 2', completed: true },
    { id: 3, title: 'Задача 3', completed: false },
  ]);

  const handleTaskClick = (taskId: number) => {
    // Обработка клика по задаче, например, изменение статуса выполнения
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <CustomizableTaskBlock
        tasks={tasks}
        onTaskClick={handleTaskClick}
        blockTitle="Мои задачи"
      />
    </div>
  );
}

export default App;


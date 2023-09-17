import React from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskClick }) => {
  return (
    <div className="task-list">
      <h2>Список задач</h2>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => onTaskClick(task.id)}
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          >
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface CustomizableTaskBlockProps {
  tasks: Task[];
  onTaskClick: (taskId: number) => void;
  blockTitle: string;
  blockStyle?: React.CSSProperties;
}

const CustomizableTaskBlock: React.FC<CustomizableTaskBlockProps> = ({
  tasks,
  onTaskClick,
  blockTitle,
  blockStyle,
}) => {
  return (
    <div className="customizable-task-block" style={blockStyle}>
      <h1>{blockTitle}</h1>
      <TaskList tasks={tasks} onTaskClick={onTaskClick} />
    </div>
  );
};

export default CustomizableTaskBlock;

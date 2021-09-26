import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [status, setStatus] = useState(false)

  function handleCreateNewTask() {
    if(!newTaskTitle) {
      return 
    }

    const randomId = () => {
      let id = Math.round(Math.random() * 99999999999999999999)
      return id
    }

    const newTask = {
      id: randomId(), 
      title: newTaskTitle,
      isComplete: status
    }

    setTasks([...tasks, newTask])
  }

  function handleToggleTaskCompletion(id: number) {
    setStatus(!status)
    return tasks.map(t => {
      if (t.id === id) return t.isComplete = !status})
  }

  function handleRemoveTask(id: number) {
    const newArr = tasks.filter(t => t.id !== id)
    setTasks(newArr)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}
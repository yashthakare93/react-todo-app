import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';

const TodoItem = () => {
    const [inputValue, setInputVal] = useState('');
    const [editInputValue, setEditInputVal] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    const inputHandleChange = (event) => {
        if (editIndex === null) {
            setInputVal(event.target.value);
        }
    };

    const storeInputValue = () => {
        if (inputValue.trim() !== '') {
            const newTask = [...tasks, inputValue];
            setTasks(newTask);
            setInputVal('');
        }
    }

    const handleEditTask = (index) => {
        setEditIndex(index);
        setEditInputVal(tasks[index]);
    }

    const handleSaveTask = () => {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = editInputValue;
        setTasks(updatedTasks);
        setEditIndex(null);
    }

    const handleDeleteTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    }

    return (
        <div>
            <div className="input-box">
                <input
                    type="text"
                    value={inputValue}
                    onChange={inputHandleChange}
                    placeholder="Add a new Task"
                    disabled={editIndex !== null}
                />
                <button onClick={storeInputValue}>Add</button>
            </div>
            <div>
                <div className="custom-list">
                    {tasks.map((task, index) => (
                        <div className="custom-list-ele" key={index}>
                            {editIndex === index ? (
                                <>
                                    <input
                                        className="edit-input-box"
                                        type="text"
                                        value={editInputValue}
                                        onChange={(e) => setEditInputVal(e.target.value)}
                                    />
                                    <FaSave style={{ cursor: 'pointer' }} onClick={handleSaveTask} />
                                </>
                            ) : (
                                <>
                                    {task}
                                    <div>
                                        <FaEdit style={{ cursor: 'pointer' }} onClick={() => handleEditTask(index)} />
                                        <FaTrash style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => handleDeleteTask(index)} />
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TodoItem;

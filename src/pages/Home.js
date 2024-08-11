// @ts-nocheck
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Header from '../componant/Header';
import axios from 'axios';
import config from '../config';
import TaskList from './TaskList';

const API_URL = `${config.baseUrl}`;

export default function Home() {
    const [show, setShow] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [date, setDate] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const [errors, setErrors] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validateForm = () => {
        let formErrors = {};
        if (!taskName) formErrors.taskName = "Task Name is required";
        if (!date) formErrors.date = "Date is required";
        if (!taskDesc) formErrors.taskDesc = "Task Description is required";
        return formErrors;
    };

    const addTask = async () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        
        const formData = {
            task_name: taskName,
            date: date,
            task_desc: taskDesc
        };
        
        try {
            const res = await axios.post(API_URL + '/task/addTask', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const response = res.data;
            if (response.status === "success") {
                alert(response.result);
                setShow(false);
                // Reset form fields
                setTaskName('');
                setDate('');
                setTaskDesc('');
                setErrors({});
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <div>
            <Header />
            <main className='container'>
                <h1 className='text-center text-danger my-3'>Home</h1>

                <Button variant="primary" onClick={handleShow}>
                    Add Task
                </Button>

                <div className='my-4'>
                    <TaskList />
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="formtask">
                            <div className="mb-3">
                                <label htmlFor="task_name" className="form-label">Task Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="task_name" 
                                    id="task_name" 
                                    placeholder="Task Name" 
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}
                                    required 
                                />
                                {errors.taskName && <div className="text-danger">{errors.taskName}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Date" className="form-label">Date</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="date" 
                                    id="Date" 
                                    placeholder="Date" 
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required 
                                />
                                {errors.date && <div className="text-danger">{errors.date}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="task_desc" className="form-label">Task Desc</label>
                                <textarea 
                                    className="form-control" 
                                    name="task_desc" 
                                    id="task_desc"  
                                    value={taskDesc}
                                    onChange={(e) => setTaskDesc(e.target.value)}
                                    required
                                ></textarea>
                                {errors.taskDesc && <div className="text-danger">{errors.taskDesc}</div>}
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={addTask}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </main>
        </div>
    );
}

// @ts-nocheck
import axios from "axios";
import React, { useEffect,useState } from "react";
import Table from "react-bootstrap/Table";
import config from '../config';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
const API_URL = `${config.baseUrl}`

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
       
        fetchTasks()

    },[])

    const fetchTasks = async () => {

        try {
            const response = await axios.post(API_URL+"/task/getAllTasks");
            setTasks(response.data);
          } catch (error) {
            console.error('Error fetching tasks:', error);
          }
         

       }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/task/deleteTask/${id}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEdit = (task) => {
        setCurrentTask(task);
        setShowEditModal(true);
    };

    const handleSave = async () => {
        try {
           const res =  await axios.put(`${API_URL}/task/updateTask/${currentTask._id}`, currentTask);
           const response = res.data;
            if (response.status === "success") {
                setShowEditModal(false);
                console.log(response);
                fetchTasks();
            }else{
                alert("error to update data")
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleChange = (e) => {
        // @ts-ignore
        setCurrentTask({ ...currentTask, [e.target.name]: e.target.value });
    };
    
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
        {tasks.map((task, index) => (
            <tr key={task._id}>
              <td>{index + 1}</td>
              <td>{task.taskname}</td>
              <td>{task.description}</td>
              <td>{task.date}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(task)}>Edit</Button>
                {' '}
                <Button variant="danger" onClick={() => handleDelete(task._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>


      {currentTask && (
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formTaskName">
                                <Form.Label>Task Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="taskname"
                                    value={currentTask.taskname}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="description"
                                    value={currentTask.description}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formDate">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    value={currentTask.date}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
    </div>
  );
}

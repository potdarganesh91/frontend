import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom'
const API_URL = `${config.baseUrl}`

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate()

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.username) {
      errors.username = 'Username is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 2) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await axios.post(API_URL+"/register", formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Form data submitted:', response.data);
        if(response.data.status === 'success'){
           
          alert(response.data.message)
          navigate('./login')
      }

      if(response.data.status === 'error'){
          alert(response.data.message)
      }
       
        // Handle success (e.g., show a success message or redirect)
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error (e.g., show an error message)
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4" style={{ width: '400px' }}>
        <h2 className="card-title text-center">Register</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              // @ts-ignore
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors
// @ts-ignore
            .username && <div className="invalid-feedback">{errors.username}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              // @ts-ignore
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors
// @ts-ignore
            .email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              // @ts-ignore
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors
// @ts-ignore
            .password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-3" disabled={isSubmitting}>
            {isSubmitting ? 'loading...' : 'Register'}
          </button>
          <button className='btn btn-primary mx-2 mt-3' onClick={() => navigate('/login')}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Register;

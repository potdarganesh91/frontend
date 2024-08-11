// @ts-nocheck
// src/Header.js

import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

const Header = () => {
 
    const [username, setUsername] = useState("")
    const navigate = useNavigate()


    useEffect(() => {
        const storedUserName = localStorage.getItem('username');
        if (storedUserName) {
          setUsername(storedUserName);
        }
      }, []);
    
      function handleLogout(){
       
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('./login')
       
      }

  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">MyApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link href="about">About</Nav.Link>
            <Nav.Link href="services">Services</Nav.Link>
            <Nav.Link href="contact">Contact</Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
        <h5 className='mb-0'>{username}</h5>
        <button className='btn btn-light' onClick={handleLogout}>Logout</button>
      </Container>
    </Navbar>
  );
}

export default Header;

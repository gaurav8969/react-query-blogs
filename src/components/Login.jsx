import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import loginService from '../services/login';
import blogService from '../services/blogs';
import commentService from '../services/comment';
import Notification from './Notification';
import { useUserDispatch } from '../contexts/UserContext';
import { useNotificationDispatch } from '../contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      userDispatch({ type: 'setUser', payload: user });
      setUsername('');
      setPassword('');
      blogService.setToken(user.token);
      commentService.setToken(user.token);
      navigate('/');
    } catch (exception) {
      notificationDispatch({
        type: 'ERROR',
        payload: 'Invalid credentials'
      });
      setTimeout(() => notificationDispatch({ type: 'HIDE' }), 5000);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Log in to application</h2>
          <Notification />
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
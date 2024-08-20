import { useEffect, useState } from 'react';
import userService from '../services/users';
import UserTable from './UserTable';
import { Container, Row, Col } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then((initialUsers) => {
      setUsers(initialUsers);
    });
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <UserTable users={users} />
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
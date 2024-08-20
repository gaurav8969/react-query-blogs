import { useEffect, useState } from 'react';
import userService from '../services/users';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    userService.get(id).then((user) => {
      setUser(user);
    });
  }, []);

  if (!user) return <p>Loading data...</p>;

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h1 className="text-center mb-4">{user.name}</h1>
          <p style={{ fontWeight: 'bold', fontSize: 20, marginBottom: '1rem' }}>
            Blogs created by {user.name}
          </p>
          {user.blogs.map((blog) => (
            <Card key={blog.id} className="mb-3">
              <Card.Body>
                <Link to={`/blogs/${blog.id}`} className="text-decoration-none">
                  <Card.Title>{blog.title}</Card.Title>
                </Link>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default User;
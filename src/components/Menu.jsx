import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import BlogPage from './BlogPage';
import Users from './Users';
import User from './User';
import Blog from './Blog';
import LoginForm from './Login';
import LoginDialog from './LoginDialog';

const Menu = ({ user }) => {
  return (
    <div className="MenuClass">
      <Router>
        {user && (
          <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
            <Container fluid>
              <Navbar.Brand as={Link} to="/">
                Blog App
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">
                    Blogs
                  </Nav.Link>
                  <Nav.Link as={Link} to="/users">
                    Users
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Item>
                    <LoginDialog />
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        )}
        <Routes>
          <Route path="/" element={user ? <BlogPage /> : <Navigate replace to="/login" />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/login" element={user ? <Navigate replace to="/" /> : <LoginForm />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Menu;
import { useNavigate } from 'react-router-dom';
import { useUserDispatch, useUserValue } from '../contexts/UserContext';
import { Button, Navbar, NavItem } from 'react-bootstrap';

const LoginDialog = () => {
  const dispatch = useUserDispatch();
  const user = useUserValue();
  const navigate = useNavigate();

  const loggedIn = () => {
    return `${user.name} logged in`;
  };

  const logout = () => {
    dispatch({
      type: 'setUser',
      payload: null
    });
    window.localStorage.removeItem('loggedBlogappUser');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <Navbar.Collapse className="justify-content-end">
      <NavItem className="me-2">{loggedIn()}</NavItem>
      <Button variant="outline-primary" onClick={logout}>
        Logout
      </Button>
    </Navbar.Collapse>
  );
};

export default LoginDialog;
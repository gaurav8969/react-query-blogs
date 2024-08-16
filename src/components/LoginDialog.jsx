import { useNavigate } from 'react-router-dom';
import { useUserDispatch, useUserValue } from '../contexts/UserContext';

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

  if(!user) return;

  return (
    <>
      {loggedIn()}
      <button onClick={logout}>
        logout
      </button>
    </>
  );
};

export default LoginDialog;
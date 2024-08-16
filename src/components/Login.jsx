import loginService from '../services/login';
import blogService from '../services/blogs';
import commentService from '../services/comment';
import { useState } from 'react';
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

    try{
      const user = await loginService.login({
        username, password
      });

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      );

      userDispatch({
        type: 'setUser',
        payload: user
      });
      setUsername('');
      setPassword('');
      blogService.setToken(user.token);
      commentService.setToken(user.token);
      navigate('/');
    }catch(exception){
      notificationDispatch({
        type: 'ERROR',
        payload: 'invalid credentials'
      });
      setTimeout(() => notificationDispatch({
        type: 'HIDE'
      }), 5000);
    }
  };

  return(
    <form onSubmit= {handleLogin}>
      <h2>log in to application</h2>
      <Notification />
      <div>
        username: <input value={username} onChange= {(e) => {setUsername(e.target.value);}}/>
      </div>
      <div>
        password: <input value={password} onChange= {(e) => {setPassword(e.target.value);}}/>
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  );
};

export default LoginForm;
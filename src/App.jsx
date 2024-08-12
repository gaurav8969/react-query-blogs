import { useEffect } from 'react';

import LoginForm from './components/Login';
import BLogPage from './components/BlogPage';
import blogService from './services/blogs';
import { useUserDispatch, useUserValue } from './contexts/UserContext';

const App = () => {
  const user = useUserValue();
  const dispatch = useUserDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch({
        type: 'setUser',
        payload: user
      });
    }
  }, []);

  return (
    <div>
      {
        user === null
          ?(<LoginForm />)
          :(<BLogPage />)
      }
    </div>
  );
};

export default App;
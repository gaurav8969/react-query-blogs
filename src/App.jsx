import { useEffect, useState } from 'react';

import blogService from './services/blogs';
import commentService from './services/comment';
import { useUserDispatch, useUserValue } from './contexts/UserContext';
import Menu from './components/Menu';
import { useQuery } from '@tanstack/react-query';

const App = () => {
  const user = useUserValue();
  const dispatch = useUserDispatch();
  const [loading, setLoading] = useState(true);

  const blogQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      commentService.setToken(user.token);
      dispatch({
        type: 'setUser',
        payload: user
      });
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading the app...</div>; // Or any other loading indicator
  }

  return (
    <div className='container'>
      <Menu user={user}/>
    </div>
  );
};

export default App;
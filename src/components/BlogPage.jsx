import { useRef } from 'react';
import blogService from '../services/blogs';
import Blog from './Blog';
import CreateForm from './CreateForm';
import Notification from './Notification';
import Togglable from './Togglable';
import { useQuery } from '@tanstack/react-query';
import { useUserDispatch, useUserValue } from '../contexts/UserContext';

const BlogPage = () => {
  const user = useUserValue();
  const createFormRef = useRef();
  const dispatch = useUserDispatch();

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1
  });

  //console.log(JSON.parse(JSON.stringify(result)));
  if ( result.isLoading ) {
    return <div>loading data...</div>;
  }

  if(result.isError) {
    return <div>blog service not available due to problems in server</div>;
  }

  const blogs = result.data;

  const compareByLikes = (blog1, blog2) => {
    return blog2.likes - blog1.likes;
  };

  const isSortedByLikes = arr => arr.every((blog, i, a) => !i || a[i - 1].likes >= blog.likes);

  if(!isSortedByLikes(blogs)){
    blogs.sort(compareByLikes);
  }

  const loggedIn = () => {
    return `${user.name} logged in`;
  };

  const logout = () => {
    dispatch({
      type: 'setUser',
      payload: null
    });
    window.localStorage.removeItem('loggedBlogappUser');
  };

  return (
    <>
      <h2>blogs</h2>
      <Notification />
      {loggedIn()}
      <button onClick={logout}>
        logout
      </button>
      <br />
      <br />
      {
        blogs.map(blog => {
          //blog.user.id for blogs populated from get request
          //blog.user for newly added blogs before page reload
          if(blog.user.id === user.id || blog.user === user.id){
            return (<Blog key={blog.id} blog={blog} />);
          }
          return;
        })
      }

      <Togglable showLabel="add blog" hideLabel="hide" ref={createFormRef}>
        <CreateForm formRef={createFormRef}/>
      </Togglable>

    </>
  );
};

export default BlogPage;
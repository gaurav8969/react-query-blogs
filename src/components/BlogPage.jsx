import { useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useUserValue } from '../contexts/UserContext';
import CreateBlogForm from './CreateBlogForm';
import Togglable from './Togglable';
import Notification from './Notification';

const BlogPage = () => {
  const user = useUserValue();
  const createBlogFormRef = useRef();

  const queryClient = useQueryClient();
  const blogs = queryClient.getQueryData(['blogs']);
  if(!blogs) return (
    <p>blog service not available due to problems in server</p>
  );

  const compareByLikes = (blog1, blog2) => {
    return blog2.likes - blog1.likes;
  };

  const isSortedByLikes = arr => arr.every((blog, i, a) => !i || a[i - 1].likes >= blog.likes);

  if(!isSortedByLikes(blogs)){
    blogs.sort(compareByLikes);
  }

  return (
    <>
      <Notification />
      <h2>blogs</h2>
      {
        blogs.map(blog => {
          if(blog.user.id === user.id){
            return (
              <div key={blog.id}>
                <Link  to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </div>
            );
          }
          return;
        })
      }

      <Togglable showLabel="add blog" hideLabel="hide" ref={createBlogFormRef}>
        <CreateBlogForm formRef={createBlogFormRef}/>
      </Togglable>

    </>
  );
};

export default BlogPage;
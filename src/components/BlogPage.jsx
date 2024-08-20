import { Card, Button } from 'react-bootstrap';
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
  if (!blogs) return <p>Blog service not available due to problems in server</p>;

  const compareByLikes = (blog1, blog2) => blog2.likes - blog1.likes;
  const isSortedByLikes = arr => arr.every((blog, i, a) => !i || a[i - 1].likes >= blog.likes);

  if (!isSortedByLikes(blogs)) {
    blogs.sort(compareByLikes);
  }

  return (
    <>
      <Notification />
      <h2 className="my-4">Blogs</h2>
      {blogs.map(blog => (
        blog.user.id === user.id && (
          <Card key={blog.id} className="mb-3">
            <Card.Body>
              <Card.Title as={Link} to={`/blogs/${blog.id}`}>{blog.title}</Card.Title>
              <Card.Text>By {blog.author}</Card.Text>
              <Button variant="primary" as={Link} to={`/blogs/${blog.id}`}>View Blog</Button>
            </Card.Body>
          </Card>
        )
      ))}

      <Togglable showLabel="add blog" hideLabel="hide" ref={createBlogFormRef}>
        <CreateBlogForm formRef={createBlogFormRef} />
      </Togglable>
    </>
  );
};

export default BlogPage;
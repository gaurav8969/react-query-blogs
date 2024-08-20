import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotificationDispatch } from '../contexts/NotificationContext';
import { useUserValue } from '../contexts/UserContext';
import blogService from '../services/blogs';
import Notification from './Notification';
import Comments from './Comments';
import commentService from '../services/comment';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const RemoveButton = ({ blog, removeBlogListener }) => {
  const user = useUserValue();
  if (user.id !== blog.user.id) return null;
  return (
    <div>
      <Button variant="danger" onClick={removeBlogListener}>
        Remove
      </Button>
    </div>
  );
};

const Blog = () => {
  const dispatch = useNotificationDispatch();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const [commentTrigger, setCommentTrigger] = useState(true);

  useEffect(() => {
    blogService.get(id).then((blog) => {
      setBlog(blog);
    });
  }, [commentTrigger]);

  const createComment = async (newComment, id) => {
    await commentService.add(newComment, id);
    refreshBlog();
  };

  const refreshBlog = async () => {
    setCommentTrigger(!commentTrigger);
  };

  const queryClient = useQueryClient();
  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      const filtered = blogs.filter((blogEntry) => blogEntry.id !== updatedBlog.id);
      blogService.get(updatedBlog.id).then((response) => {
        filtered.push(response);
        setBlog(response);
        queryClient.setQueryData(['blogs'], filtered);
      });
    }
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (id) => {
      const blogs = queryClient.getQueryData(['blogs']);
      const filtered = blogs.filter((blogEntry) => blogEntry.id !== id);
      queryClient.setQueryData(['blogs'], filtered);
    }
  });

  const incrementLikes = async () => {
    const changedBlog = { ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
      comments: blog.comments.map((comment) => comment.id)
    };

    updateBlogMutation.mutate(changedBlog);
    dispatch({
      type: 'NOTIFY',
      payload: `"${blog.title}" has been voted up.`
    });
    setTimeout(() => dispatch({ type: 'HIDE' }), 5000);
  };

  const removeBlogListener = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog.id);
      dispatch({
        type: 'NOTIFY',
        payload: `"${blog.title}" by ${blog.author} removed.`
      });
      setTimeout(() => dispatch({ type: 'HIDE' }), 5000);
      navigate('/');
    }
  };

  if (!blog) return <p>Loading data...</p>;

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Notification />
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>{blog.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{blog.author}</Card.Subtitle>
              <Card.Link href={blog.url}>{blog.url}</Card.Link>
              <div className="d-flex justify-content-between align-items-center">
                <div>Likes: {blog.likes}</div>
                <Button variant="primary" onClick={incrementLikes}>
                  Like
                </Button>
              </div>
              <div>
                {blog.user.name} ({blog.user.username})
              </div>
              <RemoveButton blog={blog} removeBlogListener={removeBlogListener} />
            </Card.Body>
          </Card>
          <Comments
            comments={blog.comments}
            id={blog.id}
            createComment={createComment}
            refreshBlog={refreshBlog}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Blog;
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotificationDispatch } from '../contexts/NotificationContext';
import { useUserValue } from '../contexts/UserContext';
import blogService from '../services/blogs';
import Notification from './Notification';
import Comments from './Comments';
import commentService from '../services/comment';

const RemoveButton = ({ blog, removeBlogListener }) => {
  const user = useUserValue();

  if(user.id !== blog.user.id) return;
  return (
    <div><button onClick={removeBlogListener}>remove</button></div>
  );
};

const Blog = () => {
  const dispatch = useNotificationDispatch();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const [commentTrigger, setCommentTrigger] = useState(true);

  useEffect(() => {
    blogService.get(id).then(blog => {
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
      const filtered = blogs.filter((blogEntry) => {
        return blogEntry.id !== updatedBlog.id;
      });
      blogService.get(updatedBlog.id)
        .then(response => {
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
      const filtered = blogs.filter((blogEntry) => {
        return blogEntry.id !== id;
      });
      queryClient.setQueryData(['blogs'], filtered);
    }
  });

  const incrementLikes = async () => {
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
      comments: blog.comments.map((comment) => comment.id)
    };
    updateBlogMutation.mutate(changedBlog);
    dispatch({
      type: 'NOTIFY',
      payload: `"${blog.title}" has been voted up.`
    });

    setTimeout(() => dispatch({
      type: 'HIDE'
    }), 5000);
  };

  const removeBlogListener = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      deleteBlogMutation.mutate(blog.id);
      dispatch({
        type: 'NOTIFY',
        payload: `"${blog.title}" by ${blog.author} removed.`
      });

      setTimeout(() => dispatch({
        type: 'HIDE'
      }), 5000);
      navigate('/');
    }
  };

  if(!blog)return(
    <p>loading data...</p>
  );
  return (
    <>
      <Notification />
      <br />
      <div>{blog.title} by {blog.author}</div>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>likes {blog.likes} <button onClick={incrementLikes}>like</button></div>
      <div>{blog.author}</div>
      <div>{blog.user.name}</div>
      <RemoveButton blog={blog} removeBlogListener={removeBlogListener}/>
      <Comments comments={blog.comments} id={blog.id} createComment={createComment}
        refreshBlog={refreshBlog}/>
    </>
  );
};

export default Blog;
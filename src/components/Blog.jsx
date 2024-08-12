import { useState } from 'react';
import { useNotificationDispatch } from '../contexts/NotificationContext';
import blogService from '../services/blogs';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const Blog = ({ blog }) => {
  const [collapsed, setCollapse] = useState(true);
  const dispatch = useNotificationDispatch();

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

  const toggleCollapse = () => {
    setCollapse(!collapsed);
  };

  const incrementLikes = async () => {
    const changedBlog = {
      ...blog,
      likes:blog.likes + 1
    };
    changedBlog.user = changedBlog.user.id;
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
    }
  };

  if(collapsed){
    return (
      <div>
        {blog.title} {blog.author} <button onClick={toggleCollapse}>view</button>
      </div>
    );
  }else{
    //console.log('user is', blog.user);
    return (
      <>
        {blog.title} {blog.author} <button onClick={toggleCollapse}>hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={incrementLikes}>like</button>
        <br />
        {blog.author}
        <br />
        {blog.user.name}
        <br />
        <button onClick={removeBlogListener}>remove</button>
        <br />
      </>
    );
  }
};

export default Blog;
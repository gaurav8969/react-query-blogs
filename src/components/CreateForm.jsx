import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationDispatch } from '../contexts/NotificationContext';
import blogService from '../services/blogs';

const CreateForm = ({ formRef }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useNotificationDispatch();

  const queryClient = useQueryClient();
  const addBlogMutation = useMutation({
    mutationFn: blogService.add,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      blogService.get(newBlog.id)
        .then(response => {
          queryClient.setQueryData(['blogs'], blogs.concat(response));
        });
    }
  });

  const create = async (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url
    };

    try{
      dispatch({
        type: 'NOTIFY',
        payload: `"${newBlog.title}" by ${newBlog.author} has been created.`
      });
      setTimeout(() => dispatch({
        type: 'HIDE'
      }), 5000);

      addBlogMutation.mutate(newBlog);
      setTitle('');
      setAuthor('');
      setUrl('');
      formRef.current.toggleVisibility();
    }catch(error){
      console.log(error);
    }
  };

  return(
    <form onSubmit={create}>
      <h2>create new</h2>
      <div>
        title: <input value={title} onChange= {(e) => {setTitle(e.target.value);}}/>
      </div>
      <div>
        author: <input value={author} onChange= {(e) => {setAuthor(e.target.value);}}/>
      </div>
      <div>
        url: <input value={url} onChange= {(e) => {setUrl(e.target.value);}}/>
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  );
};

export default CreateForm;
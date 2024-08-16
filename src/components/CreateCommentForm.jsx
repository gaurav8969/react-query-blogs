import { useState } from 'react';

import { useNotificationDispatch } from '../contexts/NotificationContext';
import { useUserValue } from '../contexts/UserContext';

const CreateCommentForm = ({ id, createComment }) => {
  const [content, setContent] = useState('');
  const user = useUserValue();
  const dispatch = useNotificationDispatch();

  const create = async (event) => {
    event.preventDefault();

    const newComment = {
      content
    };

    try{
      dispatch({
        type: 'NOTIFY',
        payload: `"${newComment.content}" by ${user.name} has been created.`
      });
      setTimeout(() => dispatch({
        type: 'HIDE'
      }), 5000);

      setContent('');
      await createComment(newComment, id);
    }catch(error){
      console.log(error);
    }
  };

  return(
    <form onSubmit={create} style={{ marginLeft: -5, marginTop:5 }}>
      <input placeholder='add comment' value={content} onChange= {(e) => {setContent(e.target.value);}}/>  <button type="submit">create</button>
    </form>
  );
};

export default CreateCommentForm;
import { useState } from 'react';
import { useNotificationDispatch } from '../contexts/NotificationContext';
import { useUserValue } from '../contexts/UserContext';
import { Form, Button, InputGroup } from 'react-bootstrap';

const CreateCommentForm = ({ id, createComment }) => {
  const [content, setContent] = useState('');
  const user = useUserValue();
  const dispatch = useNotificationDispatch();

  const create = async (event) => {
    event.preventDefault();
    const newComment = { content };
    try {
      dispatch({
        type: 'NOTIFY',
        payload: `${user.name} commented "${newComment.content}".`
      });
      setTimeout(() => dispatch({ type: 'HIDE' }), 5000);
      setContent('');
      await createComment(newComment, id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={create} className="mt-3">
      <InputGroup>
        <Form.Control
          placeholder="Add comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button variant="primary" type="submit">
          Create
        </Button>
      </InputGroup>
    </Form>
  );
};

export default CreateCommentForm;
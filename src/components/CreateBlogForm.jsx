import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationDispatch } from '../contexts/NotificationContext';
import blogService from '../services/blogs';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';

const CreateBlogForm = ({ formRef }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const addBlogMutation = useMutation({
    mutationFn: blogService.add,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      blogService.get(newBlog.id).then((response) => {
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
    try {
      dispatch({
        type: 'NOTIFY',
        payload: `"${newBlog.title}" by ${newBlog.author} has been created.`
      });
      setTimeout(() => dispatch({ type: 'HIDE' }), 5000);
      addBlogMutation.mutate(newBlog);
      setTitle('');
      setAuthor('');
      setUrl('');
      formRef.current.toggleVisibility();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card className="mt-4">
            <Card.Body>
              <h2 className="mb-4">Create New Blog</h2>
              <Form onSubmit={create}>
                <Form.Group className="mb-3" controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter blog title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAuthor">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter blog author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formUrl">
                  <Form.Label>URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter blog URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Create
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateBlogForm;
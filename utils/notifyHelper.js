import { hide, notify } from '../src/reducers/notificationReducer';
import { useDispatch } from 'react-redux';

const useAddBlog = (setDisplayMessage, setSuccess, newBlog) => {
  const dispatch = useDispatch();
  setSuccess(true);
  setDisplayMessage(`new blog ${newBlog.title} by ${newBlog.author} added`);
  setTimeout(() => {
    setDisplayMessage('');
  }, 5000);
};

const blogError = (setDisplayMessage, setSuccess) => {
  setSuccess(false);
  setDisplayMessage('new blog couldn\'t be added');
  setTimeout(() => {
    setDisplayMessage('');
  }, 5000);
};

const loginFail = (setDisplayMessage, setSuccess) => {
  setSuccess(false);
  setDisplayMessage('wrong username or password');
  setTimeout(() => {
    setDisplayMessage('');
  }, 5000);
};

export default {
  useAddBlog, blogError, loginFail
};
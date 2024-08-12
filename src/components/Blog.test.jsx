import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  const blog = {
    'title':'Cybersec',
    'author':'GTR',
    'url':'http://localhost:6969',
    'likes':9000,
    'user':{
      'username': 'udit8969',
      'name': 'harsh',
      'password': '1252'
    }
  };

  const blogs = [blog];
  const setBlogs = vi.fn();
  const setLiked = vi.fn();
  const setSuccess = vi.fn();
  const setDisplayMessage = vi.fn();

  test('displays only blog name and author name when initially collapsed', () => {
    render(<Blog blog={blog} blogs={blogs} setBlogs={setBlogs} setLiked={setLiked} />);

    let element = screen.getByText(/Cybersec/);
    expect(element).toBeDefined();
    element = screen.getByText(/GTR/);
    expect(element).toBeDefined;
    element = screen.queryByText(/http:\/\/localhost:6969/);
    expect(element).toBeNull();
    element = screen.queryByText(/9000/);
    expect(element).toBeNull();
  });

  test('displays all details when expanded', async () => {
    render(<Blog blog={blog} blogs={blogs} setBlogs={setBlogs} setLiked={setLiked} />);

    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    let element = screen.getByText(/Cybersec/);
    expect(element).toBeDefined();
    element = screen.getByText(/GTR/);
    expect(element).toBeDefined;
    element = screen.getByText(/http:\/\/localhost:6969/);
    expect(element).toBeDefined();
    element = screen.getByText(/9000/);
    expect(element).toBeDefined();
  });

  test('if like button is clicked twice, event handler setLiked is called twice', async () => {
    render(<Blog blog={blog} blogs={blogs} setBlogs={setBlogs} setLiked={setLiked} />);

    const user = userEvent.setup();
    const viewButton = screen.getByText('view');
    await user.click(viewButton);
    const likeButton = screen.getByText('like');
    await user.click(likeButton);
    await user.click(likeButton);

    console.log('set liked mock calls are', setLiked.mock.calls);
    expect(setLiked.mock.calls).toHaveLength(2);
  });
});
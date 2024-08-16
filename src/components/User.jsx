import { useEffect, useState } from 'react';
import userService from '../services/users';
import { Link, useParams } from 'react-router-dom';

const User = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  useEffect(() => {
    userService.get(id).then(user => {
      setUser(user);
    });
  }, []);

  if(!user)return (
    <p>loading data....</p>
  );

  return (
    <>
      <h1>{user.name}</h1>
      <br/>
      <p style={{ fontWeight: 'bold', fontSize: 20 } }>add blogs</p>
      <ul>
        {
          user.blogs.map(blog => {
            return (
              <div key={blog.id}>
                <Link  to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </div>
            );
          })
        }
      </ul>
    </>
  );
};

export default User;
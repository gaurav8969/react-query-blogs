import {
  BrowserRouter as Router,
  Routes, Route, Link,
  Navigate,
} from 'react-router-dom';
import BlogPage from './BlogPage';
import Users from './Users';
import User from './User';
import Blog from './Blog';
import LoginForm from './Login';
import LoginDialog from './LoginDialog';

const Menu = ({ user }) => {
  const padding = {
    padding: 5
  };

  return (
    <Router>
      {
        user && (
          <div style={padding}>
            {user
              ? <Link style={padding} to="/">blogs</Link>
              : null
            }
            {user
              ? <Link style={padding} to="/users">users</Link>
              : null
            }
            {user
              ? <span style={padding}>
                <LoginDialog />
              </span>
              : null
            }
          </div>
        )
      }

      <Routes>
        <Route path="/" element={user ? <BlogPage /> : <Navigate replace to="/login" />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login" element={user ? <Navigate replace to="/" /> : <LoginForm /> } />
      </Routes>
    </Router>
  );
};

export default Menu;
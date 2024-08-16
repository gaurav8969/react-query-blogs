import { useEffect, useState } from 'react';
import userService from '../services/users';
import UserTable from './UserTable';
const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userService.getAll().then(initialUsers => {
      setUsers(initialUsers);
    });
  }, []);

  return (
    <>
      <UserTable users={users}/>
    </>
  );
};

export default Users;
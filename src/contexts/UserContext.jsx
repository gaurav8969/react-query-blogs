import { createContext, useReducer, useContext } from 'react';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'setUser':{
      return action.payload;
    }
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;

export const useUserValue = () => {
  const { state } = useContext(UserContext);
  return state;
};

export const useUserDispatch = () => {
  const { dispatch } = useContext(UserContext);
  return dispatch;
};
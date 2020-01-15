import React, { createContext, useContext, useReducer } from 'react';
import { LOGIN, LOGOUT } from './types';

const StoreContext = createContext();

const initialState = {
  loggedIn: false,
  user: {_id: null, googleId: null, name: '', created: null},
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      user: action.user,
      loggedIn: true,
    };
  case LOGOUT:
    return {
      ...state,
      loggedIn: false,
      user: {_id: null, googleId: null, name: '', created: null},
    };
  default:
    throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);

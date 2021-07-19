import React, { createContext, useReducer, useContext } from 'react';

const initialData = {
  loadDelay: false,
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'DELAY_ON':
      return { ...state, loadDelay: true };
    case 'DELAY_OFF':
      return { ...state, loadDelay: false };
  }
};

const StoreContext = createContext();

const useStoreContext = function () {
  return useContext(StoreContext);
};

const StoreProvider = function (props) {
  const [state, dispatch] = useReducer(dataReducer, initialData);
  return <StoreContext.Provider value={[state, dispatch]} {...props} />;
};

export { StoreProvider, useStoreContext };

import { createContext, ReactNode, useContext, useReducer } from 'react';

import { appReducer } from './AppReducer';
import { dummyJob } from '../data/data';

export const initialState = {
  contacts: [],
  alerts: [],
  currentAlert: null,
  currentContact: null,
  affectedContacts: [],
  scheduledJobs: [dummyJob],
  currentJob: null,
};

interface CurrentContextType {
  state: {};
  dispatch: () => void;
}

const AppContext = createContext<CurrentContextType | {}>({});

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

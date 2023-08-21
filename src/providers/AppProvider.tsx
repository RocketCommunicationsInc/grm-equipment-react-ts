import { createContext, ReactNode, useContext, useReducer } from 'react';

import { appReducer } from './AppReducer';
import { scheduledJobs, equipmentArr } from '../data/data';

export const initialState = {
  equipment: equipmentArr,
  currentEquipment: null,
  selectedEquipment: [],
  scheduledJobs: scheduledJobs,
  currentJob: null,
  deletedJob: null,
  notification: '',
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

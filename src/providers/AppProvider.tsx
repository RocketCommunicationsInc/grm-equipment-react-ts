import { createContext, ReactNode, useContext, useReducer } from 'react';

import { appReducer } from './AppReducer';
import { scehduledJobs, equipmentArr, equipmentByCategory } from '../data/data';

export const initialState = {
  equipment: equipmentArr,
  currentEquipment: null,
  equpimentByCategory: equipmentByCategory,
  scheduledJobs: scehduledJobs,
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
  console.log(state);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

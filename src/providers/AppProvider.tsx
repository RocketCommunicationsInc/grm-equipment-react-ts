import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';

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

  useEffect(() => {
    fetch(`https://grm-api-3a31afd8ee4e.herokuapp.com/equipment?_embed=jobs`)
      .then((res) => res.json())
      .then((payload) => dispatch({ type: 'SET_FETCHED_DATA', payload }));
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

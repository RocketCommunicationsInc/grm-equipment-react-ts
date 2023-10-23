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
  currentJobs: null,
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

  //event listener for custom event on tree module
  useEffect(() => {
    const dispatchEvent = (e: CustomEvent) => {
      fetch(
        `https://grm-api-3a31afd8ee4e.herokuapp.com/jobs?equipmentId=${e.detail.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          const newCurrent = { ...e.detail, scheduledJobs: data };
          dispatch({ type: 'CURRENT_EQUIPMENT', payload: newCurrent });
        })
        .catch((err) => console.log('job fetch error', err));
    };

    document.addEventListener('currentEquipChanged', (e) =>
      dispatchEvent(e as CustomEvent)
    );

    return () => {
      document.removeEventListener('currentEquipChanged', (e) =>
        dispatchEvent(e as CustomEvent)
      );
    };
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

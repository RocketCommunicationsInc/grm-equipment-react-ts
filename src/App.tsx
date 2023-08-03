import GlobalStatusBar from './Components/GlobalStatusBar/GlobalStatusBar';
import AppProvider from './providers/AppProvider';
import { TTCGRMProvider } from '@astrouxds/mock-data';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { BreadcrumbNav } from './common/BreadcrumbNav/BreadcrumbNav';
import Dashboard from './Components/Dashboard/DashboardPage';
import ScheduleJobPage from './Components/MaintenancePanel/ScheduleJob/ScheduleJobPage';
import NoDataFound from './common/Error/NoDataFound';
import JobDetailsPage from './Components/JobDetails/JobDetailsPage';
import './App.css';
import EquipmentDetailsPage from './Components/ContactsList/EquipmentDetailsPage';
// import ContactsTable from './Components/ContactsList/ContactsTable';
// import { SetStateAction } from 'react';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Dashboard />} />
      <Route
        element={
          <>
            <BreadcrumbNav />
            <Outlet />
          </>
        }
      >
        <Route
          path='equipment-details'
          element={
            <>
              <EquipmentDetailsPage />
            </>
          }
        >
          <Route index element={<Navigate to={'/'} />} />
          <Route
          //path=':id'
          >
            <Route
              path='schedule-job'
              element={<ScheduleJobPage />}
              errorElement={<NoDataFound dataType='alert' />}
            />
            <Route
              path='job-details'
              element={<JobDetailsPage />}
              errorElement={<NoDataFound dataType='alert' />}
            />
          </Route>
        </Route>
      </Route>
    </>
  )
);

const options = {
  alertsPercentage: 50 as const,
  initial: 10,
  interval: 1,
  limit: 50,
};

function App() {
  return (
    <TTCGRMProvider options={options}>
      <AppProvider>
        <GlobalStatusBar />
        <RouterProvider router={router} />
      </AppProvider>
    </TTCGRMProvider>
  );
}

export default App;

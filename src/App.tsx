import GlobalStatusBar from './Components/GlobalStatusBar/GlobalStatusBar';
import AppProvider from './providers/AppProvider';
import { TTCGRMProvider } from '@astrouxds/mock-data';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
} from 'react-router-dom';
import { BreadcrumbNav } from './common/BreadcrumbNav/BreadcrumbNav';
import Dashboard from './Components/Dashboard/DashboardPage';
import ScheduleJobPage from './Components/MaintenancePanel/ScheduleJob/ScheduleJobPage';
import JobDetailsPage from './Components/JobDetails/JobDetailsPage';
import './App.css';
import NoDataFound from './common/Error/NoDataFound';

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
          path='schedule-job'
          element={<ScheduleJobPage />}
          errorElement={<NoDataFound dataType='job' />}
        />
        <Route
          path='maintenance-details'
          element={<JobDetailsPage />}
          errorElement={<NoDataFound dataType='job' />}
        />
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

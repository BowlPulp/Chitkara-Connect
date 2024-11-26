import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import LoginPage from './page/login/LoginPage';
import StudentNavBar from './page/student/studentNavBar/studentNavBar';
import StudentHome from './page/student/StudentHome/StudentHome';
import StudentGatepass from './page/student/StudentGatepass/StudentGatepass';
import StudentQueries from './page/student/StudentQueries/StudentQueries';
import TeacherNavBar from './page/teacher/TeacherNavBar/TeacherNavBar';
import TeacherHome from './page/teacher/TeacherHome/TeacherHome';
import TeacherNoticeCreate from './page/teacher/TeacherHome/TeacherNoticeCreate';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StudentLayout from './StudentLayout.jsx';
import TeacherLayout from './TeacherLayout.jsx';
import Temporary from './Temporary.jsx';
import SupportPage from './page/login/SupportPage.jsx';

const router = createBrowserRouter([
  // Default Login Route
  {
    path: '/',
    element: <LoginPage />
  },

  // Temporary route (this can be changed according to your requirement)
  {
    path: '/support',
    element: <SupportPage />
  },

  // Student Routes (Dynamic ID and RollNo in the URL)
  {
    path: '/student/', // Correct dynamic path
    element: <StudentLayout />,
    children: [
      {
        path: 'home',
        element: <StudentHome />
      },
      {
        path: 'gatepass',
        element: <StudentGatepass />
      },
      {
        path: 'queries',
        element: <StudentQueries />
      },
      {
        path: 'help',
        element: <SupportPage />
      },
    ]
  },

  // Teacher Routes (Dynamic ID and TeacherId in the URL)
  {
    path: '/teacher/', // Correct dynamic path
    element: <TeacherLayout />,
    children: [
      {
        path: 'home',
        element: <TeacherHome />
      },
      {
        path: 'notice/create',
        element: <TeacherNoticeCreate />
      },
      {
        path: 'help',
        element: <SupportPage />
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

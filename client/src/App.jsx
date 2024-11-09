import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './page/login/LoginPage'
import StudentNavBar from './page/student/studentNavBar/studentNavBar'
import StudentHome from './page/student/StudentHome/StudentHome'
import StudentGatepass from './page/student/StudentGatepass/StudentGatepass'
import StudentQueries from './page/student/StudentQueries/StudentQueries'
import TeacherNavBar from './page/teacher/TeacherNavBar/TeacherNavBar'
import TeacherHome from './page/teacher/TeacherHome/TeacherHome'
import TeacherNoticeCreate from './page/teacher/TeacherHome/TeacherNoticeCreate'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";




const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route to login */}
        <Route path="/" element={<LoginPage />} />

        {/* Student routes */}
        <Route path="/student/" element={<StudentNavBar />}>
          <Route path="home" element={<StudentHome />} />
          <Route path="gatepass" element={<StudentGatepass />} />
          <Route path="queries" element={<StudentQueries />} />
        </Route>

        {/* Teacher routes */}
        <Route path="/teacher" element={<TeacherNavBar />}>
          <Route path="home" element={<TeacherHome />} />
          <Route path="notice/create" element={<TeacherNoticeCreate />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App

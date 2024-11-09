import React from "react";
import { Outlet } from "react-router-dom";
import StudentNavBar from './page/student/studentNavBar/studentNavBar';

const StudentLayout = () => {
  return (
    <div>
      <StudentNavBar />
      <Outlet /> {/* Renders nested routes here */}
    </div>
  );
};

export default StudentLayout;

import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Chitkaralogo from "/chitkaraLogo.jpeg";
import profile from "/profile.png";
import ChatBot from "../../../chatbot/ChatBot";

const StudentNavBar = () => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [student, setStudent] = useState({
    name: "Loading...", // Default placeholder text
    email: "",
    RollNo: "",
  });

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user-details", {
          method: "GET",
          credentials: "include", // Important to send cookies with the request
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched student data:", data); // Add this log to check data
          setStudent(data); // Assuming the backend returns { name, email, RollNo }
        } else {
          console.error("Failed to fetch user details.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserData();
  }, []);

  const toggleProfileDropdown = () => setProfileDropdownOpen(!isProfileDropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-gray-900 text-gray-200 p-4 shadow-lg border-b border-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-6">
          <Link to="/student/home" className="flex items-center space-x-2">
            <img className="w-12 h-12 md:w-16 md:h-16 rounded-lg" src={Chitkaralogo} alt="Logo" />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex flex-grow justify-center space-x-8">
          <NavLink to="/student/home" className={({ isActive }) => (isActive ? "text-[#EB1C24]" : "hover:text-[#EB1C24] text-gray-400")}>Home</NavLink>
          <NavLink to="/student/syllabus" className={({ isActive }) => (isActive ? "text-[#EB1C24]" : "hover:text-[#EB1C24] text-gray-400")}>Syllabus</NavLink>
          <NavLink to="/student/performance" className={({ isActive }) => (isActive ? "text-[#EB1C24]" : "hover:text-[#EB1C24] text-gray-400")}>Performance</NavLink>
          <NavLink to="/student/attendance" className={({ isActive }) => (isActive ? "text-[#EB1C24]" : "hover:text-[#EB1C24] text-gray-400")}>Attendance</NavLink>
          <NavLink to="/student/gatepass" className={({ isActive }) => (isActive ? "text-[#EB1C24]" : "hover:text-[#EB1C24] text-gray-400")}>Gatepass</NavLink>
          <NavLink to="/student/queries" className={({ isActive }) => (isActive ? "text-[#EB1C24]" : "hover:text-[#EB1C24] text-gray-400")}>Queries</NavLink>
          <NavLink to="/student/contact-teachers" className={({ isActive }) => (isActive ? "text-[#EB1C24]" : "hover:text-[#EB1C24] text-gray-400")}>Contact Teachers</NavLink>
          <NavLink to="/student/help" className={({ isActive }) => (isActive ? "text-[#EB1C24]" : "hover:text-[#EB1C24] text-gray-400")}>Help</NavLink>
        </div>

        {/* Profile and Mobile Menu */}
        <div className="relative flex items-center space-x-4">
          <div className="lg:hidden">
            <button onClick={toggleMobileMenu} className="focus:outline-none">
              <span className="text-2xl text-[#EB1C24]">☰</span>
            </button>
          </div>
          <div className="relative">
            <button onClick={toggleProfileDropdown} className="flex items-center space-x-2 focus:outline-none">
              <img className="w-8 h-8 rounded-full border-2 bg-slate-500 border-gray-600" src={profile} alt="Profile" />
              <span className="hidden md:inline-block font-medium">{student.name}</span>
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-auto bg-gray-800 rounded-lg shadow-lg py-2">
                <div className="px-4 py-2 text-sm">
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-gray-400">{student.email}</p>
                  <p>Roll No: {student.RollNo}</p>
                </div>
                <div className="border-t border-gray-700"></div>
                <Link to="/student/profile" className="block px-4 py-2 text-sm hover:bg-gray-700">
                  View Profile
                </Link>
                <Link to="/" className="block px-4 py-2 text-sm hover:bg-gray-700">
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 space-y-2 flex flex-col bg-gray-800 justify-center p-5 rounded-md ">
          <NavLink to="/student/home" className="hover:text-[#EB1C24]">Home</NavLink>
          <NavLink to="/student/syllabus" className="hover:text-[#EB1C24]">Syllabus</NavLink>
          <NavLink to="/student/performance" className="hover:text-[#EB1C24]">Performance</NavLink>
          <NavLink to="/student/attendance" className="hover:text-[#EB1C24]">Attendance</NavLink>
          <NavLink to="/student/gatepass" className="hover:text-[#EB1C24]">Gatepass</NavLink>
          <NavLink to="/student/queries" className="hover:text-[#EB1C24]">Queries</NavLink>
          <NavLink to="/student/contact-teachers" className="hover:text-[#EB1C24]">Contact Teachers</NavLink>
          <NavLink to="/student/help" className="hover:text-[#EB1C24]">Help</NavLink>
        </div>
      )}
    <ChatBot/>
    </nav>
  );
};

export default StudentNavBar;

import React, { useState } from "react";
import chitkaraLogo from "/chitkaraLogo.jpeg"; // Adjust the path as needed
import profile from "/profile.png"; // Adjust the path for the profile image

const TeacherNavBar = () => {
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  
    // Dummy student data
    const teacher = {
        name: "Jane Smith",
        email: "janesmith@example.com",
      };

    const toggleProfileDropdown = () => {
      setProfileDropdownOpen(!isProfileDropdownOpen);
    };
  
    const toggleMobileMenu = () => {
      setMobileMenuOpen(!isMobileMenuOpen);
    };
  
    return (
      <nav className="bg-gray-900 text-gray-200 p-4 shadow-lg border-b border-white">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo and Text */}
          <div className="flex items-center space-x-6">
            <a href="#" className="flex items-center space-x-2">
              <img className="w-12 h-12 md:w-16 md:h-16 rounded-lg" src={chitkaraLogo} alt="Logo" />
              
            </a>
          </div>
  
          {/* Navigation Links */}
          <div className="hidden lg:flex flex-grow justify-center space-x-8">
          <a href="#" className="hover:text-[#EB1C24]">Home</a>
          <a href="#" className="hover:text-[#EB1C24]">Syllabus</a>
          <a href="#" className="hover:text-[#EB1C24]">Performance</a>
          <a href="#" className="hover:text-[#EB1C24]">Attendance</a>
          <a href="#" className="hover:text-[#EB1C24]">Gatepass</a>
          <a href="#" className="hover:text-[#EB1C24]">Queries</a>
          <a href="#" className="hover:text-[#EB1C24]">Student Problems</a>
          <a href="#" className="hover:text-[#EB1C24]">Manage Students</a>
          <a href="#" className="hover:text-[#EB1C24]">Help</a>

          </div>
  
          {/* Profile and Mobile Menu Button */}
          <div className="relative flex items-center space-x-4">
            <div className="lg:hidden">
              <button onClick={toggleMobileMenu} className="focus:outline-none">
                <span className="text-2xl text-[#EB1C24]">☰</span>
              </button>
            </div>
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  className="w-8 h-8 rounded-full border-2 bg-slate-500 border-gray-600"
                  src={profile}
                  alt="Profile"
                />
                <span className="hidden md:inline-block font-medium">{teacher.name}</span>
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-auto bg-gray-800 rounded-lg shadow-lg py-2">
                  <div className="px-4 py-2 text-sm">
                    <p className="font-semibold">{teacher.name}</p>
                    <p className="text-gray-400">{teacher.email}</p>
                    <p>Roll No: {teacher.RollNo}</p>
                  </div>
                  <div className="border-t border-gray-700"></div>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-700">
                    View Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-700">
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
  
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 space-y-2 flex flex-col bg-gray-800 justify-center p-5 rounded-md ">
            <a href="#" className="hover:text-[#EB1C24]">Home</a>
          <a href="#" className="hover:text-[#EB1C24]">Syllabus</a>
          <a href="#" className="hover:text-[#EB1C24]">Performance</a>
          <a href="#" className="hover:text-[#EB1C24]">Attendance</a>
          <a href="#" className="hover:text-[#EB1C24]">Gatepass</a>
          <a href="#" className="hover:text-[#EB1C24]">Queries</a>
          <a href="#" className="hover:text-[#EB1C24]">Student Problems</a>
          <a href="#" className="hover:text-[#EB1C24]">Manage Students</a>
          <a href="#" className="hover:text-[#EB1C24]">Help</a>

          </div>
        )}
      </nav>
    );
  };

export default TeacherNavBar;
